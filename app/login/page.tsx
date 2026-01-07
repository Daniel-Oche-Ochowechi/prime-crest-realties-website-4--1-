"use client"

import Link from "next/link"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()

  useEffect(() => {
    router.replace("/admin/login")
  }, [router])

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-16 min-h-screen bg-secondary">
        <div className="max-w-md mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-primary mb-2 tracking-wider">Sign In</h1>
            <p className="text-neutral-gray">Welcome back to PrimeCrest Realties</p>
          </div>

          {/* <LoginForm /> */}

          <div className="text-center mt-8">
            <p className="text-neutral-gray mb-4">
              Don't have an account?{" "}
              <Link href="/signup" className="text-primary font-semibold hover:underline">
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
