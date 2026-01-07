import { mutation } from "./_generated/server"
import { api } from "./_generated/api" // Declare the api variable

// Seed script to populate the database with initial properties
export const seedProperties = mutation({
  handler: async (ctx) => {
    // Check if properties already exist
    const existingProperties = await ctx.db.query("properties").collect()

    if (existingProperties.length > 0) {
      console.log("Properties already seeded. Skipping...")
      return { message: "Database already contains properties", count: existingProperties.length }
    }

    const propertiesToSeed = [
      {
        title: "Luxury 4-Bedroom Duplex",
        location: "Lekki, Lagos",
        price: 250000000,
        status: "available" as const,
        description:
          "A stunning duplex with modern amenities and premium finishes. This magnificent property features spacious rooms, high-quality materials, and a contemporary design that exudes elegance. Perfect for families seeking luxury living in the heart of Lekki.",
        thumbnail: "/luxury-4-bedroom-duplex.jpg",
        images: [
          "/luxury-duplex-exterior.jpg",
          "/luxury-living-room.png",
          "/luxurious-master-bedroom.png",
          "/luxury-4-bedroom-duplex.jpg",
        ],
        highlights: {
          bedrooms: 4,
          bathrooms: 3,
          sqft: 5000,
          parking: 2,
        },
        amenities: ["Swimming Pool", "Gym", "Security", "Garden", "Smart Home System", "Generator"],
        land_size: "1,200 sqm",
        document_status: "Governor Consent",
        video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        map_coordinates: { lat: 6.4444, lng: 3.3447 },
        agent_contact: {
          phone: "+234 (0) 123 456 7890",
          whatsapp: "+234 (0) 123 456 7890",
          email: "agent@primecrest.com",
        },
        created_at: Date.now(),
        updated_at: Date.now(),
      },
      {
        title: "3-Bedroom Terraced House",
        location: "Ikoyi, Lagos",
        price: 180000000,
        status: "available" as const,
        description:
          "Modern terraced house in a secure gated community. Enjoy contemporary living with carefully designed spaces that blend comfort and style. Located in the prestigious Ikoyi neighborhood with easy access to major business districts.",
        thumbnail: "/3-bedroom-terraced-house.jpg",
        images: [
          "/terraced-house-exterior.jpg",
          "/cozy-dining-nook.png",
          "/cozy-bedroom.png",
          "/3-bedroom-terraced-house.jpg",
        ],
        highlights: {
          bedrooms: 3,
          bathrooms: 2,
          sqft: 3500,
          parking: 1,
        },
        amenities: ["24/7 Security", "Spacious Living", "Modern Kitchen", "Balcony", "Generator"],
        land_size: "800 sqm",
        document_status: "C of O",
        map_coordinates: { lat: 6.4336, lng: 3.4336 },
        agent_contact: {
          phone: "+234 (0) 123 456 7890",
          whatsapp: "+234 (0) 123 456 7890",
          email: "agent@primecrest.com",
        },
        created_at: Date.now(),
        updated_at: Date.now(),
      },
      {
        title: "Commercial Plot - VI",
        location: "Victoria Island, Lagos",
        price: 150000000,
        status: "sold" as const,
        description:
          "Prime commercial property perfect for offices or retail. Strategic location with high visibility and excellent accessibility. Ideal for businesses looking to establish a strong presence in Victoria Island's business district.",
        thumbnail: "/commercial-plot.jpg",
        images: ["/commercial-plot.jpg", "/business-district.jpg"],
        highlights: {
          bedrooms: 0,
          bathrooms: 0,
          sqft: 8000,
          parking: 0,
        },
        amenities: ["High Visibility", "Main Road Access", "Commercial Zone", "Fiber Internet"],
        land_size: "2,000 sqm",
        document_status: "Governor Consent",
        map_coordinates: { lat: 6.4281, lng: 3.4219 },
        agent_contact: {
          phone: "+234 (0) 123 456 7890",
          whatsapp: "+234 (0) 123 456 7890",
          email: "agent@primecrest.com",
        },
        created_at: Date.now() - 86400000,
        updated_at: Date.now() - 86400000,
      },
      {
        title: "Luxury 5-Bedroom Penthouse",
        location: "Banana Island, Lagos",
        price: 450000000,
        status: "available" as const,
        description:
          "Exclusive penthouse with stunning city views and premium amenities. Experience unparalleled luxury living with panoramic views, top-tier finishes, and world-class facilities. The epitome of sophisticated urban living.",
        thumbnail: "/luxury-penthouse.png",
        images: ["/penthouse-exterior.jpg", "/penthouse-view.jpg", "/master-suite.jpg", "/luxury-penthouse.png"],
        highlights: {
          bedrooms: 5,
          bathrooms: 4,
          sqft: 6500,
          parking: 3,
        },
        amenities: [
          "Infinity Pool",
          "Private Gym",
          "Home Cinema",
          "Wine Cellar",
          "Rooftop Terrace",
          "Smart Home",
          "Concierge Service",
        ],
        land_size: "1,500 sqm",
        document_status: "Governor Consent",
        video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        map_coordinates: { lat: 6.424, lng: 3.4326 },
        agent_contact: {
          phone: "+234 (0) 123 456 7890",
          whatsapp: "+234 (0) 123 456 7890",
          email: "agent@primecrest.com",
        },
        created_at: Date.now(),
        updated_at: Date.now(),
      },
      {
        title: "2-Bedroom Apartment",
        location: "Surulere, Lagos",
        price: 75000000,
        status: "available" as const,
        description:
          "Affordable and comfortable apartment in a vibrant neighborhood. Perfect for young professionals or small families. Well-maintained property in a lively community with excellent transport links and amenities nearby.",
        thumbnail: "/2-bedroom-apartment.jpg",
        images: ["/modern-apartment-exterior.png", "/cozy-apartment-living-room.png", "/2-bedroom-apartment.jpg"],
        highlights: {
          bedrooms: 2,
          bathrooms: 1,
          sqft: 1200,
          parking: 1,
        },
        amenities: ["Good Neighbourhood", "Easy Access", "Security", "Water Supply", "Shopping Nearby"],
        land_size: "200 sqm",
        document_status: "C of O",
        map_coordinates: { lat: 6.4969, lng: 3.3614 },
        agent_contact: {
          phone: "+234 (0) 123 456 7890",
          whatsapp: "+234 (0) 123 456 7890",
          email: "agent@primecrest.com",
        },
        created_at: Date.now(),
        updated_at: Date.now(),
      },
      {
        title: "Estate Plot - Ajah",
        location: "Ajah, Lagos",
        price: 85000000,
        status: "available" as const,
        description:
          "Residential plot in a planned estate community. Build your dream home in this well-planned estate with modern infrastructure. Excellent investment opportunity in one of Lagos's fastest-growing residential areas.",
        thumbnail: "/residential-plot-estate.jpg",
        images: ["/estate-community.jpg", "/green-space.jpg", "/residential-plot-estate.jpg"],
        highlights: {
          bedrooms: 0,
          bathrooms: 0,
          sqft: 5000,
          parking: 0,
        },
        amenities: ["Gated Community", "Schools Nearby", "Hospital Access", "Drainage System", "Street Lights"],
        land_size: "600 sqm",
        document_status: "Governor Consent",
        map_coordinates: { lat: 6.4654, lng: 3.5756 },
        agent_contact: {
          phone: "+234 (0) 123 456 7890",
          whatsapp: "+234 (0) 123 456 7890",
          email: "agent@primecrest.com",
        },
        created_at: Date.now(),
        updated_at: Date.now(),
      },
      {
        title: "Executive 4-Bedroom Detached",
        location: "Ikeja GRA, Lagos",
        price: 320000000,
        status: "available" as const,
        description:
          "Impressive detached house in the Government Reserved Area. Classic architecture meets modern luxury in this prestigious neighborhood. Features expansive grounds and high-end finishes throughout.",
        thumbnail: "/luxury-property-hero-background.jpg",
        images: ["/luxury-property-hero-background.jpg", "/luxury-living-room.png"],
        highlights: {
          bedrooms: 4,
          bathrooms: 3,
          sqft: 4800,
          parking: 3,
        },
        amenities: ["Swimming Pool", "BQ", "Security", "Landscaped Garden", "Generator", "Smart Home", "Central AC"],
        land_size: "1,000 sqm",
        document_status: "Governor Consent",
        map_coordinates: { lat: 6.5964, lng: 3.3406 },
        agent_contact: {
          phone: "+234 (0) 123 456 7890",
          whatsapp: "+234 (0) 123 456 7890",
          email: "agent@primecrest.com",
        },
        created_at: Date.now(),
        updated_at: Date.now(),
      },
      {
        title: "Modern Office Space",
        location: "Yaba, Lagos",
        price: 95000000,
        status: "available" as const,
        description:
          "Contemporary office space in Lagos's tech hub. Perfect for startups and tech companies. Open-plan layout with excellent natural light, high-speed internet connectivity, and modern facilities.",
        thumbnail: "/luxury-modern-office-interior.jpg",
        images: ["/luxury-modern-office-interior.jpg", "/business-district.jpg"],
        highlights: {
          bedrooms: 0,
          bathrooms: 2,
          sqft: 3000,
          parking: 5,
        },
        amenities: ["24/7 Security", "High-Speed Internet", "Conference Rooms", "Elevator", "Backup Power", "AC"],
        land_size: "500 sqm",
        document_status: "C of O",
        map_coordinates: { lat: 6.5074, lng: 3.3728 },
        agent_contact: {
          phone: "+234 (0) 123 456 7890",
          whatsapp: "+234 (0) 123 456 7890",
          email: "agent@primecrest.com",
        },
        created_at: Date.now(),
        updated_at: Date.now(),
      },
    ]

    // Insert all properties
    const insertedIds = []
    for (const property of propertiesToSeed) {
      const id = await ctx.db.insert("properties", property)
      insertedIds.push(id)
    }

    return {
      message: "Database seeded successfully",
      count: insertedIds.length,
      propertyIds: insertedIds,
    }
  },
})

// Clear all properties (use with caution!)
export const clearProperties = mutation({
  handler: async (ctx) => {
    const properties = await ctx.db.query("properties").collect()

    for (const property of properties) {
      await ctx.db.delete(property._id)
    }

    return {
      message: "All properties cleared",
      count: properties.length,
    }
  },
})

// Reseed database (clear and seed fresh)
export const reseedDatabase = mutation({
  handler: async (ctx) => {
    // Clear existing properties
    const properties = await ctx.db.query("properties").collect()
    for (const property of properties) {
      await ctx.db.delete(property._id)
    }

    // Re-run seed
    const result = await ctx.runMutation(api.seed.seedProperties)

    return {
      message: "Database reseeded successfully",
      ...result,
    }
  },
})
