"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Search,
  MapPin,
  Star,
  CheckCircle,
  Clock,
  Filter,
  Scale,
  MessageSquare,
  Phone,
  ArrowRight,
  X,
} from "lucide-react";
import { MOCK_LAWYERS, SPECIALIZATIONS, LANGUAGES, type Lawyer, type Specialization, type Language } from "@/types/lawyer";
import { getSpecializationLabel, getLanguageLabel, formatCurrency } from "@/lib/lawyer-utils";

export default function FindLawyerPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecializations, setSelectedSpecializations] = useState<Specialization[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<Language[]>([]);
  const [minRating, setMinRating] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedLawyer, setSelectedLawyer] = useState<Lawyer | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);

  // Filter lawyers
  const filteredLawyers = MOCK_LAWYERS.filter((lawyer) => {
    // Search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        lawyer.fullName.toLowerCase().includes(query) ||
        lawyer.city.toLowerCase().includes(query) ||
        lawyer.state.toLowerCase().includes(query) ||
        lawyer.barCouncilNumber.toLowerCase().includes(query);
      if (!matchesSearch) return false;
    }

    // Specializations
    if (selectedSpecializations.length > 0) {
      const hasSpecialization = selectedSpecializations.some((spec) =>
        lawyer.specializations.includes(spec)
      );
      if (!hasSpecialization) return false;
    }

    // Languages
    if (selectedLanguages.length > 0) {
      const hasLanguage = selectedLanguages.some((lang) => lawyer.languages.includes(lang));
      if (!hasLanguage) return false;
    }

    // Rating
    if (minRating > 0 && lawyer.rating < minRating) {
      return false;
    }

    // Only show verified and active lawyers
    if (lawyer.verificationStatus !== "verified" || !lawyer.isActive) {
      return false;
    }

    return true;
  });

  const toggleSpecialization = (spec: Specialization) => {
    setSelectedSpecializations((prev) =>
      prev.includes(spec) ? prev.filter((s) => s !== spec) : [...prev, spec]
    );
  };

  const toggleLanguage = (lang: Language) => {
    setSelectedLanguages((prev) =>
      prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang]
    );
  };

  const clearFilters = () => {
    setSelectedSpecializations([]);
    setSelectedLanguages([]);
    setMinRating(0);
    setSearchQuery("");
  };

  const handleSendAgreement = async (lawyer: Lawyer) => {
    setSelectedLawyer(lawyer);
    setIsSending(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSending(false);
    setSendSuccess(true);

    // Reset after 3 seconds
    setTimeout(() => {
      setSendSuccess(false);
      setSelectedLawyer(null);
    }, 3000);
  };

  const getStatusIndicator = (status: Lawyer["status"]) => {
    switch (status) {
      case "online":
        return <span className="flex h-3 w-3 rounded-full bg-green-500" />;
      case "busy":
        return <span className="flex h-3 w-3 rounded-full bg-yellow-500" />;
      case "offline":
        return <span className="flex h-3 w-3 rounded-full bg-slate-400" />;
      default:
        return null;
    }
  };

  const getStatusLabel = (status: Lawyer["status"]) => {
    switch (status) {
      case "online":
        return "Online Now";
      case "busy":
        return "Available Today";
      case "offline":
        return "Offline";
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="py-8">
        <div className="container mx-auto px-4">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Find a Lawyer</h1>
            <p className="text-slate-600">
              Connect with verified legal professionals to review and sign your documents
            </p>
          </div>

          {/* Search & Filters Bar */}
          <div className="mb-6 space-y-4">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name, city, or state..."
                  className="pl-10 h-12"
                />
              </div>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className={`h-12 px-6 ${showFilters ? "bg-slate-200" : ""}`}
              >
                <Filter className="h-5 w-5 mr-2" />
                Filters
                {(selectedSpecializations.length > 0 || selectedLanguages.length > 0 || minRating > 0) && (
                  <span className="ml-2 px-2 py-0.5 bg-amber-500 text-white text-xs rounded-full">
                    {selectedSpecializations.length + selectedLanguages.length + (minRating > 0 ? 1 : 0)}
                  </span>
                )}
              </Button>
            </div>

            {/* Filters Panel */}
            {showFilters && (
              <Card className="border-slate-200">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Specializations */}
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-3">Specialization</h3>
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {SPECIALIZATIONS.map((spec) => (
                          <label key={spec.value} className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={selectedSpecializations.includes(spec.value)}
                              onChange={() => toggleSpecialization(spec.value)}
                              className="rounded border-slate-300 text-amber-600 focus:ring-amber-500"
                            />
                            <span className="text-sm text-slate-700">{spec.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Languages */}
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-3">Languages</h3>
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {LANGUAGES.map((lang) => (
                          <label key={lang.value} className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={selectedLanguages.includes(lang.value)}
                              onChange={() => toggleLanguage(lang.value)}
                              className="rounded border-slate-300 text-amber-600 focus:ring-amber-500"
                            />
                            <span className="text-sm text-slate-700">{lang.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Rating */}
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-3">Minimum Rating</h3>
                      <div className="space-y-2">
                        {[4, 3, 2, 1].map((rating) => (
                          <label key={rating} className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="rating"
                              checked={minRating === rating}
                              onChange={() => setMinRating(rating)}
                              className="text-amber-600 focus:ring-amber-500"
                            />
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < rating ? "text-amber-400 fill-amber-400" : "text-slate-300"
                                  }`}
                                />
                              ))}
                              <span className="text-sm text-slate-600 ml-1">& up</span>
                            </div>
                          </label>
                        ))}
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="rating"
                            checked={minRating === 0}
                            onChange={() => setMinRating(0)}
                            className="text-amber-600 focus:ring-amber-500"
                          />
                          <span className="text-sm text-slate-700">Any rating</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <Button variant="ghost" onClick={clearFilters} className="text-slate-600">
                      <X className="h-4 w-4 mr-2" />
                      Clear all filters
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Results Count */}
          <div className="mb-6 flex items-center justify-between">
            <p className="text-slate-600">
              Showing <span className="font-semibold text-slate-900">{filteredLawyers.length}</span> verified
              lawyers
            </p>
            {(selectedSpecializations.length > 0 || selectedLanguages.length > 0 || minRating > 0) && (
              <div className="flex flex-wrap gap-2">
                {selectedSpecializations.map((spec) => (
                  <span
                    key={spec}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-800 text-sm rounded-full"
                  >
                    {getSpecializationLabel(spec)}
                    <button onClick={() => toggleSpecialization(spec)} className="hover:text-amber-900">
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
                {selectedLanguages.map((lang) => (
                  <span
                    key={lang}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                  >
                    {getLanguageLabel(lang)}
                    <button onClick={() => toggleLanguage(lang)} className="hover:text-blue-900">
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
                {minRating > 0 && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                    {minRating}+ stars
                    <button onClick={() => setMinRating(0)} className="hover:text-green-900">
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Lawyers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLawyers.map((lawyer) => (
              <Card
                key={lawyer.id}
                className={`border-slate-200 hover:shadow-lg transition-shadow ${
                  lawyer.status === "online" ? "ring-1 ring-green-500/20" : ""
                }`}
              >
                <CardContent className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="h-16 w-16 rounded-full bg-slate-200 overflow-hidden">
                        {lawyer.photo ? (
                          <img
                            src={lawyer.photo}
                            alt={lawyer.fullName}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center bg-slate-300">
                            <Scale className="h-8 w-8 text-slate-500" />
                          </div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900">{lawyer.fullName}</h3>
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                          {getStatusIndicator(lawyer.status)}
                          <span>{getStatusLabel(lawyer.status)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 px-2 py-1 bg-green-100 rounded-full">
                      <CheckCircle className="h-3 w-3 text-green-600" />
                      <span className="text-xs font-medium text-green-700">Verified</span>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-2 mb-4">
                    <p className="text-sm text-slate-600">
                      <span className="font-medium">Bar Council:</span> {lawyer.barCouncilNumber}
                    </p>
                    <p className="text-sm text-slate-600 flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {lawyer.city}, {lawyer.state}
                    </p>
                    <p className="text-sm text-slate-600">
                      <span className="font-medium">{lawyer.yearsOfExperience}</span> years experience
                    </p>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                      <span className="font-semibold text-slate-900">{lawyer.rating.toFixed(1)}</span>
                    </div>
                    <span className="text-sm text-slate-500">({lawyer.totalReviews} reviews)</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-sm text-slate-600">
                      {lawyer.totalDocumentsSigned} documents signed
                    </span>
                  </div>

                  {/* Specializations */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {lawyer.specializations.slice(0, 3).map((spec) => (
                      <span
                        key={spec}
                        className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded-full"
                      >
                        {getSpecializationLabel(spec)}
                      </span>
                    ))}
                    {lawyer.specializations.length > 3 && (
                      <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full">
                        +{lawyer.specializations.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Languages */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {lawyer.languages.map((lang) => (
                      <span
                        key={lang}
                        className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
                      >
                        {getLanguageLabel(lang)}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    <Button
                      onClick={() => handleSendAgreement(lawyer)}
                      disabled={isSending && selectedLawyer?.id === lawyer.id}
                      className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold"
                    >
                      {isSending && selectedLawyer?.id === lawyer.id ? (
                        <>
                          <Clock className="h-4 w-4 mr-2 animate-spin" />
                          Sending...
                        </>
                      ) : sendSuccess && selectedLawyer?.id === lawyer.id ? (
                        <>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Sent!
                        </>
                      ) : (
                        <>
                          <Scale className="h-4 w-4 mr-2" />
                          Send Agreement
                        </>
                      )}
                    </Button>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Chat
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Phone className="h-4 w-4 mr-2" />
                        Call
                      </Button>
                    </div>
                  </div>

                  {/* Fee Note */}
                  <p className="text-xs text-center text-slate-500 mt-3">
                    Platform fee: ₹50 + Lawyer fee varies
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {filteredLawyers.length === 0 && (
            <div className="text-center py-16">
              <Scale className="h-16 w-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No lawyers found</h3>
              <p className="text-slate-600 mb-6">Try adjusting your filters or search criteria</p>
              <Button onClick={clearFilters} variant="outline">
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
