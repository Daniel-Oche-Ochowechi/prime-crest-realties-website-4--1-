"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import Image from "next/image"

export default function HeroSection() {
  const scrollToNext = () => {
    const element = document.getElementById("featured-section")
    element?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-[1] bg-luxury-shimmer pointer-events-none opacity-20" />

      <div className="absolute inset-0 z-0">
        <Image
          src="/images/analog-landscape-city-with-buildings.jpg"
          alt="Modern Luxury Architecture"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-[0.8rem] uppercase tracking-[0.3em] font-light mb-8 block opacity-90">
            Exclusive Luxury Living
          </span>
          <h1 className="text-5xl md:text-8xl font-light mb-10 leading-[1.05] tracking-tight">
            Elevate Your <span className="block italic serif text-6xl md:text-9xl mt-2">Lifestyle</span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg md:text-xl font-light opacity-90 mb-14 leading-relaxed tracking-wide">
            Discover a curated collection of Africa's most prestigious architectural masterpieces.
          </p>

          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
            <Link
              href="/properties"
              className="min-w-[240px] px-12 py-5 bg-white text-black text-[0.8rem] uppercase tracking-[0.25em] font-bold transition-all duration-500 hover:bg-transparent hover:text-white border border-white"
            >
              View Estates
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-10 py-4 text-[0.75rem] uppercase tracking-[0.15em] font-medium transition-all duration-500 border border-white/30 text-white hover:bg-white/10"
            >
              Private Inquiry
            </Link>
          </div>
        </motion.div>
      </div>

      <motion.button
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        onClick={scrollToNext}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 text-white opacity-50 hover:opacity-100 transition-opacity"
      >
        <ChevronDown size={40} strokeWidth={1} />
      </motion.button>
    </section>
  )
}
