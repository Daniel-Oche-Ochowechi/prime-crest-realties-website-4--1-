"use client"

import type React from "react"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import SuccessPopup from "@/components/success-popup"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    console.log("[v0] Submitting contact form...")

    try {
      const supabase = createClient()
      const { data, error } = await supabase.from("messages").insert({
        property_id: null,
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        message: `Subject: ${formData.subject}\n\n${formData.message}`,
        status: "unread",
      })

      if (error) {
        console.error("[v0] Error saving contact message:", error)
        alert("Failed to send message. Please try again.")
      } else {
        console.log("[v0] Contact message saved successfully:", data)
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
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
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-2xl font-bold text-primary mb-8 tracking-wider">Send us a Message</h2>

        <input
          type="text"
          placeholder="Your Name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full py-3 px-4 bg-neutral-light border-b border-neutral-medium text-primary placeholder-neutral-gray focus:outline-none focus:border-primary"
        />

        <input
          type="email"
          placeholder="Your Email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full py-3 px-4 bg-neutral-light border-b border-neutral-medium text-primary placeholder-neutral-gray focus:outline-none focus:border-primary"
        />

        <input
          type="tel"
          placeholder="Your Phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full py-3 px-4 bg-neutral-light border-b border-neutral-medium text-primary placeholder-neutral-gray focus:outline-none focus:border-primary"
        />

        <input
          type="text"
          placeholder="Subject"
          required
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          className="w-full py-3 px-4 bg-neutral-light border-b border-neutral-medium text-primary placeholder-neutral-gray focus:outline-none focus:border-primary"
        />

        <textarea
          placeholder="Your Message"
          required
          rows={6}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full py-3 px-4 bg-neutral-light border-b border-neutral-medium text-primary placeholder-neutral-gray focus:outline-none focus:border-primary resize-none"
        />

        <button type="submit" disabled={isSubmitting} className="btn-primary w-full py-4">
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>
      </form>

      <SuccessPopup
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        message="Thank you for contacting us! We'll respond to your inquiry as soon as possible."
      />
    </>
  )
}
