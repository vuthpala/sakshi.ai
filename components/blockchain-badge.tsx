'use client';

import { ShieldCheck, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface BlockchainBadgeProps {
  documentId: string;
  isSigned: boolean;
  className?: string;
}

export function BlockchainBadge({ 
  documentId, 
  isSigned,
  className = '' 
}: BlockchainBadgeProps) {
  const verificationUrl = `https://sakshi.ai/verify?id=${documentId}`;

  const handleClick = () => {
    window.open(verificationUrl, '_blank');
  };

  if (!isSigned) {
    return (
      <Badge 
        variant="secondary" 
        className={`bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400 ${className}`}
      >
        <ShieldCheck className="w-3 h-3 mr-1" />
        Pending Verification
      </Badge>
    );
  }

  return (
    <Badge 
      title="This document has been cryptographically signed and verified using SHA-256 hashing. Click to view verification details."
      className={`bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-300 cursor-pointer transition-colors ${className}`}
      onClick={handleClick}
    >
      <ShieldCheck className="w-3 h-3 mr-1" />
      🔒 Blockchain Verified
      <ExternalLink className="w-3 h-3 ml-1" />
    </Badge>
  );
}

export function BlockchainBadgeSmall({ 
  documentId, 
  isSigned 
}: { documentId: string; isSigned: boolean }) {
  const verificationUrl = `https://sakshi.ai/verify?id=${documentId}`;

  if (!isSigned) return null;

  return (
    <button
      onClick={() => window.open(verificationUrl, '_blank')}
      className="inline-flex items-center gap-1 text-xs text-green-600 dark:text-green-400 hover:underline"
    >
      <ShieldCheck className="w-3 h-3" />
      Verified
      <ExternalLink className="w-3 h-3" />
    </button>
  );
}
