"use client";

import { useTranslation } from "react-i18next";

export function LanguageToggle() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  const toggleLanguage = () => {
    const newLang = currentLang === "te" ? "en" : "te";
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors border border-slate-600"
    >
      <span className={currentLang === "te" ? "text-orange-400 font-bold" : "text-slate-400"}>
        తెలుగు
      </span>
      <span className="text-slate-500">|</span>
      <span className={currentLang === "en" ? "text-orange-400 font-bold" : "text-slate-400"}>
        English
      </span>
    </button>
  );
}
