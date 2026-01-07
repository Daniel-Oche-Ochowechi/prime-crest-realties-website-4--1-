import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import { Shield, Lock, Eye, Database, Globe, FileText } from "lucide-react"

export const metadata = {
  title: "Privacy Policy | PrimeCrest Realties",
  description: "Our commitment to protecting your privacy and personal information at PrimeCrest Realties.",
}

export default function PrivacyPage() {
  const sections = [
    {
      icon: Shield,
      title: "Information Collection",
      content:
        "We collect personal information you provide when contacting us, scheduling property viewings, or subscribing to our services. This includes your name, email address, phone number, and property preferences. We use this data to provide you with personalized real estate services and property recommendations.",
    },
    {
      icon: Lock,
      title: "Data Protection",
      content:
        "Your personal information is stored securely using industry-standard encryption protocols. We implement robust security measures including SSL encryption, secure databases, and regular security audits to protect your data from unauthorized access, disclosure, or misuse.",
    },
    {
      icon: Eye,
      title: "How We Use Your Information",
      content:
        "We use your information to respond to inquiries, schedule property viewings, send property listings matching your preferences, process transactions, and communicate important updates about our services. We never sell your personal information to third parties.",
    },
    {
      icon: Database,
      title: "Data Retention",
      content:
        "We retain your personal information for as long as necessary to provide our services and comply with legal obligations. You may request deletion of your data at any time by contacting our privacy team at privacy@primecrest.com.",
    },
    {
      icon: Globe,
      title: "Cookies & Tracking",
      content:
        "Our website uses cookies to enhance your browsing experience, analyze site traffic, and personalize content. You can control cookie preferences through your browser settings. We use analytics tools to understand how visitors interact with our site.",
    },
    {
      icon: FileText,
      title: "Your Rights",
      content:
        "You have the right to access, correct, or delete your personal information. You may opt-out of marketing communications at any time. To exercise these rights, please contact us at privacy@primecrest.com. We will respond to your request within 30 days.",
    },
  ]

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24">
        <div className="max-w-5xl mx-auto px-8 lg:px-16">
          <div className="mb-20 space-y-6">
            <span className="text-[0.7rem] uppercase tracking-[0.4em] font-bold text-neutral-400 block">
              Legal Framework
            </span>
            <h1 className="text-6xl md:text-8xl font-light tracking-tighter text-neutral-900 leading-none">
              Privacy <span className="italic serif">Policy</span>
            </h1>
            <p className="text-neutral-500 text-xl max-w-3xl font-light leading-relaxed">
              At PrimeCrest Realties, we are committed to protecting your privacy and ensuring the security of your
              personal information. This policy outlines how we collect, use, and safeguard your data.
            </p>
            <div className="pt-4 flex items-center gap-4 text-sm text-neutral-400">
              <span className="uppercase tracking-widest font-medium">Last Updated</span>
              <div className="h-px w-8 bg-neutral-200" />
              <span className="font-light">January 2, 2026</span>
            </div>
          </div>

          <div className="space-y-16">
            {sections.map((section, index) => (
              <div key={index} className="group">
                <div className="flex gap-8 items-start">
                  <div className="flex-shrink-0 mt-2">
                    <div className="bg-neutral-50 border border-neutral-200 p-4 rounded-full group-hover:bg-black group-hover:border-black transition-all duration-500">
                      <section.icon
                        size={24}
                        strokeWidth={1.5}
                        className="text-neutral-600 group-hover:text-white transition-colors duration-500"
                      />
                    </div>
                  </div>
                  <div className="flex-1 space-y-4">
                    <h2 className="text-3xl font-light tracking-tight text-neutral-900">{section.title}</h2>
                    <p className="text-neutral-600 text-lg leading-relaxed font-light">{section.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-24 pt-12 border-t border-neutral-200">
            <div className="bg-neutral-50 border border-neutral-200 p-12 space-y-6">
              <h3 className="text-2xl font-light text-neutral-900 tracking-tight">
                Questions About Our Privacy Policy?
              </h3>
              <p className="text-neutral-600 leading-relaxed font-light">
                If you have any questions or concerns about how we handle your personal information, please contact our
                privacy team. We're here to help and ensure your data is protected.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a
                  href="mailto:privacy@primecrest.com"
                  className="px-8 py-4 bg-black text-white text-[0.65rem] uppercase tracking-[0.4em] font-bold hover:bg-neutral-800 transition-colors text-center"
                >
                  Contact Privacy Team
                </a>
                <a
                  href="/contact"
                  className="px-8 py-4 bg-transparent border border-neutral-300 text-neutral-900 text-[0.65rem] uppercase tracking-[0.4em] font-bold hover:border-black transition-colors text-center"
                >
                  General Inquiries
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
