"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { FileText, Menu, X, Sparkles, ChevronRight, User, LogOut } from "lucide-react";
import { useState, useEffect } from "react";

export function Header() {
  const { isAuthenticated, user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
      scrolled 
        ? "bg-slate-950/95 backdrop-blur-2xl border-b border-emerald-500/20 shadow-[0_4px_60px_rgba(0,0,0,0.4)]" 
        : "bg-transparent"
    }`}>
      <div className="container mx-auto flex h-24 items-center justify-between px-4 md:px-8">
        {/* PaperWise Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 via-orange-600 to-red-600 shadow-xl shadow-orange-500/30 group-hover:shadow-orange-500/50 transition-all duration-700 group-hover:scale-110">
            <FileText className="h-6 w-6 text-white relative z-10" />
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-3xl font-bold bg-gradient-to-r from-orange-200 via-white to-red-200 bg-clip-text text-transparent tracking-tight">
              PaperWise
            </span>
          </div>
        </Link>
        
        {/* Premium Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2">
          <Link 
            href="/documents" 
            className="px-6 py-3 text-sm font-medium text-slate-300 hover:text-orange-400 hover:bg-white/5 rounded-xl transition-all duration-300"
          >
            Documents
          </Link>
          <Link 
            href="/pricing" 
            className="px-6 py-3 text-sm font-medium text-slate-300 hover:text-orange-400 hover:bg-white/5 rounded-xl transition-all duration-300"
          >
            Pricing
          </Link>
          
          {isAuthenticated ? (
            <div className="relative ml-4">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600">
                  <User className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-medium">
                  {user?.email || user?.phone || "User"}
                </span>
              </button>
              
              {showUserMenu && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-slate-900 border border-orange-500/20 rounded-xl shadow-xl overflow-hidden">
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2 w-full px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <User className="h-4 w-4" />
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setShowUserMenu(false);
                    }}
                    className="flex items-center gap-2 w-full px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link 
              href="/documents" 
              className="group relative ml-4 px-8 py-3.5 text-sm font-bold text-white overflow-hidden rounded-2xl transition-all duration-500"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 transition-all duration-500 group-hover:shadow-[0_0_40px_rgba(249,115,22,0.5)]"></span>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
              <span className="relative flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Create Document
                <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
          )}
        </nav>

        {/* Premium Mobile Menu Button */}
        <button 
          className="md:hidden p-3 text-slate-300 hover:text-emerald-400 hover:bg-white/5 rounded-xl transition-all"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-6 w-6 text-orange-400" /> : <Menu className="h-6 w-6 text-orange-400" />}
        </button>
      </div>

        {/* Premium Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 border-t border-orange-500/20 bg-slate-950/98 backdrop-blur-2xl">
          <nav className="flex flex-col p-6 gap-3">
            <Link 
              href="/documents" 
              className="px-5 py-4 text-base font-medium text-slate-300 hover:text-orange-400 hover:bg-white/5 rounded-xl transition-all"
              onClick={() => setMobileMenuOpen(false)}
            >
              Documents
            </Link>
            <Link 
              href="/pricing" 
              className="px-5 py-4 text-base font-medium text-slate-300 hover:text-orange-400 hover:bg-white/5 rounded-xl transition-all"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            {isAuthenticated ? (
              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 px-5 py-4 text-base font-bold text-white bg-red-500/20 border border-red-500/30 rounded-xl text-center mt-2"
              >
                <LogOut className="h-5 w-5" />
                Logout
              </button>
            ) : (
              <Link 
                href="/documents" 
                className="px-5 py-4 text-base font-bold text-white bg-gradient-to-r from-orange-500 to-red-500 rounded-xl text-center mt-2 shadow-lg shadow-orange-500/25"
                onClick={() => setMobileMenuOpen(false)}
              >
                Create Document
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
