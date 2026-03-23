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
    <div className="w-full max-w-md p-8 md:p-10 bg-white rounded-2xl shadow-2xl border border-[#DED4C7]">
      {/* METHOD TOGGLE */}
      <div className="flex bg-[#F5F1EB] p-1.5 rounded-xl mb-8 border border-[#DED4C7]">
        <button
          onClick={() => {
            setLoginMethod("email");
            setShowOtp(false);
          }}
          className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${loginMethod === "email" ? "bg-[#1D3178] text-white shadow-md" : "text-[#8C8276]"}`}
        >
          Email Login
        </button>
        <button
          onClick={() => {
            setLoginMethod("mobile");
            setShowOtp(false);
          }}
          className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${loginMethod === "mobile" ? "bg-[#1D3178] text-white shadow-md" : "text-[#8C8276]"}`}
        >
          OTP Login
        </button>
      </div>

      <form className="space-y-6" onSubmit={handleLogin}>
        {loginMethod === "email" ? (
          <div className="space-y-5">
            <div>
              <label className="text-xs font-bold text-[#1D3178] uppercase tracking-widest ml-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-2 px-5 py-3.5 bg-[#FAF7F2] border border-[#DED4C7] rounded-xl outline-none focus:border-[#C9A67F] transition-all"
                placeholder="john@tripaango.com"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-[#1D3178] uppercase tracking-widest ml-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-2 px-5 py-3.5 bg-[#FAF7F2] border border-[#DED4C7] rounded-xl outline-none focus:border-[#C9A67F] transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            <div>
              <label className="text-xs font-bold text-[#1D3178] uppercase tracking-widest ml-1">
                Mobile Number
              </label>
              <div className="flex gap-2 mt-2">
                <span className="flex items-center justify-center px-4 bg-[#F5F1EB] border border-[#DED4C7] rounded-xl text-[#1D3178] font-bold">
                  +91
                </span>
                <input
                  type="tel"
                  value={mobile}
                  maxLength={10}
                  onChange={(e) => setMobile(e.target.value)}
                  className="flex-1 px-5 py-3.5 bg-[#FAF7F2] border border-[#DED4C7] rounded-xl outline-none focus:border-[#C9A67F]"
                  placeholder="9876543210"
                />
              </div>
            </div>
            {showOtp && (
              <div className="animate-in fade-in slide-in-from-top-2">
                <label className="text-xs font-bold text-[#1D3178] uppercase tracking-widest ml-1">
                  Verification Code
                </label>
                <div className="grid grid-cols-4 gap-3 mt-2">
                  {otp.map((digit, i) => (
                    <input
                      key={i}
                      id={`otp-${i}`}
                      type="text"
                      maxLength="1"
                      value={digit}
                      onChange={(e) => handleOtpChange(e.target.value, i)}
                      className="w-full h-12 text-center text-xl font-bold bg-[#FAF7F2] border border-[#DED4C7] rounded-xl focus:border-[#C9A67F] outline-none transition-all"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {error && (
          <p className="text-red-500 text-xs text-center font-bold italic">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-[#B38D5B] to-[#C9A67F] hover:from-[#1D3178] hover:to-[#1D3178] text-white font-bold py-4 rounded-xl shadow-lg transition-all active:scale-95 disabled:opacity-50 uppercase tracking-widest text-sm"
        >
          {loading
            ? "Authenticating..."
            : showOtp
              ? "Verify OTP"
              : loginMethod === "mobile"
                ? "Send OTP"
                : "Sign In"}
        </button>
      </form>

      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-[#DED4C7]"></span>
        </div>
        <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-widest">
          <span className="bg-white px-4 text-[#8C8276]">Or travel with</span>
        </div>
      </div>

      <button className="w-full flex items-center justify-center gap-3 py-3.5 border border-[#DED4C7] rounded-xl hover:bg-[#FAF7F2] transition-all font-bold text-[#1D3178] text-sm active:scale-95">
        <img
          src="https://cdn-icons-png.flaticon.com/512/300/300221.png"
          alt="Google"
          className="w-5 h-5"
        />
        Google Account
      </button>

      <p className="text-center mt-8 text-sm text-[#8C8276] font-medium">
        New to Tripaango?{" "}
        <a href="/signup" className="text-[#C9A67F] font-bold hover:underline">
          Register Now
        </a>
      </p>
    </div>
  );
}
