"use client"

import { motion } from "framer-motion"
import { CheckCircle, Shield, Zap, Users } from "lucide-react"

const features = [
  {
    icon: CheckCircle,
    title: "Verified Land Titles",
    description: "All properties come with verified and secure land titles",
  },
  {
    icon: Zap,
    title: "Fast Processing",
    description: "Seamless inspection & documentation process",
  },
  {
    icon: Shield,
    title: "Premium Listings",
    description: "Curated selection of the finest properties",
  },
  {
    icon: Users,
    title: "Expert Agents",
    description: "Experienced professionals at your service",
  },
]

export default function WhyChooseUsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <section className="py-40 bg-white text-primary border-y border-neutral-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-32 gap-12">
          <div className="max-w-3xl text-left">
            <span className="text-[0.8rem] uppercase tracking-[0.3em] font-medium text-black/40 mb-6 block">
              Our Distinction
            </span>
            <h2 className="text-5xl md:text-7xl font-extralight tracking-tight leading-none">
              The PrimeCrest <span className="italic serif">Standard</span>
            </h2>
            <p className="mt-8 text-neutral-500 text-xl leading-relaxed max-w-2xl font-light">
              We define luxury not by price, but by the meticulous attention to detail and uncompromising quality in
              every property.
            </p>
          </div>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div key={index} variants={itemVariants} className="text-left group">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-[1px] bg-accent transition-all group-hover:w-16" />
                  <Icon size={24} strokeWidth={1.5} className="text-accent" />
                </div>
                <h3 className="text-sm font-bold mb-4 tracking-[0.2em] uppercase">{feature.title}</h3>
                <p className="text-neutral-500 text-sm leading-[1.8] font-light">{feature.description}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
