
import { createClient } from "@/lib/supabase/server"
import AdminPropertiesClient from "./properties-client"

export default async function AdminPropertiesPage() {
  const supabase = await createClient()

  const { data: properties } = await supabase
    .from("properties")
    .select("*")
    .order("created_at", { ascending: false })

  return <AdminPropertiesClient initialProperties={properties || []} />
}
