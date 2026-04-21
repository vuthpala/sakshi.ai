"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { useTranslation } from "react-i18next";
import { 
  Sparkles, 
  Shield, 
  ArrowRight, 
  Play, 
  Zap,
  Award,
  Users,
  FileText,
  CheckCircle2,
  Star,
  Lock,
  Crown,
  Globe,
  Building2,
  Handshake,
  FileSignature,
  Briefcase,
  DollarSign,
  Truck,
  Scroll,
  Landmark,
  Fingerprint,
  Scale
} from "lucide-react";
import Link from "next/link";

// Document types
const DOCUMENT_TYPES = [
  { id: "rent-agreement", icon: Building2, en: "Rent Agreement", price: "₹99", color: "from-blue-500 to-blue-600" },
  { id: "freelance-contract", icon: Briefcase, en: "Freelance Contract", price: "₹49", color: "from-purple-500 to-purple-600" },
  { id: "nda", icon: Lock, en: "NDA", price: "₹49", color: "from-red-500 to-red-600" },
  { id: "offer-letter", icon: FileSignature, en: "Offer Letter", price: "₹49", color: "from-green-500 to-green-600" },
  { id: "sale-agreement", icon: Handshake, en: "Sale Agreement", price: "₹149", color: "from-orange-500 to-orange-600" },
  { id: "partnership-deed", icon: Users, en: "Partnership Deed", price: "₹99", color: "from-indigo-500 to-indigo-600" },
  { id: "loan-agreement", icon: DollarSign, en: "Loan Agreement", price: "₹49", color: "from-yellow-500 to-yellow-600" },
  { id: "vendor-contract", icon: Truck, en: "Vendor Contract", price: "₹49", color: "from-pink-500 to-pink-600" },
  { id: "will", icon: Scroll, en: "Will", price: "₹149", color: "from-teal-500 to-teal-600" },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        {/* === LEXMEET HERO SECTION === */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#1B3A6B]">
          {/* Animated Background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-[#1B3A6B] via-[#0f2744] to-[#1B3A6B]"></div>
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[150px]"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]"></div>
            {/* Grid pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
          </div>
          
          <div className="container relative mx-auto px-4 md:px-8 text-center py-24">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-8">
              <Crown className="h-4 w-4 text-orange-400" />
              <span className="text-sm font-medium text-white">
                India's #1 Legal Platform
              </span>
            </div>
            
            {/* Main Headline */}
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 tracking-tight leading-[1.1]">
              Your Rent Agreement
              <br />
              <span className="text-orange-400">in 15 Minutes!</span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto mb-6 leading-relaxed">
              With Government Stamp. With Advocate Signature.
            </p>
            
            {/* Trust Badges Row */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
              {[
                { icon: Landmark, label: "Government e-Stamp" },
                { icon: Scale, label: "Verified Advocate" },
                { icon: Fingerprint, label: "Aadhaar eSign" },
                { icon: Shield, label: "Court Valid" },
              ].map((badge, idx) => (
                <div key={idx} className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
                  <badge.icon className="h-4 w-4 text-orange-400" />
                  <span className="text-sm text-white font-medium">
                    {badge.label}
                  </span>
                </div>
              ))}
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link 
                href="/documents/rent-agreement" 
                className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-lg rounded-xl overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(249,115,22,0.4)] hover:-translate-y-1"
              >
                <Sparkles className="h-5 w-5" />
                Create Document
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="#how-it-works" 
                className="group inline-flex items-center justify-center gap-3 px-8 py-5 bg-white/10 text-white font-semibold text-lg rounded-xl border border-white/20 backdrop-blur-sm hover:bg-white/20 transition-all"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500/20">
                  <Play className="h-4 w-4 text-orange-400 ml-0.5" />
                </div>
                How It Works
              </Link>
            </div>
            
            {/* Stats Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                { value: "1,247", label: "Documents Generated" },
                { value: "342", label: "Lawyers Registered" },
                { value: "4.8⭐", label: "User Rating" },
                { value: "15min", label: "Avg. Time" },
              ].map((stat, idx) => (
                <div key={idx} className="text-center p-4 bg-white/5 border border-white/10 rounded-xl">
                  <div className="font-serif text-2xl md:text-3xl font-bold text-orange-400 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-blue-200">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* === TRUST ELEMENTS BAR === */}
        <section className="py-4 bg-slate-900 border-y border-slate-800">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-green-500" />
                <span>256-bit Encryption</span>
              </div>
              <div className="flex items-center gap-2">
                <Landmark className="h-4 w-4 text-blue-500" />
                <span>IT Act 2000 Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-orange-500" />
                <span>Indian Contract Act Valid</span>
              </div>
              <div className="flex items-center gap-2">
                <Fingerprint className="h-4 w-4 text-purple-500" />
                <span>Aadhaar Secured</span>
              </div>
            </div>
          </div>
        </section>

        {/* === DOCUMENT TYPES GRID === */}
        <section className="py-20 md:py-28 bg-white relative overflow-hidden">
          <div className="container relative mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 border border-orange-200 rounded-full mb-6">
                <Award className="h-4 w-4 text-orange-600" />
                <span className="text-sm font-semibold text-orange-800">
                  9+ Legal Documents
                </span>
              </div>
              
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">
                Choose Your Document
              </h2>
              <p className="text-slate-500 text-lg max-w-2xl mx-auto">
                From Rent Agreement to Will - all as per Indian laws
              </p>
            </div>
            
            {/* Document Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {DOCUMENT_TYPES.map((doc) => (
                <Link
                  key={doc.id}
                  href={`/documents/${doc.id}`}
                  className="group relative p-6 bg-white border border-slate-200 rounded-2xl hover:border-orange-300 hover:shadow-xl transition-all duration-300"
                >
                  <div className={`flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${doc.color} shadow-lg mb-4 group-hover:scale-110 transition-transform`}>
                    <doc.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1">
                    {doc.en}
                  </h3>
                  <p className="text-sm text-slate-500 mb-4">
                    {doc.en}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-orange-600">{doc.price}</span>
                    <span className="flex items-center gap-1 text-sm font-medium text-orange-600 group-hover:gap-2 transition-all">
                      Create
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* === HOW IT WORKS === */}
        <section id="how-it-works" className="py-20 md:py-28 bg-slate-50 relative overflow-hidden">
          <div className="container relative mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <span className="inline-block text-sm font-semibold text-orange-600 uppercase tracking-wider mb-4">
                {isTelugu ? "సరళ ప్రక్రియ" : "Simple Process"}
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">
                {isTelugu ? "ఇది ఎలా పనిచేస్తుంది" : "How It Works"}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                { 
                  num: "1", 
                  titleTe: "ఫారం నింపండి",
                  titleEn: "Fill Form",
                  descTe: "మీ పత్ర అవసరాల గురించి సరళమైన ప్రశ్నలకు సమాధానం ఇవ్వండి",
                  descEn: "Answer simple questions about your document needs",
                  color: "from-blue-500 to-blue-600"
                },
                { 
                  num: "2", 
                  titleTe: "AI పత్రం తయారు చేస్తుంది",
                  titleEn: "AI Generates",
                  descTe: "మా AI ప్రొఫెషనల్ చట్టపరమైన పత్రాన్ని సృష్టిస్తుంది",
                  descEn: "Our AI creates a professional legal document",
                  color: "from-orange-500 to-red-500"
                },
                { 
                  num: "3", 
                  titleTe: "న్యాయవాది సంతకం చేస్తారు",
                  titleEn: "Advocate Signs",
                  descTe: "ధృవీకరించబడిన స్థానిక న్యాయవాది సమీక్షిస్తారు మరియు సంతకం చేస్తారు",
                  descEn: "Verified local advocate reviews and signs",
                  color: "from-green-500 to-teal-500"
                },
              ].map((step, idx) => (
                <div key={idx} className="relative text-center">
                  <div className={`flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br ${step.color} shadow-xl mx-auto mb-6`}>
                    <span className="text-3xl font-black text-white">{step.num}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {isTelugu ? step.titleTe : step.titleEn}
                  </h3>
                  <p className="text-slate-500">
                    {isTelugu ? step.descTe : step.descEn}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* === WHY CHOOSE PAPERWISE === */}
        <section className="py-20 bg-[#1B3A6B] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1B3A6B] via-[#0f2744] to-[#1B3A6B]"></div>
          
          <div className="container relative mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {isTelugu ? "PaperWise ఎందుకు?" : "Why PaperWise?"}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: FileText, te: "9+ పత్రాలు", en: "9+ Documents", descTe: "అన్ని రకాల న్యాయ పత్రాలు", descEn: "All types of legal documents", color: "bg-blue-500" },
                { icon: Globe, te: "అన్ని రాష్ట్రాలు", en: "All States", descTe: "భారతదేశంలోని అన్ని రాష్ట్రాలకు చెల్లుబాటు", descEn: "Valid across all Indian states", color: "bg-green-500" },
                { icon: CheckCircle2, te: "చట్టబద్ధం", en: "Legally Valid", descTe: "భారతీయ కాంట్రాక్ట్ చట్టం ప్రకారం", descEn: "As per Indian Contract Act", color: "bg-orange-500" },
                { icon: Users, te: "సులభం", en: "Easy to Use", descTe: "సరళ ఫారాలు, తక్షణ తయారీ", descEn: "Simple forms, instant generation", color: "bg-purple-500" },
              ].map((feature, idx) => (
                <div key={idx} className="text-center group bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-orange-500/30 transition-all">
                  <div className="flex justify-center mb-4">
                    <div className={`flex h-14 w-14 items-center justify-center rounded-xl ${feature.color}/20 border border-white/10 group-hover:scale-110 transition-transform`}>
                      <feature.icon className="h-7 w-7 text-white" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">
                    {isTelugu ? feature.te : feature.en}
                  </h3>
                  <p className="text-sm text-blue-200">
                    {isTelugu ? feature.descTe : feature.descEn}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* === TESTIMONIALS === */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                {isTelugu ? "మా వినియోగదారులు ఏమంటున్నారు" : "What Our Users Say"}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                { 
                  quoteTe: "చాలా సులభంగా ఉంది. స్టాంప్ పేపర్ షాప్‌కి వెళ్ళాల్సిన అవసరం లేకపోయింది!",
                  quoteEn: "So easy to use. No need to go to stamp paper shops anymore!",
                  name: "Suresh Kumar",
                  locationTe: "హైదరాబాద్",
                  locationEn: "Hyderabad"
                },
                { 
                  quoteTe: "న్యాయవాది సంతకంతో వచ్చింది. కోర్టులో చెల్లుబాటు అయ్యే పత్రం.",
                  quoteEn: "Got it with lawyer signature. Court valid document.",
                  name: "Lakshmi Devi",
                  locationTe: "విజయవాడ",
                  locationEn: "Vijayawada"
                },
                { 
                  quoteTe: "15 నిమిషాల్లోనే వచ్చింది. చాలా వేగంగా మరియు నమ్మదగినది.",
                  quoteEn: "Got it in 15 minutes. Very fast and reliable.",
                  name: "Ramesh Reddy",
                  locationTe: "గుంటూరు",
                  locationEn: "Guntur"
                },
              ].map((testimonial, idx) => (
                <div key={idx} className="p-6 bg-slate-50 border border-slate-200 rounded-2xl">
                  <div className="flex gap-1 mb-4">
                    {[1,2,3,4,5].map((star) => (
                      <Star key={star} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-slate-700 mb-4 italic">
                    "{isTelugu ? testimonial.quoteTe : testimonial.quoteEn}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
                      <span className="text-orange-600 font-bold">{testimonial.name[0]}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{testimonial.name}</p>
                      <p className="text-sm text-slate-500">
                        {isTelugu ? testimonial.locationTe : testimonial.locationEn}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* === FOOTER DISCLAIMER === */}
        <section className="py-8 bg-slate-900 border-t border-slate-800">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm text-slate-400">
              {isTelugu 
                ? "PaperWise సాంకేతిక వేదిక మాత్రమే. ఇది వృత్తిపరమైన న్యాయ సలహాకు ప్రత్యామ్నాయం కాదు."
                : "PaperWise is a technology platform only. This is not a substitute for professional legal advice."
              }
            </p>
            <p className="text-xs text-slate-500 mt-2">
              © 2024 PaperWise (పేపర్‌వైజ్). {isTelugu ? "సర్వ హక్కులు ప్రత్యేకించబడ్డాయి." : "All rights reserved."}
            </p>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
