"use client";

import { useState, useMemo } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { DocumentCard } from "@/components/document-card";
import { ALL_DOCUMENT_TYPES } from "@/types";
import { Search, SlidersHorizontal, FileText, MapPin, ChevronLeft, ChevronRight, Home, Building2, Briefcase, FileCheck, Scale, Users } from "lucide-react";

const ITEMS_PER_PAGE = 12;

const CATEGORIES = [
  { id: "all", name: "All Documents", icon: FileText },
  { id: "property", name: "Property", icon: Home },
  { id: "business", name: "Business", icon: Briefcase },
  { id: "employment", name: "Employment", icon: Users },
  { id: "legal", name: "Legal Notices", icon: Scale },
  { id: "personal", name: "Personal", icon: FileCheck },
];

export default function DocumentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter documents based on search and category
  const filteredDocs = useMemo(() => {
    let docs = ALL_DOCUMENT_TYPES;

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      docs = docs.filter(
        (doc) =>
          doc.name.toLowerCase().includes(query) ||
          doc.description.toLowerCase().includes(query)
      );
    }

    // Category filter (based on document name/description keywords)
    if (selectedCategory !== "all") {
      docs = docs.filter((doc) => {
        const text = (doc.name + " " + doc.description).toLowerCase();
        switch (selectedCategory) {
          case "property":
            return text.includes("rent") || text.includes("sale") || text.includes("deed") || text.includes("lease") || text.includes("property") || text.includes("mortgage") || text.includes("gift deed") || text.includes("partition");
          case "business":
            return text.includes("business") || text.includes("commercial") || text.includes("partnership") || text.includes("llp") || text.includes("company") || text.includes("vendor") || text.includes("franchise") || text.includes("distribution");
          case "employment":
            return text.includes("employment") || text.includes("job") || text.includes("service") || text.includes("appointment") || text.includes("offer letter") || text.includes("consultancy") || text.includes("freelance");
          case "legal":
            return text.includes("notice") || text.includes("legal") || text.includes("affidavit") || text.includes("bond") || text.includes("indemnity") || text.includes("promissory");
          case "personal":
            return text.includes("will") || text.includes("testament") || text.includes("family") || text.includes("huf") || text.includes("trust") || text.includes("power of attorney") || text.includes("relinquishment");
          default:
            return true;
        }
      });
    }

    return docs;
  }, [searchQuery, selectedCategory]);

  // Pagination
  const totalPages = Math.ceil(filteredDocs.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedDocs = filteredDocs.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-gradient-to-b from-slate-50 to-white">
        {/* Hero Banner */}
        <div className="bg-slate-900 py-16 md:py-20">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-emerald-500/30 mb-6">
              <MapPin className="h-4 w-4 text-emerald-400" />
              <span className="text-sm text-emerald-100">Made for India • All 28 States</span>
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
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search documents..."
                value={searchQuery}
                onChange={handleSearch}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
              />
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-3 mb-8">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all ${
                    isActive
                      ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/25"
                      : "bg-white text-slate-600 border border-slate-200 hover:border-emerald-300 hover:text-emerald-600"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {cat.name}
                </button>
              );
            })}
          </div>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 text-sm">
            <div className="flex items-center gap-2 text-slate-600">
              <FileText className="h-5 w-5 text-emerald-600" />
              <span>
                Showing <strong className="text-slate-900">{paginatedDocs.length}</strong> of{" "}
                <strong className="text-slate-900">{filteredDocs.length}</strong> documents
              </span>
            </div>
            <div className="flex items-center gap-6 text-slate-500">
              <span className="flex items-center gap-1">
                <span className="text-emerald-600">✓</span> AI-Generated
              </span>
              <span className="flex items-center gap-1">
                <span className="text-emerald-600">✓</span> Legally Compliant
              </span>
            </div>
          </div>

          {/* Document Grid */}
          {paginatedDocs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
              {paginatedDocs.map((doc) => (
                <DocumentCard key={doc.id} document={doc} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
                <Search className="h-8 w-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">No documents found</h3>
              <p className="text-slate-500">Try adjusting your search or category filter</p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center gap-1 px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </button>

              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-10 h-10 rounded-xl text-sm font-medium transition-all ${
                      currentPage === page
                        ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/25"
                        : "bg-white text-slate-600 border border-slate-200 hover:border-emerald-300 hover:text-emerald-600"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center gap-1 px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
