import { createClient } from "@supabase/supabase-js"
import fs from "fs"
import path from "path"

// Load env vars manually
try {
    const envPath = path.resolve(process.cwd(), ".env.local")
    const envFile = fs.readFileSync(envPath, "utf8")
    envFile.split("\n").forEach((line) => {
        const [key, value] = line.split("=")
        if (key && value) {
            process.env[key.trim()] = value.trim().replace(/^["']|["']$/g, "") // Remove quotes
        }
    })
} catch (error) {
    console.warn("⚠️  Could not load .env.local file, relying on process.env")
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
    console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables")
    process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

const properties = [
    {
        title: "Luxury 4-Bedroom Duplex",
        location: "Lekki, Lagos",
        price: 250000000,
        status: "available",
        description:
            "A stunning duplex with modern amenities and premium finishes. This property offers spacious living areas, a state-of-the-art kitchen, and beautifully landscaped gardens. Perfect for families seeking luxury and comfort in one of Lagos's most prestigious neighborhoods.",
        thumbnail: "/luxury-4-bedroom-duplex.jpg",
        images: ["/luxury-duplex-exterior.jpg", "/luxury-living-room.png", "/luxurious-master-bedroom.png"],
        bedrooms: 4,
        bathrooms: 3,
        sqft: 5000,
        parking: 2,
        amenities: ["Swimming Pool", "Gym", "24/7 Security", "Garden", "Smart Home System"],
        land_size: "1,200 sqm",
        document_status: "Governor Consent",
        video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        lat: 6.44,
        lng: 3.34,
        agent_phone: "+234 (0) 123 456 7890",
        agent_whatsapp: "+234 (0) 123 456 7890",
        agent_email: "agent@primecrest.com",
    },
    {
        title: "3-Bedroom Terraced House",
        location: "Ikoyi, Lagos",
        price: 180000000,
        status: "available",
        description:
            "Modern terraced house in a secure gated community. Features contemporary design, spacious rooms, and proximity to key amenities. An ideal choice for professionals and families looking for convenience and security.",
        thumbnail: "/3-bedroom-terraced-house.jpg",
        images: ["/terraced-house-exterior.jpg", "/cozy-dining-nook.png", "/cozy-bedroom.png"],
        bedrooms: 3,
        bathrooms: 2,
        sqft: 3500,
        parking: 1,
        amenities: ["24/7 Security", "Spacious Living", "Modern Kitchen", "Gated Community"],
        land_size: "800 sqm",
        document_status: "C of O",
        lat: 6.43,
        lng: 3.33,
        agent_phone: "+234 (0) 123 456 7890",
        agent_whatsapp: "+234 (0) 123 456 7890",
        agent_email: "agent@primecrest.com",
    },
    {
        title: "Commercial Plot - Victoria Island",
        location: "VI, Lagos",
        price: 150000000,
        status: "sold",
        description:
            "Prime commercial property perfect for offices or retail. Located in the heart of Victoria Island's business district with excellent visibility and accessibility. Ideal for corporate headquarters or upscale retail outlets.",
        thumbnail: "/commercial-plot.jpg",
        images: ["/commercial-plot.jpg", "/business-district.jpg"],
        bedrooms: 0,
        bathrooms: 0,
        sqft: 8000,
        parking: 0,
        amenities: ["High Visibility", "Main Road Access", "Commercial Zoning"],
        land_size: "2,000 sqm",
        document_status: "Governor Consent",
        lat: 6.45,
        lng: 3.35,
        agent_phone: "+234 (0) 123 456 7890",
        agent_whatsapp: "+234 (0) 123 456 7890",
        agent_email: "agent@primecrest.com",
    },
    {
        title: "Luxury 5-Bedroom Penthouse",
        location: "Banana Island, Lagos",
        price: 450000000,
        status: "available",
        description:
            "Exclusive penthouse with stunning city views and premium amenities. This magnificent residence features floor-to-ceiling windows, designer interiors, and world-class facilities. The pinnacle of luxury living in Lagos.",
        thumbnail: "/luxury-penthouse.png",
        images: ["/penthouse-exterior.jpg", "/penthouse-view.jpg", "/master-suite.jpg"],
        bedrooms: 5,
        bathrooms: 4,
        sqft: 6500,
        parking: 3,
        amenities: ["Infinity Pool", "Private Gym", "Cinema Room", "Wine Cellar", "Rooftop Terrace", "24/7 Concierge"],
        land_size: "1,500 sqm",
        document_status: "Governor Consent",
        video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        lat: 6.42,
        lng: 3.32,
        agent_phone: "+234 (0) 123 456 7890",
        agent_whatsapp: "+234 (0) 123 456 7890",
        agent_email: "agent@primecrest.com",
    },
    {
        title: "2-Bedroom Apartment",
        location: "Surulere, Lagos",
        price: 75000000,
        status: "available",
        description:
            "Affordable and comfortable apartment in a vibrant neighborhood. Well-designed living spaces with modern finishes. Perfect for young professionals and small families seeking quality accommodation at a great value.",
        thumbnail: "/2-bedroom-apartment.jpg",
        images: ["/modern-apartment-exterior.png", "/cozy-apartment-living-room.png"],
        bedrooms: 2,
        bathrooms: 1,
        sqft: 1200,
        parking: 1,
        amenities: ["Good Neighbourhood", "Easy Access", "Shopping Centers Nearby"],
        land_size: "200 sqm",
        document_status: "C of O",
        lat: 6.48,
        lng: 3.31,
        agent_phone: "+234 (0) 123 456 7890",
        agent_whatsapp: "+234 (0) 123 456 7890",
        agent_email: "agent@primecrest.com",
    },
    {
        title: "Estate Plot - Ajah",
        location: "Ajah, Lagos",
        price: 85000000,
        status: "available",
        description:
            "Residential plot in a planned estate community. Excellent infrastructure, good drainage, and proximity to essential services. Build your dream home in this fast-developing area with great investment potential.",
        thumbnail: "/residential-plot-estate.jpg",
        images: ["/estate-community.jpg", "/green-space.jpg"],
        bedrooms: 0,
        bathrooms: 0,
        sqft: 5000,
        parking: 0,
        amenities: ["Gated Community", "Schools Nearby", "Hospital Access", "Good Road Network"],
        land_size: "600 sqm",
        document_status: "Governor Consent",
        lat: 6.39,
        lng: 3.4,
        agent_phone: "+234 (0) 123 456 7890",
        agent_whatsapp: "+234 (0) 123 456 7890",
        agent_email: "agent@primecrest.com",
    },
    {
        title: "Modern 3-Bedroom Bungalow",
        location: "Ikeja, Lagos",
        price: 120000000,
        status: "available",
        description:
            "Beautifully designed bungalow with contemporary architecture and finishes. Open floor plan, natural lighting, and well-manicured compound. Located in a quiet residential area with easy access to major highways.",
        thumbnail: "/luxury-property.png",
        images: ["/luxury-interior.png"],
        bedrooms: 3,
        bathrooms: 2,
        sqft: 2800,
        parking: 2,
        amenities: ["Generator", "Borehole", "Spacious Compound", "Modern Fittings"],
        land_size: "500 sqm",
        document_status: "C of O",
        lat: 6.6,
        lng: 3.35,
        agent_phone: "+234 (0) 123 456 7890",
        agent_whatsapp: "+234 (0) 123 456 7890",
        agent_email: "agent@primecrest.com",
    },
    {
        title: "Executive 6-Bedroom Mansion",
        location: "Parkview Estate, Ikoyi",
        price: 650000000,
        status: "available",
        description:
            "Majestic mansion in one of Lagos's most exclusive neighborhoods. Features include a grand entrance, luxurious finishes throughout, entertainment areas, and beautifully landscaped gardens. The epitome of prestige and sophistication.",
        thumbnail: "/luxury-property.png",
        images: ["/luxury-interior.png"],
        bedrooms: 6,
        bathrooms: 5,
        sqft: 9000,
        parking: 4,
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
        lat: 6.44,
        lng: 3.42,
        agent_phone: "+234 (0) 123 456 7890",
        agent_whatsapp: "+234 (0) 123 456 7890",
        agent_email: "agent@primecrest.com",
    },
]

async function seedSupabase() {
    console.log("🌱 Starting Supabase seeding...")

    try {
        // Clear existing properties (optional, but good for idempotent seeding)
        // const { error: deleteError } = await supabase.from("properties").delete().neq("id", "00000000-0000-0000-0000-000000000000")
        // if (deleteError) {
        //   console.error("Error clearing properties:", deleteError)
        // } else {
        //   console.log("🧹 Cleared existing properties")
        // }

        for (const property of properties) {
            console.log(`📝 Creating property: ${property.title} `)
            const { error } = await supabase.from("properties").insert(property)

            if (error) {
                console.error(`❌ Error creating property ${property.title}: `, error)
            } else {
                console.log(`✅ Created: ${property.title} `)
            }
        }

        console.log("\n🎉 Database seeding completed successfully!")
    } catch (error) {
        console.error("❌ Error seeding database:", error)
        process.exit(1)
    }
}

seedSupabase()
