import { NextRequest, NextResponse } from "next/server";

const DIGIO_BASE_URL = process.env.DIGIO_ENV === "production" 
  ? "https://api.digio.in" 
  : "https://ext.digio.in";

const DIGIO_CLIENT_ID = process.env.DIGIO_CLIENT_ID;
const DIGIO_CLIENT_SECRET = process.env.DIGIO_CLIENT_SECRET;

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const esignId = params.id;

    if (!esignId) {
      return NextResponse.json(
        { error: "eSign ID is required" },
        { status: 400 }
      );
    }

    const response = await fetch(`${DIGIO_BASE_URL}/v2/client/document/esign/${esignId}`, {
      method: "GET",
      headers: {
        "Authorization": `Basic ${Buffer.from(`${DIGIO_CLIENT_ID}:${DIGIO_CLIENT_SECRET}`).toString("base64")}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Digio status check error:", errorData);
      return NextResponse.json(
        { error: "Failed to fetch eSign status" },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json({
      success: true,
      esignId: data.id,
      status: data.status, // 'pending', 'completed', 'rejected', 'expired'
      documentId: data.document_id,
      signers: data.signers?.map((signer: any) => ({
        email: signer.identifier,
        name: signer.name,
        status: signer.status,
        signedAt: signer.signed_at,
        signatureType: signer.signature_type,
      })),
      signedDocumentUrl: data.signed_document_url,
      auditTrailUrl: data.audit_trail_url,
      completedAt: data.completed_at,
      createdAt: data.created_at,
    });

  } catch (error) {
    console.error("eSign status check error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
