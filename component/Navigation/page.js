'use client';

import Link from "next/link";

export default function Navigation() {
  return (
    <header className="w-full bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 backdrop-blur-md bg-opacity-90 sticky top-0 z-50 border-b border-slate-700/50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo - Left */}
          <Link href="/" className="group flex items-center gap-3 flex-shrink-0">
            <div className="w-11 h-11 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-blue-500/50 transition-all duration-300 group-hover:scale-110">
              <span className="text-white font-bold text-lg">P</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent hidden sm:block">
              Property
            </span>
          </Link>

          {/* Menu - Center */}
          <nav className="hidden md:flex flex-1 items-center justify-center gap-1">
            {[
              { href: "/", label: "Home" },
              { href: "/about", label: "About" },
              { href: "/blog", label: "Blog" },
              { href: "/contact", label: "Contact" }
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-slate-300 font-medium text-sm transition-colors duration-200 group"
              >
                <span className="group-hover:text-white">{link.label}</span>
                <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </Link>
            ))}
          </nav>

          {/* Sign In Button - Right */}
          <Link
            href="/signin"
            className="flex-shrink-0 relative group px-7 py-2.5 font-semibold text-white text-sm rounded-lg overflow-hidden transition-all duration-300 active:scale-95"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg group-hover:shadow-lg group-hover:shadow-blue-500/50"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative">Sign In</span>
          </Link>
        </div>
      </div>
    </header>
  );
}