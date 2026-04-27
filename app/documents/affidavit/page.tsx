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
import { ChevronRight, FileText, ArrowLeft, Stamp } from "lucide-react";
import Link from "next/link";

export default function AffidavitPage() {
  const router = useRouter();
  const { addDocument } = useAuth();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    affiantName: "",
    affiantAge: "",
    affiantOccupation: "",
    affiantAddress: "",
    affiantAadhaar: "",
    affidavitType: "",
    statementDetails: "",
    purpose: "",
    swornDate: "",
    place: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    const doc = {
      type: "affidavit",
      title: `Affidavit - ${formData.affidavitType}`,
      status: "completed" as const,
    };
    addDocument(doc);
    router.push("/documents/preview/affidavit");
  };

  const isStep1Valid = formData.affiantName && formData.affiantAge && formData.affiantAddress;
  const isStep2Valid = formData.affidavitType && formData.statementDetails && formData.purpose;
  const isStep3Valid = formData.swornDate && formData.place;

  const affidavitTypes = [
    { value: "general", label: "General Purpose Affidavit" },
    { value: "name_change", label: "Name Change Affidavit" },
    { value: "address_proof", label: "Address Proof Affidavit" },
    { value: "dob_proof", label: "Date of Birth Proof" },
    { value: "single_status", label: "Single Status Declaration" },
    { value: "marital_status", label: "Marital Status Declaration" },
    { value: "income_proof", label: "Income Declaration" },
    { value: "property", label: "Property Declaration" },
    { value: "loss_of_document", label: "Loss of Document" },
    { value: "gap_period", label: "Gap Period Explanation" },
    { value: "character", label: "Character Certificate" },
    { value: "heirship", label: "Heirship Declaration" },
    { value: "legal_heir", label: "Legal Heir Declaration" },
  ];

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
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-100 border border-cyan-200 rounded-full mb-4">
            <Stamp className="h-4 w-4 text-cyan-600" />
            <span className="text-sm font-semibold text-cyan-800">Sworn Statement</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Affidavit</h1>
          <p className="text-slate-500">Sworn statement on stamp paper for legal/official purposes</p>
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
            {/* Step 1: Affiant Details */}
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-slate-900 mb-4">Deponent (Affiant) Details</h2>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Full Name *</Label>
                    <Input
                      value={formData.affiantName}
                      onChange={(e) => handleChange("affiantName", e.target.value)}
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Age *</Label>
                    <Input
                      type="number"
                      value={formData.affiantAge}
                      onChange={(e) => handleChange("affiantAge", e.target.value)}
                      placeholder="Age in years"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Occupation</Label>
                  <Input
                    value={formData.affiantOccupation}
                    onChange={(e) => handleChange("affiantOccupation", e.target.value)}
                    placeholder="Your occupation"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Address *</Label>
                  <Textarea
                    value={formData.affiantAddress}
                    onChange={(e) => handleChange("affiantAddress", e.target.value)}
                    placeholder="Enter your complete address"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Aadhaar Number (Optional)</Label>
                  <Input
                    value={formData.affiantAadhaar}
                    onChange={(e) => handleChange("affiantAadhaar", e.target.value)}
                    placeholder="XXXX XXXX XXXX"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Affidavit Type & Statement */}
            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-slate-900 mb-4">Affidavit Details</h2>
                
                <div className="space-y-2">
                  <Label>Type of Affidavit *</Label>
                  <select
                    value={formData.affidavitType}
                    onChange={(e) => handleChange("affidavitType", e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="">Select Affidavit Type</option>
                    {affidavitTypes.map((type) => (
                      <option key={type.value} value={type.label}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label>Statement / Declaration *</Label>
                  <Textarea
                    value={formData.statementDetails}
                    onChange={(e) => handleChange("statementDetails", e.target.value)}
                    placeholder="Write the complete statement you want to declare"
                    rows={5}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Purpose of Affidavit *</Label>
                  <Input
                    value={formData.purpose}
                    onChange={(e) => handleChange("purpose", e.target.value)}
                    placeholder="Where will this affidavit be submitted? (e.g., Court, Bank, Government Office)"
                  />
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-700">
                  <strong>Note:</strong> This affidavit must be signed before a Notary Public or Oath Commissioner on appropriate stamp paper (value varies by state).
                </div>
              </div>
            )}

            {/* Step 3: Sworn Details */}
            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-slate-900 mb-4">Execution Details</h2>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Sworn Date *</Label>
                    <Input
                      type="date"
                      value={formData.swornDate}
                      onChange={(e) => handleChange("swornDate", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Place (City/Town) *</Label>
                    <Input
                      value={formData.place}
                      onChange={(e) => handleChange("place", e.target.value)}
                      placeholder="Place of execution"
                    />
                  </div>
                </div>

                <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg space-y-3">
                  <h4 className="font-semibold text-amber-900">Verification Clause</h4>
                  <p className="text-sm text-amber-800">
                    I, <strong>{formData.affiantName || "___________"}</strong>, do hereby verify and declare that the contents of paragraphs above are true and correct to the best of my knowledge and belief. I further state that nothing is false and nothing material has been concealed.
                  </p>
                  <p className="text-sm text-amber-800">
                    Verified at <strong>{formData.place || "___________"}</strong> on this <strong>{formData.swornDate ? new Date(formData.swornDate).getDate() : "___"}</strong> day of <strong>{formData.swornDate ? new Date(formData.swornDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : "___________"}</strong>.
                  </p>
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
                  Generate Affidavit
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
