"use client";

import { FileText, Mail, MapPin, Phone, ExternalLink } from "lucide-react";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-slate-950 border-t border-emerald-500/20">
      <div className="container mx-auto px-4 py-16 md:px-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 via-teal-600 to-emerald-700 shadow-lg shadow-emerald-500/20">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold bg-gradient-to-r from-emerald-200 via-white to-teal-200 bg-clip-text text-transparent">PaperWise</span>
                <span className="text-[10px] text-emerald-400/60 uppercase tracking-wider">Smart Documents</span>
              </div>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              India's smartest AI-powered legal document platform. Create court-ready documents in 60 seconds.
            </p>
            <div className="flex items-center gap-4">
              <a href="mailto:hello@paperwise.in" className="flex items-center gap-2 text-emerald-400/80 hover:text-emerald-400 text-sm transition-colors">
                <Mail className="h-4 w-4" />
                hello@paperwise.in
              </a>
            </div>
          </div>
          
          {/* Popular Documents */}
          <div>
            <h4 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">Popular Documents</h4>
            <nav className="flex flex-col gap-3">
              <Link href="/documents/rent-agreement" className="text-slate-400 hover:text-emerald-400 text-sm transition-colors flex items-center gap-1 group">
                Rent Agreement
                <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link href="/documents/sale-deed" className="text-slate-400 hover:text-emerald-400 text-sm transition-colors flex items-center gap-1 group">
                Sale Deed
                <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link href="/documents/will-testament" className="text-slate-400 hover:text-emerald-400 text-sm transition-colors flex items-center gap-1 group">
                Will / Testament
                <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link href="/documents/legal-notice" className="text-slate-400 hover:text-emerald-400 text-sm transition-colors flex items-center gap-1 group">
                Legal Notice
                <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link href="/documents/nda" className="text-slate-400 hover:text-emerald-400 text-sm transition-colors flex items-center gap-1 group">
                NDA Agreement
                <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </nav>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">Company</h4>
            <nav className="flex flex-col gap-3">
              <Link href="/documents" className="text-slate-400 hover:text-emerald-400 text-sm transition-colors">All Documents</Link>
              <Link href="/pricing" className="text-slate-400 hover:text-emerald-400 text-sm transition-colors">Pricing</Link>
              <Link href="/" className="text-slate-400 hover:text-emerald-400 text-sm transition-colors">How It Works</Link>
              <Link href="/" className="text-slate-400 hover:text-emerald-400 text-sm transition-colors">About Us</Link>
              <Link href="/" className="text-slate-400 hover:text-emerald-400 text-sm transition-colors">Blog</Link>
            </nav>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">Contact</h4>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-emerald-500 mt-0.5" />
                <span className="text-slate-400 text-sm">
                  Made with ❤️ in India<br />
                  Serving all 28 states
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-emerald-500" />
                <span className="text-slate-400 text-sm">Support: Mon-Sat 9AM-7PM</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent mb-8"></div>
        
        {/* Disclaimer */}
        <div className="mb-8">
          <p className="text-center text-xs text-slate-500 max-w-3xl mx-auto leading-relaxed">
            <strong className="text-emerald-400/80">Disclaimer:</strong> PaperWise provides automated document templates and is not a substitute for professional legal advice. 
            Documents should be reviewed by a qualified advocate before use. We are not a law firm and do not provide legal representation or attorney-client privilege.
          </p>
        </div>
        
        {/* Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>&copy; {currentYear} PaperWise. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-emerald-400 transition-colors">Privacy Policy</Link>
            <Link href="/" className="hover:text-emerald-400 transition-colors">Terms of Service</Link>
            <Link href="/" className="hover:text-emerald-400 transition-colors">Refund Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
