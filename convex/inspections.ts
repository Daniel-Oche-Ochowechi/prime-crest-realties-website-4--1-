import { v } from "convex/values"
import { mutation, query } from "./_generated/server"

export const bookInspection = mutation({
  args: {
    user_id: v.string(),
    property_id: v.id("properties"),
    date: v.string(),
    time: v.string(),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("inspection_bookings", {
      user_id: args.user_id,
      property_id: args.property_id,
      date: args.date,
      time: args.time,
      notes: args.notes,
      status: "pending",
      created_at: Date.now(),
    })
    return id
  },
})

export const getUserInspections = query({
  args: { user_id: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("inspection_bookings")
      .filter((q) => q.eq(q.field("user_id"), args.user_id))
      .order("date", "desc")
      .collect()
  },
})

export const updateInspectionStatus = mutation({
  args: {
    id: v.id("inspection_bookings"),
    status: v.union(v.literal("pending"), v.literal("confirmed"), v.literal("completed"), v.literal("cancelled")),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { status: args.status })
  },
})

export const getAllInspections = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("inspection_bookings").order("created_at", "desc").collect()
  },
})
