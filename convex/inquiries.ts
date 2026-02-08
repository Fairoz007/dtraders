import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const list = query({
    args: {},
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) return null;

        return await ctx.db.query("inquiries").order("desc").collect();
    },
});

export const remove = mutation({
    args: { id: v.id("inquiries") },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) return;

        await ctx.db.delete(args.id);
    },
});

export const create = mutation({
    args: {
        name: v.string(),
        email: v.string(),
        phone: v.optional(v.string()),
        city: v.optional(v.string()),
        message: v.string(),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("inquiries", {
            ...args,
            createdAt: Date.now(),
        });
    },
});
