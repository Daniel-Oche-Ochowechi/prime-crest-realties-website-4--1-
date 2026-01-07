"use client"

import { useState } from "react"
import PropertiesFilters from "@/components/properties/properties-filters"
import PropertiesGrid from "@/components/properties/properties-grid"

interface PPageContentProps {
    initialProperties: any[]
}

interface FilterState {
    search: string
    priceRange: [number, number]
    location: string
    propertyType: string
    bedrooms: string
    status: string
}

export default function PropertiesPageContent({ initialProperties }: PPageContentProps) {
    const [filters, setFilters] = useState<FilterState>({
        search: "",
        priceRange: [0, 500],
        location: "All Locations",
        propertyType: "All Types",
        bedrooms: "All Bedrooms",
        status: "All Status",
    })

    return (
        <div className="max-w-[1440px] mx-auto px-8 lg:px-16">
            <div className="mb-16 space-y-6">
                <span className="text-[0.7rem] uppercase tracking-[0.4em] font-bold text-neutral-400 block">
                    Discover Excellence
                </span>
                <h1 className="text-6xl md:text-8xl font-light tracking-tighter text-neutral-900">
                    Our <span className="italic serif">Properties</span>
                </h1>
                <p className="text-neutral-500 text-xl max-w-3xl font-light leading-relaxed tracking-wide">
                    Explore our curated selection of premium residential and commercial properties across Nigeria's most
                    prestigious locations.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[260px,1fr] gap-8 lg:gap-10">
                <PropertiesFilters onFilterChange={setFilters} />
                <div>
                    <PropertiesGrid filters={filters} initialProperties={initialProperties} />
                </div>
            </div>
        </div>
    )
}
