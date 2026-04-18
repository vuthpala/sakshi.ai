"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import Script from "next/script";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { generatePDF, downloadPDF, PDFFont, PDFOptions } from "@/lib/pdf-generator";
import { FileText, Download, Lock, CheckCircle, Loader2, Type, Settings2 } from "lucide-react";
import Confetti from "react-confetti";
import { getRazorpayConfig } from "@/lib/config";

interface DocumentData {
  id: string;
  document_type: string;
  generated_text: string;
  payment_status: "pending" | "paid";
  form_data: {
    property?: {
      city?: string;
      state?: string;
    };
  };
}

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

interface RazorpayOptions {
  
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayResponse) => void;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  theme?: {
    color: string;
  };
}

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface RazorpayInstance {
  open: () => void;
}

export default function PreviewPage() {
  const params = useParams();
  const documentId = params.id as string;
  
  const [document, setDocument] = useState<DocumentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showFullDocument, setShowFullDocument] = useState(false);
  const [selectedFont, setSelectedFont] = useState<PDFFont>("times");
  const [fontSize, setFontSize] = useState<number>(14);

  const fetchDocument = useCallback(async () => {
    try {
      const response = await fetch(`/api/documents/${documentId}`);
      if (!response.ok) throw new Error("Failed to fetch document");
      const data = await response.json();
      setDocument(data);
      if (data.payment_status === "paid") {
        setShowFullDocument(true);
      }
    } catch (error) {
      console.error("Error fetching document:", error);
    } finally {
      setLoading(false);
    }
  }, [documentId]);

  useEffect(() => {
    fetchDocument();
  }, [fetchDocument]);

  const handlePayment = async () => {
    setIsProcessing(true);
    try {
      // Create order
      const orderResponse = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: 49,
          receipt: `doc_${documentId}`,
        }),
      });

      if (!orderResponse.ok) throw new Error("Failed to create order");
      const orderData = await orderResponse.json();

      // Initialize Razorpay
      const razorpayConfig = getRazorpayConfig();
      const options: RazorpayOptions = {
        key: razorpayConfig.KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "PaperWise",
        description: "Rent Agreement Document",
        order_id: orderData.orderId,
        handler: async (response: RazorpayResponse) => {
          // Verify payment
          const verifyResponse = await fetch("/api/payment/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              documentId,
            }),
          });

          if (verifyResponse.ok) {
            setShowConfetti(true);
            setShowFullDocument(true);
            await fetchDocument();
            setTimeout(() => setShowConfetti(false), 5000);
          }
        },
        theme: {
          color: "#f97316",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!document) return;
    
    const options: PDFOptions = {
      font: selectedFont,
      fontSize: fontSize,
    };
    
    const blob = generatePDF(
      document.generated_text,
      document.document_type === "rent-agreement" ? "RENT AGREEMENT" : "LEGAL DOCUMENT",
      options
    );
    downloadPDF(blob, `paperwise-${document.document_type}-${document.id.slice(0, 8)}.pdf`);
  };

  const renderDocumentContent = () => {
    if (!document) return null;

    if (showFullDocument) {
      return (
        <div className="font-serif text-sm leading-relaxed whitespace-pre-wrap">
          {document.generated_text}
        </div>
      );
    }

    // Show blurred preview
    const lines = document.generated_text.split("\n");
    const halfLength = Math.floor(lines.length / 2);
    const visibleLines = lines.slice(0, halfLength);
    const hiddenLines = lines.slice(halfLength);

    return (
      <div className="relative">
        <div className="font-serif text-sm leading-relaxed whitespace-pre-wrap">
          {visibleLines.join("\n")}
        </div>
        <div className="relative mt-4">
          <div 
            className="font-serif text-sm leading-relaxed whitespace-pre-wrap blur-sm select-none"
            style={{ filter: "blur(4px)" }}
          >
            {hiddenLines.join("\n")}
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-lg text-center">
              <Lock className="h-8 w-8 text-orange-500 mx-auto mb-2" />
              <p className="text-slate-700 font-medium">Complete document locked</p>
              <p className="text-sm text-slate-500">Pay ₹49 to unlock and download</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex items-center gap-2 text-slate-500">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>Loading document...</span>
        </div>
      </div>
    );
  }

  if (!document) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-slate-500">Document not found</p>
      </div>
    );
  }

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={200}
        />
      )}

      <div className="flex min-h-screen flex-col">
        <Header />

        <main className="flex-1 bg-slate-50 py-8">
          <div className="container mx-auto max-w-4xl px-4 md:px-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-slate-900">Document Preview</h1>
              <p className="text-slate-500">
                Review your document before downloading
              </p>
            </div>

            {!showFullDocument && (
              <Card className="mb-6 border-orange-200 bg-orange-50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100">
                        <FileText className="h-5 w-5 text-orange-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">Pay ₹49 to download full PDF</p>
                        <p className="text-sm text-slate-600">One-time payment. No subscription.</p>
                      </div>
                    </div>
                    <Button 
                      onClick={handlePayment} 
                      disabled={isProcessing}
                      className="bg-orange-500 hover:bg-orange-600"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>Pay ₹49</>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {showFullDocument && (
              <Card className="mb-6 border-green-200 bg-green-50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">Payment successful!</p>
                        <p className="text-sm text-slate-600">Your document is ready for download.</p>
                      </div>
                    </div>
                    <Button 
                      onClick={handleDownload}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download PDF
                    </Button>
                  </div>
                  
                  {/* PDF Settings */}
                  <div className="mt-4 pt-4 border-t border-green-200">
                    <div className="flex items-center gap-2 mb-3">
                      <Settings2 className="h-4 w-4 text-green-700" />
                      <span className="text-sm font-medium text-green-800">PDF Settings</span>
                    </div>
                    <div className="flex flex-wrap gap-4">
                      {/* Font Selector */}
                      <div className="flex items-center gap-2">
                        <Type className="h-4 w-4 text-green-600" />
                        <label className="text-sm text-slate-700">Font:</label>
                        <select 
                          value={selectedFont}
                          onChange={(e) => setSelectedFont(e.target.value as PDFFont)}
                          className="text-sm px-3 py-1.5 rounded-lg border border-green-300 bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                          <option value="times">Times (Serif)</option>
                          <option value="helvetica">Helvetica (Sans)</option>
                          <option value="courier">Courier (Mono)</option>
                        </select>
                      </div>
                      
                      {/* Font Size Selector */}
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-slate-700">Size:</span>
                        <select 
                          value={fontSize}
                          onChange={(e) => setFontSize(Number(e.target.value))}
                          className="text-sm px-3 py-1.5 rounded-lg border border-green-300 bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                          <option value={12}>12px (Small)</option>
                          <option value={14}>14px (Normal)</option>
                          <option value={16}>16px (Large)</option>
                          <option value={18}>18px (Extra Large)</option>
                        </select>
                      </div>
                    </div>
                    <p className="text-xs text-green-700 mt-2">
                      Choose your preferred font and size before downloading
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card className="overflow-hidden">
              <CardContent className="p-8 md:p-12">
                <div className="border-b-2 border-slate-900 pb-4 mb-8">
                  <h2 className="text-center text-xl font-bold uppercase tracking-wider text-slate-900">
                    Rent Agreement
                  </h2>
                </div>
                
                {renderDocumentContent()}
              </CardContent>
            </Card>

            <p className="text-center text-xs text-slate-400 mt-6">
              Generated by PaperWise | Not a substitute for professional legal advice
            </p>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
