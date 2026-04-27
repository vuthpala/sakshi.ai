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
import { ChevronRight, Gift, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function GiftDeedPage() {
  const router = useRouter();
  const { addDocument } = useAuth();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    donorName: "",
    donorAddress: "",
    donorAadhaar: "",
    doneeName: "",
    doneeAddress: "",
    doneeAadhaar: "",
    doneeRelation: "",
    propertyDescription: "",
    propertyValue: "",
    giftDate: "",
    state: "",
    city: "",
    isRegistered: false,
  });

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    const doc = {
      type: "gift-deed",
      title: `Gift Deed - ${formData.donorName} to ${formData.doneeName}`,
      status: "completed" as const,
    };
    addDocument(doc);
    router.push("/documents/preview/gift-deed");
  };

  const isStep1Valid = formData.donorName && formData.donorAddress;
  const isStep2Valid = formData.doneeName && formData.doneeAddress && formData.doneeRelation;
  const isStep3Valid = formData.propertyDescription && formData.giftDate;

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
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-100 border border-violet-200 rounded-full mb-4">
            <Gift className="h-4 w-4 text-violet-600" />
            <span className="text-sm font-semibold text-violet-800">Family Property</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Gift Deed</h1>
          <p className="text-slate-500">Transfer property to family members without any monetary consideration</p>
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
            {/* Step 1: Donor Details */}
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-slate-900 mb-4">Donor (Transferor) Details</h2>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Full Name *</Label>
                    <Input
                      value={formData.donorName}
                      onChange={(e) => handleChange("donorName", e.target.value)}
                      placeholder="Enter donor's full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Aadhaar Number (Optional)</Label>
                    <Input
                      value={formData.donorAadhaar}
                      onChange={(e) => handleChange("donorAadhaar", e.target.value)}
                      placeholder="XXXX XXXX XXXX"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Address *</Label>
                  <Textarea
                    value={formData.donorAddress}
                    onChange={(e) => handleChange("donorAddress", e.target.value)}
                    placeholder="Enter donor's complete address"
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

            {/* Step 2: Donee Details */}
            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-slate-900 mb-4">Donee (Recipient) Details</h2>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Full Name *</Label>
                    <Input
                      value={formData.doneeName}
                      onChange={(e) => handleChange("doneeName", e.target.value)}
                      placeholder="Enter donee's full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Aadhaar Number (Optional)</Label>
                    <Input
                      value={formData.doneeAadhaar}
                      onChange={(e) => handleChange("doneeAadhaar", e.target.value)}
                      placeholder="XXXX XXXX XXXX"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Address *</Label>
                  <Textarea
                    value={formData.doneeAddress}
                    onChange={(e) => handleChange("doneeAddress", e.target.value)}
                    placeholder="Enter donee's complete address"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Relationship with Donor *</Label>
                  <select
                    value={formData.doneeRelation}
                    onChange={(e) => handleChange("doneeRelation", e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="">Select Relationship</option>
                    <option value="spouse">Spouse</option>
                    <option value="son">Son</option>
                    <option value="daughter">Daughter</option>
                    <option value="father">Father</option>
                    <option value="mother">Mother</option>
                    <option value="brother">Brother</option>
                    <option value="sister">Sister</option>
                    <option value="grandson">Grandson</option>
                    <option value="granddaughter">Granddaughter</option>
                    <option value="nephew">Nephew</option>
                    <option value="niece">Niece</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            )}

            {/* Step 3: Property & Gift Details */}
            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-slate-900 mb-4">Property & Gift Details</h2>
                
                <div className="space-y-2">
                  <Label>Property Description *</Label>
                  <Textarea
                    value={formData.propertyDescription}
                    onChange={(e) => handleChange("propertyDescription", e.target.value)}
                    placeholder="Describe the property (address, survey number, area, boundaries, etc.)"
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Property Value (Approximate)</Label>
                  <Input
                    value={formData.propertyValue}
                    onChange={(e) => handleChange("propertyValue", e.target.value)}
                    placeholder="₹ Enter approximate value"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Gift Date *</Label>
                  <Input
                    type="date"
                    value={formData.giftDate}
                    onChange={(e) => handleChange("giftDate", e.target.value)}
                  />
                </div>

                <div className="flex items-center gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <input
                    type="checkbox"
                    id="registered"
                    checked={formData.isRegistered}
                    onChange={(e) => handleChange("isRegistered", e.target.checked)}
                    className="h-4 w-4 text-orange-500 rounded"
                  />
                  <label htmlFor="registered" className="text-sm">
                    <span className="font-medium">Registration Required</span> - I will register this deed at the Sub-Registrar office
                  </label>
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-700">
                  <strong>Note:</strong> Gift deed between close relatives (spouse, children, parents, siblings) is generally exempt from stamp duty in most states. Consult your local Sub-Registrar office for exact requirements.
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
