"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useLawyer } from "@/lib/lawyer-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowLeft,
  FileText,
  User,
  MessageSquare,
  Clock,
  CheckCircle,
  Send,
  PenTool,
  Type,
  Check,
  AlertCircle,
  Download,
  Loader2,
} from "lucide-react";
import type { AgreementRequest } from "@/types/lawyer";
import { getStatusColor, getStatusLabel, formatDate, getDocumentTypeLabel, getLanguageLabel } from "@/lib/lawyer-utils";

export default function AgreementReviewPage() {
  const params = useParams();
  const router = useRouter();
  const agreementId = params.id as string;
  const { lawyer, isAuthenticated, isLoading, agreements, markAsOpened, markAsReviewing, sendMessage, signDocument } = useLawyer();
  
  const [agreement, setAgreement] = useState<AgreementRequest | null>(null);
  const [message, setMessage] = useState("");
  const [signatureType, setSignatureType] = useState<"drawn" | "typed">("drawn");
  const [typedSignature, setTypedSignature] = useState("");
  const [isSigning, setIsSigning] = useState(false);
  const [showSignaturePad, setShowSignaturePad] = useState(false);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/lawyer/login");
    }
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    if (agreements.length > 0) {
      const found = agreements.find((a) => a.id === agreementId);
      if (found) {
        setAgreement(found);
        // Mark as opened if new
        if (found.status === "new") {
          markAsOpened(agreementId);
        }
      } else {
        router.push("/lawyer/dashboard");
      }
    }
  }, [agreements, agreementId, router, markAsOpened]);

  // Signature Canvas Functions
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    setIsDrawing(true);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    const rect = canvas.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    
    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    const rect = canvas.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    
    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleSign = async () => {
    if (!agreement || !lawyer) return;

    setIsSigning(true);

    let signatureData: { type: "drawn" | "typed"; data: string };

    if (signatureType === "drawn") {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const dataUrl = canvas.toDataURL("image/png");
      signatureData = { type: "drawn", data: dataUrl };
    } else {
      if (!typedSignature.trim()) {
        alert("Please type your signature");
        setIsSigning(false);
        return;
      }
      signatureData = { type: "typed", data: typedSignature };
    }

    // Simulate signing delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    signDocument(agreement.id, signatureData);
    setIsSigning(false);
    setShowSignaturePad(false);
  };

  const handleSendMessage = () => {
    if (!message.trim() || !agreement) return;
    sendMessage(agreement.id, message);
    setMessage("");
  };

  const handleStartReview = () => {
    if (agreement) {
      markAsReviewing(agreement.id);
    }
  };

  if (isLoading || !agreement || !lawyer) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/lawyer/dashboard">
              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div className="h-6 w-px bg-slate-700" />
            <h1 className="text-lg font-semibold text-white truncate max-w-md">
              {agreement.documentTitle}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <span className={getStatusColor(agreement.status)}>
              {getStatusLabel(agreement.status)}
            </span>
            <div className="text-right">
              <p className="text-sm font-bold text-amber-500">₹{agreement.lawyerFee}</p>
              <p className="text-xs text-slate-500">Your fee</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Document Preview */}
          <div className="lg:col-span-2 space-y-6">
            {/* Document Preview Card */}
            <Card className="bg-white border-slate-700">
              <CardHeader className="border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-slate-900">Document Preview</CardTitle>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-8">
                <div className="prose prose-slate max-w-none">
                  <div className="border-b-2 border-slate-900 pb-4 mb-8 text-center">
                    <h2 className="text-xl font-bold uppercase tracking-wider text-slate-900">
                      {getDocumentTypeLabel(agreement.documentType)}
                    </h2>
                  </div>
                  <div className="font-serif text-sm leading-relaxed whitespace-pre-wrap text-slate-800">
                    {agreement.editedContent || agreement.originalContent}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Signature Section */}
            {agreement.status !== "completed" && (
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <PenTool className="h-5 w-5 text-amber-500" />
                    Digital Signature
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {!showSignaturePad ? (
                    <div className="flex gap-4">
                      <Button
                        onClick={() => {
                          setSignatureType("drawn");
                          setShowSignaturePad(true);
                        }}
                        className="flex-1 bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold h-16"
                      >
                        <PenTool className="h-5 w-5 mr-2" />
                        Draw Signature
                      </Button>
                      <Button
                        onClick={() => {
                          setSignatureType("typed");
                          setShowSignaturePad(true);
                        }}
                        variant="outline"
                        className="flex-1 border-amber-500/30 text-amber-500 hover:bg-amber-500/10 h-16"
                      >
                        <Type className="h-5 w-5 mr-2" />
                        Type Signature
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex gap-2 mb-4">
                        <button
                          onClick={() => setSignatureType("drawn")}
                          className={`px-4 py-2 rounded-lg font-medium ${
                            signatureType === "drawn"
                              ? "bg-amber-500 text-slate-900"
                              : "bg-slate-700 text-slate-300"
                          }`}
                        >
                          Draw
                        </button>
                        <button
                          onClick={() => setSignatureType("typed")}
                          className={`px-4 py-2 rounded-lg font-medium ${
                            signatureType === "typed"
                              ? "bg-amber-500 text-slate-900"
                              : "bg-slate-700 text-slate-300"
                          }`}
                        >
                          Type
                        </button>
                      </div>

                      {signatureType === "drawn" ? (
                        <div className="space-y-2">
                          <div className="border-2 border-dashed border-slate-600 rounded-lg bg-white">
                            <canvas
                              ref={canvasRef}
                              width={600}
                              height={150}
                              onMouseDown={startDrawing}
                              onMouseMove={draw}
                              onMouseUp={stopDrawing}
                              onMouseLeave={stopDrawing}
                              onTouchStart={startDrawing}
                              onTouchMove={draw}
                              onTouchEnd={stopDrawing}
                              className="w-full cursor-crosshair"
                            />
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={clearSignature}
                              className="border-slate-600 text-slate-300"
                            >
                              Clear
                            </Button>
                            <p className="text-sm text-slate-400 ml-auto">
                              Draw your signature in the box above
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <input
                            type="text"
                            value={typedSignature}
                            onChange={(e) => setTypedSignature(e.target.value)}
                            placeholder="Type your full name"
                            className="w-full px-4 py-3 rounded-lg bg-slate-700 border-slate-600 text-white text-lg"
                          />
                          {typedSignature && (
                            <div className="p-4 bg-white rounded-lg">
                              <p className="text-2xl font-serif italic text-slate-900">
                                {typedSignature}
                              </p>
                            </div>
                          )}
                        </div>
                      )}

                      <div className="flex gap-4 pt-4 border-t border-slate-700">
                        <Button
                          variant="outline"
                          onClick={() => setShowSignaturePad(false)}
                          className="border-slate-600 text-slate-300"
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={handleSign}
                          disabled={isSigning}
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold"
                        >
                          {isSigning ? (
                            <>
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              Signing...
                            </>
                          ) : (
                            <>
                              <Check className="h-4 w-4 mr-2" />
                              Sign Document
                            </>
                          )}
                        </Button>
                      </div>

                      <div className="flex items-start gap-2 p-3 bg-amber-500/10 rounded-lg">
                        <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-amber-200">
                          By signing, you confirm that you have reviewed this document and it is legally accurate. 
                          Your digital signature will include: {lawyer.fullName}, {lawyer.barCouncilNumber}, and date.
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {agreement.status === "completed" && (
              <Card className="bg-green-500/10 border-green-500/20">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/20">
                      <CheckCircle className="h-6 w-6 text-green-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Document Signed Successfully</h3>
                      <p className="text-slate-400">
                        Signed on {agreement.signedAt ? formatDate(agreement.signedAt) : "N/A"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Info & Chat */}
          <div className="space-y-6">
            {/* User Info Card */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <User className="h-5 w-5 text-amber-500" />
                  Client Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-slate-700 flex items-center justify-center">
                    <User className="h-6 w-6 text-slate-400" />
                  </div>
                  <div>
                    <p className="font-medium text-white">{agreement.userName}</p>
                    <p className="text-sm text-slate-400">{agreement.userLocation}</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <p className="text-slate-400">
                    <span className="text-slate-500">Email:</span> {agreement.userEmail}
                  </p>
                  <p className="text-slate-400">
                    <span className="text-slate-500">Phone:</span> {agreement.userPhone}
                  </p>
                  <p className="text-slate-400">
                    <span className="text-slate-500">Language:</span>{" "}
                    {getLanguageLabel(agreement.documentLanguage)}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Document Details */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <FileText className="h-5 w-5 text-amber-500" />
                  Document Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Type</span>
                  <span className="text-white">{getDocumentTypeLabel(agreement.documentType)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Received</span>
                  <span className="text-white">{formatDate(agreement.sentAt)}</span>
                </div>
                {agreement.openedAt && (
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Opened</span>
                    <span className="text-white">{formatDate(agreement.openedAt)}</span>
                  </div>
                )}
                {agreement.signedAt && (
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Signed</span>
                    <span className="text-green-400">{formatDate(agreement.signedAt)}</span>
                  </div>
                )}
                <div className="pt-3 border-t border-slate-700">
                  <div className="flex justify-between">
                    <span className="text-amber-500 font-medium">Your Fee</span>
                    <span className="text-amber-500 font-bold">₹{agreement.lawyerFee}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Chat Card */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-amber-500" />
                  Chat with Client
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 overflow-y-auto space-y-3 mb-4 pr-2">
                  {agreement.messages.length > 0 ? (
                    agreement.messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.senderType === "lawyer" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] p-3 rounded-lg ${
                            msg.senderType === "lawyer"
                              ? "bg-amber-500/20 text-amber-100"
                              : "bg-slate-700 text-slate-200"
                          }`}
                        >
                          <p className="text-xs text-slate-400 mb-1">{msg.senderName}</p>
                          <p className="text-sm">{msg.message}</p>
                          <p className="text-xs text-slate-500 mt-1">
                            {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="h-full flex items-center justify-center text-slate-500">
                      <div className="text-center">
                        <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">No messages yet</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 px-3 py-2 rounded-lg bg-slate-700 border-slate-600 text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!message.trim()}
                    size="sm"
                    className="bg-amber-500 hover:bg-amber-600 text-slate-900"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Clock className="h-5 w-5 text-amber-500" />
                  Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-slate-300">Document Generated</span>
                    <span className="text-xs text-slate-500 ml-auto">{formatDate(agreement.sentAt)}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-slate-300">Sent to Lawyer</span>
                    <span className="text-xs text-slate-500 ml-auto">{formatDate(agreement.sentAt)}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {agreement.openedAt ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <div className="h-4 w-4 rounded-full border-2 border-slate-600" />
                    )}
                    <span className={`text-sm ${agreement.openedAt ? "text-slate-300" : "text-slate-500"}`}>
                      Lawyer Opened
                    </span>
                    {agreement.openedAt && (
                      <span className="text-xs text-slate-500 ml-auto">{formatDate(agreement.openedAt)}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    {agreement.signedAt ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <div className="h-4 w-4 rounded-full border-2 border-slate-600" />
                    )}
                    <span className={`text-sm ${agreement.signedAt ? "text-slate-300" : "text-slate-500"}`}>
                      Document Signed
                    </span>
                    {agreement.signedAt && (
                      <span className="text-xs text-slate-500 ml-auto">{formatDate(agreement.signedAt)}</span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
