"use client"

import { useState, useEffect, useContext, createContext, type ReactNode } from "react"
import { createClient } from "@/lib/supabase/client"
import type { User } from "@supabase/supabase-js"

interface UserRole {
  id: string
  email: string
  full_name: string
  role: "user" | "agent" | "admin"
  status: "active" | "inactive"
}

interface AuthContextType {
  user: User | null
  userRole: UserRole | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, name: string) => Promise<void>
  signOut: () => Promise<void>
  isAdmin: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [userRole, setUserRole] = useState<UserRole | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()

    const getUser = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()
        setUser(user || null)

        if (user) {
          const { data } = await supabase.from("user_profiles").select("*").eq("id", user.id).single()
          setUserRole(data)
        }
      } catch (error) {
        console.error("[v0] Auth error:", error)
      } finally {
        setLoading(false)
      }
    }

    getUser()

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user || null)
      if (session?.user) {
        const { data } = await supabase.from("user_profiles").select("*").eq("id", session.user.id).single()
        setUserRole(data)
      } else {
        setUserRole(null)
      }
    })

    return () => {
      authListener?.subscription.unsubscribe()
    }
  }, [])

  const signIn = async (email: string, password: string) => {
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
  }

  const signUp = async (email: string, password: string, name: string) => {
    const supabase = createClient()
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/dashboard`,
      },
    })
    if (error) throw error

    if (data.user) {
      await supabase.from("user_profiles").insert([
        {
          id: data.user.id,
          email,
          full_name: name,
          role: "user",
          status: "active",
          created_at: new Date().toISOString(),
        },
      ])
    }
  }

  const signOut = async () => {
    const supabase = createClient()
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    setUser(null)
    setUserRole(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        userRole,
        loading,
        signIn,
        signUp,
        signOut,
        isAdmin: userRole?.role === "admin",
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
