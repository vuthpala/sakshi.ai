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
import { ChevronRight, AlertTriangle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function LegalNoticePage() {
  const router = useRouter();
  const { addDocument } = useAuth();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    senderName: "",
    senderAddress: "",
    senderPhone: "",
    recipientName: "",
    recipientAddress: "",
    recipientPhone: "",
    noticeType: "",
    grievanceDetails: "",
    reliefSought: "",
    timeLimit: "15",
    noticeDate: "",
    advocateName: "",
    advocateAddress: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    const doc = {
      type: "legal-notice",
      title: `Legal Notice - ${formData.noticeType}`,
      status: "completed" as const,
    };
    addDocument(doc);
    router.push("/documents/preview/legal-notice");
  };

  const isStep1Valid = formData.senderName && formData.senderAddress && formData.senderPhone;
  const isStep2Valid = formData.recipientName && formData.recipientAddress && formData.recipientPhone;
  const isStep3Valid = formData.noticeType && formData.grievanceDetails && formData.reliefSought && formData.timeLimit;

  const noticeTypes = [
    { value: "property_dispute", label: "Property Dispute" },
    { value: "tenant_eviction", label: "Tenant Eviction" },
    { value: "recovery_of_money", label: "Recovery of Money" },
    { value: "breach_of_contract", label: "Breach of Contract" },
    { value: "defamation", label: "Defamation" },
    { value: "consumer_complaint", label: "Consumer Complaint" },
    { value: "cheque_bounce", label: "Cheque Bounce (Section 138 NI Act)" },
    { value: "employment_issue", label: "Employment Issue" },
    { value: "family_property", label: "Family Property Matter" },
    { value: "other", label: "Other" },
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
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 border border-amber-200 rounded-full mb-4">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
            <span className="text-sm font-semibold text-amber-800">Legal Action</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Legal Notice</h1>
          <p className="text-slate-500">Formal legal communication before filing a court case</p>
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
            {/* Step 1: Sender Details */}
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-slate-900 mb-4">Sender Details</h2>
                
                <div className="space-y-2">
                  <Label>Full Name *</Label>
                  <Input
                    value={formData.senderName}
                    onChange={(e) => handleChange("senderName", e.target.value)}
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Address *</Label>
                  <Textarea
                    value={formData.senderAddress}
                    onChange={(e) => handleChange("senderAddress", e.target.value)}
                    placeholder="Enter your complete address"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Phone Number *</Label>
                  <Input
                    value={formData.senderPhone}
                    onChange={(e) => handleChange("senderPhone", e.target.value)}
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Recipient Details */}
            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-slate-900 mb-4">Recipient Details</h2>
                
                <div className="space-y-2">
                  <Label>Recipient Name *</Label>
                  <Input
                    value={formData.recipientName}
                    onChange={(e) => handleChange("recipientName", e.target.value)}
                    placeholder="Enter recipient's full name"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Recipient Address *</Label>
                  <Textarea
                    value={formData.recipientAddress}
                    onChange={(e) => handleChange("recipientAddress", e.target.value)}
                    placeholder="Enter recipient's complete address"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Recipient Phone *</Label>
                  <Input
                    value={formData.recipientPhone}
                    onChange={(e) => handleChange("recipientPhone", e.target.value)}
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
              </div>
            )}

            {/* Step 3: Notice Details */}
            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-slate-900 mb-4">Notice Details</h2>
                
                <div className="space-y-2">
                  <Label>Type of Notice *</Label>
                  <select
                    value={formData.noticeType}
                    onChange={(e) => handleChange("noticeType", e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="">Select Notice Type</option>
                    {noticeTypes.map((type) => (
                      <option key={type.value} value={type.label}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label>Grievance / Issue Details *</Label>
                  <Textarea
                    value={formData.grievanceDetails}
                    onChange={(e) => handleChange("grievanceDetails", e.target.value)}
                    placeholder="Describe the issue, when it occurred, and how the recipient is involved"
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Relief / Action Sought *</Label>
                  <Textarea
                    value={formData.reliefSought}
                    onChange={(e) => handleChange("reliefSought", e.target.value)}
                    placeholder="What action do you want the recipient to take?"
                    rows={3}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Response Time Limit (Days) *</Label>
                    <Input
                      type="number"
                      value={formData.timeLimit}
                      onChange={(e) => handleChange("timeLimit", e.target.value)}
                      placeholder="15"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Notice Date *</Label>
                    <Input
                      type="date"
                      value={formData.noticeDate}
                      onChange={(e) => handleChange("noticeDate", e.target.value)}
                    />
                  </div>
                </div>

                <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg text-sm">
                  <strong>Important:</strong> Legal notice is the first step before filing a court case. It creates a legal record of your demand and gives the other party a chance to respond.
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
