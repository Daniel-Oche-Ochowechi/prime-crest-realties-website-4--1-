"use client"

import { useEffect, useState } from "react"
import { Shield, CheckCircle, AlertCircle, Loader } from "lucide-react"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import { createClient } from "@/lib/supabase/client"

interface DiagnosticCheck {
  name: string
  status: "checking" | "pass" | "fail" | "warning"
  message: string
}

export default function AdminDiagnosticsPage() {
  const [checks, setChecks] = useState<DiagnosticCheck[]>([
    { name: "Supabase URL", status: "checking", message: "Checking..." },
    { name: "Supabase Key", status: "checking", message: "Checking..." },
    { name: "Database Connection", status: "checking", message: "Checking..." },
    { name: "user_profiles Table", status: "checking", message: "Checking..." },
    { name: "Admin Users", status: "checking", message: "Checking..." },
    { name: "Properties Table", status: "checking", message: "Checking..." },
    { name: "Auth Session", status: "checking", message: "Checking..." },
  ])

  useEffect(() => {
    async function runDiagnostics() {
      const supabase = createClient()
      const newChecks = [...checks]

      // Check 1: Supabase URL
      if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
        newChecks[0] = {
          name: "Supabase URL",
          status: "pass",
          message: `Connected to: ${process.env.NEXT_PUBLIC_SUPABASE_URL?.split(".")[0]}...`,
        }
      } else {
        newChecks[0] = {
          name: "Supabase URL",
          status: "fail",
          message: "NEXT_PUBLIC_SUPABASE_URL not set. Add to your deployment environment variables.",
        }
      }

      // Check 2: Supabase Key
      if (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        newChecks[1] = {
          name: "Supabase Key",
          status: "pass",
          message: "Anonymous key configured",
        }
      } else {
        newChecks[1] = {
          name: "Supabase Key",
          status: "fail",
          message: "NEXT_PUBLIC_SUPABASE_ANON_KEY not set. Add to your deployment environment variables.",
        }
      }

      // Check 3: Database Connection
      try {
        const { data, error } = await supabase.from("user_profiles").select("id", { count: "exact", head: true })

        if (error) {
          newChecks[2] = {
            name: "Database Connection",
            status: "fail",
            message: `Connection failed: ${error.message}`,
          }
        } else {
          newChecks[2] = {
            name: "Database Connection",
            status: "pass",
            message: "Successfully connected to database",
          }
        }
      } catch (error) {
        newChecks[2] = {
          name: "Database Connection",
          status: "fail",
          message: "Failed to connect to database",
        }
      }

      // Check 4: user_profiles Table
      try {
        const { data, error } = await supabase.from("user_profiles").select("id").limit(1)

        if (error) {
          newChecks[3] = {
            name: "user_profiles Table",
            status: "fail",
            message: `Table check failed: ${error.message}`,
          }
        } else {
          newChecks[3] = {
            name: "user_profiles Table",
            status: "pass",
            message: "Table exists and is accessible",
          }
        }
      } catch (error) {
        newChecks[3] = {
          name: "user_profiles Table",
          status: "fail",
          message: "Failed to access user_profiles table",
        }
      }

      // Check 5: Admin Users
      try {
        const { data, error, count } = await supabase
          .from("user_profiles")
          .select("id, email", { count: "exact" })
          .eq("role", "admin")

        if (error) {
          newChecks[4] = {
            name: "Admin Users",
            status: "warning",
            message: `Query failed: ${error.message}`,
          }
        } else if (count === 0) {
          newChecks[4] = {
            name: "Admin Users",
            status: "fail",
            message: "No admin users found. Create one following the setup guide.",
          }
        } else {
          newChecks[4] = {
            name: "Admin Users",
            status: "pass",
            message: `Found ${count} admin user${count > 1 ? "s" : ""}`,
          }
        }
      } catch (error) {
        newChecks[4] = {
          name: "Admin Users",
          status: "warning",
          message: "Could not check admin users",
        }
      }

      // Check 6: Properties Table
      try {
        const { data, error, count } = await supabase.from("properties").select("id", { count: "exact", head: true })

        if (error) {
          newChecks[5] = {
            name: "Properties Table",
            status: "warning",
            message: `Table check failed: ${error.message}`,
          }
        } else {
          newChecks[5] = {
            name: "Properties Table",
            status: count === 0 ? "warning" : "pass",
            message:
              count === 0 ? "Table exists but is empty. Add properties in admin panel." : `Found ${count} properties`,
          }
        }
      } catch (error) {
        newChecks[5] = {
          name: "Properties Table",
          status: "fail",
          message: "Failed to access properties table",
        }
      }

      // Check 7: Auth Session
      try {
        const { data, error } = await supabase.auth.getSession()

        if (error) {
          newChecks[6] = {
            name: "Auth Session",
            status: "pass",
            message: "Not logged in (expected)",
          }
        } else if (data.session) {
          newChecks[6] = {
            name: "Auth Session",
            status: "pass",
            message: `Logged in as: ${data.session.user.email}`,
          }
        } else {
          newChecks[6] = {
            name: "Auth Session",
            status: "pass",
            message: "No active session",
          }
        }
      } catch (error) {
        newChecks[6] = {
          name: "Auth Session",
          status: "warning",
          message: "Could not check session",
        }
      }

      setChecks(newChecks)
    }

    runDiagnostics()
  }, [])

  const getIcon = (status: string) => {
    switch (status) {
      case "pass":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "fail":
        return <AlertCircle className="h-5 w-5 text-red-500" />
      case "warning":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />
      default:
        return <Loader className="h-5 w-5 text-blue-500 animate-spin" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pass":
        return "bg-green-50 border-green-200"
      case "fail":
        return "bg-red-50 border-red-200"
      case "warning":
        return "bg-yellow-50 border-yellow-200"
      default:
        return "bg-blue-50 border-blue-200"
    }
  }

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-16 min-h-screen bg-secondary">
        <div className="max-w-2xl mx-auto px-6">
          <div className="bg-white rounded-lg shadow-lg p-12">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-primary/10 p-4 rounded-lg">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-primary">System Diagnostics</h1>
                <p className="text-neutral-gray">Check your PrimeCrest Realties setup</p>
              </div>
            </div>

            {/* Diagnostics */}
            <div className="space-y-4 mb-8">
              {checks.map((check, index) => (
                <div
                  key={index}
                  className={`border rounded-lg p-4 ${getStatusColor(check.status)} flex items-start gap-4`}
                >
                  <div className="flex-shrink-0 mt-0.5">{getIcon(check.status)}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-primary">{check.name}</h3>
                    <p className="text-sm text-neutral-gray mt-1">{check.message}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Recommendations */}
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 mb-8">
              <h2 className="font-bold text-primary mb-4">Next Steps</h2>
              <ol className="space-y-3 text-sm text-neutral-gray">
                <li>
                  <span className="font-semibold text-primary">1. Verify Environment Variables:</span> Ensure
                  NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set in your deployment platform.
                </li>
                <li>
                  <span className="font-semibold text-primary">2. Create Admin User:</span> If no admin users exist, go
                  to the setup guide to create one.
                </li>
                <li>
                  <span className="font-semibold text-primary">3. Add Properties:</span> Use the admin dashboard to add
                  properties after logging in.
                </li>
              </ol>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center">
              <a
                href="/admin-setup"
                className="px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors"
              >
                Setup Guide
              </a>
              <a
                href="/admin/login"
                className="px-8 py-3 bg-accent text-primary font-semibold rounded-lg hover:bg-accent/90 transition-colors"
              >
                Admin Login
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
