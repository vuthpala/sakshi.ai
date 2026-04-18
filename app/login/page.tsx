"use client";

import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { 
  Mail, 
  Phone, 
  Lock, 
  ArrowRight, 
  Shield, 
  Smartphone,
  Loader2,
  CheckCircle2,
  Sparkles,
  Eye,
  EyeOff,
  AlertCircle
} from "lucide-react";
import Link from "next/link";

type LoginMethod = "email" | "phone";
type LoginStep = "input" | "otp" | "success";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  
  const [method, setMethod] = useState<LoginMethod>("email");
  const [step, setStep] = useState<LoginStep>("input");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Countdown timer for OTP resend
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone: string) => {
    return /^[6-9]\d{9}$/.test(phone.replace(/\D/g, ""));
  };

  const handleSendOTP = async () => {
    setError("");
    
    if (method === "email") {
      if (!validateEmail(email)) {
        setError("Please enter a valid email address");
        return;
      }
    } else {
      if (!validatePhone(phone)) {
        setError("Please enter a valid 10-digit phone number");
        return;
      }
    }

    setIsLoading(true);
    setError("");

    try {
      // Call real OTP API
      const response = await fetch("/api/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: method === "phone" ? phone : undefined,
          email: method === "email" ? email : undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to send OTP");
      }

      setIsLoading(false);
      setStep("otp");
      setCountdown(60);
      
      // Show demo notice if no MSG91 configured
      if (data.demo) {
        setError("⚠️ DEMO MODE: Check browser console for OTP (F12 → Console)");
      }
      
      // Focus first OTP input
      setTimeout(() => otpRefs.current[0]?.focus(), 100);
    } catch (err: any) {
      setIsLoading(false);
      setError(err.message || "Failed to send OTP");
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return; // Only allow single digit
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOTP = async () => {
    const otpString = otp.join("");
    
    if (otpString.length !== 6) {
      setError("Please enter complete OTP");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Call verify OTP API
      const response = await fetch("/api/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: method === "phone" ? phone : undefined,
          email: method === "email" ? email : undefined,
          otp: otpString,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Invalid OTP");
      }

      // Authenticate user
      login({
        email: method === "email" ? email : undefined,
        phone: method === "phone" ? phone : undefined,
      });

      setIsLoading(false);
      setStep("success");
      
      // Redirect to home after 1 second
      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch (err: any) {
      setIsLoading(false);
      setError(err.message || "Failed to verify OTP");
    }
  };

  const handleResendOTP = () => {
    if (countdown > 0) return;
    handleSendOTP();
  };

  const handleLoginWithPassword = async () => {
    setError("");
    
    if (method === "email") {
      if (!validateEmail(email)) {
        setError("Please enter a valid email address");
        return;
      }
    }
    
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // Authenticate user
    login({
      email: method === "email" ? email : undefined,
      phone: method === "phone" ? phone : undefined,
    });
    
    setIsLoading(false);
    setStep("success");
    
    // Redirect to home after 1 second
    setTimeout(() => {
      router.push("/");
    }, 1000);
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-950">
      <Header />

      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="bg-slate-900/80 backdrop-blur-xl rounded-3xl border border-emerald-500/20 shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="px-8 pt-8 pb-6 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 mb-6 shadow-lg shadow-emerald-500/25">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h1 className="font-serif text-3xl font-bold text-white mb-2">
                {step === "success" ? "Welcome!" : "Welcome Back"}
              </h1>
              <p className="text-slate-400">
                {step === "success" 
                  ? "Login successful! Redirecting..." 
                  : step === "otp"
                  ? `Enter the 6-digit code sent to ${method === "email" ? email : phone}`
                  : "Sign in to access your documents"}
              </p>
            </div>

            {/* Content */}
            <div className="px-8 pb-8">
              {error && (
                <div className="flex items-center gap-2 p-3 mb-6 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  {error}
                </div>
              )}

              {step === "input" && (
                <>
                  {/* Method Toggle */}
                  <div className="flex gap-2 p-1 bg-slate-800 rounded-xl mb-6">
                    <button
                      onClick={() => setMethod("email")}
                      className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
                        method === "email"
                          ? "bg-emerald-600 text-white"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      <Mail className="h-4 w-4" />
                      Email
                    </button>
                    <button
                      onClick={() => setMethod("phone")}
                      className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
                        method === "phone"
                          ? "bg-emerald-600 text-white"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      <Phone className="h-4 w-4" />
                      Phone
                    </button>
                  </div>

                  {/* Input Fields */}
                  <div className="space-y-4 mb-6">
                    {method === "email" ? (
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            className="w-full pl-12 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                          />
                        </div>
                      </div>
                    ) : (
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Phone Number
                        </label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">+91</span>
                          <input
                            type="tel"
                            value={phone}
                            onChange={(e) => {
                              const val = e.target.value.replace(/\D/g, "").slice(0, 10);
                              setPhone(val);
                            }}
                            placeholder="9876543210"
                            className="w-full pl-14 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                          />
                        </div>
                      </div>
                    )}

                    {/* Password Field (for email login) */}
                    {method === "email" && (
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Password
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                          <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            className="w-full pl-12 pr-12 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                          >
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <button
                      onClick={method === "email" ? handleLoginWithPassword : handleSendOTP}
                      disabled={isLoading}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-emerald-500/25 transition-all disabled:opacity-70"
                    >
                      {isLoading ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <>
                          {method === "email" ? "Sign In" : "Send OTP"}
                          <ArrowRight className="h-5 w-5" />
                        </>
                      )}
                    </button>

                    {method === "email" && (
                      <button
                        onClick={handleSendOTP}
                        disabled={isLoading}
                        className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-800 text-emerald-400 font-medium rounded-xl border border-emerald-500/20 hover:bg-slate-700 transition-all disabled:opacity-70"
                      >
                        <Smartphone className="h-5 w-5" />
                        Sign in with OTP instead
                      </button>
                    )}
                  </div>

                  {/* Links */}
                  <div className="flex items-center justify-between mt-6 text-sm">
                    <Link href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">
                      Forgot password?
                    </Link>
                    <Link href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">
                      Create account
                    </Link>
                  </div>
                </>
              )}

              {step === "otp" && (
                <>
                  {/* OTP Input */}
                  <div className="flex justify-center gap-2 mb-6">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        ref={(el) => { otpRefs.current[index] = el; }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        className="w-12 h-14 text-center text-2xl font-bold bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                      />
                    ))}
                  </div>

                  {/* Verify Button */}
                  <button
                    onClick={handleVerifyOTP}
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-emerald-500/25 transition-all disabled:opacity-70 mb-4"
                  >
                    {isLoading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <>
                        Verify & Sign In
                        <ArrowRight className="h-5 w-5" />
                      </>
                    )}
                  </button>

                  {/* Resend */}
                  <div className="text-center">
                    {countdown > 0 ? (
                      <p className="text-sm text-slate-500">
                        Resend OTP in <span className="text-emerald-400 font-medium">{countdown}s</span>
                      </p>
                    ) : (
                      <button
                        onClick={handleResendOTP}
                        className="text-sm text-emerald-400 hover:text-emerald-300 font-medium"
                      >
                        Resend OTP
                      </button>
                    )}
                  </div>

                  {/* Back */}
                  <button
                    onClick={() => setStep("input")}
                    className="w-full mt-4 text-sm text-slate-500 hover:text-slate-300"
                  >
                    ← Back to login
                  </button>
                </>
              )}

              {step === "success" && (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/20 mb-6">
                    <CheckCircle2 className="h-10 w-10 text-emerald-400" />
                  </div>
                  <p className="text-slate-400 mb-6">
                    You have successfully logged in!
                  </p>
                  <Link
                    href="/documents"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-500 transition-colors"
                  >
                    <Sparkles className="h-5 w-5" />
                    Go to Dashboard
                  </Link>
                </div>
              )}
            </div>

            {/* Footer Note */}
            {step !== "success" && (
              <div className="px-8 py-4 bg-slate-800/50 border-t border-slate-800">
                <p className="text-xs text-center text-slate-500">
                  By signing in, you agree to our{" "}
                  <Link href="#" className="text-emerald-400 hover:underline">Terms</Link>
                  {" "}and{" "}
                  <Link href="#" className="text-emerald-400 hover:underline">Privacy Policy</Link>
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
