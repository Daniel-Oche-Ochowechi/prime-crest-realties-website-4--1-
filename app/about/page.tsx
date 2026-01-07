import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import AboutHero from "@/components/about/about-hero"
import AboutMission from "@/components/about/about-mission"
import AboutStats from "@/components/about/about-stats"
import AboutValues from "@/components/about/about-values"

export const metadata = {
  title: "About Us | PrimeCrest Realties",
  description: "Learn about PrimeCrest Realties and our commitment to premium real estate solutions.",
}

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <AboutHero />
        <AboutMission />
        <AboutStats />
        <AboutValues />
      </main>
      <Footer />
    </>
  )
}
