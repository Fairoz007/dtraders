import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    products: defineTable({
        name: v.string(),
        code: v.string(),
        description: v.string(),
        price: v.number(),
        category: v.string(),
        imageStorageId: v.optional(v.id("_storage")),
        featured: v.boolean(),
        active: v.boolean(),
        finishes: v.array(v.string()),
        createdAt: v.number(),
    }),
    users: defineTable({
        clerkId: v.string(),
        email: v.string(),
        name: v.optional(v.string()),
        role: v.union(v.literal("admin"), v.literal("user")),
    }).index("by_clerkId", ["clerkId"]),
    inquiries: defineTable({
        name: v.string(),
        email: v.string(),
        phone: v.optional(v.string()),
        city: v.optional(v.string()),
        message: v.string(),
        createdAt: v.number(),
    }),
});
