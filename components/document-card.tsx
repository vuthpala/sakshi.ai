"use client";

import Link from "next/link";
import { 
  Home, 
  Briefcase, 
  Shield, 
  UserCheck, 
  ShoppingCart, 
  Users,
  ArrowRight,
  Sparkles,
  Building,
  Handshake,
  HardHat,
  Lightbulb,
  FileKey,
  Scroll,
  Banknote,
  Receipt,
  Copyright,
  Key,
  Store,
  Globe,
  PieChart,
  Package,
  TrendingUp,
  GitMerge,
  UserX,
  GraduationCap,
  Building2,
  ArrowLeftRight,
  UsersRound,
  Heart,
  Scale,
  Baby,
  Landmark,
  FileOutput,
  BadgeCheck,
  ShieldCheck,
  OctagonAlert,
  MailWarning,
  FileCheck,
  ShoppingBag,
  ReceiptText,
  FileDigit,
  ClipboardList,
  Truck
} from "lucide-react";
import { DocumentType } from "@/types";

const iconMap: Record<string, React.ElementType> = {
  Home,
  Briefcase,
  Shield,
  UserCheck,
  ShoppingCart,
  Users,
  Building,
  Handshake,
  HardHat,
  Lightbulb,
  FileKey,
  Scroll,
  Banknote,
  Receipt,
  Copyright,
  Key,
  Store,
  Globe,
  PieChart,
  Package,
  TrendingUp,
  GitMerge,
  UserX,
  GraduationCap,
  Building2,
  ArrowLeftRight,
  UsersRound,
  Heart,
  Scale,
  Baby,
  Landmark,
  FileOutput,
  BadgeCheck,
  ShieldCheck,
  OctagonAlert,
  MailWarning,
  FileCheck,
  ShoppingBag,
  ReceiptText,
  FileDigit,
  ClipboardList,
  Truck,
};

const gradientMap: Record<string, string> = {
  home: "from-blue-500 to-blue-700",
  briefcase: "from-violet-500 to-violet-700",
  shield: "from-emerald-500 to-emerald-700",
  "user-check": "from-amber-500 to-orange-600",
  "shopping-cart": "from-rose-500 to-rose-700",
  users: "from-cyan-500 to-cyan-700",
  building: "from-slate-500 to-slate-700",
  handshake: "from-teal-500 to-teal-700",
  "hard-hat": "from-yellow-500 to-amber-600",
  lightbulb: "from-yellow-400 to-orange-500",
  "file-key": "from-indigo-500 to-indigo-700",
  scroll: "from-amber-600 to-yellow-700",
  banknote: "from-green-500 to-emerald-600",
  receipt: "from-orange-400 to-red-500",
  copyright: "from-purple-500 to-purple-700",
  key: "from-amber-500 to-yellow-600",
  store: "from-pink-500 to-rose-600",
  globe: "from-sky-500 to-blue-600",
  "pie-chart": "from-pink-500 to-purple-600",
  package: "from-orange-500 to-red-600",
  "trending-up": "from-green-500 to-emerald-600",
  "git-merge": "from-violet-500 to-purple-600",
  "user-x": "from-red-500 to-rose-600",
  "graduation-cap": "from-blue-400 to-indigo-500",
  "building-2": "from-slate-600 to-slate-800",
  "arrow-left-right": "from-cyan-500 to-blue-600",
  "users-round": "from-teal-500 to-cyan-600",
  heart: "from-pink-500 to-rose-500",
  scale: "from-amber-500 to-orange-600",
  baby: "from-pink-400 to-rose-500",
  landmark: "from-stone-500 to-stone-700",
  "file-output": "from-zinc-500 to-zinc-700",
  "badge-check": "from-blue-500 to-indigo-600",
  "shield-check": "from-emerald-500 to-green-600",
  "octagon-alert": "from-red-500 to-rose-600",
  "mail-warning": "from-orange-500 to-amber-600",
  "file-check": "from-green-500 to-emerald-600",
  "shopping-bag": "from-violet-500 to-purple-600",
  "receipt-text": "from-gray-500 to-gray-700",
  "file-digit": "from-blue-400 to-blue-600",
  "clipboard-list": "from-teal-500 to-cyan-600",
  truck: "from-amber-600 to-orange-700",
};

interface DocumentCardProps {
  document: DocumentType;
}

export function DocumentCard({ document }: DocumentCardProps) {
  const Icon = iconMap[document.icon] || Home;
  const gradient = gradientMap[document.icon] || "from-blue-500 to-blue-700";
  const isPopular = document.id === "rent-agreement";
  
  return (
    <div className="group relative flex flex-col h-full">
      {/* Popular Badge */}
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
          <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-semibold shadow-lg shadow-orange-500/30">
            <Sparkles className="h-3 w-3" />
            Most Popular
          </div>
        </div>
      )}
      
      <div className="flex flex-col h-full bg-white rounded-2xl border border-slate-200/60 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-blue-900/10 hover:border-orange-300 hover:-translate-y-1">
        {/* Card Header with Gradient Icon */}
        <div className="p-6 pb-4">
          <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} shadow-lg mb-4 transition-transform duration-300 group-hover:scale-110`}>
            <Icon className="h-7 w-7 text-white" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">{document.name}</h3>
          <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">
            {document.description}
          </p>
        </div>
        
        {/* Price Section */}
        <div className="px-6 py-4 bg-slate-50/50 border-y border-slate-100">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">${document.price}</span>
            <span className="text-sm text-slate-500">USD</span>
          </div>
        </div>
        
        {/* CTA Button */}
        <div className="p-6 mt-auto">
          <Link 
            href={`/documents/${document.id}`} 
            className="flex items-center justify-center gap-2 w-full px-6 py-3.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/25 group-hover:gap-3"
          >
            Generate Now
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
