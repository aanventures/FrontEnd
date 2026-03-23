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

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const pathname = usePathname();
  const dispatch = useDispatch();

  const { user, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProfileOpen(false); // Close dropdown on route change
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
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? "py-3 bg-slate-900/95 backdrop-blur-md shadow-xl border-b border-white/10"
            : "py-5 md:py-8 bg-transparent"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">
          <div className="flex items-center justify-between">
            {/* Logo Section */}
            <Link
              href="/"
              className="group flex flex-col items-start leading-tight relative z-[60]"
            >
              <span className="text-xl md:text-3xl font-serif font-bold text-white tracking-tighter transition-all">
                tripaango
              </span>
              <span className="text-[7px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.25em] text-white/60 font-medium whitespace-nowrap">
                Discover, Relax, and Go Beyond
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-[12px] font-bold uppercase tracking-widest transition-all ${
                      isActive
                        ? "text-[#C29263]"
                        : "text-white/80 hover:text-[#C29263]"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 md:gap-4 relative z-[60]">
              {isAuthenticated ? (
                /* PROFILE DROPDOWN WITH HOVER LOGIC */
                <div 
                  className="relative group"
                  onMouseEnter={() => setIsProfileOpen(true)}
                  onMouseLeave={() => setIsProfileOpen(false)}
                >
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-2 p-1 bg-white/10 border border-white/20 rounded-full hover:bg-white/20 transition-all"
                  >
                    <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-[#C29263] flex items-center justify-center text-white overflow-hidden border border-white/20">
                      {user?.avatar?.url ? (
                        <img
                          src={user.avatar.url}
                          alt="profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User size={14} />
                      )}
                    </div>
                    <ChevronDown
                      size={14}
                      className={`hidden sm:block text-white transition-transform duration-300 ${
                        isProfileOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  <div
                    className={`absolute right-0 mt-2 w-52 md:w-56 bg-white rounded-2xl shadow-2xl p-2 transition-all duration-300 origin-top-right ${
                      isProfileOpen
                        ? "opacity-100 scale-100 translate-y-0 visible"
                        : "opacity-0 scale-95 -translate-y-2 invisible pointer-events-none"
                    }`}
                  >
                    <div className="px-4 py-3 border-b border-slate-50 mb-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Account</p>
                      <p className="text-sm font-black text-slate-800 truncate">{user?.email}</p>
                    </div>
                    
                  

                    <Link
                      href="/admin"
                      className="flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-slate-600 hover:bg-orange-50 hover:text-orange-600 rounded-xl transition-colors"
                    >
                      <LayoutDashboard size={16} /> Dashboard
                    </Link>

                      {/* Profile Route */}
                    <Link
                      href="/profile"
                      className="flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-slate-600 hover:bg-orange-50 hover:text-orange-600 rounded-xl transition-colors"
                    >
                      <User size={16} /> My Profile
                    </Link>
                    
                    <button
                      onClick={handleLogout}
                      className="w-full mt-1 flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                    >
                      <LogOut size={16} /> Sign Out
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2 md:gap-4">
                  <Link
                    href="/login"
                    className="text-[11px] font-bold text-white uppercase tracking-widest hover:text-[#C29263] transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    className="hidden sm:block bg-[#C29263] hover:bg-[#A67C52] text-white px-4 py-2 md:px-7 md:py-3 rounded-md font-bold text-[10px] md:text-xs uppercase tracking-widest shadow-lg transition-all active:scale-95"
                  >
                    Book Now
                  </Link>
                </div>
              )}

              {/* Mobile Menu Toggle */}
              <button
                className="lg:hidden p-2 text-white hover:bg-white/10 rounded-full transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* --- MOBILE OVERLAY & MENU --- */}
      <div
        className={`fixed inset-0 bg-black/70 backdrop-blur-md z-[55] transition-opacity duration-500 lg:hidden ${
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      <aside
        className={`fixed top-0 right-0 h-full w-[85%] max-w-sm bg-slate-900 z-[56] shadow-2xl transform transition-transform duration-500 ease-in-out lg:hidden flex flex-col ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full pt-24 md:pt-32 px-6 md:px-10 pb-10">
          <p className="text-[#C29263] text-[10px] uppercase tracking-[0.3em] font-bold mb-8 opacity-60">Menu</p>
          <nav className="flex flex-col gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-2xl md:text-3xl font-serif font-light tracking-tight transition-all ${
                  pathname === link.href ? "text-[#C29263] translate-x-2" : "text-white/90"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="mt-auto pt-10 border-t border-white/10 space-y-6">
            {!isAuthenticated ? (
              <Link
                href="/login"
                className="block text-center text-white font-bold uppercase tracking-widest text-xs border border-white/20 py-4 rounded-xl hover:bg-white/5 transition-all"
              >
                Sign In to Account
              </Link>
            ) : (
                <Link
                href="/profile"
                className="block text-center text-white font-bold uppercase tracking-widest text-xs border border-[#C29263] py-4 rounded-xl hover:bg-[#C29263]/10 transition-all"
              >
                View Profile
              </Link>
            )}
            
            <div className="flex items-center justify-between px-2">
              <div className="space-y-1">
                <p className="text-[10px] uppercase text-white/40 tracking-widest">Support</p>
                <p className="text-white/80 text-xs">help@tripaango.com</p>
              </div>
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60">
                  <User size={18} />
                </div>
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60">
                  <Settings size={18} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}