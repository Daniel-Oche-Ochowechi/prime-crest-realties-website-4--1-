import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import HeroSection from "@/components/home/hero-section"
import FeaturedPropertiesSection from "@/components/home/featured-properties-section"
import WhyChooseUsSection from "@/components/home/why-choose-us-section"
import AboutPreviewSection from "@/components/home/about-preview-section"

export const metadata = {
  title: "PrimeCrest Realties | Premium Real Estate Solutions",
  description:
    "Discover premium residential and commercial properties in Nigeria with verified titles and expert guidance.",
}

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="bg-white">
        <HeroSection />
        <FeaturedPropertiesSection />
        <div className="relative overflow-hidden">
          {/* Subtle animated bg for transitions */}
          <div className="absolute inset-0 bg-luxury-shimmer opacity-[0.03] pointer-events-none" />
          <WhyChooseUsSection />
          <AboutPreviewSection />
        </div>
      </main>
      <Footer />
    </>
  )
}
