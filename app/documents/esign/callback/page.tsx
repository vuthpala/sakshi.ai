"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, XCircle, Loader2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function ESignCallbackContent() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  const esignId = searchParams.get("esign_id");
  const statusParam = searchParams.get("status");

  useEffect(() => {
    if (statusParam) {
      if (statusParam === "completed" || statusParam === "success") {
        setStatus("success");
        setMessage("Your document has been successfully signed with Aadhaar eSign.");
      } else if (statusParam === "rejected" || statusParam === "failed") {
        setStatus("error");
        setMessage("The eSign process was not completed. Please try again.");
      } else {
        setStatus("loading");
        setMessage("Processing your eSign request...");
      }
    } else {
      setStatus("error");
      setMessage("Invalid callback parameters.");
    }
  }, [statusParam]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          {status === "loading" && (
            <div className="flex justify-center mb-4">
              <Loader2 className="h-16 w-16 text-orange-500 animate-spin" />
            </div>
          )}
          {status === "success" && (
            <div className="flex justify-center mb-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
            </div>
          )}
          {status === "error" && (
            <div className="flex justify-center mb-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                <XCircle className="h-10 w-10 text-red-600" />
              </div>
            </div>
          )}
          <CardTitle className="text-2xl">
            {status === "loading" && "Processing..."}
            {status === "success" && "eSign Successful!"}
            {status === "error" && "eSign Failed"}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <p className="text-slate-600">{message}</p>

          {esignId && (
            <div className="p-3 bg-slate-100 rounded-lg">
              <p className="text-xs text-slate-500">eSign Reference ID</p>
              <p className="text-sm font-mono text-slate-700">{esignId}</p>
            </div>
          )}

          <div className="flex flex-col gap-3">
            {status === "success" && (
              <Button asChild className="bg-green-600 hover:bg-green-700">
                <Link href="/dashboard">Go to Dashboard</Link>
              </Button>
            )}
            <Button variant="outline" asChild>
              <Link href="/documents">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Documents
              </Link>
            </Button>
          </div>

          <p className="text-xs text-slate-400">
            You can close this window if it doesn&apos;t close automatically.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default function ESignCallbackPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <Loader2 className="h-12 w-12 text-orange-500 animate-spin mx-auto mb-4" />
            <p className="text-slate-600">Loading...</p>
          </CardContent>
        </Card>
      </div>
    }>
      <ESignCallbackContent />
    </Suspense>
  );
}
