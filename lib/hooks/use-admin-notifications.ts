"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"

interface NotificationData {
  unreadUserMessages: number
  unreadPropertyMessages: number
  totalUnread: number
}

export function useAdminNotifications() {
  const [notifications, setNotifications] = useState<NotificationData>({
    unreadUserMessages: 0,
    unreadPropertyMessages: 0,
    totalUnread: 0,
  })
  const [isListening, setIsListening] = useState(false)

  useEffect(() => {
    const fetchNotifications = async () => {
      const supabase = createClient()

      try {
        // Fetch unread user admin messages
        const { data: userMsgs } = await supabase.from("user_admin_messages").select("id").eq("is_read", false)

        // Fetch unread property messages
        const { data: propMsgs } = await supabase.from("messages").select("id").eq("status", "unread")

        const unreadUser = userMsgs?.length || 0
        const unreadProp = propMsgs?.length || 0

        setNotifications({
          unreadUserMessages: unreadUser,
          unreadPropertyMessages: unreadProp,
          totalUnread: unreadUser + unreadProp,
        })
      } catch (error) {
        console.error("[v0] Error fetching notifications:", error)
      }
    }

    fetchNotifications()

    // Poll for changes every 5 seconds
    const interval = setInterval(fetchNotifications, 5000)
    setIsListening(true)

    return () => {
      clearInterval(interval)
      setIsListening(false)
    }
  }, [])

  return { notifications, isListening }
}
