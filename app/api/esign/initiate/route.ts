import { NextRequest, NextResponse } from "next/server";

// Digio API configuration
const DIGIO_BASE_URL = process.env.DIGIO_ENV === "production" 
  ? "https://api.digio.in" 
  : "https://ext.digio.in";

const DIGIO_CLIENT_ID = process.env.DIGIO_CLIENT_ID;
const DIGIO_CLIENT_SECRET = process.env.DIGIO_CLIENT_SECRET;

export async function POST(request: NextRequest) {
  try {
    const { 
      documentId, 
      signerName, 
      signerEmail, 
      signerPhone,
      aadhaarNumber,
      documentContent,
      documentName,
      redirectUrl 
    } = await request.json();

    if (!signerName || !signerEmail || !signerPhone) {
      return NextResponse.json(
        { error: "Missing required signer details" },
        { status: 400 }
      );
    }

    // Create eSign transaction with Digio
    const esignPayload = {
      document: {
        name: documentName || "Legal Document",
        content: documentContent, // Base64 encoded PDF
      },
      signers: [
        {
          identifier: signerEmail,
          name: signerName,
          email: signerEmail,
          phone: signerPhone,
          aadhaar_number: aadhaarNumber, // Optional
          reason: "I approve this document",
          location: "India",
          sign_type: "aadhaar", // or 'otp', 'biometric'
        }
      ],
      redirect_url: redirectUrl || `${process.env.NEXT_PUBLIC_APP_URL}/documents/esign/callback`,
      notify_signers: true,
      send_sign_link: true,
    };

    const response = await fetch(`${DIGIO_BASE_URL}/v2/client/document/esign`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${Buffer.from(`${DIGIO_CLIENT_ID}:${DIGIO_CLIENT_SECRET}`).toString("base64")}`,
      },
      body: JSON.stringify(esignPayload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Digio API error:", errorData);
      return NextResponse.json(
        { error: "Failed to initiate eSign", details: errorData },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json({
      success: true,
      esignId: data.id,
      signUrl: data.signers?.[0]?.sign_url,
      status: data.status,
      message: "eSign initiated successfully",
    });

  } catch (error) {
    console.error("eSign initiation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
