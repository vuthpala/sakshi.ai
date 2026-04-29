"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";

export type DocumentLanguage = 
  | "english"
  | "hindi"
  | "telugu"
  | "tamil"
  | "kannada"
  | "malayalam"
  | "bengali"
  | "marathi"
  | "gujarati";

interface DocumentLanguageSelectorProps {
  selectedLanguage: DocumentLanguage;
  onSelect: (language: DocumentLanguage) => void;
}

const LANGUAGES: { code: DocumentLanguage; name: string; nativeName: string; flag: string }[] = [
  { code: "english", name: "English", nativeName: "English", flag: "🇬🇧" },
  { code: "hindi", name: "Hindi", nativeName: "हिंदी", flag: "🇮🇳" },
  { code: "telugu", name: "Telugu", nativeName: "తెలుగు", flag: "🇮🇳" },
  { code: "tamil", name: "Tamil", nativeName: "தமிழ்", flag: "🇮🇳" },
  { code: "kannada", name: "Kannada", nativeName: "ಕನ್ನಡ", flag: "🇮🇳" },
  { code: "malayalam", name: "Malayalam", nativeName: "മലയാളം", flag: "🇮🇳" },
  { code: "bengali", name: "Bengali", nativeName: "বাংলা", flag: "🇮🇳" },
  { code: "marathi", name: "Marathi", nativeName: "मराठी", flag: "🇮🇳" },
  { code: "gujarati", name: "Gujarati", nativeName: "ગુજરાતી", flag: "🇮🇳" },
];

export function DocumentLanguageSelector({ selectedLanguage, onSelect }: DocumentLanguageSelectorProps) {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-slate-900">Select Document Language</h2>
        <p className="text-slate-600">Choose the language for your legal document</p>
        <p className="text-sm text-slate-500">
          दस्तावेज़ भाषा चुनें | పత్రం భాష ఎంచుకోండి
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {LANGUAGES.map((lang) => (
          <button
            key={lang.code}
            onClick={() => onSelect(lang.code)}
            className={`relative p-4 rounded-xl border-2 transition-all text-left ${
              selectedLanguage === lang.code
                ? "border-amber-500 bg-amber-50"
                : "border-slate-200 hover:border-slate-300 bg-white"
            }`}
          >
            <div className="flex items-start gap-3">
              <span className="text-3xl">{lang.flag}</span>
              <div className="flex-1">
                <p className="font-semibold text-slate-900">{lang.nativeName}</p>
                <p className="text-sm text-slate-500">{lang.name}</p>
              </div>
              {selectedLanguage === lang.code && (
                <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          </button>
        ))}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-700">
          <strong>Note:</strong> Your document will be generated entirely in the selected language. 
          Party names will appear in both English and the selected language.
        </p>
      </div>
    </div>
  );
}

// Helper function to get font family for a language
export function getLanguageFont(language: DocumentLanguage): string {
  const fontMap: Record<DocumentLanguage, string> = {
    english: "'Inter', sans-serif",
    hindi: "'Noto Sans Devanagari', 'Inter', sans-serif",
    telugu: "'Noto Sans Telugu', 'Inter', sans-serif",
    tamil: "'Noto Sans Tamil', 'Inter', sans-serif",
    kannada: "'Noto Sans Kannada', 'Inter', sans-serif",
    malayalam: "'Noto Sans Malayalam', 'Inter', sans-serif",
    bengali: "'Noto Sans Bengali', 'Inter', sans-serif",
    marathi: "'Noto Sans Devanagari', 'Inter', sans-serif",
    gujarati: "'Noto Sans Gujarati', 'Inter', sans-serif",
  };
  return fontMap[language] || "'Inter', sans-serif";
}

// Helper function to get language label
export function getLanguageLabel(language: DocumentLanguage): string {
  const lang = LANGUAGES.find(l => l.code === language);
  return lang?.nativeName || language;
}
