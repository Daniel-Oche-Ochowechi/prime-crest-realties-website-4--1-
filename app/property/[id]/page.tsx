"use client"

import { useEffect, useState } from "react"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import PropertyGallery from "@/components/property/property-gallery"
import PropertyDetails from "@/components/property/property-details"
import PropertySidebar from "@/components/property/property-sidebar"
import PropertyAmenities from "@/components/property/property-amenities"
import PropertyMap from "@/components/property/property-map"
import MessageForm from "@/components/property/message-form"
import SimilarProperties from "@/components/property/similar-properties"
import { createClient } from "@/lib/supabase/client"

export default function PropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const [resolvedParams, setResolvedParams] = useState<{ id: string } | null>(null)
  const [property, setProperty] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    const resolveAndFetch = async () => {
      try {
        const resolved = await params
        if (!isMounted) return

        setResolvedParams(resolved)

        const supabase = createClient()
        const { data, error } = await supabase.from("properties").select("*").eq("id", resolved.id).single()

        if (!isMounted) return

        if (error) {
          console.error("[v0] Error fetching property:", error)
          setProperty(null)
        } else {
          setProperty(data)
        }
      } catch (err) {
        console.error("[v0] Error resolving params:", err)
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    resolveAndFetch()

    return () => {
      isMounted = false
    }
  }, [params])

  if (isLoading) {
    return (
      <div className="bg-white min-h-screen">
        <Navbar />
        <div className="pt-32 pb-12 text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"></div>
          <p className="mt-4 text-sm uppercase tracking-widest text-neutral-400">Loading property...</p>
        </div>
        <Footer />
      </div>
    )
  }

  if (!property) {
    return (
      <div className="bg-white min-h-screen">
        <Navbar />
        <div className="pt-32 pb-12 text-center text-neutral-gray">
          <h1 className="text-2xl font-bold mb-4">Property not found</h1>
          <p>The property you're looking for doesn't exist or has been removed.</p>
        </div>
        <Footer />
      </div>
    )
  }

  const transformedProperty = {
    ...property,
    highlights: {
      bedrooms: property.bedrooms?.toString() || "0",
      bathrooms: property.bathrooms?.toString() || "0",
      sqft: property.sqft || 0,
      parking: property.parking?.toString() || "0",
    },
    agent_contact: {
      phone: property.agent_phone || "+234 (0) 123 456 7890",
      email: property.agent_email || "info@primecrest.com",
      whatsapp: property.agent_whatsapp || "+234 (0) 123 456 7890",
    },
    map_coordinates: {
      lat: property.lat || 6.5244,
      lng: property.lng || 3.3792,
    },
  }

  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <main className="pt-24 pb-24">
        <div className="max-w-[1400px] mx-auto px-6 mb-16">
          <PropertyGallery images={transformedProperty.images || []} />
        </div>

        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            <div className="lg:col-span-8 space-y-24">
              <PropertyDetails property={transformedProperty} />

              <div className="space-y-12">
                <h2 className="text-[0.7rem] uppercase tracking-[0.4em] font-bold text-neutral-300 flex items-center gap-4">
                  Exclusive Amenities <span className="h-[1px] flex-1 bg-neutral-100" />
                </h2>
                <PropertyAmenities amenities={transformedProperty.amenities || []} />
              </div>

              {transformedProperty.video_url && (
                <div className="space-y-12">
                  <h2 className="text-[0.7rem] uppercase tracking-[0.4em] font-bold text-neutral-300 flex items-center gap-4">
                    Cinematic Tour <span className="h-[1px] flex-1 bg-neutral-100" />
                  </h2>
                  <div className="aspect-video rounded-none overflow-hidden grayscale-[0.2] hover:grayscale-0 transition-all duration-1000 shadow-2xl">
                    <iframe
                      src={transformedProperty.video_url}
                      title="Property Virtual Tour"
                      className="w-full h-full"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}

              <PropertyMap coordinates={transformedProperty.map_coordinates} />
              <MessageForm propertyId={transformedProperty.id} />
            </div>

            <div className="lg:col-span-4">
              <PropertySidebar property={transformedProperty} />
            </div>
          </div>
        </div>

        <SimilarProperties currentPropertyId={transformedProperty.id} />
      </main>
      <Footer />
    </div>
  )
}
