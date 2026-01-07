
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import PropertyGallery from "@/components/property/property-gallery"
import PropertyDetails from "@/components/property/property-details"
import PropertySidebar from "@/components/property/property-sidebar"
import PropertyAmenities from "@/components/property/property-amenities"
import PropertyMap from "@/components/property/property-map"
import MessageForm from "@/components/property/message-form"
import SimilarProperties from "@/components/property/similar-properties"
import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"

export default async function PropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  const { id } = resolvedParams

  const supabase = await createClient()
  const { data: property, error } = await supabase.from("properties").select("*").eq("id", id).single()

  if (error || !property) {
    if (error && error.code !== 'PGRST116') {
      console.error("[v0] Error fetching property:", error)
    }
    notFound()
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

