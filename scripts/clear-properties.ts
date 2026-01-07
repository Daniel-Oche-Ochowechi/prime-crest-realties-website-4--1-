import { ConvexHttpClient } from "convex/browser"
import { api } from "../convex/_generated/api"

const CONVEX_URL = process.env.NEXT_PUBLIC_CONVEX_URL || ""

if (!CONVEX_URL) {
  throw new Error("NEXT_PUBLIC_CONVEX_URL environment variable is required")
}

const client = new ConvexHttpClient(CONVEX_URL)

async function clearDatabase() {
  console.log("🧹 Starting database cleanup...")

  try {
    const properties = await client.query(api.properties.getProperties, {})

    if (properties.length === 0) {
      console.log("ℹ️  No properties to delete")
      return
    }

    console.log(`📊 Found ${properties.length} properties to delete`)

    for (const property of properties) {
      console.log(`🗑️  Deleting: ${property.title}`)
      await client.mutation(api.properties.deleteProperty, { id: property._id })
      console.log(`✅ Deleted: ${property.title}`)
    }

    console.log("\n🎉 Database cleanup completed successfully!")
  } catch (error) {
    console.error("❌ Error clearing database:", error)
    throw error
  }
}

clearDatabase()
  .then(() => {
    console.log("\n✨ Cleanup script finished")
    process.exit(0)
  })
  .catch((error) => {
    console.error("\n💥 Cleanup script failed:", error)
    process.exit(1)
  })
