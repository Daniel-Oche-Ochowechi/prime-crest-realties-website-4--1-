"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react"

interface PropertyGalleryProps {
  images: string[]
}

export default function PropertyGallery({ images }: PropertyGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="relative w-full aspect-[21/9] bg-neutral-50 overflow-hidden group">
      <Image
        src={images[currentIndex] || "/placeholder.svg"}
        alt="Property Architectural View"
        fill
        className="object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-105"
        priority
      />

      {/* Modern High-End Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/10 pointer-events-none" />

      <button
        onClick={goToPrevious}
        className="absolute left-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center border border-white/20 bg-black/10 backdrop-blur-md text-white hover:bg-white hover:text-black transition-all opacity-0 group-hover:opacity-100 duration-500"
      >
        <ChevronLeft size={20} strokeWidth={1.5} />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center border border-white/20 bg-black/10 backdrop-blur-md text-white hover:bg-white hover:text-black transition-all opacity-0 group-hover:opacity-100 duration-500"
      >
        <ChevronRight size={20} strokeWidth={1.5} />
      </button>

      {/* Classy Metadata */}
      <div className="absolute bottom-8 right-8 z-10 flex items-center gap-6">
        <div className="flex gap-1.5">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-0.5 transition-all duration-700 ${
                index === currentIndex ? "bg-white w-12" : "bg-white/30 w-4"
              }`}
            />
          ))}
        </div>
        <div className="text-[0.6rem] font-bold text-white uppercase tracking-[0.4em] bg-black/20 backdrop-blur-sm px-4 py-2 border border-white/10">
          {currentIndex + 1} <span className="text-white/40 px-2">—</span> {images.length}
        </div>
      </div>

      <button className="absolute top-8 right-8 w-10 h-10 border border-white/20 bg-black/10 backdrop-blur-md text-white flex items-center justify-center hover:bg-white hover:text-black transition-all">
        <Maximize2 size={16} strokeWidth={1.5} />
      </button>
    </div>
  )
}
