"use client"

import { useEffect, useState } from "react"
import PropertyCard from "@/components/property-card"
import { createClient } from "@/lib/supabase/client"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

interface FeaturedProperty {
  id: string
  title: string
  location: string
  price: number
  thumbnail: string
  status: string
  bedrooms: number
  bathrooms: number
}

export default function FeaturedPropertiesSection() {
  const [properties, setProperties] = useState<FeaturedProperty[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchFeaturedProperties = async () => {
      setIsLoading(true)
      const supabase = createClient()

      try {
        let props: any[] = []

        try {
          const { data: featuredProps, error } = await supabase
            .from("featured_properties")
            .select(`
              property:properties(
                id,
                title,
                location,
                price,
                thumbnail,
                status,
                bedrooms,
                bathrooms
              )
            `)
            .order("priority", { ascending: false })
            .limit(6)

          if (error) throw error

          if (featuredProps && featuredProps.length > 0) {
            props = featuredProps.map((item: any) => item.property).filter((prop) => prop !== null)
          }
        } catch (featuredError) {
          console.warn("Featured properties fetch failed, using fallback:", featuredError)
        }

        if (props.length === 0) {
          // Fallback to latest available properties
          const { data: allProps, error: fallbackError } = await supabase
            .from("properties")
            .select("id, title, location, price, thumbnail, status, bedrooms, bathrooms")
            .eq("status", "available")
            .order("created_at", { ascending: false })
            .limit(6)

          if (fallbackError) throw fallbackError
          props = allProps || []
        }

        setProperties(props)
      } catch (error) {
        console.error("[v0] Error fetching featured properties:", error)
        setProperties([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchFeaturedProperties()
  }, [])

  if (isLoading) {
    return (
      <section className="py-32 lg:py-48 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="text-center py-20">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"></div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="featured-section" className="py-32 lg:py-48 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="relative flex flex-col lg:flex-row lg:items-end justify-between mb-24 gap-12">
          <div className="absolute -top-20 -left-10 text-[10rem] font-bold text-neutral-50 pointer-events-none whitespace-nowrap hidden lg:block select-none">
            EXCLUSIVE
          </div>

          <div className="max-w-3xl relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <span className="text-[0.75rem] uppercase tracking-[0.4em] font-bold text-neutral-400 mb-6 block">
                The Portfolio
              </span>
              <h2 className="text-5xl md:text-8xl font-light tracking-tighter leading-[0.9] text-black mb-8">
                Featured <br /> <span className="italic serif text-neutral-400">Residences</span>
              </h2>
              <div className="h-[1px] w-32 bg-black mb-8" />
              <p className="text-neutral-500 text-lg md:text-xl leading-relaxed max-w-xl font-light">
                Discover our curated selection of ultra-luxury properties, where architectural excellence meets refined
                living in Nigeria's most coveted locales.
              </p>
            </motion.div>
          </div>

          <Link
            href="/properties"
            className="group flex items-center gap-6 text-[0.7rem] uppercase tracking-[0.3em] font-bold text-black hover:text-neutral-500 transition-colors duration-500"
          >
            <span>View All Assets</span>
            <div className="relative w-12 h-[1px] bg-black group-hover:w-20 transition-all duration-500">
              <ArrowUpRight
                size={14}
                className="absolute -top-1.5 -right-1 opacity-0 group-hover:opacity-100 transition-all duration-500"
              />
            </div>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
          {properties.length > 0 ? (
            properties.map((property, idx) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                viewport={{ once: true }}
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
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-neutral-500 text-lg">No featured properties available</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
