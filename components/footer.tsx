"use client";

import { FileText, Mail, MapPin, Phone, ExternalLink, Eye, Globe, Share2 } from "lucide-react";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-[#0a0f1e] border-t border-[var(--border)]">
      <div className="container mx-auto px-4 py-16 md:px-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--accent-orange)] to-[var(--accent-gold)] shadow-lg">
                <Eye className="h-5 w-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold text-[var(--text-primary)]">Sakshi<span className="text-[var(--accent-gold)]">.ai</span></span>
                <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">India&apos;s Legal Witness</span>
              </div>
            </Link>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-6">
              India&apos;s trusted legal document platform. Generate documents in 9 Indian languages, find verified lawyers near you, and get digitally signed documents in minutes.
            </p>
            <div className="flex items-center gap-4">
              <a href="mailto:hello@sakshi.ai" className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--accent-gold)] text-sm transition-colors">
                <Mail className="h-4 w-4" />
                hello@sakshi.ai
              </a>
            </div>
            <div className="flex items-center gap-3 mt-4">
              <a href="#" className="p-2 text-[var(--text-muted)] hover:text-[var(--accent-gold)] hover:bg-white/5 rounded-lg transition-all">
                <Globe className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 text-[var(--text-muted)] hover:text-[var(--accent-gold)] hover:bg-white/5 rounded-lg transition-all">
                <Share2 className="h-4 w-4" />
              </a>
            </div>
          </div>
          
          {/* Popular Documents */}
          <div>
            <h4 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">Popular Documents</h4>
            <nav className="flex flex-col gap-3">
              <Link href="/documents/rent-agreement" className="text-[var(--text-muted)] hover:text-[var(--accent-gold)] text-sm transition-colors flex items-center gap-1 group">
                Rent Agreement
                <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link href="/documents/sale-deed" className="text-[var(--text-muted)] hover:text-[var(--accent-gold)] text-sm transition-colors flex items-center gap-1 group">
                Sale Deed
                <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link href="/documents/will-testament" className="text-[var(--text-muted)] hover:text-[var(--accent-gold)] text-sm transition-colors flex items-center gap-1 group">
                Will / Testament
                <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link href="/documents/legal-notice" className="text-[var(--text-muted)] hover:text-[var(--accent-gold)] text-sm transition-colors flex items-center gap-1 group">
                Legal Notice
                <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link href="/documents/nda" className="text-[var(--text-muted)] hover:text-[var(--accent-gold)] text-sm transition-colors flex items-center gap-1 group">
                NDA Agreement
                <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </nav>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-[var(--text-primary)] font-semibold mb-6 text-sm uppercase tracking-wider">Company</h4>
            <nav className="flex flex-col gap-3">
              <Link href="/documents" className="text-[var(--text-muted)] hover:text-[var(--accent-gold)] text-sm transition-colors">All Documents</Link>
              <Link href="/pricing" className="text-[var(--text-muted)] hover:text-[var(--accent-gold)] text-sm transition-colors">Pricing</Link>
              <Link href="/" className="text-[var(--text-muted)] hover:text-[var(--accent-gold)] text-sm transition-colors">How It Works</Link>
              <Link href="/" className="text-[var(--text-muted)] hover:text-[var(--accent-gold)] text-sm transition-colors">About Us</Link>
              <Link href="/" className="text-[var(--text-muted)] hover:text-[var(--accent-gold)] text-sm transition-colors">Blog</Link>
            </nav>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="text-[var(--text-primary)] font-semibold mb-6 text-sm uppercase tracking-wider">Contact</h4>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-[var(--accent-gold)] mt-0.5" />
                <span className="text-[var(--text-secondary)] text-sm">
                  Made with ❤️ in India<br />
                  Serving all 28 states
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-[var(--accent-gold)]" />
                <span className="text-[var(--text-secondary)] text-sm">9949649606</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-[var(--accent-gold)]" />
                <span className="text-[var(--text-secondary)] text-sm">hello@sakshi.ai</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-[var(--accent-gold)]/20 to-transparent mb-8"></div>
        
        {/* Disclaimer */}
        <div className="mb-8">
          <p className="text-center text-xs text-[var(--text-muted)] max-w-3xl mx-auto leading-relaxed">
            <strong className="text-[var(--accent-gold)]">Disclaimer:</strong> Sakshi.ai provides automated document templates and is not a substitute for professional legal advice. 
            Documents should be reviewed by a qualified advocate before use. We are not a law firm and do not provide legal representation or attorney-client privilege.
          </p>
        </div>
        
        {/* Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[var(--text-muted)]">
          <p>&copy; 2025 Sakshi.ai — India&apos;s Legal Witness. Made with ❤️ for India 🇮🇳</p>
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-[var(--accent-gold)] transition-colors">Privacy Policy</Link>
            <Link href="/" className="hover:text-[var(--accent-gold)] transition-colors">Terms of Service</Link>
            <Link href="/" className="hover:text-[var(--accent-gold)] transition-colors">Refund Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
