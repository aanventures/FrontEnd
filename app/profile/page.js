"use client";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  User,
  Mail,
  Phone,
  ShieldCheck,
  LayoutDashboard,
  Settings,
  Camera,
  LogOut,
} from "lucide-react";
import { logoutUser } from "@/store/authSlice";
import Link from "next/link";

export default function ProfilePage() {
  const { user, loading } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState("profile");
  const dispatch = useDispatch();

  const sidebarLinks = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      href: "/admin/dashboard",
    },
    { id: "profile", label: "My Profile", icon: <User size={20} /> },
    { id: "settings", label: "Settings", icon: <Settings size={20} /> },
  ];

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  if (!user)
    return (
      <div className="h-screen flex items-center justify-center">
        Please login to view profile.
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-50/50 pt-28 pb-12 px-4">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* LEFT SIDE: Sidebar */}
        <div className="w-full lg:w-80 shrink-0">
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-6 space-y-2 sticky top-28">
            <div className="flex flex-col items-center pb-6 border-b border-slate-50 mb-4">
              <div className="relative w-24 h-24 rounded-full bg-orange-100 border-4 border-white shadow-xl overflow-hidden group">
                {user.avatar?.url ? (
                  <img
                    src={user.avatar.url}
                    className="w-full h-full object-cover"
                    alt="avatar"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-orange-600 font-black text-3xl">
                    {user.name?.charAt(0)}
                  </div>
                )}
                <button className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                  <Camera size={20} />
                </button>
              </div>
              <h3 className="mt-4 text-xl font-black text-slate-800">
                {user.name}
              </h3>
              <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">
                {user.role}
              </p>
            </div>

            {sidebarLinks.map((link) => {
              const isActive = activeTab === link.id;

              // Define common styles to keep it DRY
              const baseStyles = `w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-bold text-sm transition-all`;
              const activeStyles = isActive
                ? "bg-orange-600 text-white shadow-lg shadow-orange-200"
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-900";

              const className = `${baseStyles} ${activeStyles}`;

              // If there is an href, render a Link
              if (link.href) {
                return (
                  <Link key={link.id} href={link.href} className={className}>
                    {link.icon}
                    {link.label}
                  </Link>
                );
              }

              // Otherwise, render a Button for internal state changes
              return (
                <button
                  key={link.id}
                  onClick={() => setActiveTab(link.id)}
                  className={className}
                >
                  {link.icon}
                  {link.label}
                </button>
              );
            })}

            <button
              onClick={() => dispatch(logoutUser())}
              className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-bold text-sm text-red-500 hover:bg-red-50 transition-all mt-8"
            >
              <LogOut size={20} /> Logout
            </button>
          </div>
        </div>

        {/* RIGHT SIDE: Content Area */}
        <div className="flex-1 space-y-6">
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8 md:p-12">
            <div className="mb-10">
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                Personal Information
              </h1>
              <p className="text-slate-500 font-medium">
                Manage your account details and preferences.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Full Name */}
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
                  Full Name
                </label>
                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm text-slate-400">
                    <User size={18} />
                  </div>
                  <span className="font-bold text-slate-700">{user.name}</span>
                </div>
              </div>

              {/* Email Address */}
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
                  Email Address
                </label>
                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm text-slate-400">
                    <Mail size={18} />
                  </div>
                  <span className="font-bold text-slate-700">
                    {user.email || "Not linked"}
                  </span>
                </div>
              </div>

              {/* Mobile Number */}
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
                  Phone Number
                </label>
                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm text-slate-400">
                    <Phone size={18} />
                  </div>
                  <span className="font-bold text-slate-700">
                    +91 {user.mobile}
                  </span>
                </div>
              </div>

              {/* Account Role */}
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
                  Account Type
                </label>
                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm text-orange-600">
                    <ShieldCheck size={18} />
                  </div>
                  <span className="font-bold text-slate-700 capitalize">
                    {user.role} Account
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-slate-50 flex justify-end">
              <button className="px-8 py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 active:scale-95">
                Edit Profile Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
