"use client";

import Link from "next/link";
import { FileText, Menu, X, Crown } from "lucide-react";
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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled 
        ? "bg-[#0a0a0f]/90 backdrop-blur-2xl border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.3)]" 
        : "bg-transparent"
    }`}>
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-all duration-500 group-hover:scale-105">
            <FileText className="h-5 w-5 text-white relative z-10" />
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black bg-gradient-to-r from-white via-white to-blue-200 bg-clip-text text-transparent tracking-tight">
              DocReady
            </span>
            <span className="text-[10px] text-slate-400 hidden sm:block uppercase tracking-widest">Premium Legal AI</span>
          </div>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          <Link 
            href="/documents" 
            className="px-5 py-2.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-300"
          >
            Documents
          </Link>
          <Link 
            href="/pricing" 
            className="px-5 py-2.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-300"
          >
            Pricing
          </Link>
          <Link 
            href="/documents" 
            className="group relative ml-3 px-6 py-2.5 text-sm font-bold text-white overflow-hidden rounded-xl transition-all duration-300"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(249,115,22,0.5)]"></span>
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
            <span className="relative flex items-center gap-2">
              <Crown className="h-4 w-4" />
              Get Started
            </span>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2.5 text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-all"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 border-t border-white/10 bg-[#0a0a0f]/98 backdrop-blur-2xl">
          <nav className="flex flex-col p-4 gap-2">
            <Link 
              href="/documents" 
              className="px-4 py-3.5 text-base font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-all"
              onClick={() => setMobileMenuOpen(false)}
            >
              Documents
            </Link>
            <Link 
              href="/pricing" 
              className="px-4 py-3.5 text-base font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-all"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link 
              href="/documents" 
              className="px-4 py-3.5 text-base font-bold text-white bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl text-center mt-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Get Started Free
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
