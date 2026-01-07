"use client"

import { MessageCircle } from "lucide-react"
import { motion } from "framer-motion"

export default function WhatsAppButton() {
  const phoneNumber = "2348000000000" // Replace with actual number
  const message = "Hello PrimeCrest Realties, I'm interested in your properties."

  const openWhatsApp = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(url, "_blank")
  }

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={openWhatsApp}
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl flex items-center justify-center hover:bg-[#20ba5a] transition-colors"
      aria-label="Contact on WhatsApp"
    >
      <MessageCircle size={28} fill="currentColor" />
    </motion.button>
  )
}
