"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, X } from "lucide-react"

interface SuccessPopupProps {
  isOpen: boolean
  onClose: () => void
  message: string
  autoCloseDuration?: number
}

export default function SuccessPopup({ isOpen, onClose, message, autoCloseDuration = 5000 }: SuccessPopupProps) {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose()
      }, autoCloseDuration)

      return () => clearTimeout(timer)
    }
  }, [isOpen, autoCloseDuration, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-start justify-center pt-20 px-4 pointer-events-none"
        >
          <motion.div
            initial={{ y: -50, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -50, opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white border-2 border-black shadow-2xl max-w-md w-full pointer-events-auto overflow-hidden"
          >
            <div className="relative">
              {/* Animated gradient bar */}
              <motion.div
                initial={{ scaleX: 1 }}
                animate={{ scaleX: 0 }}
                transition={{ duration: autoCloseDuration / 1000, ease: "linear" }}
                className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-black via-neutral-700 to-black origin-left"
              />

              <div className="p-6 flex items-start gap-4">
                {/* Success Icon with Animation */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", delay: 0.1, damping: 15 }}
                  className="flex-shrink-0 w-12 h-12 rounded-full bg-black flex items-center justify-center"
                >
                  <Check className="text-white" size={24} strokeWidth={3} />
                </motion.div>

                <div className="flex-1 pt-1">
                  <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-black mb-2">Success</h3>
                  <p className="text-neutral-600 text-sm leading-relaxed">{message}</p>
                </div>

                <button
                  onClick={onClose}
                  className="flex-shrink-0 p-1 hover:bg-neutral-100 rounded-full transition-colors"
                  aria-label="Close notification"
                >
                  <X size={18} className="text-neutral-400 hover:text-black transition-colors" />
                </button>
              </div>

              {/* Decorative corner accents */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-black" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-black" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-black" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-black" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
