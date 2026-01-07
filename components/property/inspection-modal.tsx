"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Calendar, Clock, Check, Phone } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import SuccessPopup from "@/components/success-popup"

interface InspectionModalProps {
  isOpen: boolean
  onClose: () => void
  propertyTitle: string
  propertyId?: string
}

export default function InspectionModal({ isOpen, onClose, propertyTitle, propertyId }: InspectionModalProps) {
  const [step, setStep] = useState(1)
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [phone, setPhone] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [notes, setNotes] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    console.log("[v0] Submitting inspection booking...")

    try {
      const supabase = createClient()
      const { data, error } = await supabase.from("inspection_bookings").insert({
        property_id: propertyId,
        name,
        email,
        phone,
        date,
        time,
        notes,
        status: "pending",
      })

      if (error) {
        console.error("[v0] Error saving inspection booking:", error)
        alert("Failed to submit booking. Please try again.")
      } else {
        console.log("[v0] Inspection booking saved successfully:", data)
        setStep(2)
        setTimeout(() => {
          onClose()
          setStep(1)
          setDate("")
          setTime("")
          setPhone("")
          setName("")
          setEmail("")
          setNotes("")
          setShowSuccess(true)
        }, 2500)
      }
    } catch (error) {
      console.error("[v0] Unexpected error:", error)
      alert("An unexpected error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 md:p-8 border-b border-neutral-100 flex items-center justify-between sticky top-0 bg-white z-10">
                <div className="flex-1 min-w-0 pr-4">
                  <p className="text-[0.6rem] uppercase tracking-[0.4em] text-neutral-400 font-bold mb-1">
                    Private Inspection
                  </p>
                  <h3 className="text-lg md:text-xl font-light tracking-tight uppercase truncate">{propertyTitle}</h3>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-neutral-50 rounded-full transition-colors flex-shrink-0"
                >
                  <X size={20} strokeWidth={1} />
                </button>
              </div>

              <div className="p-6 md:p-10">
                {step === 1 ? (
                  <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                      <div className="space-y-3">
                        <label className="text-[0.6rem] uppercase tracking-[0.3em] font-bold text-neutral-400 flex items-center gap-2">
                          <Calendar size={12} strokeWidth={1.5} /> Preferred Date
                        </label>
                        <input
                          type="date"
                          required
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className="w-full bg-neutral-50 border-b border-neutral-200 py-3 text-sm outline-none focus:border-black transition-colors"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[0.6rem] uppercase tracking-[0.3em] font-bold text-neutral-400 flex items-center gap-2">
                          <Clock size={12} strokeWidth={1.5} /> Preferred Time
                        </label>
                        <select
                          required
                          value={time}
                          onChange={(e) => setTime(e.target.value)}
                          className="w-full bg-neutral-50 border-b border-neutral-200 py-3 text-sm outline-none focus:border-black transition-colors"
                        >
                          <option value="">Select Time</option>
                          <option value="morning">Morning (9AM - 12PM)</option>
                          <option value="afternoon">Afternoon (12PM - 4PM)</option>
                          <option value="evening">Evening (4PM - 6PM)</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="space-y-3">
                        <label className="text-[0.6rem] uppercase tracking-[0.3em] font-bold text-neutral-400">
                          Full Name
                        </label>
                        <input
                          placeholder="Enter your full name"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full bg-neutral-50 border-b border-neutral-200 py-3 text-sm outline-none focus:border-black transition-colors placeholder:text-neutral-300"
                        />
                      </div>

                      <div className="space-y-3">
                        <label className="text-[0.6rem] uppercase tracking-[0.3em] font-bold text-neutral-400">
                          Email Address
                        </label>
                        <input
                          type="email"
                          placeholder="your@email.com"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-neutral-50 border-b border-neutral-200 py-3 text-sm outline-none focus:border-black transition-colors placeholder:text-neutral-300"
                        />
                      </div>

                      <div className="space-y-3">
                        <label className="text-[0.6rem] uppercase tracking-[0.3em] font-bold text-neutral-400 flex items-center gap-2">
                          <Phone size={12} strokeWidth={1.5} /> Phone Number
                        </label>
                        <input
                          type="tel"
                          placeholder="+234 800 000 0000"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          pattern="[+]?[0-9\s()-]+"
                          className="w-full bg-neutral-50 border-b border-neutral-200 py-3 text-sm outline-none focus:border-black transition-colors placeholder:text-neutral-300"
                        />
                      </div>

                      <div className="space-y-3">
                        <label className="text-[0.6rem] uppercase tracking-[0.3em] font-bold text-neutral-400">
                          Additional Notes (Optional)
                        </label>
                        <textarea
                          placeholder="Any special requirements or questions?"
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          rows={3}
                          className="w-full bg-neutral-50 border-b border-neutral-200 py-3 text-sm outline-none focus:border-black transition-colors placeholder:text-neutral-300 resize-none"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-black text-white py-4 md:py-5 text-[0.65rem] uppercase tracking-[0.4em] font-bold hover:bg-neutral-800 transition-all mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? "Submitting..." : "Confirm Appointment"}
                    </button>
                  </form>
                ) : (
                  <div className="text-center py-12 space-y-6">
                    <div className="w-16 h-16 bg-neutral-900 text-white rounded-full flex items-center justify-center mx-auto">
                      <Check size={32} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h4 className="text-xl font-light tracking-tight uppercase mb-2">Request Received</h4>
                      <p className="text-neutral-500 text-sm max-w-xs mx-auto">
                        Our concierge team will contact you shortly to finalize your private viewing.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <SuccessPopup
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        message="Your inspection booking has been submitted successfully! Our team will contact you shortly to confirm the details."
      />
    </>
  )
}
