import { createClient } from "@/lib/supabase/server"
import AdminDashboardClient from "./dashboard-client"

export default async function AdminDashboardPage() {
  const supabase = await createClient()

  // Fetch stats parallel
  const [propertiesRes, messagesRes, bookingsRes, usersRes] = await Promise.all([
    supabase.from("properties").select("id", { count: "exact", head: true }),
    supabase.from("messages").select("id", { count: "exact", head: true }),
    supabase.from("inspection_bookings").select("id", { count: "exact", head: true }),
    supabase.from("user_profiles").select("id", { count: "exact", head: true }),
  ])

  const stats = {
    properties: propertiesRes.count || 0,
    messages: messagesRes.count || 0,
    bookings: bookingsRes.count || 0,
    users: usersRes.count || 0,
  }

  // Fetch recent properties
  const { data: recentProps } = await supabase
    .from("properties")
    .select("title, created_at, status")
    .order("created_at", { ascending: false })
    .limit(4)

  const formatRelativeTime = (dateStr: string) => {
    const date = new Date(dateStr)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`
  }

  const recentActivity = (recentProps || []).map((prop) => ({
    type: "property",
    message: `${prop.status === "sold" ? "Property sold" : "New property listed"}: ${prop.title}`,
    time: formatRelativeTime(prop.created_at),
  }))

  return <AdminDashboardClient stats={stats} recentActivity={recentActivity} />
}

