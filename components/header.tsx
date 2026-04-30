"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { NotificationBell } from "@/components/notification-bell";
import { FileText, Menu, X, Sparkles, ChevronRight, User, LogOut, Globe, Eye } from "lucide-react";
import { useState, useEffect } from "react";

export function Header() {
  const { isAuthenticated, user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const languages = [
    { code: "en", label: "EN" },
    { code: "hi", label: "हिंदी" },
    { code: "te", label: "తెలుగు" },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? "glass-strong border-b border-[var(--border)]" 
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6 lg:px-8">
        {/* Sakshi.ai Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--accent-orange)] to-[var(--accent-gold)] shadow-lg shadow-orange-500/20 group-hover:shadow-orange-500/40 transition-all duration-300 group-hover:scale-105">
            <Eye className="h-5 w-5 text-white relative z-10" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-2xl font-bold text-[var(--text-primary)] tracking-tight">
              Sakshi<span className="text-[var(--accent-gold)]">.ai</span>
            </span>
            <span className="text-[10px] text-[var(--text-muted)] -mt-1 tracking-wide">India&apos;s Legal Witness</span>
          </div>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          <Link 
            href="/documents" 
            className="px-4 py-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/5 rounded-lg transition-all duration-200"
          >
            Documents
          </Link>
          <Link 
            href="/lawyers" 
            className="px-4 py-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/5 rounded-lg transition-all duration-200"
          >
            Find a Lawyer
          </Link>
          <Link 
            href="/pricing" 
            className="px-4 py-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/5 rounded-lg transition-all duration-200"
          >
            Pricing
          </Link>
          <Link 
            href="/lawyer/login" 
            className="px-4 py-2 text-sm font-medium text-[var(--accent-gold)] hover:text-[var(--accent-orange)] hover:bg-[var(--accent-gold)]/10 rounded-lg transition-all duration-200"
          >
            Join as Lawyer
          </Link>
        </nav>

        {/* Right Side Actions */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Language Selector */}
          <div className="relative">
            <button 
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/5 rounded-lg transition-all duration-200"
            >
              <Globe className="h-4 w-4" />
              <span>EN</span>
            </button>
            {langMenuOpen && (
              <div className="absolute top-full right-0 mt-2 py-2 w-32 glass-card shadow-xl">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    className="w-full px-4 py-2 text-sm text-left text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/5 transition-colors"
                    onClick={() => setLangMenuOpen(false)}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <NotificationBell userType="user" />
              
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-[var(--border)] hover:border-[var(--border-hover)] transition-all"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[var(--accent-gold)] to-[var(--accent-orange)]">
                  <User className="h-4 w-4 text-white" />
                </div>
              </button>
              
              {showUserMenu && (
                <div className="absolute top-full right-4 mt-2 w-56 glass-card shadow-xl py-2">
                  <div className="px-4 py-3 border-b border-[var(--border)]">
                    <p className="text-sm font-medium text-[var(--text-primary)]">{user?.name || "User"}</p>
                    <p className="text-xs text-[var(--text-muted)]">{user?.email || user?.phone}</p>
                  </div>
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/5 transition-colors"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <FileText className="h-4 w-4" />
                    My Documents
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setShowUserMenu(false);
                    }}
                    className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link 
                href="/login" 
                className="px-4 py-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                Login
              </Link>
              <Link 
                href="/documents" 
                className="group relative px-5 py-2.5 text-sm font-bold text-white overflow-hidden rounded-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(245,158,11,0.3)]"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-[var(--accent-orange)] to-[var(--accent-gold)]"></span>
                <span className="relative flex items-center gap-1.5">
                  Get Started
                  <ChevronRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </span>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/5 rounded-lg transition-all"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 glass-strong border-t border-[var(--border)]">
          <nav className="flex flex-col p-4 gap-2">
            <Link 
              href="/documents" 
              className="px-4 py-3 text-base font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/5 rounded-lg transition-all"
              onClick={() => setMobileMenuOpen(false)}
            >
              Documents
            </Link>
            <Link 
              href="/lawyers" 
              className="px-4 py-3 text-base font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/5 rounded-lg transition-all"
              onClick={() => setMobileMenuOpen(false)}
            >
              Find a Lawyer
            </Link>
            <Link 
              href="/pricing" 
              className="px-4 py-3 text-base font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/5 rounded-lg transition-all"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link 
              href="/lawyer/login" 
              className="px-4 py-3 text-base font-medium text-[var(--accent-gold)] hover:bg-[var(--accent-gold)]/10 rounded-lg transition-all"
              onClick={() => setMobileMenuOpen(false)}
            >
              Join as Lawyer
            </Link>
            <div className="border-t border-[var(--border)] my-2"></div>
            {isAuthenticated ? (
              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 px-4 py-3 text-base font-medium text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
              >
                <LogOut className="h-5 w-5" />
                Logout
              </button>
            ) : (
              <Link 
                href="/documents" 
                className="flex items-center justify-center gap-2 px-4 py-3 text-base font-bold text-white bg-gradient-to-r from-[var(--accent-orange)] to-[var(--accent-gold)] rounded-lg transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Sparkles className="h-5 w-5" />
                Get Started
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
