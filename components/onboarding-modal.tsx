"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Sparkles, Shield, Users } from "lucide-react"

const onboardingSteps = [
  {
    title: "Welcome to PrimeCrest",
    subtitle: "Redefining Luxury Living",
    description: "Experience premium residential and commercial properties with verified titles and expert guidance.",
    image: "/luxury-property-hero-background.jpg",
    icon: Sparkles,
    gradient: "from-accent/20 via-primary/95 to-primary",
  },
  {
    title: "Verified Properties",
    subtitle: "Trust & Transparency",
    description: "Every property features complete documentation with Governor's Consent and Certificate of Occupancy.",
    image: "/luxury-modern-office-interior.jpg",
    icon: Shield,
    gradient: "from-accent/20 via-primary/95 to-primary",
  },
  {
    title: "Expert Guidance",
    subtitle: "Your Dream Awaits",
    description: "Our dedicated agents guide you through every step of your real estate journey.",
    image: "/luxury-4-bedroom-duplex.jpg",
    icon: Users,
    gradient: "from-accent/20 via-primary/95 to-primary",
  },
]

export default function OnboardingModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isOnboarded = localStorage.getItem("primecrest_onboarded")
      if (!isOnboarded) {
        setIsOpen(true)
      }
      setIsLoading(false)
    }
  }, [])

  const handleContinue = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      localStorage.setItem("primecrest_onboarded", "true")
      setIsOpen(false)
    }
  }

  const handleSkip = () => {
    localStorage.setItem("primecrest_onboarded", "true")
    setIsOpen(false)
  }

  if (isLoading || !isOpen) return null

  const currentContent = onboardingSteps[currentStep]
  const CurrentIcon = currentContent.icon

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-primary z-50 flex items-center justify-center overflow-hidden"
        >
          <motion.div
            key={`bg-${currentStep}`}
            initial={{ scale: 1.15, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.98, opacity: 0, y: -20 }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute inset-0"
          >
            <Image
              src={currentContent.image || "/placeholder.svg"}
              alt={currentContent.title}
              fill
              className="object-cover"
              priority
            />
            <div className={`absolute inset-0 bg-gradient-to-br ${currentContent.gradient}`} />
            <div className="absolute inset-0 backdrop-blur-[2px]" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.03 }}
            transition={{ delay: 0.3 }}
            className="absolute inset-0 z-[1]"
            style={{
              backgroundImage: `linear-gradient(var(--color-accent) 1px, transparent 1px),
                               linear-gradient(90deg, var(--color-accent) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />

          {[...Array(12)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute w-1 h-1 bg-accent/30 rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                scale: 0,
              }}
              animate={{
                y: [null, Math.random() * window.innerHeight],
                x: [null, Math.random() * window.innerWidth],
                scale: [0, 1, 1, 0],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 3,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Content Container */}
          <div className="relative z-10 w-full max-w-5xl px-6 md:px-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="text-center"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0, rotate: -180 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
                  className="mb-6 flex justify-center"
                >
                  <div className="relative">
                    <motion.div
                      animate={{
                        rotate: 360,
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        rotate: { duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                        scale: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
                      }}
                      className="absolute inset-0 bg-accent/20 rounded-full blur-xl"
                    />
                    <div className="relative bg-accent/10 backdrop-blur-sm border border-accent/30 rounded-full p-6">
                      <CurrentIcon className="w-12 h-12 text-accent" strokeWidth={1.5} />
                    </div>
                  </div>
                </motion.div>

                {/* Logo Animation */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.7 }}
                  className="mb-10"
                >
                  <motion.h1
                    className="text-6xl md:text-7xl font-bold text-secondary mb-3 tracking-[0.2em]"
                    initial={{ letterSpacing: "0.5em", opacity: 0 }}
                    animate={{ letterSpacing: "0.2em", opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                  >
                    PRIMECREST
                  </motion.h1>
                  <motion.div
                    className="h-px w-0 mx-auto bg-gradient-to-r from-transparent via-accent to-transparent"
                    initial={{ width: 0 }}
                    animate={{ width: 200 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                  />
                </motion.div>

                {/* Step Title */}
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="text-4xl md:text-5xl font-bold text-secondary mb-4 tracking-tight"
                >
                  {currentContent.title}
                </motion.h2>

                {/* Subtitle */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="text-xl md:text-2xl text-accent mb-8 font-serif italic"
                >
                  {currentContent.subtitle}
                </motion.p>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="text-base md:text-lg text-secondary/90 mb-12 max-w-2xl mx-auto leading-relaxed"
                >
                  {currentContent.description}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                  className="flex justify-center gap-3 mb-10"
                >
                  {onboardingSteps.map((_, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setCurrentStep(index)}
                      className="relative group"
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <motion.div
                        initial={{ width: 10 }}
                        animate={{
                          width: index === currentStep ? 40 : 10,
                          height: 10,
                        }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className={`rounded-full transition-colors ${
                          index === currentStep ? "bg-accent" : index < currentStep ? "bg-accent/50" : "bg-secondary/30"
                        }`}
                      />
                      {index === currentStep && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="absolute inset-0 bg-accent/30 rounded-full blur-md"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </motion.button>
                  ))}
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="flex flex-col sm:flex-row gap-5 justify-center items-center"
                >
                  <motion.button
                    onClick={handleSkip}
                    whileHover={{ scale: 1.05, x: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative text-secondary/70 font-medium uppercase text-sm tracking-wider hover:text-secondary transition-colors px-8 py-3 group overflow-hidden"
                  >
                    <span className="relative z-10">Skip</span>
                    <motion.div
                      className="absolute inset-0 bg-secondary/10"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.button>

                  <motion.button
                    onClick={handleContinue}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 0 30px rgba(199, 176, 137, 0.4)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="relative bg-accent text-primary font-semibold uppercase text-sm tracking-wider px-14 py-4 transition-all shadow-xl hover:shadow-accent/40 overflow-hidden group"
                  >
                    <span className="relative z-10">
                      {currentStep === onboardingSteps.length - 1 ? "Get Started" : "Continue"}
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-accent/90"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                    <motion.div
                      className="absolute inset-0 bg-white/20"
                      animate={{
                        x: ["-100%", "100%"],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                      }}
                    />
                  </motion.button>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 0.08,
              scale: 1,
              rotate: 360,
            }}
            transition={{
              opacity: { delay: 0.5, duration: 1 },
              scale: { delay: 0.5, duration: 1, type: "spring" },
              rotate: { duration: 40, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
            }}
            className="absolute top-10 left-10 w-40 h-40 border-2 border-accent rounded-full"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 0.08,
              scale: 1,
              rotate: -360,
            }}
            transition={{
              opacity: { delay: 0.7, duration: 1 },
              scale: { delay: 0.7, duration: 1, type: "spring" },
              rotate: { duration: 35, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
            }}
            className="absolute bottom-20 right-20 w-32 h-32 border-2 border-accent rounded-full"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 0.06,
              scale: 1,
              rotate: 360,
            }}
            transition={{
              opacity: { delay: 0.9, duration: 1 },
              scale: { delay: 0.9, duration: 1, type: "spring" },
              rotate: { duration: 50, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
            }}
            className="absolute top-1/2 right-10 w-24 h-24 border border-accent rounded-full"
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
