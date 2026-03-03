"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation"; // 1. Import usePathname

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname(); // 2. Initialize pathname

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "py-3 bg-white/80 backdrop-blur-lg border-b border-slate-200/50 shadow-sm"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <Link href="/" className="group flex items-center gap-2.5">
            <Image
              src="/images/logo.png"
              alt="TRIPAANGO Logo"
              width={230}
              height={60}
              priority
              className="w-auto h-15"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center bg-slate-100/50 backdrop-blur-md rounded-full px-2 py-1 border border-slate-200/50">
            {navLinks.map((link) => {
              // 3. Check if the link is active
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-6 py-2 font-semibold text-sm transition-all rounded-full ${
                    isActive
                      ? "bg-white text-orange-600 shadow-sm" // Active Styles
                      : "text-slate-600 hover:text-orange-600 hover:bg-white/50" // Inactive Styles
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="hidden sm:block text-sm font-bold text-slate-700 hover:text-orange-600 transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-2.5 rounded-full font-bold text-sm shadow-xl shadow-slate-200 transition-all active:scale-95"
            >
              Get Started
            </Link>

            {/* Mobile Toggle */}
            <button
              className="md:hidden p-2 text-slate-900"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-b border-slate-100 p-6 md:hidden shadow-2xl">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-lg font-bold border-b border-slate-50 pb-2 transition-colors ${
                    isActive ? "text-orange-600" : "text-slate-900"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}