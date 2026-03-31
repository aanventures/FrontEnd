"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { authenticateUser, clearErrors } from "@/store/authSlice";

export default function LoginForm() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth,
  );

  const [loginMethod, setLoginMethod] = useState("mobile");
  const [showOtp, setShowOtp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);

  useEffect(() => {
    if (isAuthenticated) router.push("/");
  }, [isAuthenticated, router]);

  const handleOtpChange = (value, index) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 3)
      document.getElementById(`otp-${index + 1}`)?.focus();
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(clearErrors());
    if (loginMethod === "mobile") {
      if (!showOtp) {
        if (!/^[6-9]\d{9}$/.test(mobile)) return alert("Invalid mobile number");
        setShowOtp(true);
        return;
      }
      dispatch(authenticateUser({ mobile, otp: otp.join("") }));
    } else {
      if (!email || !password) return alert("Enter credentials");
      dispatch(authenticateUser({ email, password }));
    }
  };

  return (
    <div className="w-full max-w-[440px] mx-auto p-3 sm:p-6 md:p-8 bg-white rounded-[2rem] shadow-2xl border border-slate-100 font-montserrat">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tighter">Welcome Back</h2>
        <p className="text-[10px] uppercase font-black tracking-widest text-amber-600 mt-1">Start your next journey</p>
      </div>

      {/* METHOD TOGGLE */}
      <div className="flex bg-slate-50 p-1 rounded-2xl mb-8 border border-slate-100">
        <button
          onClick={() => {
            setLoginMethod("email");
            setShowOtp(false);
          }}
          className={`flex-1 py-3 text-[11px] uppercase tracking-widest font-black rounded-xl transition-all duration-300 ${loginMethod === "email" ? "bg-slate-900 text-white shadow-lg" : "text-slate-400 hover:text-slate-600"}`}
        >
          Email
        </button>
        <button
          onClick={() => {
            setLoginMethod("mobile");
            setShowOtp(false);
          }}
          className={`flex-1 py-3 text-[11px] uppercase tracking-widest font-black rounded-xl transition-all duration-300 ${loginMethod === "mobile" ? "bg-slate-900 text-white shadow-lg" : "text-slate-400 hover:text-slate-600"}`}
        >
          Mobile OTP
        </button>
      </div>

      <form className="space-y-6" onSubmit={handleLogin}>
        {loginMethod === "email" ? (
          <div className="space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-amber-500 transition-all font-bold text-sm placeholder:text-slate-300"
                placeholder="john@tripaango.com"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-amber-500 transition-all font-bold text-sm placeholder:text-slate-300"
                placeholder="••••••••"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                Mobile Number
              </label>
              <div className="flex gap-2">
                <span className="flex items-center justify-center px-4 bg-slate-100 border border-slate-100 rounded-2xl text-slate-900 font-black text-sm">
                  +91
                </span>
                <input
                  type="tel"
                  value={mobile}
                  maxLength={10}
                  onChange={(e) => setMobile(e.target.value)}
                  className="flex-1 px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-amber-500 font-bold text-sm"
                  placeholder="9876543210"
                />
              </div>
            </div>
            {showOtp && (
              <div className="animate-in fade-in slide-in-from-top-2 space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                  Verification Code
                </label>
                <div className="grid grid-cols-4 gap-3">
                  {otp.map((digit, i) => (
                    <input
                      key={i}
                      id={`otp-${i}`}
                      type="text"
                      maxLength="1"
                      value={digit}
                      onChange={(e) => handleOtpChange(e.target.value, i)}
                      className="w-full h-14 text-center text-xl font-black bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {error && (
          <p className="text-red-500 text-[11px] text-center font-black uppercase tracking-tight">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-amber-600 hover:bg-slate-900 text-white font-black py-4 rounded-2xl shadow-xl shadow-amber-600/20 transition-all active:scale-95 disabled:opacity-50 uppercase tracking-[0.2em] text-xs"
        >
          {loading
            ? "Authenticating..."
            : showOtp
              ? "Verify Code"
              : loginMethod === "mobile"
                ? "Send OTP"
                : "Sign In"}
        </button>
      </form>

      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-slate-100"></span>
        </div>
        <div className="relative flex justify-center text-[9px] uppercase font-black tracking-[0.25em]">
          <span className="bg-white px-4 text-slate-300">Or continue with</span>
        </div>
      </div>

      <button className="w-full flex items-center justify-center gap-3 py-4 border-2 border-slate-50 rounded-2xl hover:bg-slate-50 transition-all font-black text-slate-900 text-[11px] uppercase tracking-widest active:scale-95">
        <img
          src="https://cdn-icons-png.flaticon.com/512/300/300221.png"
          alt="Google"
          className="w-4 h-4"
        />
        Google Account
      </button>

      <p className="text-center mt-10 text-xs text-slate-400 font-bold">
        New to Tripaango?{" "}
        <a href="/signup" className="text-amber-600 font-black hover:text-slate-900 transition-colors">
          Register Now
        </a>
      </p>
    </div>
  );
}