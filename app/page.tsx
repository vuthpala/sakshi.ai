"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { 
  ArrowRight, FileText, Scale, Shield, Clock, Star, CheckCircle, CheckCircle2, Globe, 
  Award, Zap, Users, Eye, Play, Building2, Lock, MapPin, Bot, Sparkles,
  ChevronRight, RefreshCw, AlertTriangle, Landmark, Fingerprint, Crown, Scroll
} from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

// New 2025 Design Document Cards with updated prices
const documents = [
  { 
    en: "Rent Agreement", 
    hi: "किराया अनुबंध", 
    te: "అద్దె ఒప్పందం", 
    price: "₹299", 
    icon: FileText, 
    color: "from-orange-500 to-orange-600",
    desc: "Residential & commercial property"
  },
  { 
    en: "NDA", 
    hi: "गोपनीयता समझौता", 
    te: "గోప్యత ఒప్పందం", 
    price: "₹299", 
    icon: Shield, 
    color: "from-purple-500 to-purple-600",
    desc: "Protect your business secrets"
  },
  { 
    en: "Freelance Contract", 
    hi: "फ्रीलांस अनुबंध", 
    te: "ఫ్రీలాన్స్ కాంట్రాక్ట్", 
    price: "₹199", 
    icon: FileText, 
    color: "from-blue-500 to-blue-600",
    desc: "Client & freelancer protection"
  },
  { 
    en: "Sale Agreement", 
    hi: "विक्री अनुबंध", 
    te: "అమ్మక ఒప్పందం", 
    price: "₹499", 
    icon: FileText, 
    color: "from-emerald-500 to-emerald-600",
    desc: "Property & asset sales"
  },
  { 
    en: "Power of Attorney", 
    hi: "मुख्तारनामा", 
    te: "వకీలు పత్రం", 
    price: "₹399", 
    icon: Scale, 
    color: "from-amber-500 to-amber-600",
    desc: "Authorize someone legally"
  },
  { 
    en: "Affidavit", 
    hi: "शपथ पत्र", 
    te: "ప్రమాణ పత్రం", 
    price: "₹199", 
    icon: FileText, 
    color: "from-red-500 to-red-600",
    desc: "Sworn legal statement"
  },
  { 
    en: "Legal Notice", 
    hi: "कानूनी नोटिस", 
    te: "లీగల్ నోటీసు", 
    price: "₹249", 
    icon: Zap, 
    color: "from-indigo-500 to-indigo-600",
    desc: "Formal legal communication"
  },
  { 
    en: "Will", 
    hi: "वसीयत", 
    te: "విల్", 
    price: "₹599", 
    icon: FileText, 
    color: "from-teal-500 to-teal-600",
    desc: "Asset distribution after life"
  },
  { 
    en: "Loan Agreement", 
    hi: "ऋण अनुबंध", 
    te: "ఋణ ఒప్పందం", 
    price: "₹349", 
    icon: FileText, 
    color: "from-cyan-500 to-cyan-600",
    desc: "Money lending terms"
  },
  { 
    en: "Partnership Deed", 
    hi: "साझेदारी डीड", 
    te: "పార్టనర్షిప్ డీడ్", 
    price: "₹499", 
    icon: Users, 
    color: "from-rose-500 to-rose-600",
    desc: "Business partnership terms"
  },
  { 
    en: "Gift Deed", 
    hi: "हबा डीड", 
    te: "బహుమతి డీడ్", 
    price: "₹399", 
    icon: FileText, 
    color: "from-pink-500 to-pink-600",
    desc: "Transfer property as gift"
  },
  { 
    en: "Offer Letter", 
    hi: "नियुक्ति पत्र", 
    te: "ఆఫర్ లెటర్", 
    price: "₹149", 
    icon: FileText, 
    color: "from-violet-500 to-violet-600",
    desc: "Job offer & employment"
  },
  { 
    en: "Vendor Contract", 
    hi: "विक्रेता अनुबंध", 
    te: "విక్రేత కాంట్రాక్ట్", 
    price: "₹249", 
    icon: FileText, 
    color: "from-yellow-500 to-yellow-600",
    desc: "Supplier agreements"
  },
  { id: "legal-notice", icon: AlertTriangle, en: "Legal Notice", price: "₹59", color: "from-amber-500 to-amber-600" },
  { id: "affidavit", icon: Scroll, en: "Affidavit", price: "₹49", color: "from-cyan-500 to-cyan-600" },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        {/* === NEW 2025 HERO SECTION === */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0f1e]">
          {/* Animated Background */}
          <div className="absolute inset-0">
            {/* Deep dark navy base */}
            <div className="absolute inset-0 bg-[#0a0f1e]"></div>
            {/* Subtle radial gradient glow center */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(245,158,11,0.08)_0%,transparent_70%)] rounded-full"></div>
            {/* Dot grid pattern */}
            <div className="absolute inset-0 dot-grid opacity-30"></div>
            {/* Gradient orbs */}
            <div className="absolute top-20 right-20 w-[400px] h-[400px] bg-orange-500/5 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-20 left-20 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[80px]"></div>
          </div>
          
          <div className="container relative mx-auto px-4 md:px-6 lg:px-8 pt-32 pb-20">
            <div className="max-w-5xl mx-auto text-center">
              {/* Top Badge - Glassmorphism Pill */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-card mb-8 border border-[var(--accent-gold)]/30"
              >
                <span className="flex h-2 w-2 rounded-full bg-[var(--accent-gold)] animate-pulse"></span>
                <span className="text-sm font-medium text-[var(--text-primary)]">
                  AI Powered • Aadhaar Verified • Court Valid
                </span>
              </motion.div>
              
              {/* Main Headline with Rotating Text */}
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-[var(--text-primary)] mb-6 tracking-tight leading-[1.05]"
              >
                Your Legal Documents
                <br />
                Ready in{" "}
                <span className="text-gradient">15 Minutes</span>
              </motion.h1>
              
              {/* Subheadline */}
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-10 leading-relaxed"
              >
                India&apos;s most trusted AI legal platform. Generate any document. 
                Verified lawyers sign it. In your language. Legally valid everywhere.
              </motion.p>
              
              {/* Trust Badges - Glassmorphism Pills */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap items-center justify-center gap-3 mb-12"
              >
                {[
                  { icon: Building2, label: "Government e-Stamp" },
                  { icon: Scale, label: "Verified Advocate" },
                  { icon: Fingerprint, label: "Aadhaar eSign" },
                  { icon: Shield, label: "Court Valid" },
                  { icon: Lock, label: "Blockchain Secured" },
                ].map((badge, idx) => (
                  <div key={idx} className="flex items-center gap-2 px-4 py-2 glass rounded-full hover-glow transition-all duration-300">
                    <badge.icon className="h-4 w-4 text-[var(--accent-gold)]" />
                    <span className="text-sm text-[var(--text-primary)] font-medium">
                      {badge.label}
                    </span>
                  </div>
                ))}
              </motion.div>
              
              {/* CTA Buttons - Redesigned */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
              >
                <Link 
                  href="/documents/rent-agreement" 
                  className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-bold text-white overflow-hidden rounded-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(245,158,11,0.3)] hover:-translate-y-0.5"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-[var(--accent-orange)] to-[var(--accent-gold)]"></span>
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                  <span className="relative flex items-center gap-2">
                    Generate Document Free
                    <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                </Link>
                
                <Link 
                  href="#how-it-works" 
                  className="group inline-flex items-center justify-center gap-3 px-8 py-4 text-[var(--text-primary)] font-semibold rounded-xl border border-[var(--border)] bg-white/5 hover:bg-white/10 hover:border-[var(--border-hover)] transition-all duration-300"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent-gold)]/10">
                    <Play className="h-4 w-4 text-[var(--accent-gold)] ml-0.5" />
                  </div>
                  Watch How It Works
                </Link>
              </motion.div>
              
              {/* Stats Cards - Glassmorphism */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
              >
                {[
                  { value: "1,247+", label: "Documents", color: "gold" },
                  { value: "342+", label: "Lawyers", color: "gold" },
                  { value: "4.8★", label: "User Rating", color: "gold" },
                  { value: "15min", label: "Avg Time", color: "gold" },
                ].map((stat, idx) => (
                  <div key={idx} className="glass-card p-5 text-center hover-lift hover-glow transition-all duration-300">
                    <div className="font-serif text-2xl md:text-3xl font-bold text-[var(--accent-gold)] mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-[var(--text-secondary)]">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* === TRUST ELEMENTS BAR === */}
        <section className="py-4 bg-[#0d1526] border-y border-[var(--border)]">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 text-sm text-[var(--text-secondary)]">
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-[var(--accent-green)]" />
                <span>256-bit Encryption</span>
              </div>
              <div className="flex items-center gap-2">
                <Landmark className="h-4 w-4 text-blue-500" />
                <span>IT Act 2000 Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-[var(--accent-orange)]" />
                <span>Indian Contract Act Valid</span>
              </div>
              <div className="flex items-center gap-2">
                <Fingerprint className="h-4 w-4 text-purple-500" />
                <span>Aadhaar Secured</span>
              </div>
            </div>
          </div>
        </section>

        {/* === DOCUMENT TYPES GRID - 2025 Redesign === */}
        <section className="py-24 md:py-32 bg-[#0a0f1e] relative overflow-hidden">
          <div className="container relative mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6"
              >
                <Sparkles className="h-4 w-4 text-[var(--accent-gold)]" />
                <span className="text-sm font-medium text-[var(--text-primary)]">
                  13+ Legal Documents
                </span>
              </motion.div>
              
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-3xl md:text-5xl font-bold text-[var(--text-primary)] mb-4"
              >
                Choose Your Document
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto"
              >
                13+ legal documents • All Indian states • 9 languages
              </motion.p>
            </div>
            
            {/* Document Cards Grid - Glassmorphism */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {documents.map((doc, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                >
                  <Link
                    href={`/documents/${doc.en.toLowerCase().replace(/\s+/g, "-")}`}
                    className="group block h-full"
                  >
                    <div className="glass-card p-6 h-full hover-lift hover-glow transition-all duration-300">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${doc.color} shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <doc.icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">
                        {doc.en}
                      </h3>
                      <p className="text-sm text-[var(--text-secondary)] mb-4 line-clamp-2">
                        {doc.desc}
                      </p>
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-[var(--border)]">
                        <span className="text-xl font-bold text-[var(--accent-gold)]">{doc.price}</span>
                        <span className="flex items-center gap-1 text-sm font-medium text-[var(--accent-gold)] group-hover:gap-2 transition-all">
                          Create
                          <ArrowRight className="h-4 w-4" />
                        </span>
                      </div>
                      <span className="inline-block mt-3 px-2 py-1 text-xs font-medium bg-[var(--accent-green)]/10 text-[var(--accent-green)] rounded">
                        AI Generated
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* === HOW IT WORKS - 2025 Redesign === */}
        <section id="how-it-works" className="py-24 md:py-32 bg-[#0d1526] relative overflow-hidden">
          <div className="container relative mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6"
              >
                <Zap className="h-4 w-4 text-[var(--accent-gold)]" />
                <span className="text-sm font-medium text-[var(--text-primary)]">
                  Simple Process
                </span>
              </motion.div>
              
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-3xl md:text-5xl font-bold text-[var(--text-primary)] mb-4"
              >
                How It Works
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto"
              >
                4 simple steps to your legally valid document
              </motion.p>
            </div>
            
            {/* 4 Steps with connecting line */}
            <div className="relative max-w-6xl mx-auto">
              {/* Connecting line for desktop */}
              <div className="hidden md:block absolute top-20 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-transparent via-[var(--accent-gold)]/30 to-transparent"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {[
                  { 
                    num: "1", 
                    icon: FileText,
                    title: "Generate",
                    desc: "Tell our AI what you need. Answer simple questions. Document ready in seconds.",
                    color: "from-blue-500 to-blue-600"
                  },
                  { 
                    num: "2", 
                    icon: Eye,
                    title: "Review",
                    desc: "Preview your complete document. Edit if needed. AI ensures legal accuracy.",
                    color: "from-purple-500 to-purple-600"
                  },
                  { 
                    num: "3", 
                    icon: Users,
                    title: "Choose Lawyer",
                    desc: "See verified lawyers near you. Check ratings and experience. Send document with one click.",
                    color: "from-orange-500 to-red-500"
                  },
                  { 
                    num: "4", 
                    icon: CheckCircle2,
                    title: "Get Signed",
                    desc: "Lawyer reviews and signs digitally. Download your signed PDF. Share or submit anywhere.",
                    color: "from-green-500 to-teal-500"
                  },
                ].map((step, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="relative text-center"
                  >
                    <div className="relative inline-block mb-6">
                      <div className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${step.color} shadow-xl mx-auto relative z-10`}>
                        <step.icon className="h-7 w-7 text-white" />
                      </div>
                      {/* Step number badge */}
                      <div className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--bg-primary)] border border-[var(--accent-gold)] text-xs font-bold text-[var(--accent-gold)]">
                        {step.num}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3">
                      {step.title}
                    </h3>
                    <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                      {step.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* === WHY CHOOSE SAKSHI.AI - 2025 Redesign === */}
        <section className="py-24 bg-[#0a0f1e] relative overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[var(--accent-gold)]/5 rounded-full blur-[150px]"></div>
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px]"></div>
          </div>
          
          <div className="container relative mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6"
              >
                <Award className="h-4 w-4 text-[var(--accent-gold)]" />
                <span className="text-sm font-medium text-[var(--text-primary)]">
                  Why Choose Us
                </span>
              </motion.div>
              
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-3xl md:text-5xl font-bold text-[var(--text-primary)] mb-4"
              >
                Why Sakshi.ai?
              </motion.h2>
            </div>
            
            {/* 6 Feature Cards - 2x3 Grid with Glassmorphism */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { 
                  icon: Bot, 
                  title: "AI Generated", 
                  desc: "Documents created by AI trained on Indian law. Zero errors. Always updated.",
                  color: "from-blue-500 to-cyan-500" 
                },
                { 
                  icon: Scale, 
                  title: "Verified Lawyers", 
                  desc: "342+ Bar Council verified advocates. Real signatures. Real accountability.",
                  color: "from-purple-500 to-pink-500" 
                },
                { 
                  icon: Globe, 
                  title: "9 Languages", 
                  desc: "Hindi, Telugu, Tamil, Kannada, Malayalam, Bengali, Marathi, Gujarati, English.",
                  color: "from-green-500 to-teal-500" 
                },
                { 
                  icon: Fingerprint, 
                  title: "Aadhaar eSign", 
                  desc: "Legally strongest signature in India. Accepted in all courts across the country.",
                  color: "from-orange-500 to-red-500" 
                },
                { 
                  icon: Lock, 
                  title: "Blockchain Secured", 
                  desc: "Every document gets a unique hash. Verify authenticity anywhere, anytime.",
                  color: "from-amber-500 to-yellow-500" 
                },
                { 
                  icon: MapPin, 
                  title: "Location Based", 
                  desc: "Find verified lawyers in your city. See who is online right now.",
                  color: "from-indigo-500 to-purple-500" 
                },
              ].map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="glass-card p-6 hover-lift hover-glow transition-all duration-300 group"
                >
                  <div className="flex items-start gap-4">
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${feature.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* === TESTIMONIALS - 2025 Redesign === */}
        <section className="py-20 bg-[#0d1526] relative overflow-hidden">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4"
              >
                What Our Users Say
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-[var(--text-secondary)]"
              >
                Trusted by thousands across India
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                { 
                  quote: "So easy to use. No need to go to stamp paper shops anymore!",
                  name: "Suresh Kumar",
                  location: "Hyderabad"
                },
                { 
                  quote: "Got it with lawyer signature. Court valid document.",
                  name: "Lakshmi Devi",
                  location: "Vijayawada"
                },
                { 
                  quote: "Got it in 15 minutes. Very fast and reliable.",
                  name: "Ramesh Reddy",
                  location: "Guntur"
                },
              ].map((testimonial, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="glass-card p-6 hover-lift transition-all duration-300"
                >
                  <div className="flex gap-1 mb-4">
                    {[1,2,3,4,5].map((star) => (
                      <Star key={star} className="h-4 w-4 text-[var(--accent-gold)] fill-[var(--accent-gold)]" />
                    ))}
                  </div>
                  <p className="text-[var(--text-secondary)] mb-4 italic leading-relaxed">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[var(--accent-orange)] to-[var(--accent-gold)] flex items-center justify-center">
                      <span className="text-white font-bold">{testimonial.name[0]}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-[var(--text-primary)]">{testimonial.name}</p>
                      <p className="text-sm text-[var(--text-muted)]">
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* === FOOTER DISCLAIMER - 2025 Redesign === */}
        <section className="py-8 bg-[#0a0f1e] border-t border-[var(--border)]">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm text-[var(--text-muted)]">
              Sakshi.ai is a technology platform only. This is not a substitute for professional legal advice.
            </p>
            <p className="text-xs text-[var(--text-muted)] mt-2">
              © 2025 Sakshi.ai — India&apos;s Legal Witness. Made with ❤️ for India 🇮🇳
            </p>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
