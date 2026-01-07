"use client"

import { useEffect, useState, useRef } from "react"
import PropertyCard from "@/components/property-card"
import { motion, AnimatePresence } from "framer-motion"
import { createClient } from "@/lib/supabase/client"

interface FilterState {
  search: string
  priceRange: [number, number]
  location: string
  propertyType: string
  bedrooms: string
  status: string
}

interface PropertiesGridProps {
  filters?: FilterState
  initialProperties?: any[]
}

export default function PropertiesGrid({ filters, initialProperties = [] }: PropertiesGridProps) {
  const [properties, setProperties] = useState<any[]>(initialProperties)
  const [isLoading, setIsLoading] = useState(initialProperties.length > 0 ? false : true)
  const [error, setError] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState("latest")

  const isFirstRender = useRef(true)

  useEffect(() => {
    async function fetchProperties() {
      // specialized check: if we have initial data and this is first run, skip fetch
      if (isFirstRender.current) {
        isFirstRender.current = false
        if (initialProperties.length > 0) {
          return
        }
      }

      try {
        console.log("[v0] Fetching properties with filters:", filters)
        setIsLoading(true)
        setError(null)

        const supabase = createClient()

        let query = supabase.from("properties").select("*")

        if (filters?.search) {
          query = query.or(`title.ilike.%${filters.search}%,location.ilike.%${filters.search}%`)
        }

        if (filters?.priceRange && Array.isArray(filters.priceRange) && filters.priceRange.length === 2) {
          const maxPrice = filters.priceRange[1] * 1000000
          query = query.lte("price", maxPrice)
        }

        if (filters?.location && filters.location !== "All Locations") {
          query = query.ilike("location", `%${filters.location}%`)
        }

        if (filters?.status && filters.status !== "All Status") {
          query = query.eq("status", filters.status.toLowerCase())
        }

        if (filters?.bedrooms && filters.bedrooms !== "All Bedrooms") {
          const bedroomNum = Number.parseInt(filters.bedrooms.replace(/\D/g, ""))
          if (!isNaN(bedroomNum)) {
            if (filters.bedrooms.includes("+")) {
              query = query.gte("bedrooms", bedroomNum)
            } else {
              query = query.eq("bedrooms", bedroomNum)
            }
          }
        }

        if (sortBy === "price-low") {
          query = query.order("price", { ascending: true })
        } else if (sortBy === "price-high") {
          query = query.order("price", { ascending: false })
        } else {
          query = query.order("created_at", { ascending: false })
        }

        const { data, error: fetchError } = await query

        if (fetchError) {
          console.error("[v0] Error fetching properties:", fetchError)
          setError(fetchError.message || "Failed to load properties. Please try again.")
          setProperties([])
        } else {
          console.log("[v0] Fetched properties:", data?.length || 0)
          setProperties(Array.isArray(data) ? data : [])
        }
      } catch (err) {
        console.error("[v0] Unexpected error in fetchProperties:", err)
        setError("An unexpected error occurred while loading properties.")
        setProperties([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchProperties()
  }, [filters, sortBy, initialProperties])

  if (isLoading) {
    return (
      <div className="text-center py-20">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"></div>
        <p className="mt-4 text-sm uppercase tracking-widest text-neutral-400">Curating Properties...</p>
      </div>
    )
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-20 space-y-4 bg-red-50 p-8 rounded-lg"
      >
        <p className="text-2xl font-light text-red-600">Error Loading Properties</p>
        <code className="block bg-red-100 p-2 rounded text-xs text-red-800 font-mono mt-2 mb-4">
          {error}
        </code>
        <p className="text-sm uppercase tracking-widest text-red-400">Please refresh the page or try clearing your cookies.</p>
      </motion.div>
    )
  }

  if (properties.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-20 space-y-4"
      >
        <p className="text-2xl font-light text-neutral-600">No properties found.</p>
        <p className="text-sm text-neutral-400 max-w-md mx-auto">
          We couldn't find any properties matching your criteria.
          <br />
          (Debug: Database returned 0 items. Check checks if RLS policies are active or if filters are too strict.)
        </p>
      </motion.div>
    )
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <p className="text-sm uppercase tracking-[0.3em] font-medium text-neutral-400">
          Showing <span className="text-black font-bold">{properties.length}</span> Properties
        </p>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="py-2 px-4 bg-transparent border-b border-neutral-200 text-xs uppercase tracking-widest font-medium hover:border-black transition-colors cursor-pointer outline-none"
        >
          <option value="latest">Sort by: Latest</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>
      </div>

      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8"
      >
        <AnimatePresence mode="popLayout">
          {properties.map((property) => (
            <motion.div
              key={property.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
            >
              <PropertyCard
                id={property.id}
                title={property.title}
                location={property.location}
                price={property.price}
                thumbnail={property.thumbnail}
                status={property.status}
                bedrooms={property.bedrooms?.toString() || "0"}
                bathrooms={property.bathrooms?.toString() || "0"}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
