"use client"

import { useState, useRef, useEffect } from "react"
import { Search, MapPin, Home, BedDouble, SlidersHorizontal, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// <CHANGE> Added FilterState interface and onFilterChange prop for interactivity
interface FilterState {
  search: string
  priceRange: [number, number]
  location: string
  propertyType: string
  bedrooms: string
  status: string
}

interface PropertiesFiltersProps {
  onFilterChange?: (filters: FilterState) => void
  compactMode?: boolean
}

export default function PropertiesFilters({ onFilterChange, compactMode = false }: PropertiesFiltersProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [search, setSearch] = useState("")
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500])
  const [location, setLocation] = useState("")
  const [propertyType, setPropertyType] = useState("All Types")
  const [bedrooms, setBedrooms] = useState("All Bedrooms")
  const [status, setStatus] = useState("All Status")

  const sidebarRef = useRef<HTMLDivElement>(null)

  const types = ["All Types", "Duplex", "Terraced House", "Apartment", "Plot", "Commercial"]
  const bedroomOptions = ["All Bedrooms", "1 Bedroom", "2 Bedrooms", "3 Bedrooms", "4+ Bedrooms"]

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node) && isExpanded) {
        setIsExpanded(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isExpanded])

  const handleCompactClick = () => {
    // Smooth scroll to top to reveal full filter naturally
    window.scrollTo({ top: 300, behavior: 'smooth' })
    // Also trigger expand for immediate feedback once arrived (optional)
    setIsExpanded(true)
  }

  const applyFilters = () => {
    if (onFilterChange) {
      onFilterChange({
        search,
        priceRange,
        location,
        propertyType,
        bedrooms,
        status,
      })
    }
    setIsOpen(false)
    // Optional: collapse on desktop after apply? keeping it open for refinement seems better strictly based on "display once click"
    // setIsExpanded(false) 
  }

  const resetFilters = () => {
    setSearch("")
    setPriceRange([0, 500])
    setLocation("")
    setPropertyType("All Types")
    setBedrooms("All Bedrooms")
    setStatus("All Status")
    if (onFilterChange) {
      onFilterChange({
        search: "",
        priceRange: [0, 500],
        location: "",
        propertyType: "All Types",
        bedrooms: "All Bedrooms",
        status: "All Status",
      })
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 z-50 bg-black text-white p-4 rounded-full shadow-2xl flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:bg-neutral-800 transition-all"
      >
        <SlidersHorizontal size={18} />
        Refine
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] lg:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside
        ref={sidebarRef}
        className={`
          fixed inset-y-0 right-0 w-full max-w-xs bg-white z-[70] p-6 overflow-y-auto shadow-2xl transition-transform duration-500 ease-in-out
          lg:relative lg:inset-auto lg:w-full lg:max-w-none lg:translate-x-0 lg:z-0 lg:rounded-2xl lg:border lg:border-border lg:shadow-sm
          ${isOpen ? "translate-x-0" : "translate-x-full"}
          ${compactMode ? "lg:!p-3 lg:!w-auto lg:!max-w-none lg:!border-none lg:!shadow-none lg:!bg-transparent" : ""}
        `}
      >
        {compactMode ? (
          <div className="hidden lg:flex flex-col items-center gap-4 animate-in fade-in duration-500">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleCompactClick}
              className="p-4 bg-black text-white rounded-full shadow-lg hover:shadow-xl transition-all"
              title="Search Properties"
            >
              <Search size={20} />
            </motion.button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6 lg:block">
              <div className="flex items-center justify-between w-full">
                <h3 className="text-[0.65rem] font-bold text-neutral-400 uppercase tracking-[0.4em]">Filter Perspective</h3>
                {isExpanded && (
                  <button
                    onClick={() => setIsExpanded(false)}
                    className="hidden lg:block text-neutral-400 hover:text-black transition-colors"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="lg:hidden text-neutral-400 hover:text-black transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Search Bar */}
            <div className="mb-6">
              <label className="block text-[0.6rem] font-bold text-neutral-300 mb-3 uppercase tracking-[0.3em]">
                Search Inquiry
              </label>
              <div className="relative group">
                <Search
                  className="absolute left-0 top-1/2 -translate-y-1/2 text-neutral-300 group-focus-within:text-black transition-colors"
                  size={14}
                />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && applyFilters()}
                  onFocus={() => setIsExpanded(true)}
                  placeholder="Address, building..."
                  className="w-full pl-6 py-3 bg-transparent border-b border-neutral-100 focus:border-black transition-all outline-none text-xs tracking-wider placeholder:text-neutral-200"
                />
              </div>
            </div>

            {/* Collapsible Content for Desktop (Always visible on Mobile/isOpen) */}
            <div className={`${!isExpanded && !isOpen ? 'hidden lg:hidden' : 'block'} lg:${isExpanded ? 'block' : 'hidden'}`}>
              <motion.div
                initial={false}
                animate={isExpanded || isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
                className="overflow-hidden"
              >
                {/* Price Range */}
                <div className="mb-6">
                  <label className="block text-[0.6rem] font-bold text-neutral-300 mb-4 uppercase tracking-[0.2em]">
                    Investment Range
                  </label>
                  <div className="space-y-3">
                    <input
                      type="range"
                      min="0"
                      max="500"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                      className="w-full accent-black h-1 bg-neutral-100 rounded-full appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-[0.7rem] font-medium tracking-widest uppercase">
                      <span className="text-neutral-400">₦0</span>
                      <span className="text-black font-bold">₦{priceRange[1]}M</span>
                    </div>
                  </div>
                </div>

                {/* Filters */}
                {/* Location (Input) */}
                <div className="mb-6">
                  <label className="flex items-center gap-2 text-[0.6rem] font-bold text-neutral-300 mb-3 uppercase tracking-[0.3em]">
                    <MapPin size={12} strokeWidth={2.5} />
                    Locality
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && applyFilters()}
                    placeholder="Type Location..."
                    className="w-full py-3 bg-transparent border-b border-neutral-100 focus:border-black transition-all outline-none text-xs tracking-widest font-medium hover:border-neutral-300 placeholder:text-neutral-200 placeholder:font-normal"
                  />
                </div>

                {[
                  { label: "Typology", options: types, value: propertyType, setter: setPropertyType, icon: Home },
                  { label: "Suites", options: bedroomOptions, value: bedrooms, setter: setBedrooms, icon: BedDouble },
                ].map((filter) => (
                  <div key={filter.label} className="mb-6">
                    <label className="flex items-center gap-2 text-[0.6rem] font-bold text-neutral-300 mb-3 uppercase tracking-[0.3em]">
                      <filter.icon size={12} strokeWidth={2.5} />
                      {filter.label}
                    </label>
                    <select
                      value={filter.value}
                      onChange={(e) => filter.setter(e.target.value)}
                      className="w-full py-3 bg-transparent border-b border-neutral-100 focus:border-black transition-all outline-none text-xs tracking-widest appearance-none cursor-pointer font-medium hover:border-neutral-300"
                    >
                      {filter.options.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}

                <div className="pt-6 space-y-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={applyFilters}
                    className="w-full py-5 bg-black text-white text-[0.65rem] font-bold uppercase tracking-[0.4em] hover:bg-neutral-800 transition-all rounded-none"
                  >
                    Update Gallery
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={resetFilters}
                    className="w-full py-4 bg-transparent text-neutral-300 text-[0.55rem] font-bold uppercase tracking-[0.3em] hover:text-black transition-all"
                  >
                    Reset Parameters
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </motion.aside>
    </>
  )
}
