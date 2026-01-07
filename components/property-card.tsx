"use client"

import Link from "next/link"
import Image from "next/image"
import { Heart, MessageCircle, MapPin, Bed, Bath, ArrowUpRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

interface PropertyCardProps {
  id: string
  title: string
  location: string
  price: number
  thumbnail: string
  status: "available" | "sold"
  bedrooms: number
  bathrooms: number
}

export default function PropertyCard({
  id,
  title,
  location,
  price,
  thumbnail,
  status,
  bedrooms,
  bathrooms,
}: PropertyCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link href={`/property/${id}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative flex flex-col bg-white overflow-hidden border border-neutral-100 hover:border-neutral-200 transition-all duration-500 h-full"
      >
        <div className="relative aspect-[3/4] md:aspect-[4/5] overflow-hidden bg-neutral-100">
          <Image
            src={thumbnail || "/placeholder.svg?height=600&width=480&query=luxury+real+estate"}
            alt={title}
            fill
            className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="absolute top-3 md:top-6 left-3 md:left-6 flex flex-col gap-2">
            <span
              className={`px-2 md:px-4 py-1 md:py-1.5 text-[0.5rem] md:text-[0.65rem] font-bold uppercase tracking-[0.2em] backdrop-blur-md border ${
                status === "available"
                  ? "bg-white/80 border-white/20 text-black"
                  : "bg-black/80 border-black/20 text-white"
              }`}
            >
              {status}
            </span>
          </div>

          <div className="absolute top-3 md:top-6 right-3 md:right-6 flex flex-col gap-2 md:gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm border border-white/20 shadow-sm transition-all duration-300"
              onClick={(e) => {
                e.preventDefault()
                setIsLiked(!isLiked)
              }}
            >
              <Heart
                size={14}
                className={`md:w-4 md:h-4 transition-colors duration-300 ${isLiked ? "fill-red-500 text-red-500" : "text-black"}`}
              />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm border border-white/20 shadow-sm transition-all duration-300"
              onClick={(e) => {
                e.preventDefault()
                window.open(`https://wa.me/2348083351686`, "_blank")
              }}
            >
              <MessageCircle size={14} className="md:w-4 md:h-4 text-black" />
            </motion.button>
          </div>

          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute bottom-3 md:bottom-6 left-3 md:left-6 right-3 md:right-6 hidden md:block"
              >
                <div className="flex items-center justify-between w-full p-4 bg-white/10 backdrop-blur-xl border border-white/20 text-white group-hover:bg-white group-hover:text-black transition-colors duration-500">
                  <span className="text-[0.7rem] uppercase tracking-[0.3em] font-bold">View Portfolio</span>
                  <ArrowUpRight size={14} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="p-4 md:p-8 flex-1 flex flex-col">
          <div className="flex items-start justify-between mb-3 md:mb-4">
            <div className="flex-1 min-w-0">
              <h3 className="text-sm md:text-xl font-light tracking-tight text-black mb-1 leading-tight uppercase truncate">{title}</h3>
              <div className="flex items-center gap-1.5 md:gap-2 text-black/40">
                <MapPin size={10} className="md:w-3 md:h-3 flex-shrink-0" strokeWidth={1.5} />
                <span className="text-[0.65rem] md:text-[0.75rem] font-medium tracking-wide truncate">{location}</span>
              </div>
            </div>
            <span className="text-sm md:text-lg font-bold tracking-tighter text-black whitespace-nowrap ml-2">₦{(price / 1000000).toFixed(1)}M</span>
          </div>

          <div className="mt-auto pt-4 md:pt-6 border-t border-neutral-100 flex items-center gap-4 md:gap-8">
            <div className="flex items-center gap-1.5 md:gap-2.5">
              <div className="p-1.5 md:p-2 bg-neutral-50 rounded-lg">
                <Bed size={12} className="md:w-3.5 md:h-3.5" strokeWidth={1.5} className="text-black/60" />
              </div>
              <span className="text-[0.6rem] md:text-[0.7rem] uppercase tracking-wider font-bold text-black/80">{bedrooms}</span>
            </div>
            <div className="flex items-center gap-1.5 md:gap-2.5">
              <div className="p-1.5 md:p-2 bg-neutral-50 rounded-lg">
                <Bath size={12} className="md:w-3.5 md:h-3.5" strokeWidth={1.5} className="text-black/60" />
              </div>
              <span className="text-[0.6rem] md:text-[0.7rem] uppercase tracking-wider font-bold text-black/80">{bathrooms}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}
