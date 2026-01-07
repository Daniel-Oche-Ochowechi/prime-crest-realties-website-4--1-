"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send, CheckCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"

interface Message {
  id: string
  subject: string
  message: string
  is_read: boolean
  is_replied: boolean
  created_at: string
}

export default function UserMessageAdmin() {
  const [messages, setMessages] = useState<Message[]>([])
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const { toast } = useToast()

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const supabase = createClient()

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        toast({
          title: "Error",
          description: "You must be logged in to send a message",
          variant: "destructive",
        })
        return
      }

      const { error } = await supabase.from("user_admin_messages").insert({
        user_id: user.id,
        subject,
        message,
      })

      if (error) throw error

      toast({
        title: "Success",
        description: "Your message has been sent to the admin",
      })
      setSubject("")
      setMessage("")
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
    } catch (error) {
      console.error("[v0] Error sending message:", error)
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold text-primary mb-2 tracking-wider">Contact Support</h3>
        <p className="text-neutral-gray">Send a message to our admin team</p>
      </div>

      <Card className="bg-secondary border-neutral-light">
        <CardContent className="p-8">
          <form onSubmit={handleSendMessage} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-primary uppercase tracking-wider">Subject</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="What is your message about?"
                required
                className="w-full py-3 px-4 bg-neutral-light border-b-2 border-neutral-medium text-primary placeholder-neutral-gray focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-primary uppercase tracking-wider">Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Please describe your inquiry in detail..."
                required
                rows={6}
                className="w-full py-3 px-4 bg-neutral-light border-b-2 border-neutral-medium text-primary placeholder-neutral-gray focus:outline-none focus:border-primary transition-colors resize-none"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-secondary py-3 px-6 font-semibold uppercase tracking-wider hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Send size={18} />
              {isSubmitting ? "Sending..." : "Send Message"}
            </motion.button>
          </form>

          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 p-4 bg-green-50 border border-green-200 rounded-sm flex items-center gap-3"
            >
              <CheckCircle size={20} className="text-green-600" />
              <p className="text-green-700 font-medium">Message sent successfully!</p>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
