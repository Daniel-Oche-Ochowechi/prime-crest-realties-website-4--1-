"use client"

import Link from "next/link"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function SignupPage() {
  const router = useRouter()

  useEffect(() => {
    router.replace("/admin-setup")
  }, [router])

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-16 min-h-screen bg-secondary">
        <div className="max-w-md mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-primary mb-2 tracking-wider">Create Account</h1>
            <p className="text-neutral-gray">Join PrimeCrest Realties today</p>
          </div>

          {/* SignupForm is removed as per the update */}

          <div className="text-center mt-8">
            <p className="text-neutral-gray mb-4">
              Already have an account?{" "}
              <Link href="/login" className="text-primary font-semibold hover:underline">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
