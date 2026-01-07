import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("[v0] Missing Supabase environment variables")
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function seedFeaturedProperties() {
  try {
    console.log("[v0] Fetching properties to feature...")

    // Get the 6 most recent available properties
    const { data: properties, error: fetchError } = await supabase
      .from("properties")
      .select("id, title, status")
      .eq("status", "available")
      .order("created_at", { ascending: false })
      .limit(6)

    if (fetchError) {
      console.error("[v0] Error fetching properties:", fetchError)
      process.exit(1)
    }

    if (!properties || properties.length === 0) {
      console.warn("[v0] No available properties found to feature")
      process.exit(1)
    }

    console.log(`[v0] Found ${properties.length} properties to feature`)

    // Clear existing featured properties
    const { error: deleteError } = await supabase
      .from("featured_properties")
      .delete()
      .gte("id", "00000000-0000-0000-0000-000000000000")

    if (deleteError) {
      console.error("[v0] Error clearing featured properties:", deleteError)
      process.exit(1)
    }

    console.log("[v0] Cleared existing featured properties")

    // Insert new featured properties with priority
    const featuredData = properties.map((prop, index) => ({
      property_id: prop.id,
      priority: properties.length - index,
      created_by: null,
      featured_until: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(), // 90 days from now
      created_at: new Date().toISOString(),
    }))

    const { error: insertError } = await supabase.from("featured_properties").insert(featuredData)

    if (insertError) {
      console.error("[v0] Error seeding featured properties:", insertError)
      process.exit(1)
    }

    console.log("[v0] Successfully seeded featured properties:")
    properties.forEach((prop, index) => {
      console.log(`  ${index + 1}. ${prop.title} (Priority: ${properties.length - index})`)
    })

    process.exit(0)
  } catch (error) {
    console.error("[v0] Unexpected error:", error)
    process.exit(1)
  }
}

seedFeaturedProperties()
