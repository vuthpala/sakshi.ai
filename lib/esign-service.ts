/**
 * Digio Aadhaar eSign Service
 * Handles document signing via Aadhaar eSign
 */

export interface ESignInitiateParams {
  documentId: string;
  signerName: string;
  signerEmail: string;
  signerPhone: string;
  aadhaarNumber?: string;
  documentContent: string; // Base64 encoded PDF
  documentName: string;
  redirectUrl?: string;
}

export interface ESignInitiateResponse {
  success: boolean;
  esignId?: string;
  signUrl?: string;
  status?: string;
  error?: string;
  details?: any;
}

export interface ESignStatusResponse {
  success: boolean;
  esignId: string;
  status: "pending" | "completed" | "rejected" | "expired" | "failed";
  documentId: string;
  signers: Array<{
    email: string;
    name: string;
    status: string;
    signedAt: string | null;
    signatureType: string;
  }>;
  signedDocumentUrl?: string;
  auditTrailUrl?: string;
  completedAt?: string;
  createdAt: string;
}

/**
 * Initiate Aadhaar eSign for a document
 */
export async function initiateESign(
  params: ESignInitiateParams
): Promise<ESignInitiateResponse> {
  try {
    const response = await fetch("/api/esign/initiate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error || "Failed to initiate eSign",
        details: data.details,
      };
    }

    return {
      success: true,
      esignId: data.esignId,
      signUrl: data.signUrl,
      status: data.status,
    };
  } catch (error) {
    console.error("Initiate eSign error:", error);
    return {
      success: false,
      error: "Network error. Please try again.",
    };
  }
}

/**
 * Check the status of an eSign transaction
 */
export async function checkESignStatus(
  esignId: string
): Promise<ESignStatusResponse | null> {
  try {
    const response = await fetch(`/api/esign/status/${esignId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error("Failed to fetch eSign status");
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Check eSign status error:", error);
    return null;
  }
}

/**
 * Poll eSign status until completed or max attempts reached
 */
export async function pollESignStatus(
  esignId: string,
  onStatusChange: (status: ESignStatusResponse) => void,
  maxAttempts = 60,
  intervalMs = 5000
): Promise<void> {
  let attempts = 0;

  const poll = async () => {
    if (attempts >= maxAttempts) {
      console.log("Max polling attempts reached");
      return;
    }

    const status = await checkESignStatus(esignId);
    
    if (status) {
      onStatusChange(status);

      // Stop polling if final status reached
      if (["completed", "rejected", "expired", "failed"].includes(status.status)) {
        return;
      }
    }

    attempts++;
    setTimeout(poll, intervalMs);
  };

  await poll();
}

/**
 * Open eSign window in popup or redirect
 */
export function openESignWindow(
  signUrl: string,
  mode: "popup" | "redirect" = "popup"
): Window | null {
  if (mode === "popup") {
    const width = 800;
    const height = 700;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;

    return window.open(
      signUrl,
      "AadhaarESign",
      `width=${width},height=${height},left=${left},top=${top},toolbar=no,menubar=no,scrollbars=yes,resizable=yes`
    );
  } else {
    window.location.href = signUrl;
    return null;
  }
}

/**
 * Get human-readable status label
 */
export function getESignStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    pending: "Awaiting Signature",
    completed: "Signed Successfully",
    rejected: "Signature Rejected",
    expired: "Link Expired",
    failed: "Signing Failed",
  };
  return labels[status] || status;
}

/**
 * Get status color for UI
 */
export function getESignStatusColor(status: string): string {
  const colors: Record<string, string> = {
    pending: "text-orange-400 bg-orange-500/10",
    completed: "text-green-400 bg-green-500/10",
    rejected: "text-red-400 bg-red-500/10",
    expired: "text-slate-400 bg-slate-500/10",
    failed: "text-red-400 bg-red-500/10",
  };
  return colors[status] || "text-slate-400 bg-slate-500/10";
}

/**
 * Validate Aadhaar number format
 */
export function validateAadhaar(aadhaar: string): boolean {
  // Remove spaces
  const clean = aadhaar.replace(/\s/g, "");
  // Check if 12 digits
  return /^\d{12}$/.test(clean);
}

/**
 * Format Aadhaar number with spaces (XXXX XXXX XXXX)
 */
export function formatAadhaar(aadhaar: string): string {
  const clean = aadhaar.replace(/\s/g, "");
  return clean.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
}
