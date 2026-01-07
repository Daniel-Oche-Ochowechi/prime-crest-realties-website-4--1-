import { Phone, Mail, MapPin, Clock } from "lucide-react"

export default function ContactInfo() {
  const contactDetails = [
    {
      icon: Phone,
      label: "Phone",
      value: "+234 (0) 123 456 7890",
      link: "tel:+2341234567890",
    },
    {
      icon: Mail,
      label: "Email",
      value: "info@primecrest.com",
      link: "mailto:info@primecrest.com",
    },
    {
      icon: MapPin,
      label: "Office Address",
      value: "123 Ikoyi Lane, Lagos, Nigeria",
      link: "#",
    },
    {
      icon: Clock,
      label: "Business Hours",
      value: "Mon - Fri: 9:00 AM - 6:00 PM",
      link: "#",
    },
  ]

  return (
    <div>
      <h2 className="text-2xl font-bold text-primary mb-8 tracking-wider">Contact Information</h2>

      <div className="space-y-6">
        {contactDetails.map((detail, index) => {
          const Icon = detail.icon
          return (
            <a key={index} href={detail.link} className="card-premium p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <Icon size={24} className="text-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">{detail.label}</p>
                  <p className="text-neutral-gray">{detail.value}</p>
                </div>
              </div>
            </a>
          )
        })}
      </div>

      <div className="mt-12 pt-8 border-t border-neutral-light">
        <h3 className="text-xl font-bold text-primary mb-4 tracking-wider">Quick Connect</h3>
        <a href="https://wa.me/2341234567890" className="btn-primary inline-flex items-center gap-2 px-8 py-4">
          Message on WhatsApp
        </a>
      </div>
    </div>
  )
}
