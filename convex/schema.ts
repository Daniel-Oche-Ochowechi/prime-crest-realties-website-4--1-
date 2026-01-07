import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export default defineSchema({
  properties: defineTable({
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
    created_at: v.number(),
    updated_at: v.number(),
  }).index("by_status", ["status"]),

  wishlist: defineTable({
    user_id: v.string(),
    property_id: v.id("properties"),
    saved_at: v.number(),
  })
    .index("by_user", ["user_id"])
    .index("by_property", ["property_id"]),

  messages: defineTable({
    user_id: v.string(),
    property_id: v.id("properties"),
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    message: v.string(),
    timestamp: v.number(),
  })
    .index("by_property", ["property_id"])
    .index("by_timestamp", ["timestamp"]),

  users: defineTable({
    email: v.string(),
    name: v.string(),
    phone: v.optional(v.string()),
    profile_image: v.optional(v.string()),
    created_at: v.number(),
  }).index("by_email", ["email"]),

  inspection_bookings: defineTable({
    user_id: v.string(),
    property_id: v.id("properties"),
    date: v.string(),
    time: v.string(),
    notes: v.optional(v.string()),
    status: v.union(v.literal("pending"), v.literal("confirmed"), v.literal("completed"), v.literal("cancelled")),
    created_at: v.number(),
  })
    .index("by_user", ["user_id"])
    .index("by_property", ["property_id"]),
})
