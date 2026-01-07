import { v } from "convex/values"
import { mutation, query } from "./_generated/server"

export const getProperties = query({
  args: {
    status: v.optional(v.string()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const properties = await ctx.db
      .query("properties")
      .filter((q) => (args.status ? q.eq(q.field("status"), args.status) : true))
      .order("created_at", "desc")
      .take(args.limit || 12)
    return properties
  },
})

export const getPropertyById = query({
  args: { id: v.id("properties") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id)
  },
})

export const createProperty = mutation({
  args: {
    title: v.string(),
    location: v.string(),
    price: v.number(),
    status: v.union(v.literal("available"), v.literal("sold")),
    description: v.string(),
    images: v.array(v.string()),
    thumbnail: v.string(),
    highlights: v.object({
      bedrooms: v.number(),
      bathrooms: v.number(),
      sqft: v.number(),
      parking: v.number(),
    }),
    amenities: v.array(v.string()),
    land_size: v.string(),
    document_status: v.string(),
    video_url: v.optional(v.string()),
    map_coordinates: v.object({
      lat: v.number(),
      lng: v.number(),
    }),
    agent_contact: v.object({
      phone: v.string(),
      whatsapp: v.string(),
      email: v.string(),
    }),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("properties", {
      ...args,
      created_at: Date.now(),
      updated_at: Date.now(),
    })
    return id
  },
})

export const updateProperty = mutation({
  args: {
    id: v.id("properties"),
    updates: v.object({
      title: v.optional(v.string()),
      location: v.optional(v.string()),
      price: v.optional(v.number()),
      status: v.optional(v.union(v.literal("available"), v.literal("sold"))),
      description: v.optional(v.string()),
      images: v.optional(v.array(v.string())),
      thumbnail: v.optional(v.string()),
      highlights: v.optional(
        v.object({
          bedrooms: v.number(),
          bathrooms: v.number(),
          sqft: v.number(),
          parking: v.number(),
        }),
      ),
      amenities: v.optional(v.array(v.string())),
      document_status: v.optional(v.string()),
    }),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      ...args.updates,
      updated_at: Date.now(),
    })
    return args.id
  },
})

export const deleteProperty = mutation({
  args: { id: v.id("properties") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id)
  },
})
