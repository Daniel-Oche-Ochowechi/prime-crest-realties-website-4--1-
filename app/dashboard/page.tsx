"use client"

import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import UserDashboardContent from "@/components/dashboard/user-dashboard-content"

export default function DashboardPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16 min-h-screen bg-neutral-light">
        <UserDashboardContent />
      </main>
      <Footer />
    </>
  )
}
