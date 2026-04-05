"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import {
  User,
  Settings,
  LogOut,
  LayoutDashboard,
  ChevronDown,
  X,
  Menu,
} from "lucide-react";
import { logoutUser } from "@/store/authSlice";
import Image from "next/image";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const pathname = usePathname();
  const dispatch = useDispatch();

  const { user, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
  }, [isMobileMenuOpen]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProfileOpen(false);
  }, [pathname]);

  const handleLogout = () => {
    dispatch(logoutUser());
    setIsProfileOpen(false);
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about-us", label: "About Us" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 w-full z-[100] transition-all duration-500 ease-in-out flex items-center font-montserrat  ${
          isScrolled
            ? "h-15 sm:h-24 bg-white border-b border-slate-200 shadow-sm"
            : "h-15 sm:h-24 bg-white"
        }`}
      >
        <div className="max-w-[1440px] w-full mx-auto px-4 md:px-6 ">
          <div className="flex items-center justify-between h-full">
            {/* Logo Section */}
            <Link
              href="/"
              /* Fixed the Link height to match the header (h-24 = 96px) and added flex centering */
              className="group relative z-[60] flex flex-col justify-center items-start overflow-hidden transition-all duration-500 w-[120px] h-[60px] md:w-[220px] md:h-24"
            >
              {/* The Wrapper is the actual 130px logo height */}
              <div className="relative w-full h-[80px] md:h-[130px] shrink-0 transition-transform duration-500 group-hover:scale-105">
                <Image
                  src="/images/logo101.png"
                  alt="Tripaango Logo"
                  fill
                  sizes="(max-width: 768px) 120px, 220px"
                  className="object-contain" // Keeps logo centered inside the 130px wrapper
                  priority
                />
              </div>
            </Link>
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative text-[12px] font-black uppercase tracking-[0.15em] transition-colors duration-300 group py-1 ${
                      isActive
                        ? "text-[#1F4165]"
                        : "text-slate-900 hover:text-amber-600"
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute bottom-0 left-0 h-[3px] transition-all duration-300 ease-out bg-amber-600 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* Action Buttons */}
            <div className="flex items-center gap-4 relative z-[60]">
              {isAuthenticated ? (
                <div
                  className="relative"
                  onMouseEnter={() => setIsProfileOpen(true)}
                  onMouseLeave={() => setIsProfileOpen(false)}
                >
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-2 p-1 pr-3 rounded-full transition-all duration-300 shadow-sm border bg-slate-100 border-slate-200"
                  >
                    <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-amber-600 flex items-center justify-center text-white overflow-hidden ring-1 ring-white/20">
                      {user?.avatar?.url ? (
                        <img
                          src={user.avatar.url}
                          alt="profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User size={12} />
                      )}
                    </div>
                    <ChevronDown
                      size={12}
                      className={`hidden sm:block transition-transform duration-500 text-slate-700 ${isProfileOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {/* DROPDOWN MENU */}
                  <div
                    className={`absolute right-0 mt-2 z-[110] w-52 bg-white rounded-xl shadow-2xl p-1.5 transition-all duration-300 border border-slate-100 ${
                      isProfileOpen
                        ? "opacity-100 scale-100 visible"
                        : "opacity-0 scale-95 invisible"
                    }`}
                  >
                    <div className="px-3 py-2 border-b border-slate-50 mb-1">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">
                        Account
                      </p>
                      <p className="text-xs font-black text-slate-800 truncate">
                        {user?.email}
                      </p>
                    </div>
                    <Link
                      href="/admin"
                      className="flex items-center gap-3 px-3 py-2 text-xs font-bold text-slate-600 hover:bg-amber-50 hover:text-amber-600 rounded-lg transition-colors"
                    >
                      <LayoutDashboard size={14} /> Dashboard
                    </Link>
                    <Link
                      href="/profile"
                      className="flex items-center gap-3 px-3 py-2 text-xs font-bold text-slate-600 hover:bg-amber-50 hover:text-amber-600 rounded-lg transition-colors"
                    >
                      <User size={14} /> My Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full mt-1 flex items-center gap-3 px-3 py-2 text-xs font-black text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <LogOut size={14} /> Sign Out
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <Link
                    href="/login"
                    className="relative text-[11px] font-black uppercase tracking-widest group py-1 transition-colors text-slate-800 hover:text-amber-600"
                  >
                    Sign In
                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-amber-600 transition-all duration-300 group-hover:w-full" />
                  </Link>
                  <Link
                    href="/signup"
                    className="hidden sm:block bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-md font-black text-[11px] uppercase tracking-widest transition-all duration-300 hover:shadow-lg"
                  >
                    Sign Up
                  </Link>
                </div>
              )}

              <button
                className="lg:hidden p-1.5 rounded-lg transition-all duration-300 text-slate-900 hover:bg-slate-100"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* --- MOBILE OVERLAY & MENU --- */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[120] transition-opacity duration-700 lg:hidden ${
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      <aside
        className={`fixed top-0 right-0 h-full w-[300px] bg-slate-900 z-[130] shadow-2xl transform transition-transform duration-500 ease-out lg:hidden flex flex-col ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full pt-24 px-8 pb-8">
          <p className="text-amber-500 text-[10px] uppercase tracking-[0.4em] font-black mb-8 opacity-60">
            Menu
          </p>
          <nav className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-2xl font-black tracking-tighter transition-all duration-300 hover:translate-x-2 ${
                  pathname === link.href ? "text-amber-500" : "text-white/90"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="mt-auto space-y-5">
            {!isAuthenticated ? (
              <Link
                href="/login"
                className="block text-center text-white font-black uppercase tracking-widest text-[12px] border border-white/20 py-4 rounded-xl hover:bg-white/5 transition-all"
              >
                Sign In
              </Link>
            ) : (
              <Link
                href="/profile"
                className="block text-center text-white font-black uppercase tracking-widest text-[12px] border border-amber-500 py-4 rounded-xl hover:bg-amber-500/10 transition-all"
              >
                View Profile
              </Link>
            )}
            <div className="flex items-center justify-between pt-6 border-t border-white/10">
              <div className="space-y-1">
                <p className="text-[9px] uppercase text-white/40 tracking-widest font-black">
                  Support
                </p>
                <p className="text-white/80 text-xs font-bold">
                  help@tripaango.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
