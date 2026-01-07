
import { createClient } from "@/lib/supabase/server"
import AdminMessagesClient, { AdminMessage, PropertyMessage } from "./messages-client"

export default async function AdminMessagesPage() {
  const supabase = await createClient()

  // Fetch property inquiry messages
  const { data: propData } = await supabase
    .from("messages")
    .select("*")
    .order("created_at", { ascending: false })

  // Fetch user-admin messages with user info
  const { data: userMsgData } = await supabase
    .from("user_admin_messages")
    .select(`
      id,
      user_id,
      subject,
      message,
      is_read,
      is_replied,
      created_at,
      users:user_id (
        email,
        full_name
      )
    `)
    .order("created_at", { ascending: false })

  const formattedUserMessages: AdminMessage[] = (userMsgData || []).map((msg: any) => ({
    id: msg.id,
    user_id: msg.user_id,
    user_email: msg.users?.email || "Unknown",
    user_name: msg.users?.full_name || "Unknown User",
    subject: msg.subject,
    message: msg.message,
    is_read: msg.is_read,
    is_replied: msg.is_replied,
    created_at: msg.created_at,
  }))

  return (
    <AdminMessagesClient
      initialPropertyMessages={(propData as any[]) || []}
      initialUserMessages={formattedUserMessages}
    />
  )
}
