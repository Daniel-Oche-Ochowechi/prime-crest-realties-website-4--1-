"use client"

import type React from "react"
import { toast } from "sonner"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  LayoutDashboard,
  Building2,
  MessageSquare,
  Calendar,
  Users,
  Settings,
  Menu,
  X,
  Home,
  LogOut,
} from "lucide-react"
import { cn } from "@/lib/utils"
import AdminNotificationBell from "@/components/admin/admin-notification-bell"
import { createClient } from "@/lib/supabase/client"

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Properties", href: "/admin/properties", icon: Building2 },
  { name: "Messages", href: "/admin/messages", icon: MessageSquare },
  { name: "Bookings", href: "/admin/bookings", icon: Calendar },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Settings", href: "/admin/settings", icon: Settings },
]

import { useIsMobile } from "@/hooks/use-mobile"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const isMobile = useIsMobile()

  const handleLogout = async () => {
    const supabase = createClient()
    try {
      const { error } = await supabase.auth.signOut()
      if (error) {
        console.error("[v0] Logout error:", error)
        toast.error("Failed to logout. Please try again.")
        return
      }
      toast.success("Logged out successfully")
      window.location.href = "/admin/login"
    } catch (error) {
      console.error("[v0] Unexpected logout error:", error)
      toast.error("An unexpected error occurred during logout")
    }
  }

  return (
    <div className="min-h-screen bg-muted/20">
      {/* Mobile sidebar backdrop */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-primary/80 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          x: isMobile ? (sidebarOpen ? 0 : -320) : 0,
        }}
        className="fixed left-0 top-0 z-50 h-screen w-80 bg-primary text-secondary border-r border-border lg:translate-x-0 lg:z-30"
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-20 items-center justify-between px-6 border-b border-border">
            <Link href="/" className="flex items-center gap-3">
              <motion.div whileHover={{ scale: 1.05 }} className="text-2xl font-bold tracking-[0.2em] text-accent">
                PRIMECREST
              </motion.div>
            </Link>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
              <X className="h-6 w-6 text-secondary" />
            </button>
          </div>

          {/* Admin Badge */}
          <div className="px-6 py-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                <Users className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-sm font-semibold text-secondary">Admin Panel</p>
                <p className="text-xs text-muted-foreground">Manage your properties</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/admin" && pathname?.startsWith(item.href))
              return (
                <Link key={item.name} href={item.href} onClick={() => setSidebarOpen(false)}>
                  <motion.div
                    whileHover={{ x: 4 }}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors relative",
                      isActive
                        ? "bg-accent text-primary font-semibold"
                        : "text-secondary/70 hover:text-secondary hover:bg-secondary/5",
                    )}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-accent rounded-lg"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    <item.icon className="w-5 h-5 relative z-10" />
                    <span className="relative z-10">{item.name}</span>
                  </motion.div>
                </Link>
              )
            })}
          </nav>

          {/* Back to Site and Logout */}
          <div className="p-4 border-t border-border space-y-2">
            <Link href="/">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-3 px-4 py-3 rounded-lg bg-secondary/5 text-secondary hover:bg-secondary/10 transition-colors"
              >
                <Home className="w-5 h-5" />
                <span>Back to Site</span>
              </motion.div>
            </Link>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </motion.aside>

      {/* Main content */}
      <div className="lg:pl-80">
        {/* Top bar */}
        <header className="sticky top-0 z-20 flex h-20 items-center gap-4 border-b border-border bg-background px-6">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden">
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold tracking-tight">
              {navigation.find((item) => pathname === item.href || pathname?.startsWith(item.href))?.name || "Admin"}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <AdminNotificationBell />
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
