"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"

export default function SignupForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match!",
        variant: "destructive",
      })
      return
    }

    if (formData.password.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const supabase = createClient()

      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/dashboard`,
        },
      })

      if (authError) {
        console.error("[v0] Signup error:", authError.message)
        toast({
          title: "Signup Failed",
          description: authError.message || "Failed to create account",
          variant: "destructive",
        })
        return
      }

      if (authData.user) {
        const { error: profileError } = await supabase.from("user_profiles").insert([
          {
            id: authData.user.id,
            email: formData.email,
            full_name: formData.name,
            role: "user",
            status: "active",
            created_at: new Date().toISOString(),
          },
        ])

        if (profileError) {
          console.error("[v0] Profile creation error:", profileError)
        }

        toast({
          title: "Success",
          description: "Account created! Check your email to verify.",
        })

        router.push("/login")
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
        <label className="block text-sm font-semibold text-primary mb-2 uppercase tracking-wider">Full Name</label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full py-3 px-4 bg-secondary border-b-2 border-neutral-medium text-primary placeholder-neutral-gray focus:outline-none focus:border-primary transition-colors"
          placeholder="John Doe"
          disabled={isLoading}
        />
      </div>

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

      <div>
        <label className="block text-sm font-semibold text-primary mb-2 uppercase tracking-wider">
          Confirm Password
        </label>
        <input
          type="password"
          required
          value={formData.confirmPassword}
          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          className="w-full py-3 px-4 bg-secondary border-b-2 border-neutral-medium text-primary placeholder-neutral-gray focus:outline-none focus:border-primary transition-colors"
          placeholder="••••••••"
          disabled={isLoading}
        />
      </div>

      <button type="submit" disabled={isLoading} className="btn-primary w-full py-4 mt-8 disabled:opacity-50">
        {isLoading ? "Creating Account..." : "Create Account"}
      </button>
    </form>
  )
}
