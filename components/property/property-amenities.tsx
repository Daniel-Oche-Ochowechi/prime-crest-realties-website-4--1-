import { Check, Shield, Zap, Wind, Droplets, Waves, Car, Wifi } from "lucide-react"

interface PropertyAmenitiesProps {
  amenities: string[]
}

export default function PropertyAmenities({ amenities }: PropertyAmenitiesProps) {
  const getIcon = (amenity: string) => {
    const a = amenity.toLowerCase()
    if (a.includes("security") || a.includes("gated")) return Shield
    if (a.includes("power") || a.includes("electricity")) return Zap
    if (a.includes("ac") || a.includes("air")) return Wind
    if (a.includes("water")) return Droplets
    if (a.includes("pool")) return Waves
    if (a.includes("parking")) return Car
    if (a.includes("internet") || a.includes("wi-fi")) return Wifi
    return Check
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-10 gap-x-12">
      {amenities.map((amenity, index) => {
        const Icon = getIcon(amenity)
        return (
          <div key={index} className="flex items-start gap-4 group">
            <div className="w-10 h-10 flex items-center justify-center border border-neutral-100 group-hover:border-black transition-all duration-500">
              <Icon size={16} strokeWidth={1.5} className="text-neutral-400 group-hover:text-black transition-colors" />
            </div>
            <div className="space-y-1 pt-1">
              <span className="text-[0.7rem] uppercase tracking-[0.2em] font-bold text-neutral-800 block">
                {amenity}
              </span>
              <span className="text-[0.6rem] uppercase tracking-[0.15em] text-neutral-400 font-medium">
                Included Feature
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
