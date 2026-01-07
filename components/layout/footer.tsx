import Link from "next/link"
import Image from "next/image"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#0a0a0a] text-white selection:bg-white selection:text-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          {/* Brand Section */}
          <div className="lg:col-span-5">
            <Link href="/" className="relative h-14 w-56 block mb-10">
              <Image src="/logo-white.png" alt="PrimeCrest Realties" fill className="object-contain object-left" />
            </Link>
            <p className="max-w-sm text-neutral-400 text-lg leading-relaxed font-light tracking-wide">
              Redefining luxury real estate through architectural excellence and unparalleled personalized advisory.
            </p>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2 lg:col-start-7">
            <h4 className="text-[0.7rem] uppercase tracking-[0.3em] font-bold mb-10 text-neutral-500">Navigation</h4>
            <ul className="space-y-5">
              {[
                { label: "Portfolio", href: "/portfolio" },
                { label: "Properties", href: "/properties" },
                { label: "About Us", href: "/about" },
                { label: "Contact", href: "/contact" },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="font-light hover:text-accent transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="lg:col-span-2">
            <h4 className="text-[0.75rem] uppercase tracking-[0.15em] font-medium mb-8 opacity-40">Connect</h4>
            <ul className="space-y-4">
              {["Instagram", "LinkedIn", "Facebook", "Twitter"].map((item) => (
                <li key={item}>
                  <Link href="#" className="font-light hover:text-accent transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Office */}
          <div className="lg:col-span-2">
            <h4 className="text-[0.75rem] uppercase tracking-[0.15em] font-medium mb-8 opacity-40">Office</h4>
            <p className="font-light leading-relaxed">
              Victoria Island,
              <br />
              Lagos, Nigeria
            </p>
          </div>
        </div>

        <div className="mt-32 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between gap-6 text-sm font-light opacity-50">
          <p>© {currentYear} PrimeCrest Realties. Defined by Excellence.</p>
          <div className="flex gap-8">
            <Link href="/privacy" className="hover:opacity-100 transition-opacity">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:opacity-100 transition-opacity">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
