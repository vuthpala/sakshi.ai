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
  Crown,
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
  const isPremium = document.price >= 99;
  
  return (
    <div className="group relative flex flex-col h-full perspective-1000">
      {/* Popular Badge */}
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
          <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold shadow-lg shadow-orange-500/40 animate-pulse">
            <Sparkles className="h-3.5 w-3.5" />
            MOST POPULAR
          </div>
        </div>
      )}
      
      {/* Premium Badge */}
      {isPremium && !isPopular && (
        <div className="absolute -top-3 right-4 z-20">
          <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-violet-500 to-purple-500 text-white text-xs font-semibold shadow-lg">
            <Crown className="h-3 w-3" />
            PRO
          </div>
        </div>
      )}
      
      <div className="flex flex-col h-full bg-white rounded-3xl border border-slate-200/80 overflow-hidden transition-all duration-500 hover:shadow-[0_25px_60px_rgba(0,0,0,0.15)] hover:border-orange-300/50 hover:-translate-y-2 group-hover:[transform:rotateX(2deg)]">
        {/* Card Header with 3D Gradient Icon */}
        <div className="p-7 pb-5">
          <div className={`relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} shadow-xl mb-5 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-2xl`}>
            <Icon className="h-8 w-8 text-white relative z-10" />
            <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-orange-600 transition-colors duration-300">{document.name}</h3>
          <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">
            {document.description}
          </p>
        </div>
        
        {/* Price Section with Gradient Text */}
        <div className="px-7 py-5 bg-gradient-to-r from-slate-50 to-white border-y border-slate-100">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent">${document.price}</span>
            <span className="text-sm font-medium text-slate-400 uppercase tracking-wider">USD</span>
          </div>
        </div>
        
        {/* Premium CTA Button with Shimmer Effect */}
        <div className="p-7 mt-auto">
          <Link 
            href={`/documents/${document.id}`} 
            className="group/btn relative flex items-center justify-center gap-2 w-full px-6 py-4 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-white font-bold rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-[0_10px_40px_rgba(249,115,22,0.4)] hover:-translate-y-0.5"
          >
            {/* Shimmer Effect */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></span>
            
            <span className="relative">Generate Now</span>
            <ArrowRight className="h-5 w-5 relative transition-all duration-300 group-hover/btn:translate-x-1 group-hover/btn:scale-110" />
          </Link>
        </div>
      </div>
    </div>
  );
}
