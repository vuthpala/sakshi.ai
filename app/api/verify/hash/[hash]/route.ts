import { NextRequest, NextResponse } from 'next/server';
import { verifyDocumentByHash, logVerificationAttempt, VerificationResult } from '@/lib/blockchain';
import { MOCK_DOCUMENTS } from '@/lib/mock-data';

/**
 * GET /api/verify/hash/:hash
 * Public endpoint to verify document authenticity by hash
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { hash: string } }
): Promise<NextResponse> {
  try {
    const hash = params.hash;

    if (!hash) {
      return NextResponse.json(
        { isValid: false, message: 'Hash is required' },
        { status: 400 }
      );
    }

    // Get client IP for logging
    const forwardedFor = request.headers.get('x-forwarded-for');
    const ip = forwardedFor ? forwardedFor.split(',')[0] : 'unknown';

    // Convert mock documents to blockchain format
    const blockchainDocs = MOCK_DOCUMENTS.map(doc => ({
      id: doc.id,
      type: doc.type,
      content: JSON.stringify(doc),
      lawyerSignature: doc.advocate || '',
      lawyerName: doc.advocate || '',
      lawyerBarCouncilId: `BAR${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      timestamp: doc.completedAt || doc.createdAt,
      status: doc.status
    }));

    // Verify the document by hash
    const result: VerificationResult = verifyDocumentByHash(hash, blockchainDocs);

    // Log the verification attempt if document found
    if (result.documentId) {
      logVerificationAttempt({
        documentId: result.documentId,
        timestamp: new Date().toISOString(),
        ip,
        success: result.isValid
      });
    }

    // Return safe response (no sensitive data)
    return NextResponse.json({
      isValid: result.isValid,
      documentId: result.documentId,
      documentType: result.documentType,
      signedAt: result.signedAt,
      lawyerName: result.lawyerName,
      lawyerBarCouncilId: result.lawyerBarCouncilId,
      message: result.message
    }, { status: result.isValid ? 200 : 404 });

  } catch (error) {
    console.error('Hash verification error:', error);
    return NextResponse.json(
      { isValid: false, message: 'Verification service unavailable' },
      { status: 500 }
    );
  }
}
