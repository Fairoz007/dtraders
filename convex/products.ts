import { v } from "convex/values";
import { mutation, query, type QueryCtx } from "./_generated/server";

export const list = query({
    args: {
        onlyActive: v.optional(v.boolean()),
        onlyFeatured: v.optional(v.boolean())
    },
    handler: async (ctx, args) => {
        let productsQuery = ctx.db.query("products");
        let results = await productsQuery.order("desc").collect();

        if (args.onlyActive) {
            results = results.filter(p => p.active !== false);
        }

        if (args.onlyFeatured) {
            results = results.filter(p => p.featured === true);
        }

        return Promise.all(
            results.map(async (product) => ({
                ...product,
                imageUrl: product.imageStorageId
                    ? await ctx.storage.getUrl(product.imageStorageId)
                    : null,
            }))
        );
    },
});

export const listFeatured = query({
    args: {},
    handler: async (ctx) => {
        const products = await ctx.db
            .query("products")
            .filter((q) => q.eq(q.field("featured"), true))
            .filter((q) => q.eq(q.field("active"), true))
            .collect();

        return Promise.all(
            products.map(async (product) => ({
                ...product,
                imageUrl: product.imageStorageId
                    ? await ctx.storage.getUrl(product.imageStorageId)
                    : null,
            }))
        );
    },
});

export const get = query({
    args: { id: v.id("products") },
    handler: async (ctx, args) => {
        const product = await ctx.db.get(args.id);
        if (!product) return null;
        return {
            ...product,
            imageUrl: product.imageStorageId
                ? await ctx.storage.getUrl(product.imageStorageId)
                : null,
        };
    },
});

// Helper to check authentication
async function checkAuth(ctx: QueryCtx | any) {
    return await ctx.auth.getUserIdentity();
}

export const create = mutation({
    args: {
        name: v.string(),
        description: v.string(),
        price: v.number(),
        category: v.string(),
        featured: v.boolean(),
        active: v.optional(v.boolean()),
        finishes: v.array(v.string()),
        imageStorageId: v.optional(v.id("_storage")),
    },
    handler: async (ctx, args) => {
        const identity = await checkAuth(ctx);
        if (!identity) throw new Error("Not authenticated");

        // Auto-generate code if not provided or just always for new
        const prefix = args.category.slice(0, 3).toUpperCase();
        const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase();
        const code = `${prefix}-${randomPart}`;

        return await ctx.db.insert("products", {
            ...args,
            code,
            active: args.active !== undefined ? args.active : true,
            createdAt: Date.now(),
        });
    },
});

export const update = mutation({
    args: {
        id: v.id("products"),
        name: v.string(),
        code: v.optional(v.string()),
        description: v.string(),
        price: v.number(),
        category: v.string(),
        featured: v.boolean(),
        active: v.boolean(),
        finishes: v.array(v.string()),
        imageStorageId: v.optional(v.id("_storage")),
    },
    handler: async (ctx, args) => {
        const identity = await checkAuth(ctx);
        if (!identity) throw new Error("Not authenticated");

        const { id, ...data } = args;
        await ctx.db.patch(id, data);
    },
});

export const remove = mutation({
    args: { id: v.id("products") },
    handler: async (ctx, args) => {
        const identity = await checkAuth(ctx);
        if (!identity) throw new Error("Not authenticated");

        const product = await ctx.db.get(args.id);
        if (product?.imageStorageId) {
            await ctx.storage.delete(product.imageStorageId);
        }
        await ctx.db.delete(args.id);
    },
});

export const generateUploadUrl = mutation(async (ctx) => {
    const identity = await checkAuth(ctx);
    if (!identity) throw new Error("Not authenticated");

    return await ctx.storage.generateUploadUrl();
});
