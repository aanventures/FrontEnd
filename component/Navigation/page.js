"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

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
          ? "py-2 md:py-3 bg-white/80 backdrop-blur-lg border-b border-slate-200/50 shadow-sm"
          : "py-4 md:py-6 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between">
          {/* Logo Section - Responsive Width */}
          <Link href="/" className="group flex items-center flex-shrink-0">
            <div className="relative w-[140px] h-[35px] sm:w-[180px] sm:h-[45px] lg:w-[210px] lg:h-[55px]">
              <Image
                src="/images/logo.png"
                alt="TRIPAANGO Logo"
                fill
                priority
                className="object-contain"
              />
            </div>
          </Link>

          {/* Desktop Navigation - Hidden on mobile/tablet */}
          <nav className="hidden lg:flex items-center bg-slate-100/50 backdrop-blur-md rounded-full px-2 py-1 border border-slate-200/50">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-5 py-2 font-semibold text-sm transition-all rounded-full ${
                    isActive
                      ? "bg-white text-orange-600 shadow-sm"
                      : "text-slate-600 hover:text-orange-600 hover:bg-white/50"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              href="/login"
              className="hidden md:block text-sm font-bold text-slate-700 hover:text-orange-600 transition-colors px-2"
            >
              Sign In
            </Link>

            <Link
              href="/signup"
              className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 sm:px-6 sm:py-2.5 rounded-full font-bold text-[12px] sm:text-sm shadow-xl shadow-slate-200 transition-all active:scale-95 whitespace-nowrap"
            >
              Get Started
            </Link>

            {/* Mobile Toggle Button - Visible on md and below */}
            <button
              className="lg:hidden p-2 text-slate-900 hover:bg-slate-100 rounded-full transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    isMobileMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`absolute top-full left-0 w-full bg-white border-b border-slate-100 lg:hidden shadow-2xl transition-all duration-300 ease-in-out transform ${
          isMobileMenuOpen
            ? "translate-y-0 opacity-100 visible"
            : "-translate-y-4 opacity-0 invisible"
        }`}
      >
        <div className="flex flex-col p-6 gap-2">
          {/* Navigation Links */}
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-base font-bold p-3 rounded-xl transition-colors ${
                  isActive
                    ? "bg-orange-50 text-orange-600"
                    : "text-slate-900 hover:bg-slate-50"
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          {/* Sign In Link - Separated by HR */}
          <div className="md:hidden">
            <hr className="my-2 border-slate-100" />
            <Link
              href="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-base font-bold p-3 text-slate-600 hover:bg-slate-50 rounded-xl transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
