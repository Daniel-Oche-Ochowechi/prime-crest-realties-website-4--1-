import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import ContactForm from "@/components/contact/contact-form"
import ContactInfo from "@/components/contact/contact-info"

export const metadata = {
  title: "Contact Us | PrimeCrest Realties",
  description: "Get in touch with PrimeCrest Realties for property inquiries.",
}

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-primary mb-4 tracking-wider">Get In Touch</h1>
            <p className="text-neutral-gray text-lg">We'd love to hear from you. Contact us for any inquiries.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ContactForm />
            <ContactInfo />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
