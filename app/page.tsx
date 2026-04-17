import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { DocumentCard } from "@/components/document-card";
import { DOCUMENT_TYPES } from "@/types";
import { Sparkles, Clock, Shield, FileCheck, ChevronRight, Star, Zap, Award, Globe, Users, FileText, CheckCircle2 } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-blue-900 py-20 md:py-32">
          {/* Background decorations */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-40"></div>
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
          
          <div className="container relative mx-auto px-4 md:px-6 text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-8">
              <Globe className="h-4 w-4 text-emerald-400" />
              <span className="text-sm text-blue-100">Trusted Worldwide • 50,000+ Documents Generated</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
              Legal Documents in{" "}
              <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">60 Seconds</span>
            </h1>
            <p className="text-lg md:text-xl text-blue-200/80 max-w-2xl mx-auto mb-10 leading-relaxed">
              AI-powered legal document generation for everyone. Create professional, 
              legally compliant documents instantly. No lawyer needed.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <a 
                href="/documents" 
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300 hover:-translate-y-0.5"
              >
                <Zap className="h-5 w-5" />
                Get Started
                <ChevronRight className="h-5 w-5" />
              </a>
              <a 
                href="#how-it-works" 
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                See How It Works
              </a>
            </div>
            
            {/* Features */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              <div className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-orange-400 to-amber-500 shadow-lg shadow-orange-500/20">
                  <Sparkles className="h-7 w-7 text-white" />
                </div>
                <span className="text-sm font-medium text-blue-100">AI Generated</span>
              </div>
              <div className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 shadow-lg shadow-blue-500/20">
                  <Clock className="h-7 w-7 text-white" />
                </div>
                <span className="text-sm font-medium text-blue-100">60 Seconds</span>
              </div>
              <div className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-lg shadow-emerald-500/20">
                  <Shield className="h-7 w-7 text-white" />
                </div>
                <span className="text-sm font-medium text-blue-100">Legally Valid</span>
              </div>
              <div className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-violet-400 to-violet-600 shadow-lg shadow-violet-500/20">
                  <FileCheck className="h-7 w-7 text-white" />
                </div>
                <span className="text-sm font-medium text-blue-100">Globally Compliant</span>
              </div>
            </div>
          </div>
        </section>

        {/* Documents Grid */}
        <section className="py-20 md:py-28 bg-slate-50 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-white to-slate-50"></div>
          <div className="container relative mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 border border-blue-200 mb-6">
                <Award className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-700">40+ Document Types</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Choose Your Document
              </h2>
              <p className="text-slate-600 text-lg max-w-xl mx-auto">
                Select from our collection of 40+ professionally crafted legal documents. 
                Starting from just $2.99 and ready in minutes.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {DOCUMENT_TYPES.map((doc) => (
                <DocumentCard key={doc.id} document={doc} />
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-20 md:py-28 bg-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
          <div className="container relative mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                How It Works
              </h2>
              <p className="text-slate-600 text-lg">
                Generate your legal document in 3 simple steps
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto relative">
              {/* Connecting line for desktop */}
              <div className="hidden md:block absolute top-24 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-blue-200 via-orange-200 to-blue-200"></div>
              
              <div className="relative">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 shadow-xl shadow-blue-500/20 mx-auto mb-6 relative z-10">
                  <span className="text-3xl font-bold text-white">1</span>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3 text-center">Fill the Form</h3>
                <p className="text-slate-600 text-center leading-relaxed">
                  Answer simple questions about your requirements. Our smart form guides you through every detail.
                </p>
              </div>
              
              <div className="relative">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 shadow-xl shadow-orange-500/20 mx-auto mb-6 relative z-10">
                  <span className="text-3xl font-bold text-white">2</span>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3 text-center">AI Generates</h3>
                <p className="text-slate-600 text-center leading-relaxed">
                  Our AI drafts a legally compliant document tailored to your specific needs and local jurisdiction.
                </p>
              </div>
              
              <div className="relative">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 shadow-xl shadow-emerald-500/20 mx-auto mb-6 relative z-10">
                  <span className="text-3xl font-bold text-white">3</span>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3 text-center">Download PDF</h3>
                <p className="text-slate-600 text-center leading-relaxed">
                  Pay and download your professional PDF instantly. Ready to sign and use anywhere in the world.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Stats Section */}
        <section className="py-16 bg-slate-900">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="flex justify-center mb-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/20">
                    <FileText className="h-6 w-6 text-blue-400" />
                  </div>
                </div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">40+</div>
                <div className="text-sm text-slate-400">Document Types</div>
              </div>
              <div>
                <div className="flex justify-center mb-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/20">
                    <Users className="h-6 w-6 text-emerald-400" />
                  </div>
                </div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">50K+</div>
                <div className="text-sm text-slate-400">Happy Users</div>
              </div>
              <div>
                <div className="flex justify-center mb-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/20">
                    <Globe className="h-6 w-6 text-orange-400" />
                  </div>
                </div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">150+</div>
                <div className="text-sm text-slate-400">Countries</div>
              </div>
              <div>
                <div className="flex justify-center mb-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/20">
                    <CheckCircle2 className="h-6 w-6 text-violet-400" />
                  </div>
                </div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">99.9%</div>
                <div className="text-sm text-slate-400">Satisfaction</div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
