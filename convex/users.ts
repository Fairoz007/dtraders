
import { mutation, query } from "./_generated/server";

export const store = mutation({
    args: {},
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) return null;

        const cleanEmail = identity.email?.toLowerCase().trim();

        // 1. Try lookup by exact clerkId
        let user = await ctx.db
            .query("users")
            .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
            .first();

        // 2. Fallback lookup by email (ignoring case/whitespace)
        if (!user && cleanEmail) {
            const allUsers = await ctx.db.query("users").collect();
            user = allUsers.find(u => u.email.toLowerCase().trim() === cleanEmail) || null;

            if (user) {
                // Fix the ID for this user so lookup by index works next time
                await ctx.db.patch(user._id, { clerkId: identity.subject });
            }
        }

        if (user !== null) {
            // Update profile
            await ctx.db.patch(user._id, {
                name: identity.name || user.name,
                email: identity.email?.toLowerCase() || user.email,
            });
            return user._id;
        }

        // 3. Create new user
        return await ctx.db.insert("users", {
            clerkId: identity.subject,
            email: identity.email!.toLowerCase(),
            name: identity.name,
            role: "admin",
        });
    },
});

export const currentUser = query({
    args: {},
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) return null;

        // Try lookup by clerkId
        const userById = await ctx.db
            .query("users")
            .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
            .first();

        if (userById) return userById;

        // Fallback by email
        if (identity.email) {
            const cleanEmail = identity.email.toLowerCase().trim();
            const allUsers = await ctx.db.query("users").collect();
            return allUsers.find(u => u.email.toLowerCase().trim() === cleanEmail) || null;
        }

        return null;
    },
});
