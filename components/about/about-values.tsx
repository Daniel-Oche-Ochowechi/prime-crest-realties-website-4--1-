import { Shield, Zap, Users, CheckCircle } from "lucide-react"

const values = [
  {
    icon: Shield,
    title: "Trust & Transparency",
    description: "Every property is verified with authentic documentation.",
  },
  {
    icon: Zap,
    title: "Speed & Efficiency",
    description: "Fast processing from inspection to documentation.",
  },
  {
    icon: Users,
    title: "Expert Support",
    description: "Dedicated agents ready to guide you at every step.",
  },
  {
    icon: CheckCircle,
    title: "Investor Friendly",
    description: "Flexible terms designed for all types of investors.",
  },
]

export default function AboutValues() {
  return (
    <section className="bg-secondary py-24">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-5xl font-bold text-primary mb-16 text-center tracking-wider">Our Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => {
            const Icon = value.icon
            return (
              <div key={index} className="card-premium p-8 text-center">
                <Icon size={48} className="text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold text-primary mb-3 tracking-wide">{value.title}</h3>
                <p className="text-neutral-gray text-sm leading-relaxed">{value.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
