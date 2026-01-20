import Link from 'next/link'
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#0F1115] text-[#F6F3EE] luxury-spacing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 border-b border-[#E8DCC4]/20 pb-16">
          {/* Brand Section */}
          <div className="flex flex-col">
            <h3 className="text-2xl font-bold mb-4 font-serif text-[#C9A24D]">DTRADERS</h3>
            <p className="text-[#E8DCC4] mb-6 leading-relaxed">
              Curated luxury furniture for the discerning home. Timeless elegance meets modern comfort.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-[#C9A24D] flex items-center justify-center hover:bg-[#C9A24D] hover:text-[#0F1115] transition-all duration-300"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-[#C9A24D] flex items-center justify-center hover:bg-[#C9A24D] hover:text-[#0F1115] transition-all duration-300"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-[#C9A24D] flex items-center justify-center hover:bg-[#C9A24D] hover:text-[#0F1115] transition-all duration-300"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-6 text-[#C9A24D]">Shop</h4>
            <ul className="space-y-3">
              {['Sofas', 'Chairs', 'Tables', 'Beds', 'Storage'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-[#E8DCC4] hover:text-[#C9A24D] transition-colors duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-6 text-[#C9A24D]">Support</h4>
            <ul className="space-y-3">
              {[
                { label: 'Contact Us', href: '#' },
                { label: 'Shipping Info', href: '#' },
                { label: 'Returns', href: '#' },
                { label: 'FAQ', href: '#' },
                { label: 'Size Guide', href: '#' },
              ].map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="text-[#E8DCC4] hover:text-[#C9A24D] transition-colors duration-300">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-6 text-[#C9A24D]">Get in Touch</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Phone size={18} className="text-[#C9A24D] mt-1 flex-shrink-0" />
                <div>
                  <p className="text-[#E8DCC4] text-sm">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail size={18} className="text-[#C9A24D] mt-1 flex-shrink-0" />
                <div>
                  <p className="text-[#E8DCC4] text-sm">hello@dtraders.com</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-[#C9A24D] mt-1 flex-shrink-0" />
                <div>
                  <p className="text-[#E8DCC4] text-sm">123 Luxury Lane</p>
                  <p className="text-[#E8DCC4] text-sm">New York, NY 10001</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center py-8">
          <p className="text-[#E8DCC4] text-sm mb-4 md:mb-0">
            © {currentYear} DTRADERS Luxury Furniture. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-[#E8DCC4] hover:text-[#C9A24D] transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="text-[#E8DCC4] hover:text-[#C9A24D] transition-colors duration-300">
              Terms of Service
            </a>
            <a href="#" className="text-[#E8DCC4] hover:text-[#C9A24D] transition-colors duration-300">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
