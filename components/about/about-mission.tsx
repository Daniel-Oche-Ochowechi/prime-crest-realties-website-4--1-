import Image from "next/image"

export default function AboutMission() {
  return (
    <section className="py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-5xl font-bold text-primary mb-6 tracking-wider">Our Mission</h2>
            <p className="text-neutral-gray leading-relaxed mb-4 text-lg">
              At PrimeCrest Realties, we believe every individual deserves access to premium, verified properties
              without hassle. With over 15 years of experience in Nigeria's dynamic real estate market, we've helped
              thousands of investors and families find their perfect property.
            </p>
            <p className="text-neutral-gray leading-relaxed text-lg">
              Our commitment to transparency, verified titles, and fast documentation sets us apart. We're more than
              agents—we're partners in your property journey.
            </p>
          </div>
          <div className="relative h-96 rounded-sm overflow-hidden">
            <Image src="/luxury-modern-office-interior.jpg" alt="Our Office" fill className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  )
}
