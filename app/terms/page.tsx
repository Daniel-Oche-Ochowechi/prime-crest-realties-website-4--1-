import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import { FileCheck, Scale, AlertCircle, UserCheck, RefreshCw, Shield } from "lucide-react"

export const metadata = {
  title: "Terms of Service | PrimeCrest Realties",
  description: "Terms and conditions governing the use of PrimeCrest Realties services and website.",
}

export default function TermsPage() {
  const sections = [
    {
      icon: FileCheck,
      title: "Acceptance of Terms",
      content:
        "By accessing and using PrimeCrest Realties' website and services, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services. We reserve the right to modify these terms at any time, and continued use constitutes acceptance of modifications.",
    },
    {
      icon: Scale,
      title: "Use of Services",
      content:
        "Our services are provided for the purpose of real estate transactions and property information. You agree to use our services only for lawful purposes and in accordance with these Terms. You must not use our services in any way that causes damage to the website or impairs availability or accessibility.",
    },
    {
      icon: UserCheck,
      title: "User Responsibilities",
      content:
        "You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account. You agree to provide accurate, current, and complete information during registration and to update such information to keep it accurate and current.",
    },
    {
      icon: AlertCircle,
      title: "Property Listings & Information",
      content:
        "While we strive to ensure accuracy, property information, prices, and availability are subject to change without notice. All property details should be independently verified. PrimeCrest Realties is not responsible for errors or omissions in property listings or third-party content.",
    },
    {
      icon: RefreshCw,
      title: "Transactions & Fees",
      content:
        "All property transactions are subject to contract terms agreed upon between parties. Service fees and commission structures will be clearly communicated before any transaction. Payment terms and conditions will be outlined in separate agreements specific to each transaction.",
    },
    {
      icon: Shield,
      title: "Limitation of Liability",
      content:
        "PrimeCrest Realties shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use our services. We do not guarantee that our services will be uninterrupted, secure, or error-free.",
    },
  ]

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24">
        <div className="max-w-5xl mx-auto px-8 lg:px-16">
          <div className="mb-20 space-y-6">
            <span className="text-[0.7rem] uppercase tracking-[0.4em] font-bold text-neutral-400 block">
              Legal Agreement
            </span>
            <h1 className="text-6xl md:text-8xl font-light tracking-tighter text-neutral-900 leading-none">
              Terms of <span className="italic serif">Service</span>
            </h1>
            <p className="text-neutral-500 text-xl max-w-3xl font-light leading-relaxed">
              These Terms of Service govern your use of PrimeCrest Realties' website and services. Please read them
              carefully before using our platform.
            </p>
            <div className="pt-4 flex items-center gap-4 text-sm text-neutral-400">
              <span className="uppercase tracking-widest font-medium">Effective Date</span>
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

          <div className="mt-24 pt-12 border-t border-neutral-200 space-y-12">
            <div className="bg-amber-50 border border-amber-200 p-12 space-y-4">
              <div className="flex items-start gap-4">
                <AlertCircle size={24} className="text-amber-600 flex-shrink-0 mt-1" strokeWidth={1.5} />
                <div className="space-y-3">
                  <h3 className="text-xl font-medium text-amber-900 tracking-tight">Important Notice</h3>
                  <p className="text-amber-800 leading-relaxed font-light">
                    These terms constitute a legally binding agreement. By using our services, you acknowledge that you
                    have read, understood, and agree to be bound by these terms. If you have questions or require
                    clarification, please contact our legal team before proceeding.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-neutral-50 border border-neutral-200 p-12 space-y-6">
              <h3 className="text-2xl font-light text-neutral-900 tracking-tight">Questions About Our Terms?</h3>
              <p className="text-neutral-600 leading-relaxed font-light">
                If you have any questions about these Terms of Service or need legal assistance, our team is available
                to help clarify any concerns you may have.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a
                  href="mailto:legal@primecrest.com"
                  className="px-8 py-4 bg-black text-white text-[0.65rem] uppercase tracking-[0.4em] font-bold hover:bg-neutral-800 transition-colors text-center"
                >
                  Contact Legal Team
                </a>
                <a
                  href="/contact"
                  className="px-8 py-4 bg-transparent border border-neutral-300 text-neutral-900 text-[0.65rem] uppercase tracking-[0.4em] font-bold hover:border-black transition-colors text-center"
                >
                  General Support
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
