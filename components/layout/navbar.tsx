"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Menu, X, LogOut } from "lucide-react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { useAuth } from "@/lib/hooks/use-auth"
import { toast } from "sonner"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const { scrollY } = useScroll()
  const router = useRouter()
  const { user, userRole, signOut } = useAuth()

  const backgroundColor = useTransform(scrollY, [0, 80], ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.95)"])
  const backdropBlur = useTransform(scrollY, [0, 80], ["blur(0px)", "blur(20px)"])
  const borderBottom = useTransform(scrollY, [0, 100], ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.05)"])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      await signOut()
      setShowUserMenu(false)
      setIsOpen(false)
      toast.success("Logged out successfully")
      router.push("/")
    } catch (error) {
      console.error("[v0] Logout error:", error)
      toast.error("Failed to logout. Please try again.")
    } finally {
      setIsLoggingOut(false)
    }
  }

  const getUserInitials = () => {
    if (!userRole?.full_name) return "U"
    return userRole.full_name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const menuItems = [
    { href: "/properties", label: "Properties" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <motion.nav
      style={{ backgroundColor, backdropFilter: backdropBlur, borderBottom }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-700",
        scrolled ? "py-3 shadow-[0_4px_30px_rgba(0,0,0,0.03)]" : "py-6",
      )}
    >
      <div className="max-w-[1440px] mx-auto px-8 lg:px-16 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-2"
        >
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative h-8 w-8 flex-shrink-0">
              <Image
                src="/logo-white.png"
                alt="Logo"
                fill
                className={cn(
                  "object-contain transition-all duration-700",
                  scrolled ? "opacity-0 scale-90" : "opacity-100 scale-100",
                )}
                priority
              />
              <Image
                src="/logo-black.png"
                alt="Logo"
                fill
                className={cn(
                  "object-contain transition-all duration-700",
                  scrolled ? "opacity-100 scale-100" : "opacity-0 scale-90",
                )}
                priority
              />
            </div>
            <span
              className={cn(
                "text-[0.75rem] uppercase tracking-[0.2em] font-bold transition-all duration-700 whitespace-nowrap",
                scrolled ? "text-neutral-900" : "text-white",
              )}
            >
              PrimeCrest Realties
            </span>
          </Link>
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-14">
          {menuItems.map((item, index) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                href={item.href}
                className={cn(
                  "text-[0.75rem] uppercase tracking-[0.3em] font-medium transition-all duration-500 relative group",
                  scrolled ? "text-neutral-900" : "text-white",
                )}
              >
                {item.label}
                <span
                  className={cn(
                    "absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-[1.5px] transition-all duration-500 group-hover:w-full",
                    scrolled ? "bg-black" : "bg-white",
                  )}
                />
              </Link>
            </motion.div>
          ))}

          {user && userRole ? (
            <div className="relative">
              <motion.button
                onClick={() => setShowUserMenu(!showUserMenu)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="group relative"
              >
                <Avatar
                  className={cn(
                    "h-10 w-10 border-2 transition-all duration-300",
                    scrolled ? "border-neutral-900" : "border-white",
                    showUserMenu && "ring-2 ring-offset-2 ring-offset-white",
                  )}
                >
                  <AvatarFallback
                    className={cn(
                      "font-semibold text-sm",
                      scrolled ? "bg-neutral-900 text-white" : "bg-white/20 text-white",
                    )}
                  >
                    {getUserInitials()}
                  </AvatarFallback>
                </Avatar>
                <span
                  className={cn(
                    "absolute right-0 top-full mt-1 text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity px-2 py-1 rounded bg-neutral-900 text-white",
                    scrolled ? "" : "hidden",
                  )}
                >
                  {userRole.full_name}
                </span>
              </motion.button>

              <AnimatePresence>
                {showUserMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg overflow-hidden z-[100]"
                  >
                    <div className="px-4 py-3 border-b border-neutral-200">
                      <p className="text-sm font-semibold">{userRole.full_name}</p>
                      <p className="text-xs text-neutral-600">{userRole.email}</p>
                      <p className="text-xs text-neutral-500 capitalize mt-1">
                        {userRole.role === "admin" ? "Administrator" : "User"}
                      </p>
                    </div>
                    <Link
                      href={userRole.role === "admin" ? "/admin" : "/dashboard"}
                      onClick={() => setShowUserMenu(false)}
                      className="block px-4 py-3 hover:bg-neutral-100 transition-colors text-sm"
                    >
                      {userRole.role === "admin" ? "Admin Dashboard" : "My Dashboard"}
                    </Link>
                    <button
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                      className="w-full text-left px-4 py-3 hover:bg-red-50 transition-colors text-sm text-red-600 flex items-center gap-2 border-t border-neutral-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <LogOut size={16} />
                      {isLoggingOut ? "Logging out..." : "Logout"}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link
                href="/admin/login"
                className={cn(
                  "px-10 py-3 text-[0.7rem] uppercase tracking-[0.3em] font-bold transition-all duration-700 relative overflow-hidden group",
                  scrolled
                    ? "bg-black text-white hover:bg-neutral-800"
                    : "bg-white/10 backdrop-blur-sm text-white border border-white/30 hover:bg-white hover:text-black",
                )}
              >
                <span className="relative z-10">Admin</span>
              </Link>
            </motion.div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className={cn("md:hidden transition-colors duration-300", scrolled ? "text-black" : "text-white")}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden fixed inset-0 top-0 bg-white z-[60] flex flex-col p-8 pt-24"
          >
            <button onClick={() => setIsOpen(false)} className="absolute top-8 right-8 text-black">
              <X size={32} strokeWidth={1.5} />
            </button>
            <div className="flex flex-col gap-10">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-3xl font-light tracking-tight text-neutral-900 hover:text-neutral-400 transition-colors"
                >
                  {item.label}
                </Link>
              ))}

              {user && userRole ? (
                <div className="mt-8 pt-8 border-t border-neutral-200 space-y-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12 border-2 border-neutral-900">
                      <AvatarFallback className="bg-neutral-900 text-white font-semibold text-sm">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-semibold text-neutral-900">{userRole.full_name}</p>
                      <p className="text-xs text-neutral-600">{userRole.email}</p>
                    </div>
                  </div>
                  <Link
                    href={userRole.role === "admin" ? "/admin" : "/dashboard"}
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-3 bg-neutral-900 text-white text-center text-sm"
                  >
                    {userRole.role === "admin" ? "Admin Dashboard" : "My Dashboard"}
                  </Link>
                  <button
                    onClick={() => {
                      setIsOpen(false)
                      handleLogout()
                    }}
                    disabled={isLoggingOut}
                    className="w-full px-4 py-3 bg-red-600 text-white text-center text-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <LogOut size={16} />
                    {isLoggingOut ? "Logging out..." : "Logout"}
                  </button>
                </div>
              ) : (
                <Link
                  href="/admin/login"
                  onClick={() => setIsOpen(false)}
                  className="mt-4 px-8 py-4 bg-black text-white text-[0.7rem] uppercase tracking-[0.3em] font-bold text-center"
                >
                  Admin
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
