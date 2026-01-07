"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

export default function AboutPreviewSection() {
  return (
    <section className="py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold text-primary mb-6 tracking-wider">Our Mission</h2>
            <p className="text-neutral-gray leading-relaxed mb-6">
              With over 15 years of experience in Nigeria's real estate market, PrimeCrest Realties has established
              itself as a trusted partner for property investors and homeowners seeking premium residential and
              commercial spaces.
            </p>
            <p className="text-neutral-gray leading-relaxed mb-8">
              We specialize in verified properties, fast documentation, and expert guidance to ensure every transaction
              is secure and transparent.
            </p>
            <Link href="/about" className="btn-primary px-8 py-4 font-semibold uppercase">
              Read Our Story
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative h-96 rounded-lg overflow-hidden"
          >
            <Image src="/luxury-modern-office-interior.jpg" alt="PrimeCrest Office" fill className="object-cover" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
