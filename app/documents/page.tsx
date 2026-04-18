import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { DocumentCard } from "@/components/document-card";
import { ALL_DOCUMENT_TYPES } from "@/types";
import { Search, SlidersHorizontal, FileText, MapPin } from "lucide-react";

export default function DocumentsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 bg-gradient-to-b from-slate-50 to-white">
        {/* Hero Banner */}
        <div className="bg-slate-900 py-16 md:py-20">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6">
              <MapPin className="h-4 w-4 text-orange-400" />
              <span className="text-sm text-blue-100">Made for India • All 28 States</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              50+ Indian Legal Documents
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Rent Agreement, Sale Deed, Will, Legal Notice, Affidavit & more. 
              As per Indian Contract Act, Registration Act & state laws.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 md:px-6">
          {/* Search and Filter Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-12">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search documents..."
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
              />
            </div>
            <button className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-colors">
              <SlidersHorizontal className="h-5 w-5" />
              <span className="hidden sm:inline">Filter</span>
            </button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-8 mb-12 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              <span><strong className="text-slate-900">{ALL_DOCUMENT_TYPES.length}</strong> Document Types</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-600 font-semibold">✓</span>
              <span>AI-Generated</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-600 font-semibold">✓</span>
              <span>Legally Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-600 font-semibold">✓</span>
              <span>Instant Download</span>
            </div>
          </div>
          
          {/* Document Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {ALL_DOCUMENT_TYPES.map((doc) => (
              <DocumentCard key={doc.id} document={doc} />
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
