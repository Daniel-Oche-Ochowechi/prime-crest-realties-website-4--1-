"use client"

import { useState } from "react"
import { Heart, MessageCircle, Share2, Calendar, Phone, Mail } from "lucide-react"
import { motion } from "framer-motion"
import InspectionModal from "./inspection-modal"

interface PropertySidebarProps {
  property: any
}

export default function PropertySidebar({ property }: PropertySidebarProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isInspectionOpen, setIsInspectionOpen] = useState(false)

  const handleWhatsApp = () => {
    const phoneNumber = "2348083351686"
    const message = `Greetings PrimeCrest. I am interested in exploring ${property.title} located at ${property.location}. Please provide further details.`
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const handleShareProperty = () => {
    const url = window.location.href
    navigator.clipboard.writeText(url)
    alert("Property link copied to clipboard!")
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="lg:sticky lg:top-28 space-y-6"
    >
      <div className="bg-white border border-neutral-100 p-6 md:p-8">
        <div className="mb-6 md:mb-8">
          <p className="text-[0.6rem] md:text-[0.65rem] text-neutral-400 uppercase tracking-[0.3em] md:tracking-[0.4em] mb-2 font-bold">
            Investment
          </p>
          <p className="text-3xl md:text-4xl font-light text-neutral-900 tracking-tighter">
            ₦{(property.price / 1000000).toFixed(1)}M
          </p>
        </div>

        <div className="mb-6 md:mb-8 pb-6 md:pb-8 border-b border-neutral-100">
          <div
            className={`px-4 py-3 text-center font-bold uppercase tracking-[0.2em] md:tracking-[0.25em] text-[0.6rem] md:text-[0.65rem] ${
              property.status === "available" ? "bg-neutral-900 text-white" : "bg-neutral-100 text-neutral-400"
            }`}
          >
            {property.status === "available" ? "Available Now" : "Reserved"}
          </div>
        </div>

        {property.status === "available" && (
          <div className="space-y-3">
            <button
              onClick={() => setIsInspectionOpen(true)}
              className="w-full bg-black text-white py-4 md:py-5 text-[0.6rem] md:text-[0.65rem] uppercase tracking-[0.35em] md:tracking-[0.4em] font-bold hover:bg-neutral-800 transition-all flex items-center justify-center gap-2.5 md:gap-3 group"
            >
              <Calendar size={14} strokeWidth={1.5} className="group-hover:scale-110 transition-transform" />
              Book Inspection
            </button>
            <button
              onClick={handleWhatsApp}
              className="w-full bg-[#25D366] text-white py-4 md:py-5 text-[0.6rem] md:text-[0.65rem] uppercase tracking-[0.35em] md:tracking-[0.4em] font-bold hover:bg-[#128C7E] transition-all flex items-center justify-center gap-2.5 md:gap-3 group shadow-lg shadow-green-500/10"
            >
              <MessageCircle size={14} strokeWidth={1.5} className="group-hover:scale-110 transition-transform" />
              Contact on WhatsApp
            </button>
          </div>
        )}

        <div className="grid grid-cols-3 gap-2 md:gap-3 mt-6">
          <button
            onClick={() => setIsWishlisted(!isWishlisted)}
            className={`p-3 md:p-3.5 border transition-all ${
              isWishlisted
                ? "bg-black text-white border-black"
                : "bg-white text-black border-neutral-200 hover:border-black"
            }`}
          >
            <Heart size={16} fill={isWishlisted ? "white" : "none"} className="mx-auto" />
          </button>
          <button
            className="p-3 md:p-3.5 border border-neutral-200 bg-white text-black hover:border-black transition-all"
            onClick={handleShareProperty}
          >
            <Share2 size={16} className="mx-auto" />
          </button>
          <button className="p-3 md:p-3.5 border border-neutral-200 bg-white text-black hover:border-black transition-all">
            <MessageCircle size={16} className="mx-auto" />
          </button>
        </div>
      </div>

      <div className="bg-neutral-50/80 border border-neutral-100 p-6 md:p-8">
        <h3 className="text-[0.6rem] md:text-[0.65rem] font-bold text-neutral-400 uppercase tracking-[0.35em] md:tracking-[0.4em] mb-6 md:mb-8">
          Concierge Support
        </h3>
        <div className="space-y-6 md:space-y-8">
          <a href={`tel:${property.agent_contact.phone}`} className="group block">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/5 group-hover:bg-black transition-colors flex items-center justify-center flex-shrink-0">
                <Phone size={16} className="text-black group-hover:text-white transition-colors" strokeWidth={1.5} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[0.55rem] md:text-[0.6rem] uppercase tracking-[0.3em] font-bold text-neutral-300 mb-1.5">
                  Direct Line
                </p>
                <p className="text-base md:text-lg font-light text-neutral-900 tracking-tight group-hover:text-neutral-600 transition-colors break-words">
                  {property.agent_contact.phone}
                </p>
              </div>
            </div>
          </a>

          <a href={`mailto:${property.agent_contact.email}`} className="group block">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/5 group-hover:bg-black transition-colors flex items-center justify-center flex-shrink-0">
                <Mail size={16} className="text-black group-hover:text-white transition-colors" strokeWidth={1.5} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[0.55rem] md:text-[0.6rem] uppercase tracking-[0.3em] font-bold text-neutral-300 mb-1.5">
                  Electronic Mail
                </p>
                <p className="text-base md:text-lg font-light text-neutral-900 tracking-tight break-all group-hover:text-neutral-600 transition-colors">
                  {property.agent_contact.email}
                </p>
              </div>
            </div>
          </a>
        </div>
      </div>

      <InspectionModal
        isOpen={isInspectionOpen}
        onClose={() => setIsInspectionOpen(false)}
        propertyTitle={property.title}
      />
    </motion.div>
  )
}
