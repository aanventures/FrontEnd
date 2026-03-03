"use client";
import { useState } from "react";
import Image from "next/image";

export default function LoginForm() {
  const [loginMethod, setLoginMethod] = useState("email"); // 'email' or 'mobile'
  const [showOtp, setShowOtp] = useState(false);

  return (
    <div className="w-full max-w-md p-8 bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-white">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Welcome Back</h2>
        <p className="text-slate-500 mt-2 text-sm font-medium">Please enter your details to sign in</p>
      </div>

      {/* Login Method Toggle */}
      <div className="flex bg-slate-100 p-1 rounded-2xl mb-6">
        <button
          onClick={() => { setLoginMethod("email"); setShowOtp(false); }}
          className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${loginMethod === "email" ? "bg-white text-orange-600 shadow-sm" : "text-slate-500"}`}
        >
          Email ID
        </button>
        <button
          onClick={() => { setLoginMethod("mobile"); setShowOtp(false); }}
          className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${loginMethod === "mobile" ? "bg-white text-orange-600 shadow-sm" : "text-slate-500"}`}
        >
          Mobile Number
        </button>
      </div>

      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        {loginMethod === "email" ? (
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
            <input
              type="email"
              placeholder="hello@example.com"
              className="w-full mt-2 px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all"
            />
          </div>
        ) : (
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
            <div className="flex gap-2 mt-2">
              <span className="flex items-center justify-center px-4 bg-slate-100 rounded-2xl text-slate-600 font-bold text-sm">+91</span>
              <input
                type="tel"
                placeholder="98765 43210"
                className="flex-1 px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all"
              />
            </div>
          </div>
        )}

        {showOtp && (
          <div className="animate-in fade-in slide-in-from-top-2 duration-300">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Enter OTP</label>
            <div className="grid grid-cols-4 gap-3 mt-2">
              {[1, 2, 3, 4].map((i) => (
                <input key={i} type="text" maxLength="1" className="w-full h-14 text-center text-xl font-bold bg-slate-50 border border-slate-100 rounded-xl focus:border-orange-500 outline-none" />
              ))}
            </div>
          </div>
        )}

        <button
          onClick={() => setShowOtp(true)}
          className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-2xl shadow-xl shadow-slate-200 transition-all active:scale-95"
        >
          {showOtp ? "Verify & Login" : "Send OTP"}
        </button>
      </form>

      {/* Divider */}
      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-100"></span></div>
        <div className="relative flex justify-center text-xs uppercase font-bold"><span className="bg-white px-4 text-slate-400">Or continue with</span></div>
      </div>

      {/* Social Login */}
      <button className="w-full flex items-center justify-center gap-3 py-4 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-all font-bold text-slate-700 active:scale-95">
        <svg className="w-5 h-5" viewBox="0 0 48 48">
          <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
          <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
          <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
          <path fill="#1976D2" d="M43.611,20.083L43.611,20.083L43.611,20.083C43.862,21.35,44,22.659,44,24c0,5.045-1.859,9.658-4.904,13.22l-6.303-5.328C34.502,30.395,36,27.37,36,24c0-1.402-0.272-2.736-0.758-3.917L43.611,20.083z" />
        </svg>
        Sign in with Google
      </button>

      <p className="text-center mt-8 text-sm text-slate-500 font-medium">
        Don't have an account? <a href="/signup" className="text-orange-600 font-bold hover:underline">Create one</a>
      </p>
    </div>
  );
}