'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Shield, ShieldCheck, ShieldAlert, Search, FileText, Calendar, User, Hash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface VerificationResult {
  isValid: boolean;
  documentId?: string;
  documentType?: string;
  signedAt?: string;
  lawyerName?: string;
  lawyerBarCouncilId?: string;
  message: string;
}

function VerifyContent() {
  const searchParams = useSearchParams();
  const initialId = searchParams.get('id') || '';
  
  const [input, setInput] = useState(initialId);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [error, setError] = useState('');

  // Auto-verify if ID is provided in URL
  useEffect(() => {
    if (initialId) {
      handleVerify(initialId);
    }
  }, [initialId]);

  const handleVerify = async (idOrHash: string = input) => {
    if (!idOrHash.trim()) {
      setError('Please enter a Document ID or Hash');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      // Try by ID first
      let response = await fetch(`/api/verify/${idOrHash}`);
      
      // If not found, try by hash
      if (!response.ok && response.status === 404) {
        response = await fetch(`/api/verify/hash/${idOrHash}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError('Unable to verify. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDocumentType = (type?: string) => {
    if (!type) return 'N/A';
    return type.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
            <Shield className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Verify Document Authenticity
          </h1>
          <p className="text-slate-600 dark:text-slate-300">
            Verify the authenticity of your Sakshi.ai documents using blockchain verification
          </p>
        </div>

        {/* Search Form */}
        <Card className="mb-6 shadow-lg">
          <CardContent className="pt-6">
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  placeholder="Enter Document ID or Hash"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleVerify()}
                  className="h-12"
                />
              </div>
              <Button 
                onClick={() => handleVerify()}
                disabled={loading}
                className="h-12 px-6 bg-green-600 hover:bg-green-700"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Verifying...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Search className="w-4 h-4" />
                    Verify
                  </span>
                )}
              </Button>
            </div>

            {error && (
              <p className="mt-3 text-sm text-red-600 dark:text-red-400">
                {error}
              </p>
            )}
          </CardContent>
        </Card>

        {/* Verification Result */}
        {result && (
          <Card className={`shadow-lg border-l-4 ${
            result.isValid 
              ? 'border-l-green-500 bg-green-50/50 dark:bg-green-900/10' 
              : 'border-l-red-500 bg-red-50/50 dark:bg-red-900/10'
          }`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                {result.isValid ? (
                  <>
                    <ShieldCheck className="w-6 h-6 text-green-600 dark:text-green-400" />
                    <span className="text-green-700 dark:text-green-300">
                      Document Verified — Authentic
                    </span>
                  </>
                ) : (
                  <>
                    <ShieldAlert className="w-6 h-6 text-red-600 dark:text-red-400" />
                    <span className="text-red-700 dark:text-red-300">
                      Verification Failed
                    </span>
                  </>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {result.isValid ? (
                <>
                  <p className="text-green-700 dark:text-green-300 font-medium">
                    ✅ This document is genuine and unaltered
                  </p>

                  <div className="grid gap-4 mt-4">
                    <div className="flex items-start gap-3">
                      <FileText className="w-5 h-5 text-slate-500 mt-0.5" />
                      <div>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Document Type</p>
                        <p className="font-medium text-slate-900 dark:text-white">
                          {formatDocumentType(result.documentType)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Hash className="w-5 h-5 text-slate-500 mt-0.5" />
                      <div>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Document ID</p>
                        <p className="font-medium text-slate-900 dark:text-white font-mono text-sm">
                          {result.documentId}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-slate-500 mt-0.5" />
                      <div>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Signed Date</p>
                        <p className="font-medium text-slate-900 dark:text-white">
                          {formatDate(result.signedAt)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <User className="w-5 h-5 text-slate-500 mt-0.5" />
                      <div>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Verified By</p>
                        <p className="font-medium text-slate-900 dark:text-white">
                          {result.lawyerName}
                        </p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          Bar Council ID: {result.lawyerBarCouncilId}
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-4">
                  <ShieldAlert className="w-12 h-12 text-red-500 mx-auto mb-3" />
                  <p className="text-red-700 dark:text-red-300 font-medium">
                    ❌ Document not found or may have been tampered
                  </p>
                  <p className="text-slate-600 dark:text-slate-400 mt-2 text-sm">
                    This document ID or hash does not exist in our verified records.
                    Please verify the details and try again.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Footer Info */}
        <div className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
          <p className="flex items-center justify-center gap-2">
            <Shield className="w-4 h-4" />
            Secured by Sakshi.ai Blockchain Verification
          </p>
          <p className="mt-1">
            All verified documents are protected by SHA-256 cryptographic hashing
          </p>
        </div>
      </div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-3">
          <span className="w-6 h-6 border-4 border-green-600 border-t-transparent rounded-full animate-spin" />
          <span className="text-slate-600 dark:text-slate-300">Loading...</span>
        </div>
      </div>
    }>
      <VerifyContent />
    </Suspense>
  );
}
