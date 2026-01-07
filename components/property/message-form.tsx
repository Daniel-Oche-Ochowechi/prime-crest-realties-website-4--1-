"use client"

import type React from "react"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import SuccessPopup from "@/components/success-popup"

interface MessageFormProps {
  propertyId: string
}

export default function MessageForm({ propertyId }: MessageFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    console.log("[v0] Submitting message for property:", propertyId)

    try {
      const supabase = createClient()
      const { data, error } = await supabase.from("messages").insert({
        property_id: propertyId,
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        message: formData.message,
        status: "unread",
      })

      if (error) {
        console.error("[v0] Error saving message:", error)
        alert("Failed to send message. Please try again.")
      } else {
        console.log("[v0] Message saved successfully:", data)
        setFormData({ name: "", email: "", phone: "", message: "" })
        setShowSuccess(true)
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
      <div className="border-t border-neutral-100 pt-12">
        <h2 className="text-3xl font-light text-neutral-900 mb-8 tracking-tight">Interested in This Property?</h2>

        <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[0.6rem] uppercase tracking-[0.3em] font-bold text-neutral-400">Your Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full py-3 px-4 bg-neutral-50 border-b border-neutral-200 text-neutral-900 placeholder-neutral-300 focus:outline-none focus:border-black transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[0.6rem] uppercase tracking-[0.3em] font-bold text-neutral-400">Your Email</label>
              <input
                type="email"
                placeholder="your@email.com"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full py-3 px-4 bg-neutral-50 border-b border-neutral-200 text-neutral-900 placeholder-neutral-300 focus:outline-none focus:border-black transition-colors"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[0.6rem] uppercase tracking-[0.3em] font-bold text-neutral-400">
              Your Phone (Optional)
            </label>
            <input
              type="tel"
              placeholder="+234 800 000 0000"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full py-3 px-4 bg-neutral-50 border-b border-neutral-200 text-neutral-900 placeholder-neutral-300 focus:outline-none focus:border-black transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[0.6rem] uppercase tracking-[0.3em] font-bold text-neutral-400">Your Message</label>
            <textarea
              placeholder="Tell us more about your requirements..."
              required
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full py-3 px-4 bg-neutral-50 border-b border-neutral-200 text-neutral-900 placeholder-neutral-300 focus:outline-none focus:border-black transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-black text-white px-8 py-4 text-[0.65rem] uppercase tracking-[0.4em] font-bold hover:bg-neutral-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>

      <SuccessPopup
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        message="Your message has been sent successfully! We'll get back to you as soon as possible."
      />
    </>
  )
}
