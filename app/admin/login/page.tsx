"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"
import { Shield } from "lucide-react"

export default function AdminLoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const supabase = createClient()

      if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        toast({
          title: "Configuration Error",
          description: "Supabase is not properly configured. Contact your administrator.",
          variant: "destructive",
        })
        setIsLoading(false)
        return
      }

      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      })

      if (authError) {
        toast({
          title: "Login Failed",
          description:
            authError.message === "Invalid login credentials"
              ? "Email or password is incorrect. Please check your credentials and ensure your admin account has been created."
              : authError.message || "Please check your credentials",
          variant: "destructive",
        })
        setIsLoading(false)
        return
      }

      if (!authData.user) {
        toast({
          title: "Login Failed",
          description: "No user data returned. Please try again.",
          variant: "destructive",
        })
        setIsLoading(false)
        return
      }

      const { data: userData, error: userError } = await supabase
        .from("user_profiles")
        .select("role, id")
        .eq("id", authData.user.id)
        .single()

      if (userError) {
        if (userError.code === "PGRST116") {
          await supabase.auth.signOut()
          toast({
            title: "Access Denied",
            description:
              "Your admin profile is not set up. Please ensure your user_profiles record exists with role='admin'.",
            variant: "destructive",
          })
        } else {
          toast({
            title: "Error",
            description: "Unable to verify admin status. Please try again.",
            variant: "destructive",
          })
        }
        setIsLoading(false)
        return
      }

      if (!userData || userData.role !== "admin") {
        await supabase.auth.signOut()
        toast({
          title: "Access Denied",
          description: "Only admin users can access this page. Your account must have admin privileges.",
          variant: "destructive",
        })
        setIsLoading(false)
        return
      }

      toast({
        title: "Success",
        description: "Admin login successful!",
      })

      await new Promise((resolve) => setTimeout(resolve, 300))
      router.push("/admin")
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-secondary rounded-lg shadow-2xl p-8 md:p-12">
          {/* Logo/Header */}
          <div className="flex items-center justify-center mb-8">
            <div className="bg-accent/20 p-3 rounded-lg mr-3">
              <Shield className="h-8 w-8 text-accent" />
            </div>
            <h1 className="text-2xl font-bold text-primary tracking-wider">Admin Portal</h1>
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-primary mb-2 tracking-wider">Sign In</h2>
            <p className="text-neutral-gray">Access the PrimeCrest Realties admin dashboard</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-primary mb-2 uppercase tracking-wider">
                Email Address
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full py-3 px-4 bg-secondary border-b-2 border-neutral-medium text-primary placeholder-neutral-gray focus:outline-none focus:border-primary transition-colors"
                placeholder="admin@example.com"
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-primary mb-2 uppercase tracking-wider">Password</label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full py-3 px-4 bg-secondary border-b-2 border-neutral-medium text-primary placeholder-neutral-gray focus:outline-none focus:border-primary transition-colors"
                placeholder="••••••••"
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full py-4 mt-8 disabled:opacity-50 font-semibold"
            >
              {isLoading ? "Signing in..." : "Sign In to Admin Dashboard"}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-neutral-light text-center">
            <p className="text-neutral-gray text-sm">
              Not an admin?{" "}
              <Link href="/login" className="text-primary font-semibold hover:underline">
                User Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
