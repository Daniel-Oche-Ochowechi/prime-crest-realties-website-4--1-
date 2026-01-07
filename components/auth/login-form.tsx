"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"

export default function LoginForm() {
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

      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      })

      if (error) {
        console.error("[v0] Login error:", error.message)
        toast({
          title: "Login Failed",
          description: error.message || "Please check your credentials",
          variant: "destructive",
        })
        return
      }

      if (data.user) {
        toast({
          title: "Success",
          description: "Logged in successfully!",
        })

        // Redirect based on user role
        const redirectUrl = formData.email.includes("admin") ? "/admin" : "/dashboard"
        router.push(redirectUrl)
        router.refresh()
      }
    } catch (error) {
      console.error("[v0] Unexpected error:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-primary mb-2 uppercase tracking-wider">Email</label>
        <input
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full py-3 px-4 bg-secondary border-b-2 border-neutral-medium text-primary placeholder-neutral-gray focus:outline-none focus:border-primary transition-colors"
          placeholder="your@email.com"
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

      <button type="submit" disabled={isLoading} className="btn-primary w-full py-4 mt-8 disabled:opacity-50">
        {isLoading ? "Signing in..." : "Sign In"}
      </button>
    </form>
  )
}
