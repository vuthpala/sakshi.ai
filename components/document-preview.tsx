"use client";

import { useEffect, useState } from "react";
import { Shield, CheckCircle, Landmark, Fingerprint } from "lucide-react";
import { useTranslation } from "react-i18next";

interface DocumentPreviewProps {
  documentType: string;
  formData: Record<string, any>;
  eStampNumber?: string;
  advocateName?: string;
  advocateBarNumber?: string;
  isSigned?: boolean;
}

export function DocumentPreview({
  documentType,
  formData,
  eStampNumber,
  advocateName,
  advocateBarNumber,
  isSigned = false,
}: DocumentPreviewProps) {
  const { t, i18n } = useTranslation();
  const isTelugu = i18n.language === "te";
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-96 bg-slate-100 animate-pulse rounded-lg"></div>
    );
  }

  const documentTitles: Record<string, { te: string; en: string }> = {
    rent_agreement: { te: "అద్దె ఒప్పందం", en: "RENT AGREEMENT" },
    sale_agreement: { te: "అమ్మకం ఒప్పందం", en: "SALE AGREEMENT" },
    will: { te: "వీలునామా", en: "LAST WILL AND TESTAMENT" },
    power_of_attorney: { te: "వకాలత్ నామా", en: "POWER OF ATTORNEY" },
    partnership_deed: { te: "భాగస్వామ్య డీడ్", en: "PARTNERSHIP DEED" },
    gift_deed: { te: "బహుమతి డీడ్", en: "GIFT DEED" },
    affidavit: { te: "జాబితా", en: "AFFIDAVIT" },
    legal_notice: { te: "చట్టపరమైన నోటీసు", en: "LEGAL NOTICE" },
    loan_agreement: { te: "ఋణ ఒప్పందం", en: "LOAN AGREEMENT" },
    nda: { te: "గోప్యత ఒప్పందం", en: "NON-DISCLOSURE AGREEMENT" },
  };

  const title = documentTitles[documentType] || { te: "న్యాయ పత్రం", en: "LEGAL DOCUMENT" };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Stamp Paper Container */}
      <div
        className="relative bg-white"
        style={{
          border: "12px double #8B1538",
          borderRadius: "4px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.15), inset 0 0 60px rgba(139,21,56,0.03)",
        }}
      >
        {/* Inner decorative border */}
        <div
          className="m-2 p-6"
          style={{
            border: "2px solid #C41E3A",
            minHeight: "800px",
          }}
        >
          {/* Header Section */}
          <div className="text-center mb-6 border-b-2 border-red-800 pb-4">
            {/* Government Emblem Placeholder */}
            <div className="flex justify-center mb-3">
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #8B1538 0%, #C41E3A 50%, #8B1538 100%)",
                  border: "3px solid #FFD700",
                }}
              >
                <Landmark className="w-12 h-12 text-yellow-300" />
              </div>
            </div>

            {/* Title */}
            <h1
              className="text-2xl md:text-3xl font-bold mb-2"
              style={{ color: "#8B1538", fontFamily: "serif" }}
            >
              {isTelugu ? title.te : title.en}
            </h1>

            <p className="text-sm text-red-700 font-semibold">
              {isTelugu ? "భారత ప్రభుత్వ నోటరీ/స్టాంప్ పేపర్" : "INDIAN GOVERNMENT NOTARY/STAMP PAPER"}
            </p>

            {/* e-Stamp Details */}
            {eStampNumber && (
              <div className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-yellow-50 border border-yellow-400 rounded">
                <Shield className="w-4 h-4 text-yellow-600" />
                <span className="text-sm font-mono text-yellow-800">
                  {isTelugu ? "e-స్టాంప్ సంఖ్య:" : "e-Stamp No:"} {eStampNumber}
                </span>
              </div>
            )}
          </div>

          {/* Document Content */}
          <div className="space-y-4 text-sm leading-relaxed" style={{ color: "#333" }}>
            {/* Date */}
            <p className="text-right">
              <strong>{isTelugu ? "తేదీ:" : "Date:"}</strong> {new Date().toLocaleDateString("en-IN")}
            </p>

            {/* Parties Section */}
            <div className="space-y-3">
              {formData.landlordName && (
                <p>
                  <strong>{isTelugu ? "అద్దెదారు (Landlord):" : "Landlord:"}</strong>{" "}
                  {formData.landlordName}
                  {formData.landlordAddress && (
                    <>, {formData.landlordAddress}</>
                  )}
                </p>
              )}

              {formData.tenantName && (
                <p>
                  <strong>{isTelugu ? "అద్దెకు తీసుకున్న వ్యక్తి (Tenant):" : "Tenant:"}</strong>{" "}
                  {formData.tenantName}
                  {formData.tenantAddress && (
                    <>, {formData.tenantAddress}</>
                  )}
                </p>
              )}

              {formData.propertyAddress && (
                <p>
                  <strong>{isTelugu ? "ఆస్తి చిరునామా:" : "Property Address:"}</strong>{" "}
                  {formData.propertyAddress}
                </p>
              )}

              {formData.monthlyRent && (
                <p>
                  <strong>{isTelugu ? "నెలవారీ అద్దె:" : "Monthly Rent:"}</strong>{" "}
                  ₹{formData.monthlyRent}
                </p>
              )}

              {formData.deposit && (
                <p>
                  <strong>{isTelugu ? "భద్రతా డిపాజిట్:" : "Security Deposit:"}</strong>{" "}
                  ₹{formData.deposit}
                </p>
              )}

              {formData.duration && (
                <p>
                  <strong>{isTelugu ? "అవధి:" : "Duration:"}</strong>{" "}
                  {formData.duration}
                </p>
              )}
            </div>

            {/* Agreement Terms */}
            <div className="mt-6 p-4 bg-slate-50 border-l-4 border-red-800">
              <h3 className="font-bold mb-2 text-red-800">
                {isTelugu ? "ఒప్పంద నిబంధనలు:" : "Terms & Conditions:"}
              </h3>
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li>
                  {isTelugu
                    ? "అద్దెదారు ఆస్తిని బాగా నిర్వహించాలి మరియు ఏమీ నష్టం చేయకూడదు."
                    : "The Tenant shall maintain the property in good condition and shall not cause any damage."}
                </li>
                <li>
                  {isTelugu
                    ? "అద్దె ప్రతి నెల 5వ తేదీ లోపు చెల్లించాలి."
                    : "Rent shall be paid by the 5th of every month without fail."}
                </li>
                <li>
                  {isTelugu
                    ? "ఒప్పందం ముగింపు తర్వాత భద్రతా డిపాజిట్ తిరిగి ఇవ్వబడుతుంది."
                    : "Security deposit shall be refunded after the termination of this agreement."}
                </li>
                <li>
                  {isTelugu
                    ? "ఏదైనా వివాదం ఉన్నట్లయితే ఇది హైదరాబాద్ కోర్టుల అధీనంలో ఉంటుంది."
                    : "Any disputes arising shall be subject to the jurisdiction of Hyderabad courts."}
                </li>
              </ol>
            </div>

            {/* Witnesses */}
            <div className="mt-6">
              <h3 className="font-bold mb-2 text-red-800">
                {isTelugu ? "సాక్షులు:" : "Witnesses:"}
              </h3>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="font-semibold">{isTelugu ? "1. సాక్షి 1" : "1. Witness 1"}</p>
                  <p className="text-xs mt-4">_________________</p>
                  <p className="text-xs">{isTelugu ? "సంతకం & పేరు" : "Signature & Name"}</p>
                </div>
                <div>
                  <p className="font-semibold">{isTelugu ? "2. సాక్షి 2" : "2. Witness 2"}</p>
                  <p className="text-xs mt-4">_________________</p>
                  <p className="text-xs">{isTelugu ? "సంతకం & పేరు" : "Signature & Name"}</p>
                </div>
              </div>
            </div>

            {/* Signatures Section */}
            <div className="mt-8 pt-6 border-t-2 border-red-200">
              <div className="grid grid-cols-2 gap-8">
                {/* Landlord */}
                <div className="text-center">
                  <p className="font-semibold text-red-800">
                    {isTelugu ? "అద్దెదారు" : "Landlord"}
                  </p>
                  <p className="text-xs mt-4">_________________</p>
                  <p className="text-xs">{isTelugu ? "సంతకం & పేరు" : "Signature & Name"}</p>
                </div>

                {/* Tenant */}
                <div className="text-center">
                  <p className="font-semibold text-red-800">
                    {isTelugu ? "అద్దెకు తీసుకున్న వ్యక్తి" : "Tenant"}
                  </p>
                  <p className="text-xs mt-4">_________________</p>
                  <p className="text-xs">{isTelugu ? "సంతకం & పేరు" : "Signature & Name"}</p>
                </div>
              </div>
            </div>

            {/* Advocate Section */}
            {advocateName && (
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                  <h3 className="font-bold text-blue-800">
                    {isTelugu ? "ధృవీకరించబడిన న్యాయవాది" : "Verified Advocate"}
                  </h3>
                </div>
                <p className="text-sm">
                  <strong>{isTelugu ? "పేరు:" : "Name:"}</strong> {advocateName}
                </p>
                {advocateBarNumber && (
                  <p className="text-sm">
                    <strong>{isTelugu ? "బార్ కౌన్సిల్ నంబర్:" : "Bar Council No:"}</strong>{" "}
                    {advocateBarNumber}
                  </p>
                )}
                <p className="text-xs text-blue-600 mt-2">
                  {isTelugu
                    ? "ఈ పత్రం LexMeet వేదిక ద్వారా న్యాయవాది సమీక్ష మరియు ధృవీకరణతో సృష్టించబడింది."
                    : "This document was created through LexMeet platform with advocate review and verification."}
                </p>
              </div>
            )}

            {/* Aadhaar eSign Stamp */}
            {isSigned && (
              <div className="mt-4 p-3 bg-green-50 border border-green-300 rounded inline-flex items-center gap-2">
                <Fingerprint className="w-5 h-5 text-green-600" />
                <span className="text-sm font-semibold text-green-700">
                  {isTelugu ? "Aadhaar eSign చేయబడింది" : "Aadhaar eSigned"}
                </span>
              </div>
            )}
          </div>

          {/* Footer Watermark */}
          <div
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center opacity-10 pointer-events-none"
            style={{ fontSize: "48px", fontWeight: "bold", color: "#8B1538" }}
          >
            GOVERNMENT OF INDIA
          </div>
        </div>
      </div>

      {/* Trust Badge */}
      <div className="mt-4 flex items-center justify-center gap-4 text-sm text-slate-600">
        <div className="flex items-center gap-1">
          <Shield className="w-4 h-4 text-green-600" />
          <span>{isTelugu ? "చట్టబద్ధమైన పత్రం" : "Legal Document"}</span>
        </div>
        <div className="flex items-center gap-1">
          <CheckCircle className="w-4 h-4 text-blue-600" />
          <span>{isTelugu ? "న్యాయవాది ధృవీకరణ" : "Advocate Verified"}</span>
        </div>
        <div className="flex items-center gap-1">
          <Landmark className="w-4 h-4 text-red-600" />
          <span>{isTelugu ? "e-స్టాంప్" : "e-Stamp"}</span>
        </div>
      </div>
    </div>
  );
}
