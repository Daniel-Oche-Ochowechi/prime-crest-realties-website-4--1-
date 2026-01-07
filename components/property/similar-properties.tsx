"use client"

import { useEffect, useState } from "react"
import PropertyCard from "@/components/property-card"
import { MOCK_PROPERTIES } from "@/lib/mock-data"

interface SimilarPropertiesProps {
  currentPropertyId: string
}

export default function SimilarProperties({ currentPropertyId }: SimilarPropertiesProps) {
  const [similarProperties, setSimilarProperties] = useState<any[]>([])

  useEffect(() => {
    // TODO: Replace with Convex query for similar properties based on location/type
    const filtered = MOCK_PROPERTIES.filter((p) => p._id !== currentPropertyId).slice(0, 3)
    setSimilarProperties(filtered)
  }, [currentPropertyId])

  if (similarProperties.length === 0) return null

  return (
    <section className="max-w-7xl mx-auto px-6 mt-24 pt-12 border-t border-neutral-light">
      <h2 className="text-4xl font-bold text-primary mb-12 tracking-wider">Similar Properties</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {similarProperties.map((property) => (
          <PropertyCard
            key={property._id}
            id={property._id}
            title={property.title}
            location={property.location}
            price={property.price}
            thumbnail={property.thumbnail}
            status={property.status}
            bedrooms={property.highlights.bedrooms}
            bathrooms={property.highlights.bathrooms}
          />
        ))}
      </div>
    </section>
  )
}
