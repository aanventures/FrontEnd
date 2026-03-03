import Link from "next/link";
import Image from "next/image";
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin,
  ArrowUpRight
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: "About Us", href: "/about" },
      { name: "Our Team", href: "/team" },
      { name: "Careers", href: "/careers" },
      { name: "Contact", href: "/contact" },
    ],
    services: [
      { name: "List Property", href: "/admin/properties/add" },
      { name: "Luxury Villas", href: "/search?type=Villa" },
      { name: "Studio Apartments", href: "/search?type=Studio" },
      { name: "Office Spaces", href: "/search?type=Office" },
    ],
    support: [
      { name: "Help Center", href: "/help" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Cancellation Policy", href: "/cancellation" },
    ]
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Top Section: Branding & Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-slate-800">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-3">
                <Image width={190} height={50} src={"/images/logo.png"} alt="logo" />
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Simplifying property management and discovery across the globe. 
              Find your dream stay with curated listings and verified hosts.
            </p>
            <div className="flex gap-4">
              {[Instagram, Twitter, Facebook, Linkedin].map((Icon, i) => (
                <Link key={i} href="#" className="w-10 h-10 rounded-full border border-slate-800 flex items-center justify-center hover:bg-orange-600 hover:border-orange-600 hover:text-white transition-all">
                  <Icon size={18} />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Company</h4>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm hover:text-orange-500 transition-colors flex items-center group">
                    {link.name} 
                    <ArrowUpRight size={12} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Services</h4>
            <ul className="space-y-4">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm hover:text-orange-500 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="space-y-6">
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Contact Us</h4>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-orange-600 shrink-0" />
                <span>123 Travel Lane, Bengaluru,<br />Karnataka 560001</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-orange-600 shrink-0" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-orange-600 shrink-0" />
                <span>support@seashi.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Section: Newsletter Placeholder */}
        <div className="py-12 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="text-center lg:text-left">
            <h3 className="text-xl font-bold text-white">Subscribe to our newsletter</h3>
            <p className="text-slate-400 text-sm">Get the latest property deals and travel tips weekly.</p>
          </div>
          <div className="flex w-full lg:w-auto max-w-md gap-2">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-600/50"
            />
            <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-xl font-bold text-sm transition-all active:scale-95">
              Subscribe
            </button>
          </div>
        </div>

        {/* Bottom Section: Copyright */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs font-medium text-slate-500">
            © {currentYear} Seashi. All rights reserved. Developed for Property Management.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-xs hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="text-xs hover:text-white transition-colors">Terms</Link>
            <Link href="/sitemap" className="text-xs hover:text-white transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}