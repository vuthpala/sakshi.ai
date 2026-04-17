"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { INDIAN_STATES, RentAgreementFormData } from "@/types";
import { ChevronLeft, ChevronRight, Home } from "lucide-react";

const initialFormData: RentAgreementFormData = {
  landlord: {
    fullName: "",
    aadhaarNumber: "",
    address: "",
    phoneNumber: "",
  },
  tenant: {
    fullName: "",
    aadhaarNumber: "",
    permanentAddress: "",
    phoneNumber: "",
  },
  property: {
    address: "",
    city: "",
    state: "",
    propertyType: "residential_flat",
    furnishing: "unfurnished",
  },
  terms: {
    monthlyRent: 0,
    securityDeposit: 0,
    startDate: "",
    duration: "11_months",
    noticePeriod: "1_month",
    lockInPeriod: "none",
    maintenanceCharges: "included",
    electricityBillPayer: "tenant",
    waterBillPayer: "tenant",
    petAllowed: false,
    sublettingAllowed: false,
  },
};

const steps = [
  { id: 1, title: "Landlord Details" },
  { id: 2, title: "Tenant Details" },
  { id: 3, title: "Property Details" },
  { id: 4, title: "Agreement Terms" },
];

export default function RentAgreementPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<RentAgreementFormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const progress = ((currentStep - 1) / (steps.length - 1)) * 100;

  const updateLandlord = (field: keyof typeof formData.landlord, value: string) => {
    setFormData((prev) => ({
      ...prev,
      landlord: { ...prev.landlord, [field]: value },
    }));
    if (errors[`landlord.${field}`]) {
      setErrors((prev) => ({ ...prev, [`landlord.${field}`]: "" }));
    }
  };

  const updateTenant = (field: keyof typeof formData.tenant, value: string) => {
    setFormData((prev) => ({
      ...prev,
      tenant: { ...prev.tenant, [field]: value },
    }));
    if (errors[`tenant.${field}`]) {
      setErrors((prev) => ({ ...prev, [`tenant.${field}`]: "" }));
    }
  };

  const updateProperty = (field: keyof typeof formData.property, value: string) => {
    setFormData((prev) => ({
      ...prev,
      property: { ...prev.property, [field]: value },
    }));
    if (errors[`property.${field}`]) {
      setErrors((prev) => ({ ...prev, [`property.${field}`]: "" }));
    }
  };

  const updateTerms = (field: keyof typeof formData.terms, value: string | number | boolean) => {
    setFormData((prev) => ({
      ...prev,
      terms: { ...prev.terms, [field]: value },
    }));
    if (errors[`terms.${field}`]) {
      setErrors((prev) => ({ ...prev, [`terms.${field}`]: "" }));
    }
  };

  const validateStep = () => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!formData.landlord.fullName.trim()) {
        newErrors["landlord.fullName"] = "Full name is required";
      }
      if (!formData.landlord.address.trim()) {
        newErrors["landlord.address"] = "Address is required";
      }
      if (!formData.landlord.phoneNumber.trim()) {
        newErrors["landlord.phoneNumber"] = "Phone number is required";
      } else if (!/^\d{10}$/.test(formData.landlord.phoneNumber)) {
        newErrors["landlord.phoneNumber"] = "Enter a valid 10-digit phone number";
      }
    }

    if (currentStep === 2) {
      if (!formData.tenant.fullName.trim()) {
        newErrors["tenant.fullName"] = "Full name is required";
      }
      if (!formData.tenant.permanentAddress.trim()) {
        newErrors["tenant.permanentAddress"] = "Permanent address is required";
      }
      if (!formData.tenant.phoneNumber.trim()) {
        newErrors["tenant.phoneNumber"] = "Phone number is required";
      } else if (!/^\d{10}$/.test(formData.tenant.phoneNumber)) {
        newErrors["tenant.phoneNumber"] = "Enter a valid 10-digit phone number";
      }
    }

    if (currentStep === 3) {
      if (!formData.property.address.trim()) {
        newErrors["property.address"] = "Property address is required";
      }
      if (!formData.property.city.trim()) {
        newErrors["property.city"] = "City is required";
      }
      if (!formData.property.state) {
        newErrors["property.state"] = "State is required";
      }
    }

    if (currentStep === 4) {
      if (formData.terms.monthlyRent <= 0) {
        newErrors["terms.monthlyRent"] = "Monthly rent is required";
      }
      if (formData.terms.securityDeposit <= 0) {
        newErrors["terms.securityDeposit"] = "Security deposit is required";
      }
      if (!formData.terms.startDate) {
        newErrors["terms.startDate"] = "Start date is required";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      if (currentStep < steps.length) {
        setCurrentStep(currentStep + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/documents/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          documentType: "rent-agreement",
          formData,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate document");
      }

      const data = await response.json();
      router.push(`/documents/preview/${data.documentId}`);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-slate-900">Landlord Details</h2>
      
      <div className="space-y-2">
        <Label htmlFor="landlordName">Full Name *</Label>
        <Input
          id="landlordName"
          value={formData.landlord.fullName}
          onChange={(e) => updateLandlord("fullName", e.target.value)}
          placeholder="Enter landlord's full name"
        />
        {errors["landlord.fullName"] && (
          <p className="text-sm text-red-500">{errors["landlord.fullName"]}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="landlordAadhaar">Aadhaar Number (Optional)</Label>
        <Input
          id="landlordAadhaar"
          value={formData.landlord.aadhaarNumber}
          onChange={(e) => updateLandlord("aadhaarNumber", e.target.value)}
          placeholder="XXXX XXXX XXXX"
          maxLength={12}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="landlordAddress">Address *</Label>
        <Textarea
          id="landlordAddress"
          value={formData.landlord.address}
          onChange={(e) => updateLandlord("address", e.target.value)}
          placeholder="Enter landlord's complete address"
          rows={3}
        />
        {errors["landlord.address"] && (
          <p className="text-sm text-red-500">{errors["landlord.address"]}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="landlordPhone">Phone Number *</Label>
        <Input
          id="landlordPhone"
          type="tel"
          value={formData.landlord.phoneNumber}
          onChange={(e) => updateLandlord("phoneNumber", e.target.value.replace(/\D/g, ""))}
          placeholder="10-digit mobile number"
          maxLength={10}
        />
        {errors["landlord.phoneNumber"] && (
          <p className="text-sm text-red-500">{errors["landlord.phoneNumber"]}</p>
        )}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-slate-900">Tenant Details</h2>
      
      <div className="space-y-2">
        <Label htmlFor="tenantName">Full Name *</Label>
        <Input
          id="tenantName"
          value={formData.tenant.fullName}
          onChange={(e) => updateTenant("fullName", e.target.value)}
          placeholder="Enter tenant's full name"
        />
        {errors["tenant.fullName"] && (
          <p className="text-sm text-red-500">{errors["tenant.fullName"]}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="tenantAadhaar">Aadhaar Number (Optional)</Label>
        <Input
          id="tenantAadhaar"
          value={formData.tenant.aadhaarNumber}
          onChange={(e) => updateTenant("aadhaarNumber", e.target.value)}
          placeholder="XXXX XXXX XXXX"
          maxLength={12}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="tenantAddress">Permanent Address *</Label>
        <Textarea
          id="tenantAddress"
          value={formData.tenant.permanentAddress}
          onChange={(e) => updateTenant("permanentAddress", e.target.value)}
          placeholder="Enter tenant's permanent address"
          rows={3}
        />
        {errors["tenant.permanentAddress"] && (
          <p className="text-sm text-red-500">{errors["tenant.permanentAddress"]}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="tenantPhone">Phone Number *</Label>
        <Input
          id="tenantPhone"
          type="tel"
          value={formData.tenant.phoneNumber}
          onChange={(e) => updateTenant("phoneNumber", e.target.value.replace(/\D/g, ""))}
          placeholder="10-digit mobile number"
          maxLength={10}
        />
        {errors["tenant.phoneNumber"] && (
          <p className="text-sm text-red-500">{errors["tenant.phoneNumber"]}</p>
        )}
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-slate-900">Property Details</h2>
      
      <div className="space-y-2">
        <Label htmlFor="propertyAddress">Property Address *</Label>
        <Textarea
          id="propertyAddress"
          value={formData.property.address}
          onChange={(e) => updateProperty("address", e.target.value)}
          placeholder="Enter complete property address"
          rows={3}
        />
        {errors["property.address"] && (
          <p className="text-sm text-red-500">{errors["property.address"]}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city">City *</Label>
          <Input
            id="city"
            value={formData.property.city}
            onChange={(e) => updateProperty("city", e.target.value)}
            placeholder="City name"
          />
          {errors["property.city"] && (
            <p className="text-sm text-red-500">{errors["property.city"]}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="state">State *</Label>
          <Select
            value={formData.property.state}
            onValueChange={(value) => updateProperty("state", value)}
          >
            <SelectTrigger id="state">
              <SelectValue placeholder="Select state" />
            </SelectTrigger>
            <SelectContent>
              {INDIAN_STATES.map((state) => (
                <SelectItem key={state} value={state}>
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors["property.state"] && (
            <p className="text-sm text-red-500">{errors["property.state"]}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="propertyType">Property Type</Label>
        <Select
          value={formData.property.propertyType}
          onValueChange={(value) => updateProperty("propertyType", value)}
        >
          <SelectTrigger id="propertyType">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="residential_flat">Residential Flat</SelectItem>
            <SelectItem value="independent_house">Independent House</SelectItem>
            <SelectItem value="pg_room">PG Room</SelectItem>
            <SelectItem value="commercial_space">Commercial Space</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="furnishing">Furnishing Status</Label>
        <Select
          value={formData.property.furnishing}
          onValueChange={(value) => updateProperty("furnishing", value)}
        >
          <SelectTrigger id="furnishing">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="fully_furnished">Fully Furnished</SelectItem>
            <SelectItem value="semi_furnished">Semi Furnished</SelectItem>
            <SelectItem value="unfurnished">Unfurnished</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-slate-900">Agreement Terms</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="monthlyRent">Monthly Rent (₹) *</Label>
          <Input
            id="monthlyRent"
            type="number"
            value={formData.terms.monthlyRent || ""}
            onChange={(e) => updateTerms("monthlyRent", parseInt(e.target.value) || 0)}
            placeholder="Amount in rupees"
          />
          {errors["terms.monthlyRent"] && (
            <p className="text-sm text-red-500">{errors["terms.monthlyRent"]}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="securityDeposit">Security Deposit (₹) *</Label>
          <Input
            id="securityDeposit"
            type="number"
            value={formData.terms.securityDeposit || ""}
            onChange={(e) => updateTerms("securityDeposit", parseInt(e.target.value) || 0)}
            placeholder="Amount in rupees"
          />
          {errors["terms.securityDeposit"] && (
            <p className="text-sm text-red-500">{errors["terms.securityDeposit"]}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="startDate">Agreement Start Date *</Label>
        <Input
          id="startDate"
          type="date"
          value={formData.terms.startDate}
          onChange={(e) => updateTerms("startDate", e.target.value)}
        />
        {errors["terms.startDate"] && (
          <p className="text-sm text-red-500">{errors["terms.startDate"]}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="duration">Agreement Duration</Label>
          <Select
            value={formData.terms.duration}
            onValueChange={(value) => updateTerms("duration", value)}
          >
            <SelectTrigger id="duration">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="11_months">11 Months</SelectItem>
              <SelectItem value="1_year">1 Year</SelectItem>
              <SelectItem value="2_years">2 Years</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="noticePeriod">Notice Period</Label>
          <Select
            value={formData.terms.noticePeriod}
            onValueChange={(value) => updateTerms("noticePeriod", value)}
          >
            <SelectTrigger id="noticePeriod">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1_month">1 Month</SelectItem>
              <SelectItem value="2_months">2 Months</SelectItem>
              <SelectItem value="3_months">3 Months</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="lockInPeriod">Lock-in Period</Label>
          <Select
            value={formData.terms.lockInPeriod}
            onValueChange={(value) => updateTerms("lockInPeriod", value)}
          >
            <SelectTrigger id="lockInPeriod">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="3_months">3 Months</SelectItem>
              <SelectItem value="6_months">6 Months</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="maintenance">Maintenance Charges</Label>
          <Select
            value={formData.terms.maintenanceCharges}
            onValueChange={(value) => updateTerms("maintenanceCharges", value)}
          >
            <SelectTrigger id="maintenance">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="included">Included in Rent</SelectItem>
              <SelectItem value="tenant_pays">Paid by Tenant</SelectItem>
              <SelectItem value="landlord_pays">Paid by Landlord</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="electricity">Electricity Bill Paid By</Label>
          <Select
            value={formData.terms.electricityBillPayer}
            onValueChange={(value) => updateTerms("electricityBillPayer", value)}
          >
            <SelectTrigger id="electricity">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tenant">Tenant</SelectItem>
              <SelectItem value="landlord">Landlord</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="water">Water Bill Paid By</Label>
          <Select
            value={formData.terms.waterBillPayer}
            onValueChange={(value) => updateTerms("waterBillPayer", value)}
          >
            <SelectTrigger id="water">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tenant">Tenant</SelectItem>
              <SelectItem value="landlord">Landlord</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center justify-between py-4 border-t border-slate-100">
        <div className="flex items-center gap-3">
          <Switch
            id="petAllowed"
            checked={formData.terms.petAllowed}
            onCheckedChange={(checked) => updateTerms("petAllowed", checked)}
          />
          <Label htmlFor="petAllowed" className="cursor-pointer">Pets Allowed</Label>
        </div>

        <div className="flex items-center gap-3">
          <Switch
            id="subletting"
            checked={formData.terms.sublettingAllowed}
            onCheckedChange={(checked) => updateTerms("sublettingAllowed", checked)}
          />
          <Label htmlFor="subletting" className="cursor-pointer">Subletting Allowed</Label>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 bg-slate-50 py-8">
        <div className="container mx-auto max-w-2xl px-4 md:px-6">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                <Home className="h-5 w-5 text-blue-900" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Rent Agreement</h1>
                <p className="text-sm text-slate-500">Complete all 4 steps to generate your document</p>
              </div>
            </div>
            
            <Progress value={progress} className="h-2" />
            <div className="flex justify-between mt-2">
              {steps.map((step) => (
                <div
                  key={step.id}
                  className={`text-xs font-medium ${
                    step.id <= currentStep ? "text-orange-500" : "text-slate-400"
                  }`}
                >
                  {step.id}. {step.title}
                </div>
              ))}
            </div>
          </div>

          <Card>
            <CardContent className="p-6">
              {currentStep === 1 && renderStep1()}
              {currentStep === 2 && renderStep2()}
              {currentStep === 3 && renderStep3()}
              {currentStep === 4 && renderStep4()}

              <div className="flex justify-between mt-8 pt-6 border-t border-slate-100">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={currentStep === 1}
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button onClick={handleNext}>
                  {currentStep === steps.length ? "Generate Document" : "Continue"}
                  {currentStep !== steps.length && <ChevronRight className="ml-2 h-4 w-4" />}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
