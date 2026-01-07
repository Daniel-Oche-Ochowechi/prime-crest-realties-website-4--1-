import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import PropertiesPageContent from "@/components/properties/properties-page-content"
import { createClient } from "@/lib/supabase/server"

export const dynamic = "force-dynamic"

export default async function PropertiesPage() {
  const supabase = await createClient()

  // Fetch initial properties (SSR)
  // Default ordering matching the client default (latest)
  const { data: initialProperties } = await supabase
    .from("properties")
    .select("*")
    .order("created_at", { ascending: false })

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24">
        <PropertiesPageContent initialProperties={initialProperties || []} />
      </main>
      <Footer />
    </>
  )
}
