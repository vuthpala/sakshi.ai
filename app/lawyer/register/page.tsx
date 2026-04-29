"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLawyer } from "@/lib/lawyer-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Scale, Loader2, CheckCircle } from "lucide-react";
import Link from "next/link";
import { SPECIALIZATIONS, LANGUAGES, INDIAN_STATES } from "@/types/lawyer";

export default function LawyerRegisterPage() {
  const router = useRouter();
  const { register } = useLawyer();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    barCouncilNumber: "",
    state: "",
    city: "",
    courtOfPractice: "",
    yearsOfExperience: "",
    specializations: [] as string[],
    languages: [] as string[],
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleMultiSelect = (field: "specializations" | "languages", value: string) => {
    setFormData((prev) => {
      const current = prev[field];
      if (current.includes(value)) {
        return { ...prev, [field]: current.filter((v) => v !== value) };
      }
      return { ...prev, [field]: [...current, value] };
    });
  };

  const validateStep = () => {
    switch (step) {
      case 1:
        if (!formData.fullName || !formData.email || !formData.phone) {
          setError("Please fill all personal details");
          return false;
        }
        break;
      case 2:
        if (!formData.barCouncilNumber || !formData.state || !formData.city || !formData.courtOfPractice) {
          setError("Please fill all professional details");
          return false;
        }
        break;
      case 3:
        if (!formData.yearsOfExperience || formData.specializations.length === 0 || formData.languages.length === 0) {
          setError("Please select experience, specializations, and languages");
          return false;
        }
        break;
      case 4:
        if (!formData.password || formData.password !== formData.confirmPassword) {
          setError("Passwords do not match");
          return false;
        }
        if (formData.password.length < 8) {
          setError("Password must be at least 8 characters");
          return false;
        }
        break;
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
      setError("");
      setStep((s) => Math.min(s + 1, 5));
    }
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;
    
    setIsLoading(true);
    try {
      const success = await register({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        barCouncilNumber: formData.barCouncilNumber,
        state: formData.state,
        city: formData.city,
        courtOfPractice: formData.courtOfPractice,
        yearsOfExperience: parseInt(formData.yearsOfExperience),
        specializations: formData.specializations as any,
        languages: formData.languages as any,
        password: formData.password,
      });

      if (success) {
        setStep(5); // Success step
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Personal Information</h3>
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-slate-300">Full Name *</Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                placeholder="Adv. Rajesh Kumar Sharma"
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-300">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="advocate@example.com"
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-slate-300">Phone Number *</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="+91 98765 43210"
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Professional Details</h3>
            <div className="space-y-2">
              <Label htmlFor="barCouncilNumber" className="text-slate-300">Bar Council Enrollment Number *</Label>
              <Input
                id="barCouncilNumber"
                value={formData.barCouncilNumber}
                onChange={(e) => handleInputChange("barCouncilNumber", e.target.value)}
                placeholder="MH/1234/2010"
                className="bg-slate-700 border-slate-600 text-white"
              />
              <p className="text-xs text-slate-400">Format: State/Number/Year</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="state" className="text-slate-300">State *</Label>
                <select
                  id="state"
                  value={formData.state}
                  onChange={(e) => handleInputChange("state", e.target.value)}
                  className="w-full px-3 py-2 rounded-md bg-slate-700 border-slate-600 text-white"
                >
                  <option value="">Select State</option>
                  {INDIAN_STATES.map((state) => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="city" className="text-slate-300">City *</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  placeholder="Mumbai"
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="courtOfPractice" className="text-slate-300">Court of Practice *</Label>
              <Input
                id="courtOfPractice"
                value={formData.courtOfPractice}
                onChange={(e) => handleInputChange("courtOfPractice", e.target.value)}
                placeholder="Bombay High Court"
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Expertise & Languages</h3>
            <div className="space-y-2">
              <Label htmlFor="yearsOfExperience" className="text-slate-300">Years of Experience *</Label>
              <Input
                id="yearsOfExperience"
                type="number"
                value={formData.yearsOfExperience}
                onChange={(e) => handleInputChange("yearsOfExperience", e.target.value)}
                placeholder="10"
                min="0"
                max="60"
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-300">Specializations *</Label>
              <div className="grid grid-cols-2 gap-2">
                {SPECIALIZATIONS.map((spec) => (
                  <label
                    key={spec.value}
                    className={`flex items-center gap-2 p-2 rounded cursor-pointer transition-colors ${
                      formData.specializations.includes(spec.value)
                        ? "bg-amber-500/20 border border-amber-500/50"
                        : "bg-slate-700/50 border border-slate-600 hover:bg-slate-700"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.specializations.includes(spec.value)}
                      onChange={() => handleMultiSelect("specializations", spec.value)}
                      className="hidden"
                    />
                    <span className="text-sm text-slate-300">{spec.label}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-slate-300">Languages Spoken *</Label>
              <div className="flex flex-wrap gap-2">
                {LANGUAGES.map((lang) => (
                  <label
                    key={lang.value}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full cursor-pointer transition-colors ${
                      formData.languages.includes(lang.value)
                        ? "bg-amber-500/20 border border-amber-500/50"
                        : "bg-slate-700/50 border border-slate-600 hover:bg-slate-700"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.languages.includes(lang.value)}
                      onChange={() => handleMultiSelect("languages", lang.value)}
                      className="hidden"
                    />
                    <span className="text-sm text-slate-300">{lang.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Create Password</h3>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-300">Password *</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                placeholder="••••••••"
                className="bg-slate-700 border-slate-600 text-white"
              />
              <p className="text-xs text-slate-400">Minimum 8 characters</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-slate-300">Confirm Password *</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                placeholder="••••••••"
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>
          </div>
        );

      case 5:
        return (
          <div className="text-center py-8">
            <div className="flex justify-center mb-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-500/20">
                <CheckCircle className="h-10 w-10 text-green-500" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Registration Submitted!</h3>
            <p className="text-slate-400 mb-6">
              Your application is under review. Our team will verify your credentials and activate your account within 24-48 hours.
            </p>
            <Button asChild className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold">
              <Link href="/lawyer/login">Go to Login</Link>
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <Card className="w-full max-w-2xl border-amber-500/20 bg-slate-800/95">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-r from-amber-500 to-amber-600">
              <Scale className="h-8 w-8 text-slate-900" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-white">Lawyer Registration</CardTitle>
          <CardDescription className="text-slate-400">
            Join Sakshi.ai as a verified legal professional
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Progress Steps */}
          {step < 5 && (
            <div className="flex justify-center mb-8">
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className="flex items-center">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                      s <= step
                        ? "bg-amber-500 text-slate-900"
                        : "bg-slate-700 text-slate-400"
                    }`}
                  >
                    {s}
                  </div>
                  {s < 4 && (
                    <div
                      className={`w-12 h-0.5 ${
                        s < step ? "bg-amber-500" : "bg-slate-700"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          )}

          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-red-400 text-sm">
              <AlertCircle className="h-4 w-4" />
              {error}
            </div>
          )}

          {renderStep()}

          {step < 5 && (
            <div className="mt-6 flex justify-between">
              {step > 1 ? (
                <Button
                  variant="outline"
                  onClick={() => setStep((s) => s - 1)}
                  className="border-slate-600 text-slate-300 hover:bg-slate-700"
                >
                  Back
                </Button>
              ) : (
                <div />
              )}
              {step < 4 ? (
                <Button
                  onClick={handleNext}
                  className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold"
                >
                  Next
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Application"
                  )}
                </Button>
              )}
            </div>
          )}

          {step < 5 && (
            <div className="mt-6 text-center">
              <p className="text-sm text-slate-500">
                Already registered?{" "}
                <Link href="/lawyer/login" className="text-amber-500 hover:text-amber-400">
                  Sign in here
                </Link>
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
