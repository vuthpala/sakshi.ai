"use client";

import { useState } from "react";
import { useLanguage, LANGUAGES } from "@/lib/language-context";
import { Globe, ChevronDown } from "lucide-react";

export function LanguageSelector() {
  const { language, setLanguage, languages, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  
  const currentLang = languages.find(l => l.code === language);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-300 hover:text-emerald-400 hover:bg-white/5 rounded-xl transition-all"
      >
        <Globe className="h-4 w-4" />
        <span className="hidden sm:inline">{currentLang?.nativeName}</span>
        <span className="sm:hidden">{currentLang?.code.toUpperCase()}</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full right-0 mt-2 w-64 max-h-96 overflow-y-auto bg-slate-900 border border-emerald-500/20 rounded-xl shadow-xl z-50 py-2">
            <div className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Select Language / भाषा चुनें / భాష ఎంచుకోండి
            </div>
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code);
                  setIsOpen(false);
                }}
                className={`flex items-center gap-3 w-full px-4 py-3 text-left transition-colors ${
                  language === lang.code 
                    ? "bg-emerald-500/10 text-emerald-400" 
                    : "text-slate-300 hover:text-white hover:bg-slate-800"
                }`}
              >
                <span className="text-lg">{lang.flag}</span>
                <div className="flex flex-col">
                  <span className="font-medium">{lang.nativeName}</span>
                  <span className="text-xs text-slate-500">{lang.name}</span>
                </div>
                {language === lang.code && (
                  <div className="ml-auto w-2 h-2 rounded-full bg-emerald-500" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
