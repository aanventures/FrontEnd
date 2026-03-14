"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { authenticateUser, clearErrors } from "@/store/authSlice";

export default function LoginForm() {
  const dispatch = useDispatch();
  const router = useRouter();
  
  // Get state from Redux
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  const [loginMethod, setLoginMethod] = useState("email");
  const [showOtp, setShowOtp] = useState(false);
  
  // Input states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);

  // Redirect if successfully logged in
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  const handleOtpChange = (value, index) => {
    if (isNaN(value)) return; // Only allow numbers
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(clearErrors());

    // Flow for Mobile Login
    if (loginMethod === "mobile") {
      if (!showOtp) {
        // Validation for Indian mobile numbers
        if (!/^[6-9]\d{9}$/.test(mobile)) {
          alert("Please enter a valid 10-digit mobile number");
          return;
        }
        setShowOtp(true);
        return;
      }

      // Prepare credentials for Mobile
      const credentials = {
        mobile: mobile,
        otp: otp.join(""),
      };
      dispatch(authenticateUser(credentials));
    } 
    // Flow for Email Login
    else {
      if (!email || !password) {
        alert("Please enter both email and password");
        return;
      }
      const credentials = {
        email: email,
        password: password,
      };
      dispatch(authenticateUser(credentials));
    }
  };

  return (
    <div className="w-full max-w-md p-8 bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-white">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Welcome Back</h2>
        <p className="text-slate-500 mt-2 text-sm font-medium">Please enter your details to sign in</p>
      </div>

      <div className="flex bg-slate-100 p-1 rounded-2xl mb-6">
        <button 
          type="button"
          onClick={() => { setLoginMethod("email"); setShowOtp(false); dispatch(clearErrors()); }} 
          className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${loginMethod === "email" ? "bg-white text-orange-600 shadow-sm" : "text-slate-500"}`}
        >
          Email ID
        </button>
        <button 
          type="button"
          onClick={() => { setLoginMethod("mobile"); setShowOtp(false); dispatch(clearErrors()); }} 
          className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${loginMethod === "mobile" ? "bg-white text-orange-600 shadow-sm" : "text-slate-500"}`}
        >
          Mobile Number
        </button>
      </div>

      <form className="space-y-4" onSubmit={handleLogin}>
        {loginMethod === "email" ? (
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="hello@example.com" 
                className="w-full mt-2 px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all" 
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                className="w-full mt-2 px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all" 
              />
            </div>
          </div>
        ) : (
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
            <div className="flex gap-2 mt-2">
              <span className="flex items-center justify-center px-4 bg-slate-100 rounded-2xl text-slate-600 font-bold text-sm">+91</span>
              <input
                type="tel"
                value={mobile}
                maxLength={10}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="99999 99999"
                className="flex-1 px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all"
              />
            </div>
          </div>
        )}

        {showOtp && loginMethod === "mobile" && (
          <div className="animate-in fade-in slide-in-from-top-2 duration-300">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Enter OTP</label>
            <div className="grid grid-cols-4 gap-3 mt-2">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  id={`otp-${i}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(e.target.value, i)}
                  className="w-full h-14 text-center text-xl font-bold bg-slate-50 border border-slate-100 rounded-xl focus:border-orange-500 outline-none transition-all"
                />
              ))}
            </div>
          </div>
        )}

        {/* Error Message from Redux */}
        {error && (
          <p className="text-red-500 text-xs font-bold mt-2 ml-1 text-center italic">
            {error}
          </p>
        )}

        <button 
          type="submit" 
          disabled={loading} 
          className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-2xl shadow-xl transition-all active:scale-95 disabled:opacity-50"
        >
          {loading ? "Please wait..." : (showOtp ? "Verify & Login" : (loginMethod === "mobile" ? "Send OTP" : "Login"))}
        </button>
      </form>

      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-100"></span></div>
        <div className="relative flex justify-center text-xs uppercase font-bold"><span className="bg-white px-4 text-slate-400">Or continue with</span></div>
      </div>

      <button className="w-full flex items-center justify-center gap-3 py-4 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-all font-bold text-slate-700 active:scale-95">
        <img src="/images/google-icon.png" alt="" className="w-5 h-5" />
        Sign in with Google
      </button>

      <p className="text-center mt-8 text-sm text-slate-500 font-medium">
        Don't have an account? <a href="/signup" className="text-orange-600 font-bold hover:underline">Create one</a>
      </p>
    </div>
  );
}