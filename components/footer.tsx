"use client";

import { FileText, Mail, MapPin } from "lucide-react";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-slate-950 border-t border-slate-800">
      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-800">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">DocReady</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              AI-powered legal document generation for India. Create professional, court-ready documents in seconds.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              <Link href="/documents" className="text-slate-400 hover:text-white text-sm transition-colors">All Documents</Link>
              <Link href="/documents/rent-agreement" className="text-slate-400 hover:text-white text-sm transition-colors">Rent Agreement</Link>
              <Link href="/pricing" className="text-slate-400 hover:text-white text-sm transition-colors">Pricing</Link>
            </nav>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <div className="flex flex-col gap-2">
              <a href="mailto:support@docready.in" className="flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-colors">
                <Mail className="h-4 w-4" />
                support@docready.in
              </a>
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <MapPin className="h-4 w-4" />
                India
              </div>
            </div>
          </div>
        </div>
        
        {/* Disclaimer */}
        <div className="border-t border-slate-800 pt-8 mb-8">
          <p className="text-center text-xs text-slate-500 max-w-2xl mx-auto leading-relaxed">
            <strong className="text-slate-400">Disclaimer:</strong> DocReady is not a substitute for professional legal advice. 
            The documents generated are templates and should be reviewed by a qualified lawyer before use. 
            We are not a law firm and do not provide legal representation.
          </p>
        </div>
        
        {/* Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>&copy; {currentYear} DocReady. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
