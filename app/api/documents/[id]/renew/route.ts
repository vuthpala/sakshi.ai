import { NextRequest, NextResponse } from 'next/server';
import { MOCK_DOCUMENTS, DocumentWithExpiry } from '@/lib/mock-data';
import { prepareRenewalData } from '@/lib/expiry-tracking';

/**
 * GET /api/documents/:id/renew
 * Creates a new draft document by copying data from the original
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    const documentId = params.id;

    // Find the original document
    const originalDoc = MOCK_DOCUMENTS.find(doc => doc.id === documentId);

    if (!originalDoc) {
      return NextResponse.json(
        { error: 'Document not found' },
        { status: 404 }
      );
    }

    // Check if document can be renewed (must be completed)
    if (originalDoc.status !== 'completed') {
      return NextResponse.json(
        { error: 'Only completed documents can be renewed' },
        { status: 400 }
      );
    }

    // Prepare renewal data
    const renewalData = prepareRenewalData(originalDoc);

    // Generate new document ID
    const newId = `doc_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;

    // Create the new document
    const newDocument: DocumentWithExpiry = {
      ...renewalData,
      id: newId,
      userName: originalDoc.userName,
      userPhone: originalDoc.userPhone
    } as DocumentWithExpiry;

    // In production, save to database
    // For now, we just return the new document data

    return NextResponse.json({
      success: true,
      message: 'Document renewal draft created',
      originalDocumentId: documentId,
      newDocumentId: newId,
      document: newDocument,
      redirectUrl: `/documents/${originalDoc.type}?renew=true&originalId=${documentId}`
    });

  } catch (error) {
    console.error('Renewal error:', error);
    return NextResponse.json(
      { error: 'Failed to create renewal document' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/documents/:id/renew
 * Alternative endpoint for creating renewal with custom modifications
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    const documentId = params.id;
    const body = await request.json();

    // Find the original document
    const originalDoc = MOCK_DOCUMENTS.find(doc => doc.id === documentId);

    if (!originalDoc) {
      return NextResponse.json(
        { error: 'Document not found' },
        { status: 404 }
      );
    }

    // Merge original data with any modifications
    const renewalData = prepareRenewalData(originalDoc);

    // Apply user modifications (e.g., new dates, updated rent amount)
    const newDocument: DocumentWithExpiry = {
      ...renewalData,
      ...body.modifications,
      id: `doc_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      userName: originalDoc.userName,
      userPhone: originalDoc.userPhone,
      renewedFrom: documentId
    } as DocumentWithExpiry;

    return NextResponse.json({
      success: true,
      message: 'Renewal document created with modifications',
      originalDocumentId: documentId,
      newDocumentId: newDocument.id,
      document: newDocument
    });

  } catch (error) {
    console.error('Renewal POST error:', error);
    return NextResponse.json(
      { error: 'Failed to create renewal document' },
      { status: 500 }
    );
  }
}
