"use client"

import PropertiesGrid from "@/components/properties/properties-grid"

export function PortfolioClient() {
  return (
    <>
      <main className="pt-32 pb-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="mb-20 space-y-4">
            <span className="text-[0.8rem] uppercase tracking-[0.3em] font-medium text-muted-foreground block">
              Curated Selection
            </span>
            <h1 className="text-5xl md:text-7xl font-extralight tracking-tight leading-none text-primary">
              Exclusive <span className="italic serif">Portfolio</span>
            </h1>
            <p className="text-muted-foreground text-xl max-w-2xl font-light leading-relaxed">
              Explore our architectural masterpieces and premium investment opportunities curated for the discerning
              eye.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-12">
            <PropertiesGrid />
          </div>
        </div>
      </main>
    </>
  )
}
