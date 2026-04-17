import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { DocumentCard } from "@/components/document-card";
import { DOCUMENT_TYPES } from "@/types";
import { Sparkles, Clock, Shield, FileCheck, ChevronRight, Star, Zap, Award, Globe, Users, FileText, CheckCircle2, ArrowRight, Play, Rocket, Crown, Gem } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section - Ultra Premium */}
        <section className="relative overflow-hidden bg-[#0a0a0f] min-h-screen flex items-center">
          {/* Animated Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-950/50 via-slate-950 to-purple-950/30"></div>
          
          {/* Animated Orbs */}
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-orange-500/10 rounded-full blur-[100px] animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 right-1/3 w-[300px] h-[300px] bg-purple-600/15 rounded-full blur-[80px] animate-pulse delay-2000"></div>
          
          {/* Grid Pattern Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
          
          <div className="container relative mx-auto px-4 md:px-6 text-center py-20">
            {/* Premium Badge with Glow */}
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl mb-10 shadow-[0_0_30px_rgba(59,130,246,0.3)]">
              <Crown className="h-4 w-4 text-amber-400" />
              <span className="text-sm font-medium bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">#1 Legal Document Platform Worldwide</span>
            </div>
            
            {/* Main Headline with Better Typography */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 tracking-tight leading-[1.1]">
              Legal Documents
              <br />
              <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent">
                in 60 Seconds
              </span>
            </h1>
            
            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed font-light">
              AI-powered legal document generation trusted by <span className="text-white font-medium">50,000+</span> professionals worldwide. 
              Create court-ready documents instantly.
            </p>
            
            {/* Premium CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
              <a 
                href="/documents" 
                className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-white font-bold text-lg rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-[0_0_60px_rgba(249,115,22,0.5)] hover:-translate-y-1"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></span>
                <Rocket className="h-6 w-6" />
                Get Started Free
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="#how-it-works" 
                className="group inline-flex items-center justify-center gap-3 px-10 py-5 bg-white/5 text-white font-semibold text-lg rounded-2xl border border-white/10 backdrop-blur-xl hover:bg-white/10 transition-all duration-300 hover:border-white/20"
              >
                <Play className="h-5 w-5 text-orange-400" />
                Watch Demo
              </a>
            </div>
            
            {/* Premium Feature Cards with 3D Effect */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[
                { icon: Sparkles, label: "AI Generated", color: "from-orange-500 to-amber-500", desc: "GPT-4 Powered" },
                { icon: Clock, label: "60 Seconds", color: "from-blue-500 to-cyan-500", desc: "Lightning Fast" },
                { icon: Shield, label: "Legally Valid", color: "from-emerald-500 to-teal-500", desc: "Court Approved" },
                { icon: Gem, label: "Premium Quality", color: "from-violet-500 to-purple-500", desc: "Lawyer Grade" },
              ].map((feature, idx) => (
                <div 
                  key={idx}
                  className="group relative flex flex-col items-center gap-4 p-6 rounded-3xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm hover:bg-white/[0.06] hover:border-white/[0.15] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)]"
                >
                  <div className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.color} shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-center">
                    <span className="block text-base font-semibold text-white mb-1">{feature.label}</span>
                    <span className="text-xs text-slate-500">{feature.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Documents Grid - Premium Section */}
        <section className="py-24 md:py-32 bg-[#fafafa] relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-blue-100/50 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-orange-100/30 to-transparent rounded-full blur-3xl"></div>
          
          <div className="container relative mx-auto px-4 md:px-6">
            <div className="text-center mb-20">
              {/* Premium Badge */}
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-slate-200 shadow-sm mb-8">
                <Award className="h-4 w-4 text-orange-500" />
                <span className="text-sm font-semibold text-slate-700">40+ Professional Templates</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tight">
                Choose Your Document
              </h2>
              <p className="text-slate-500 text-xl max-w-2xl mx-auto leading-relaxed">
                From business contracts to personal agreements, we have everything you need to protect what matters.
              </p>
            </div>
            
            {/* Premium Document Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {DOCUMENT_TYPES.map((doc) => (
                <DocumentCard key={doc.id} document={doc} />
              ))}
            </div>
            
            {/* View All CTA */}
            <div className="text-center mt-16">
              <a 
                href="/documents" 
                className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white font-semibold rounded-2xl hover:bg-slate-800 transition-all duration-300 hover:shadow-xl"
              >
                View All 40+ Documents
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </div>
        </section>

        {/* How It Works - Ultra Premium */}
        <section id="how-it-works" className="py-24 md:py-32 bg-white relative overflow-hidden">
          {/* Top Border Gradient */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
          
          {/* Background Decorations */}
          <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-gradient-to-r from-blue-50 to-transparent rounded-full blur-3xl -translate-y-1/2"></div>
          <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-gradient-to-l from-orange-50 to-transparent rounded-full blur-3xl -translate-y-1/2"></div>
          
          <div className="container relative mx-auto px-4 md:px-6">
            <div className="text-center mb-20">
              <span className="inline-block text-sm font-semibold text-orange-500 uppercase tracking-wider mb-4">Simple Process</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tight">
                How It Works
              </h2>
              <p className="text-slate-500 text-xl max-w-2xl mx-auto">
                Three simple steps to your legally binding document
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto relative">
              {/* Premium Connecting Line */}
              <div className="hidden md:block absolute top-28 left-[20%] right-[20%] h-1 bg-gradient-to-r from-blue-200 via-orange-300 to-emerald-200 rounded-full"></div>
              
              {[
                { 
                  num: "1", 
                  title: "Answer Questions", 
                  desc: "Fill out our intelligent form. We guide you through every detail with helpful tips.",
                  color: "from-blue-500 to-blue-700",
                  shadow: "shadow-blue-500/30"
                },
                { 
                  num: "2", 
                  title: "AI Magic", 
                  desc: "Our GPT-4 powered engine drafts a professional document tailored to your needs.",
                  color: "from-orange-500 to-amber-500",
                  shadow: "shadow-orange-500/30"
                },
                { 
                  num: "3", 
                  title: "Download & Use", 
                  desc: "Get your court-ready PDF instantly. Print, sign, and you're legally protected.",
                  color: "from-emerald-500 to-teal-600",
                  shadow: "shadow-emerald-500/30"
                },
              ].map((step, idx) => (
                <div key={idx} className="relative group">
                  <div className={`flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br ${step.color} shadow-xl ${step.shadow} mx-auto mb-8 relative z-10 group-hover:scale-110 transition-transform duration-500`}>
                    <span className="text-4xl font-black text-white">{step.num}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4 text-center">{step.title}</h3>
                  <p className="text-slate-500 text-center leading-relaxed text-lg">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Stats Section - Ultra Premium */}
        <section className="relative py-20 bg-[#0a0a0f] overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950/20 to-slate-950"></div>
          <div className="absolute top-1/2 left-1/4 w-[300px] h-[300px] bg-blue-600/10 rounded-full blur-[100px] -translate-y-1/2"></div>
          <div className="absolute top-1/2 right-1/4 w-[300px] h-[300px] bg-orange-500/10 rounded-full blur-[100px] -translate-y-1/2"></div>
          
          <div className="container relative mx-auto px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              {[
                { icon: FileText, value: "40+", label: "Templates", color: "blue" },
                { icon: Users, value: "50K+", label: "Happy Users", color: "emerald" },
                { icon: Globe, value: "150+", label: "Countries", color: "orange" },
                { icon: CheckCircle2, value: "99.9%", label: "Satisfaction", color: "violet" },
              ].map((stat, idx) => (
                <div key={idx} className="text-center group">
                  <div className={`flex justify-center mb-4`}>
                    <div className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-${stat.color}-500/10 border border-${stat.color}-500/20 group-hover:scale-110 transition-transform duration-500`}>
                      <stat.icon className={`h-8 w-8 text-${stat.color}-400`} />
                    </div>
                  </div>
                  <div className="text-4xl md:text-5xl font-black text-white mb-2 bg-gradient-to-b from-white to-white/60 bg-clip-text">{stat.value}</div>
                  <div className="text-sm font-medium text-slate-400 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
