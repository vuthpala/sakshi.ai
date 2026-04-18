"use client";

import Link from "next/link";
import { Scale, Menu, X, Sparkles, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
      scrolled 
        ? "bg-slate-950/95 backdrop-blur-2xl border-b border-amber-500/20 shadow-[0_4px_60px_rgba(0,0,0,0.4)]" 
        : "bg-transparent"
    }`}>
      <div className="container mx-auto flex h-24 items-center justify-between px-4 md:px-8">
        {/* Premium Logo */}
        <Link href="/" className="flex items-center gap-4 group">
          <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 via-orange-600 to-amber-700 shadow-xl shadow-orange-500/30 group-hover:shadow-orange-500/50 transition-all duration-700 group-hover:scale-110 group-hover:rotate-3">
            <Scale className="h-7 w-7 text-white relative z-10" />
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            {/* Glow ring */}
            <div className="absolute -inset-1 bg-gradient-to-br from-amber-400 via-orange-500 to-amber-600 rounded-2xl blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-700 -z-10"></div>
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-3xl font-bold bg-gradient-to-r from-amber-200 via-white to-amber-200 bg-clip-text text-transparent tracking-tight">
              NyayaSetu
            </span>
            <span className="text-[11px] text-amber-400/80 hidden sm:block uppercase tracking-[0.2em] font-medium">न्याय सेतु</span>
          </div>
        </Link>
        
        {/* Premium Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2">
          <Link 
            href="/documents" 
            className="px-6 py-3 text-sm font-medium text-slate-300 hover:text-amber-400 hover:bg-white/5 rounded-xl transition-all duration-300"
          >
            Documents
          </Link>
          <Link 
            href="/pricing" 
            className="px-6 py-3 text-sm font-medium text-slate-300 hover:text-amber-400 hover:bg-white/5 rounded-xl transition-all duration-300"
          >
            Pricing
          </Link>
          <Link 
            href="/documents" 
            className="group relative ml-4 px-8 py-3.5 text-sm font-bold text-white overflow-hidden rounded-2xl transition-all duration-500"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 transition-all duration-500 group-hover:shadow-[0_0_40px_rgba(245,158,11,0.5)]"></span>
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
            <span className="relative flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Create Document
              <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </Link>
        </nav>

        {/* Premium Mobile Menu Button */}
        <button 
          className="md:hidden p-3 text-slate-300 hover:text-amber-400 hover:bg-white/5 rounded-xl transition-all"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Premium Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 border-t border-amber-500/20 bg-slate-950/98 backdrop-blur-2xl">
          <nav className="flex flex-col p-6 gap-3">
            <Link 
              href="/documents" 
              className="px-5 py-4 text-base font-medium text-slate-300 hover:text-amber-400 hover:bg-white/5 rounded-xl transition-all"
              onClick={() => setMobileMenuOpen(false)}
            >
              Documents
            </Link>
            <Link 
              href="/pricing" 
              className="px-5 py-4 text-base font-medium text-slate-300 hover:text-amber-400 hover:bg-white/5 rounded-xl transition-all"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link 
              href="/documents" 
              className="px-5 py-4 text-base font-bold text-white bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl text-center mt-2 shadow-lg shadow-orange-500/25"
              onClick={() => setMobileMenuOpen(false)}
            >
              Create Document Now
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
