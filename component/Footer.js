"use client";
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
    <footer className="bg-slate-900 text-slate-300 pt-12 md:pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* --- Top Section: Responsive Grid --- */}
        {/* Changed: 1 column on mobile, 2 on tablet, 5 on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 md:gap-12 pb-12 md:pb-16 border-b border-slate-800">
          
          {/* Brand Column - Centered on mobile */}
          <div className="lg:col-span-2 space-y-6 text-center sm:text-left">
            <Link href="/" className="inline-block">
              <div className="relative w-[160px] md:w-[180px] h-[45px] md:h-[50px] mx-auto sm:mx-0">
                <Image 
                  src="/images/logo01.png" 
                  alt="TRIPAANGO" 
                  fill 
                  className="object-contain object-center sm:object-left"
                />
              </div>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm mx-auto sm:mx-0">
              Simplifying property management and discovery across the globe. 
              Find your dream stay with curated listings and verified hosts.
            </p>
            <div className="flex justify-center sm:justify-start gap-4 pt-2">
              {[Instagram, Twitter, Facebook, Linkedin].map((Icon, i) => (
                <Link key={i} href="#" className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-slate-700 flex items-center justify-center hover:bg-orange-600 hover:border-orange-600 hover:text-white transition-all duration-300">
                  <Icon size={16} />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="text-center sm:text-left">
            <h4 className="text-white font-bold mb-5 md:mb-6 text-[10px] md:text-xs uppercase tracking-widest">Company</h4>
            <ul className="space-y-3 md:space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm hover:text-orange-500 transition-colors flex items-center justify-center sm:justify-start group">
                    {link.name} 
                    <ArrowUpRight size={12} className="ml-1 opacity-0 group-hover:opacity-100 -translate-y-0.5 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column */}
          <div className="text-center sm:text-left">
            <h4 className="text-white font-bold mb-5 md:mb-6 text-[10px] md:text-xs uppercase tracking-widest">Services</h4>
            <ul className="space-y-3 md:space-y-4">
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
          <div className="space-y-6 text-center sm:text-left">
            <h4 className="text-white font-bold mb-5 md:mb-6 text-[10px] md:text-xs uppercase tracking-widest">Contact Us</h4>
            <div className="space-y-4 md:space-y-5 text-sm">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-3">
                <MapPin size={18} className="text-orange-600 shrink-0 mt-0.5" />
                <span className="leading-relaxed text-slate-400 text-center sm:text-left">123 Bengaluru,<br />Karnataka, India</span>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
                <Phone size={18} className="text-orange-600 shrink-0" />
                <span className="text-slate-400">+91 9999999999</span>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
                <Mail size={18} className="text-orange-600 shrink-0" />
                <span className="text-slate-400">support@tripaango.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* --- Middle Section: Newsletter --- */}
        {/* Changed: Stack vertically on mobile, row on large screens */}
        <div className="py-10 md:py-12 flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-8 border-b border-slate-800/50">
          <div className="text-center lg:text-left space-y-2">
            <h3 className="text-lg md:text-xl font-bold text-white">Subscribe to our newsletter</h3>
            <p className="text-slate-400 text-sm">Get latest property deals and travel tips weekly.</p>
          </div>
          <div className="flex flex-col sm:flex-row w-full lg:w-auto max-w-md gap-3">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 bg-slate-800/50 border border-slate-700 rounded-full px-6 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-600/20 focus:border-orange-600/50 transition-all text-center sm:text-left"
            />
            <button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-full font-bold text-sm transition-all active:scale-95 shadow-lg shadow-orange-900/20">
              Subscribe
            </button>
          </div>
        </div>

        {/* --- Bottom Section: Copyright --- */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
          <p className="text-[10px] md:text-[11px] font-medium text-slate-500 uppercase tracking-widest text-center">
            © {currentYear} tripaango.com. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {footerLinks.support.slice(1, 3).map((link) => (
              <Link key={link.name} href={link.href} className="text-[10px] md:text-[11px] uppercase tracking-widest hover:text-white transition-colors">
                {link.name}
              </Link>
            ))}
            <Link href="/sitemap" className="text-[10px] md:text-[11px] uppercase tracking-widest hover:text-white transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}