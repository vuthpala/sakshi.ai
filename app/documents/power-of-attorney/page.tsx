"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { INDIAN_STATES } from "@/types";
import { ChevronRight, FileCheck, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PowerOfAttorneyPage() {
  const router = useRouter();
  const { addDocument } = useAuth();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    principalName: "",
    principalAddress: "",
    principalAadhaar: "",
    attorneyName: "",
    attorneyAddress: "",
    attorneyAadhaar: "",
    propertyDescription: "",
    powers: [] as string[],
    effectiveDate: "",
    state: "",
    city: "",
  });

  const handleChange = (field: string, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const togglePower = (power: string) => {
    setFormData((prev) => ({
      ...prev,
      powers: prev.powers.includes(power)
        ? prev.powers.filter((p) => p !== power)
        : [...prev.powers, power],
    }));
  };

  const handleSubmit = async () => {
    const doc = {
      type: "power-of-attorney",
      title: `Power of Attorney - ${formData.principalName}`,
      status: "completed" as const,
    };
    addDocument(doc);
    router.push("/documents/preview/power-of-attorney");
  };

  const isStep1Valid = formData.principalName && formData.principalAddress;
  const isStep2Valid = formData.attorneyName && formData.attorneyAddress;
  const isStep3Valid = formData.propertyDescription && formData.powers.length > 0 && formData.effectiveDate;

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6">
          <Link href="/documents" className="text-sm text-slate-500 hover:text-orange-600 flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" />
            Back to Documents
          </Link>
        </div>

        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose-100 border border-rose-200 rounded-full mb-4">
            <FileCheck className="h-4 w-4 text-rose-600" />
            <span className="text-sm font-semibold text-rose-800">Property</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Power of Attorney</h1>
          <p className="text-slate-500">Authorize someone to handle property matters on your behalf</p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between max-w-md mx-auto">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    step >= s ? "bg-orange-500 text-white" : "bg-slate-200 text-slate-500"
                  }`}
                >
                  {s}
                </div>
                {s < 3 && (
                  <div
                    className={`w-12 h-1 mx-2 ${
                      step > s ? "bg-orange-500" : "bg-slate-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <Card>
          <CardContent className="p-6">
            {/* Step 1: Principal Details */}
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-slate-900 mb-4">Principal (Donor) Details</h2>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Full Name *</Label>
                    <Input
                      value={formData.principalName}
                      onChange={(e) => handleChange("principalName", e.target.value)}
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Aadhaar Number (Optional)</Label>
                    <Input
                      value={formData.principalAadhaar}
                      onChange={(e) => handleChange("principalAadhaar", e.target.value)}
                      placeholder="XXXX XXXX XXXX"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Address *</Label>
                  <Textarea
                    value={formData.principalAddress}
                    onChange={(e) => handleChange("principalAddress", e.target.value)}
                    placeholder="Enter your complete address"
                    rows={3}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>City</Label>
                    <Input
                      value={formData.city}
                      onChange={(e) => handleChange("city", e.target.value)}
                      placeholder="City name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>State</Label>
                    <select
                      value={formData.state}
                      onChange={(e) => handleChange("state", e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      <option value="">Select State</option>
                      {INDIAN_STATES.map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Attorney Details */}
            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-slate-900 mb-4">Attorney (Donee) Details</h2>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Full Name *</Label>
                    <Input
                      value={formData.attorneyName}
                      onChange={(e) => handleChange("attorneyName", e.target.value)}
                      placeholder="Enter attorney's full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Aadhaar Number (Optional)</Label>
                    <Input
                      value={formData.attorneyAadhaar}
                      onChange={(e) => handleChange("attorneyAadhaar", e.target.value)}
                      placeholder="XXXX XXXX XXXX"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Address *</Label>
                  <Textarea
                    value={formData.attorneyAddress}
                    onChange={(e) => handleChange("attorneyAddress", e.target.value)}
                    placeholder="Enter attorney's complete address"
                    rows={3}
                  />
                </div>
              </div>
            )}

            {/* Step 3: Powers & Property */}
            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-slate-900 mb-4">Powers & Property Details</h2>
                
                <div className="space-y-2">
                  <Label>Property Description *</Label>
                  <Textarea
                    value={formData.propertyDescription}
                    onChange={(e) => handleChange("propertyDescription", e.target.value)}
                    placeholder="Describe the property (address, survey number, area, etc.)"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Select Powers to Grant *</Label>
                  <div className="grid md:grid-cols-2 gap-3">
                    {[
                      "Sell the property",
                      "Lease/Rent the property",
                      "Collect rent",
                      "Pay taxes",
                      "Execute documents",
                      "Deal with government authorities",
                      "Obtain mutations",
                      "All necessary acts",
                    ].map((power) => (
                      <label
                        key={power}
                        className={`flex items-center gap-2 p-3 border rounded-lg cursor-pointer transition-colors ${
                          formData.powers.includes(power)
                            ? "border-orange-500 bg-orange-50"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={formData.powers.includes(power)}
                          onChange={() => togglePower(power)}
                          className="h-4 w-4 text-orange-500 rounded"
                        />
                        <span className="text-sm">{power}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Effective Date *</Label>
                  <Input
                    type="date"
                    value={formData.effectiveDate}
                    onChange={(e) => handleChange("effectiveDate", e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={() => step > 1 && setStep(step - 1)}
                disabled={step === 1}
              >
                Back
              </Button>
              {step < 3 ? (
                <Button
                  onClick={() => setStep(step + 1)}
                  disabled={step === 1 ? !isStep1Valid : !isStep2Valid}
                  className="bg-gradient-to-r from-orange-500 to-red-500 text-white"
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={!isStep3Valid}
                  className="bg-gradient-to-r from-orange-500 to-red-500 text-white"
                >
                  Generate Document
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
