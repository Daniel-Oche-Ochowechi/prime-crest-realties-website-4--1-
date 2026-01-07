"use client"

import { Badge } from "@/components/ui/badge"
import SocialSharing from "@/components/property/social-sharing"
import { MapPin, Maximize, Bed, Bath, Car, MessageCircle, Calendar } from "lucide-react"
import InspectionModal from "./inspection-modal"
import { useState } from "react"

interface PropertyDetailsProps {
  property: any
}

export default function PropertyDetails({ property }: PropertyDetailsProps) {
  const [isInspectionOpen, setIsInspectionOpen] = useState(false)

  const formatPrice = (price: number) => {
    return `₦${(price / 1000000).toLocaleString()}M`
  }

  const handleWhatsApp = () => {
    const phoneNumber = "2348083351686"
    const message = `Greetings PrimeCrest. I am interested in ${property.title} in ${property.location}.`
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank")
  }

  return (
    <div className="font-sans max-w-[1400px] mx-auto relative px-4 md:px-6 lg:px-0">
      {/* Background Shimmer Animation */}
      <div className="absolute inset-0 -z-10 bg-luxury-shimmer pointer-events-none opacity-40" />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-8 md:gap-12 lg:gap-16 mb-12 md:mb-16 lg:mb-20 relative">
        <div className="space-y-6 md:space-y-8">
          <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-2">
            <Badge
              variant="outline"
              className="rounded-full px-3 md:px-4 py-1 text-[0.55rem] md:text-[0.6rem] uppercase tracking-widest border-neutral-200 text-neutral-400 font-bold"
            >
              {property.status === "available" ? "Active Listing" : "Reserved"}
            </Badge>
            <div className="h-px w-8 md:w-12 bg-neutral-100" />
            <SocialSharing />
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-8xl font-light text-neutral-900 tracking-tighter leading-[0.95] max-w-4xl italic serif">
            {property.title}
          </h1>

          <div className="flex items-center gap-2 md:gap-3 text-neutral-500">
            <MapPin size={14} className="md:w-4 md:h-4" strokeWidth={1} />
            <p className="text-xs md:text-sm uppercase tracking-[0.25em] md:tracking-[0.3em] font-medium">
              {property.location}
            </p>
          </div>
        </div>

        <div className="lg:border-l border-neutral-100 lg:pl-12 xl:pl-16 flex flex-col justify-end pb-2 space-y-6 md:space-y-8">
          <div className="space-y-3 md:space-y-4">
            <p className="text-[0.55rem] md:text-[0.6rem] uppercase tracking-[0.35em] md:tracking-[0.4em] text-neutral-400 font-bold">
              Investment
            </p>
            <p className="text-4xl md:text-5xl lg:text-6xl font-light text-neutral-900 tracking-tighter">
              {formatPrice(property.price)}
            </p>
            <div className="flex items-center gap-2 text-[0.6rem] md:text-[0.65rem] uppercase tracking-[0.25em] md:tracking-[0.3em] text-neutral-500">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <span>Available Now</span>
            </div>
          </div>

          <div className="space-y-3 pt-6 border-t border-neutral-100">
            <button
              onClick={() => setIsInspectionOpen(true)}
              className="w-full bg-black text-white py-4 md:py-5 text-[0.6rem] md:text-[0.65rem] uppercase tracking-[0.35em] md:tracking-[0.4em] font-bold hover:bg-neutral-800 transition-all flex items-center justify-center gap-2.5 md:gap-3 group"
            >
              <Calendar size={14} strokeWidth={1.5} className="group-hover:scale-110 transition-transform" />
              Book Inspection
            </button>
            <button
              onClick={handleWhatsApp}
              className="w-full bg-[#25D366] text-white py-4 md:py-5 text-[0.6rem] md:text-[0.65rem] uppercase tracking-[0.35em] md:tracking-[0.4em] font-bold hover:bg-[#128C7E] transition-all flex items-center justify-center gap-2.5 md:gap-3 group shadow-xl shadow-green-500/10"
            >
              <MessageCircle size={14} strokeWidth={1.5} className="group-hover:scale-110 transition-transform" />
              Contact on WhatsApp
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 lg:gap-12 mb-16 md:mb-20 lg:mb-24 py-12 md:py-16 border-y border-neutral-100 bg-neutral-50/30 px-6 md:px-12">
        {[
          { label: "Suites", value: property.highlights.bedrooms, icon: Bed },
          { label: "Baths", value: property.highlights.bathrooms, icon: Bath },
          { label: "Area", value: `${property.highlights.sqft.toLocaleString()} FT²`, icon: Maximize },
          { label: "Parking", value: property.highlights.parking, icon: Car },
        ].map((item, i) => (
          <div key={i} className="flex flex-col gap-3 md:gap-4">
            <item.icon size={18} className="md:w-5 md:h-5" strokeWidth={1} className="text-neutral-400" />
            <div className="space-y-1">
              <p className="text-[0.55rem] md:text-[0.6rem] text-neutral-400 uppercase tracking-[0.25em] md:tracking-[0.3em] font-bold">
                {item.label}
              </p>
              <p className="text-2xl md:text-3xl font-light text-neutral-900 tracking-tight">{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr,450px] gap-24">
        <div className="space-y-12">
          <h2 className="text-[0.65rem] uppercase tracking-[0.6em] font-black text-neutral-200">The Narrative</h2>
          <p className="text-neutral-600 leading-[1.8] text-2xl font-light tracking-tight max-w-4xl">
            {property.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 pt-16 border-t border-neutral-100">
            <div className="space-y-4">
              <p className="text-[0.6rem] font-bold text-neutral-300 uppercase tracking-[0.4em]">Estate Magnitude</p>
              <p className="text-xl text-neutral-800 font-light tracking-tight">{property.land_size}</p>
            </div>
            <div className="space-y-4">
              <p className="text-[0.6rem] font-bold text-neutral-300 uppercase tracking-[0.4em]">Legal Designation</p>
              <p className="text-xl text-neutral-800 font-light tracking-tight">{property.document_status}</p>
            </div>
          </div>
        </div>
      </div>

      <InspectionModal
        isOpen={isInspectionOpen}
        onClose={() => setIsInspectionOpen(false)}
        propertyTitle={property.title}
      />
    </div>
  )
}
