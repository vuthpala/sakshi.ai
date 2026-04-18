import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { DocumentCard } from "@/components/document-card";
import { DOCUMENT_TYPES } from "@/types";
import { 
  Sparkles, 
  Clock, 
  Shield, 
  ChevronRight, 
  ArrowRight, 
  Play, 
  Scale,
  Zap,
  Award,
  Users,
  FileText,
  CheckCircle2,
  Star,
  TrendingUp,
  Lock,
  Crown,
  Globe,
  Gem
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        {/* === ULTRA PREMIUM HERO SECTION === */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950">
          {/* Animated Background Layers */}
          <div className="absolute inset-0">
            {/* Deep gradient base */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-black"></div>
            
            {/* Animated gradient orbs */}
            <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-emerald-600/10 rounded-full blur-[150px] animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-[120px] animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-400/5 rounded-full blur-[100px] animate-pulse delay-2000"></div>
            
            {/* Noise texture overlay */}
            <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`}}></div>
            
            {/* Subtle grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:80px_80px]"></div>
          </div>
          
          <div className="container relative mx-auto px-4 md:px-8 text-center py-32">
            {/* Premium Badge */}
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 backdrop-blur-xl mb-12">
              <Crown className="h-4 w-4 text-emerald-400" />
              <span className="text-sm font-medium bg-gradient-to-r from-emerald-200 to-teal-200 bg-clip-text text-transparent">
                India's #1 Smart Legal Platform
              </span>
            </div>
            
            {/* Luxury Headline with Serif Font */}
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight leading-[1.05]">
              Legal Excellence,
              <br />
              <span className="bg-gradient-to-r from-emerald-300 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
                Instantly Yours
              </span>
            </h1>
            
            {/* Premium Subheadline */}
            <p className="font-sans text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-16 leading-relaxed">
              Experience the future of legal documentation. <span className="text-emerald-400 font-medium">50+ court-ready documents</span> crafted by AI, 
              trusted by <span className="text-white font-medium">50,000+ Indians</span>. From ₹49.
            </p>
            
            {/* Luxury CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-5 justify-center mb-24">
              <a 
                href="/documents" 
                className="group relative inline-flex items-center justify-center gap-3 px-12 py-6 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-white font-bold text-lg rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-[0_0_60px_rgba(16,185,129,0.4)] hover:-translate-y-1"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                <Sparkles className="h-5 w-5" />
                Create Document
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="#how-it-works" 
                className="group inline-flex items-center justify-center gap-3 px-10 py-6 bg-white/5 text-white font-semibold text-lg rounded-2xl border border-white/10 backdrop-blur-xl hover:bg-white/10 transition-all duration-300 hover:border-emerald-500/30"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/20">
                  <Play className="h-4 w-4 text-emerald-400 ml-0.5" />
                </div>
                See How It Works
              </a>
            </div>
            
            {/* Premium Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-8 mb-20">
              {[
                { value: "50,000+", label: "Happy Customers" },
                { value: "50+", label: "Document Types" },
                { value: "4.9/5", label: "Rating" },
                { value: "₹49", label: "Starting Price" },
              ].map((stat, idx) => (
                <div key={idx} className="text-center px-6">
                  <div className="font-serif text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-500 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
            
            {/* Premium Feature Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[
                { icon: Zap, label: "60 Seconds", desc: "Instant Generation", color: "from-emerald-500 to-teal-500" },
                { icon: Shield, label: "Court Ready", desc: "Lawyer Verified", color: "from-blue-500 to-cyan-500" },
                { icon: Lock, label: "Secure", desc: "Bank-Grade SSL", color: "from-violet-500 to-purple-500" },
                { icon: Star, label: "Smart", desc: "AI-Powered", color: "from-amber-500 to-orange-500" },
              ].map((feature, idx) => (
                <div 
                  key={idx}
                  className="group relative flex flex-col items-center gap-4 p-8 rounded-3xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-sm hover:bg-white/[0.05] hover:border-emerald-500/20 transition-all duration-700 hover:-translate-y-3 hover:shadow-[0_30px_60px_rgba(0,0,0,0.4)]"
                >
                  <div className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.color} shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                    <feature.icon className="h-7 w-7 text-white" />
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
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-emerald-100/50 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-teal-100/30 to-transparent rounded-full blur-3xl"></div>
          
          <div className="container relative mx-auto px-4 md:px-6">
            <div className="text-center mb-20">
              {/* Premium Badge */}
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-slate-200 shadow-sm mb-8">
                <Award className="h-4 w-4 text-emerald-500" />
                <span className="text-sm font-semibold text-slate-700">50+ Indian Legal Documents</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tight">
                Choose Your Document
              </h2>
              <p className="text-slate-500 text-xl max-w-2xl mx-auto leading-relaxed">
                From Rent Agreements to Will, Sale Deed to Legal Notice - all as per Indian laws.
                Starting at just ₹49.
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
                View All 50+ Indian Documents
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
          <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-gradient-to-r from-emerald-50 to-transparent rounded-full blur-3xl -translate-y-1/2"></div>
          <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-gradient-to-l from-teal-50 to-transparent rounded-full blur-3xl -translate-y-1/2"></div>
          
          <div className="container relative mx-auto px-4 md:px-6">
            <div className="text-center mb-20">
              <span className="inline-block text-sm font-semibold text-emerald-500 uppercase tracking-wider mb-4">Simple Process</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tight">
                How It Works
              </h2>
              <p className="text-slate-500 text-xl max-w-2xl mx-auto">
                Three simple steps to your legally binding document
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto relative">
              {/* Premium Connecting Line */}
              <div className="hidden md:block absolute top-28 left-[20%] right-[20%] h-1 bg-gradient-to-r from-emerald-200 via-teal-300 to-blue-200 rounded-full"></div>
              
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
                  color: "from-teal-500 to-emerald-500",
                  shadow: "shadow-emerald-500/30"
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
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-emerald-950/20 to-slate-950"></div>
          <div className="absolute top-1/2 left-1/4 w-[300px] h-[300px] bg-emerald-600/10 rounded-full blur-[100px] -translate-y-1/2"></div>
          <div className="absolute top-1/2 right-1/4 w-[300px] h-[300px] bg-teal-500/10 rounded-full blur-[100px] -translate-y-1/2"></div>
          
          <div className="container relative mx-auto px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              {[
                { icon: FileText, value: "50+", label: "Documents", color: "emerald" },
                { icon: Users, value: "50K+", label: "Happy Users", color: "teal" },
                { icon: Globe, value: "28", label: "States Covered", color: "blue" },
                { icon: CheckCircle2, value: "4.9", label: "Star Rating", color: "violet" },
              ].map((stat, idx) => (
                <div key={idx} className="text-center group">
                  <div className={`flex justify-center mb-4`}>
                    <div className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-${stat.color}-500/10 border border-${stat.color}-500/20 group-hover:scale-110 transition-transform duration-500`}>
                      <stat.icon className={`h-8 w-8 text-${stat.color}-400`} />
                    </div>
                  </div>
                  <div className="text-4xl md:text-5xl font-black text-white mb-2 bg-gradient-to-b from-white to-emerald-200/60 bg-clip-text">{stat.value}</div>
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
