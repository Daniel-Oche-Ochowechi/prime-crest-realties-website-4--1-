import { v } from "convex/values"
import { mutation, query } from "./_generated/server"

export const sendMessage = mutation({
  args: {
    user_id: v.string(),
    property_id: v.id("properties"),
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("messages", {
      user_id: args.user_id,
      property_id: args.property_id,
      name: args.name,
      email: args.email,
      phone: args.phone,
      message: args.message,
      timestamp: Date.now(),
    })
    return id
  },
})

export const getPropertyMessages = query({
  args: { property_id: v.id("properties") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("messages")
      .filter((q) => q.eq(q.field("property_id"), args.property_id))
      .order("timestamp", "desc")
      .collect()
  },
})

export const getAllMessages = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("messages").order("timestamp", "desc").collect()
  },
})
