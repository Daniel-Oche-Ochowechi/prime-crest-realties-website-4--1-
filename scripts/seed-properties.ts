import { ConvexHttpClient } from "convex/browser"
import { api } from "../convex/_generated/api"

const CONVEX_URL = process.env.NEXT_PUBLIC_CONVEX_URL || ""

if (!CONVEX_URL) {
  throw new Error("NEXT_PUBLIC_CONVEX_URL environment variable is required")
}

const client = new ConvexHttpClient(CONVEX_URL)

const properties = [
  {
    title: "Luxury 4-Bedroom Duplex",
    location: "Lekki, Lagos",
    price: 250000000,
    status: "available" as const,
    description:
      "A stunning duplex with modern amenities and premium finishes. This property offers spacious living areas, a state-of-the-art kitchen, and beautifully landscaped gardens. Perfect for families seeking luxury and comfort in one of Lagos's most prestigious neighborhoods.",
    thumbnail: "/luxury-4-bedroom-duplex.jpg",
    images: ["/luxury-duplex-exterior.jpg", "/luxury-living-room.png", "/luxurious-master-bedroom.png"],
    highlights: {
      bedrooms: 4,
      bathrooms: 3,
      sqft: 5000,
      parking: 2,
    },
    amenities: ["Swimming Pool", "Gym", "24/7 Security", "Garden", "Smart Home System"],
    land_size: "1,200 sqm",
    document_status: "Governor Consent",
    video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    map_coordinates: { lat: 6.44, lng: 3.34 },
    agent_contact: {
      phone: "+234 (0) 123 456 7890",
      whatsapp: "+234 (0) 123 456 7890",
      email: "agent@primecrest.com",
    },
  },
  {
    title: "3-Bedroom Terraced House",
    location: "Ikoyi, Lagos",
    price: 180000000,
    status: "available" as const,
    description:
      "Modern terraced house in a secure gated community. Features contemporary design, spacious rooms, and proximity to key amenities. An ideal choice for professionals and families looking for convenience and security.",
    thumbnail: "/3-bedroom-terraced-house.jpg",
    images: ["/terraced-house-exterior.jpg", "/cozy-dining-nook.png", "/cozy-bedroom.png"],
    highlights: {
      bedrooms: 3,
      bathrooms: 2,
      sqft: 3500,
      parking: 1,
    },
    amenities: ["24/7 Security", "Spacious Living", "Modern Kitchen", "Gated Community"],
    land_size: "800 sqm",
    document_status: "C of O",
    map_coordinates: { lat: 6.43, lng: 3.33 },
    agent_contact: {
      phone: "+234 (0) 123 456 7890",
      whatsapp: "+234 (0) 123 456 7890",
      email: "agent@primecrest.com",
    },
  },
  {
    title: "Commercial Plot - Victoria Island",
    location: "VI, Lagos",
    price: 150000000,
    status: "sold" as const,
    description:
      "Prime commercial property perfect for offices or retail. Located in the heart of Victoria Island's business district with excellent visibility and accessibility. Ideal for corporate headquarters or upscale retail outlets.",
    thumbnail: "/commercial-plot.jpg",
    images: ["/commercial-plot.jpg", "/business-district.jpg"],
    highlights: {
      bedrooms: 0,
      bathrooms: 0,
      sqft: 8000,
      parking: 0,
    },
    amenities: ["High Visibility", "Main Road Access", "Commercial Zoning"],
    land_size: "2,000 sqm",
    document_status: "Governor Consent",
    map_coordinates: { lat: 6.45, lng: 3.35 },
    agent_contact: {
      phone: "+234 (0) 123 456 7890",
      whatsapp: "+234 (0) 123 456 7890",
      email: "agent@primecrest.com",
    },
  },
  {
    title: "Luxury 5-Bedroom Penthouse",
    location: "Banana Island, Lagos",
    price: 450000000,
    status: "available" as const,
    description:
      "Exclusive penthouse with stunning city views and premium amenities. This magnificent residence features floor-to-ceiling windows, designer interiors, and world-class facilities. The pinnacle of luxury living in Lagos.",
    thumbnail: "/luxury-penthouse.png",
    images: ["/penthouse-exterior.jpg", "/penthouse-view.jpg", "/master-suite.jpg"],
    highlights: {
      bedrooms: 5,
      bathrooms: 4,
      sqft: 6500,
      parking: 3,
    },
    amenities: ["Infinity Pool", "Private Gym", "Cinema Room", "Wine Cellar", "Rooftop Terrace", "24/7 Concierge"],
    land_size: "1,500 sqm",
    document_status: "Governor Consent",
    video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    map_coordinates: { lat: 6.42, lng: 3.32 },
    agent_contact: {
      phone: "+234 (0) 123 456 7890",
      whatsapp: "+234 (0) 123 456 7890",
      email: "agent@primecrest.com",
    },
  },
  {
    title: "2-Bedroom Apartment",
    location: "Surulere, Lagos",
    price: 75000000,
    status: "available" as const,
    description:
      "Affordable and comfortable apartment in a vibrant neighborhood. Well-designed living spaces with modern finishes. Perfect for young professionals and small families seeking quality accommodation at a great value.",
    thumbnail: "/2-bedroom-apartment.jpg",
    images: ["/modern-apartment-exterior.png", "/cozy-apartment-living-room.png"],
    highlights: {
      bedrooms: 2,
      bathrooms: 1,
      sqft: 1200,
      parking: 1,
    },
    amenities: ["Good Neighbourhood", "Easy Access", "Shopping Centers Nearby"],
    land_size: "200 sqm",
    document_status: "C of O",
    map_coordinates: { lat: 6.48, lng: 3.31 },
    agent_contact: {
      phone: "+234 (0) 123 456 7890",
      whatsapp: "+234 (0) 123 456 7890",
      email: "agent@primecrest.com",
    },
  },
  {
    title: "Estate Plot - Ajah",
    location: "Ajah, Lagos",
    price: 85000000,
    status: "available" as const,
    description:
      "Residential plot in a planned estate community. Excellent infrastructure, good drainage, and proximity to essential services. Build your dream home in this fast-developing area with great investment potential.",
    thumbnail: "/residential-plot-estate.jpg",
    images: ["/estate-community.jpg", "/green-space.jpg"],
    highlights: {
      bedrooms: 0,
      bathrooms: 0,
      sqft: 5000,
      parking: 0,
    },
    amenities: ["Gated Community", "Schools Nearby", "Hospital Access", "Good Road Network"],
    land_size: "600 sqm",
    document_status: "Governor Consent",
    map_coordinates: { lat: 6.39, lng: 3.4 },
    agent_contact: {
      phone: "+234 (0) 123 456 7890",
      whatsapp: "+234 (0) 123 456 7890",
      email: "agent@primecrest.com",
    },
  },
  {
    title: "Modern 3-Bedroom Bungalow",
    location: "Ikeja, Lagos",
    price: 120000000,
    status: "available" as const,
    description:
      "Beautifully designed bungalow with contemporary architecture and finishes. Open floor plan, natural lighting, and well-manicured compound. Located in a quiet residential area with easy access to major highways.",
    thumbnail: "/luxury-property.png",
    images: ["/luxury-interior.png"],
    highlights: {
      bedrooms: 3,
      bathrooms: 2,
      sqft: 2800,
      parking: 2,
    },
    amenities: ["Generator", "Borehole", "Spacious Compound", "Modern Fittings"],
    land_size: "500 sqm",
    document_status: "C of O",
    map_coordinates: { lat: 6.6, lng: 3.35 },
    agent_contact: {
      phone: "+234 (0) 123 456 7890",
      whatsapp: "+234 (0) 123 456 7890",
      email: "agent@primecrest.com",
    },
  },
  {
    title: "Executive 6-Bedroom Mansion",
    location: "Parkview Estate, Ikoyi",
    price: 650000000,
    status: "available" as const,
    description:
      "Majestic mansion in one of Lagos's most exclusive neighborhoods. Features include a grand entrance, luxurious finishes throughout, entertainment areas, and beautifully landscaped gardens. The epitome of prestige and sophistication.",
    thumbnail: "/luxury-property.png",
    images: ["/luxury-interior.png"],
    highlights: {
      bedrooms: 6,
      bathrooms: 5,
      sqft: 9000,
      parking: 4,
    },
    amenities: [
      "Swimming Pool",
      "Tennis Court",
      "Guest House",
      "Home Theatre",
      "Wine Cellar",
      "Gym",
      "24/7 Security",
      "Staff Quarters",
    ],
    land_size: "2,500 sqm",
    document_status: "Governor Consent",
    video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    map_coordinates: { lat: 6.44, lng: 3.42 },
    agent_contact: {
      phone: "+234 (0) 123 456 7890",
      whatsapp: "+234 (0) 123 456 7890",
      email: "agent@primecrest.com",
    },
  },
]

async function seedDatabase() {
  console.log("🌱 Starting database seeding...")

  try {
    for (const property of properties) {
      console.log(`📝 Creating property: ${property.title}`)
      await client.mutation(api.properties.createProperty, property)
      console.log(`✅ Created: ${property.title}`)
    }

    console.log("\n🎉 Database seeding completed successfully!")
    console.log(`📊 Total properties created: ${properties.length}`)
  } catch (error) {
    console.error("❌ Error seeding database:", error)
    throw error
  }
}

seedDatabase()
  .then(() => {
    console.log("\n✨ Seeding script finished")
    process.exit(0)
  })
  .catch((error) => {
    console.error("\n💥 Seeding script failed:", error)
    process.exit(1)
  })
