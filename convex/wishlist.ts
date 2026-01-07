import { v } from "convex/values"
import { mutation, query } from "./_generated/server"

export const addToWishlist = mutation({
  args: {
    user_id: v.string(),
    property_id: v.id("properties"),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("wishlist")
      .filter((q) => q.and(q.eq(q.field("user_id"), args.user_id), q.eq(q.field("property_id"), args.property_id)))
      .first()

    if (existing) {
      return existing._id
    }

    const id = await ctx.db.insert("wishlist", {
      user_id: args.user_id,
      property_id: args.property_id,
      saved_at: Date.now(),
    })
    return id
  },
})

export const removeFromWishlist = mutation({
  args: {
    user_id: v.string(),
    property_id: v.id("properties"),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("wishlist")
      .filter((q) => q.and(q.eq(q.field("user_id"), args.user_id), q.eq(q.field("property_id"), args.property_id)))
      .first()

    if (existing) {
      await ctx.db.delete(existing._id)
    }
  },
})

export const getUserWishlist = query({
  args: { user_id: v.string() },
  handler: async (ctx, args) => {
    const wishlistItems = await ctx.db
      .query("wishlist")
      .filter((q) => q.eq(q.field("user_id"), args.user_id))
      .order("saved_at", "desc")
      .collect()

    const propertyIds = wishlistItems.map((item) => item.property_id)
    const properties = await Promise.all(propertyIds.map((id) => ctx.db.get(id)))

    return properties.filter((p) => p !== null)
  },
})

export const isPropertyInWishlist = query({
  args: {
    user_id: v.string(),
    property_id: v.id("properties"),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("wishlist")
      .filter((q) => q.and(q.eq(q.field("user_id"), args.user_id), q.eq(q.field("property_id"), args.property_id)))
      .first()

    return !!existing
  },
})
