"use client"

import { useAdminNotifications } from "@/lib/hooks/use-admin-notifications"
import { Bell } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { motion } from "framer-motion"

export default function AdminNotificationBell() {
  const { notifications } = useAdminNotifications()

  if (notifications.totalUnread === 0) {
    return (
      <Link href="/admin/messages">
        <Bell className="h-5 w-5 cursor-pointer hover:text-accent transition-colors" />
      </Link>
    )
  }

  return (
    <Link href="/admin/messages" className="relative">
      <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}>
        <Bell className="h-5 w-5 cursor-pointer hover:text-accent transition-colors" />
      </motion.div>
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-2 -right-2">
        <Badge className="bg-red-500 text-white">{notifications.totalUnread}</Badge>
      </motion.div>
    </Link>
  )
}
