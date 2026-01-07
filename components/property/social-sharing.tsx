"use client"

import { Share2, Facebook, Twitter, Linkedin, LinkIcon } from "lucide-react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function SocialSharing() {
  const [isOpen, setIsOpen] = useState(false)

  const shareLinks = [
    { icon: Facebook, label: "Facebook", href: "#" },
    { icon: Twitter, label: "Twitter", href: "#" },
    { icon: Linkedin, label: "LinkedIn", href: "#" },
  ]

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    alert("Link copied to clipboard!")
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-sm uppercase tracking-[0.2em] font-semibold text-primary/60 hover:text-primary transition-colors"
      >
        <Share2 size={16} />
        <span>Share</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full right-0 mt-4 p-4 bg-white border border-border shadow-2xl rounded-xl z-10 flex flex-col gap-3 min-w-[160px]"
          >
            {shareLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="flex items-center gap-3 text-sm text-primary/70 hover:text-primary transition-colors"
              >
                <link.icon size={16} />
                <span>{link.label}</span>
              </a>
            ))}
            <button
              onClick={copyLink}
              className="flex items-center gap-3 text-sm text-primary/70 hover:text-primary transition-colors border-t border-border pt-3 mt-1"
            >
              <LinkIcon size={16} />
              <span>Copy Link</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
