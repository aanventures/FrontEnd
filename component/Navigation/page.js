"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { 
  User, 
  Settings, 
  LogOut, 
  LayoutDashboard, 
  ChevronDown 
} from "lucide-react";
import { logoutUser } from "@/store/authSlice";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  const pathname = usePathname();
  const dispatch = useDispatch();

  // Get user state from Redux
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    dispatch(logoutUser());
    setIsProfileOpen(false);
  };

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
          
          {/* Logo Section */}
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

          {/* Desktop Navigation */}
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

          {/* Action Buttons / Profile Section */}
          <div className="flex items-center gap-2 sm:gap-4">
            {isAuthenticated ? (
              /* LOGGED IN VIEW */
              <div className="relative group">
                <button 
                  onMouseEnter={() => setIsProfileOpen(true)}
                  className="flex items-center gap-2 p-1 pr-3 bg-white border border-slate-200 rounded-full hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 overflow-hidden border border-orange-200">
                    {user?.avatar?.url ? (
                      <img src={user.avatar.url} alt="profile" className="w-full h-full object-cover" />
                    ) : (
                      <User size={18} />
                    )}
                  </div>
                  <span className="hidden sm:block text-sm font-bold text-slate-700">
                    {user?.name?.split(" ")[0]}
                  </span>
                  <ChevronDown size={14} className={`text-slate-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu - appears on hover/click */}
                <div 
                  onMouseLeave={() => setIsProfileOpen(false)}
                  className={`absolute right-0 mt-2 w-56 bg-white border border-slate-100 rounded-2xl shadow-2xl p-2 transition-all duration-200 origin-top-right z-[60] ${
                    isProfileOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                  }`}
                >
                  <div className="px-4 py-3 border-b border-slate-50 mb-1">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Account</p>
                    <p className="text-sm font-black text-slate-800 truncate">{user?.email}</p>
                  </div>

                  <Link href="/admin" className="flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-slate-600 hover:bg-orange-50 hover:text-orange-600 rounded-xl transition-colors">
                    <LayoutDashboard size={16} /> Dashboard
                  </Link>

                  <Link href="/profile" className="flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-slate-600 hover:bg-orange-50 hover:text-orange-600 rounded-xl transition-colors">
                    <User size={16} /> My Profile
                  </Link>

                  <Link href="/settings" className="flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-slate-600 hover:bg-orange-50 hover:text-orange-600 rounded-xl transition-colors">
                    <Settings size={16} /> Settings
                  </Link>

                  <hr className="my-1 border-slate-50" />

                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                  >
                    <LogOut size={16} /> Sign Out
                  </button>
                </div>
              </div>
            ) : (
              /* LOGGED OUT VIEW */
              <>
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
              </>
            )}

            {/* Mobile Toggle Button */}
            <button
              className="lg:hidden p-2 text-slate-900 hover:bg-slate-100 rounded-full transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}