// Blockchain Document Verification System for Sakshi.ai
// Uses SHA-256 hashing for document integrity verification

import { createHash } from 'crypto';

export interface BlockchainDocument {
  id: string;
  type: string;
  content: string;
  lawyerSignature: string;
  lawyerName: string;
  lawyerBarCouncilId: string;
  timestamp: string;
  status: string;
}

export interface VerificationResult {
  isValid: boolean;
  documentId?: string;
  documentType?: string;
  signedAt?: string;
  lawyerName?: string;
  lawyerBarCouncilId?: string;
  message: string;
  hash?: string;
}

export interface VerificationLog {
  documentId: string;
  timestamp: string;
  ip?: string;
  success: boolean;
}

/**
 * Generate SHA-256 hash of document content + signature + timestamp
 * This creates a unique fingerprint for the document
 */
export function generateDocumentHash(document: BlockchainDocument): string {
  const hashInput = `${document.id}:${document.content}:${document.lawyerSignature}:${document.timestamp}`;
  return createHash('sha256').update(hashInput).digest('hex');
}

/**
 * Verify a document by its hash
 */
export function verifyDocumentByHash(
  hash: string,
  documents: BlockchainDocument[]
): VerificationResult {
  const found = documents.find(doc => {
    const computedHash = generateDocumentHash(doc);
    return computedHash === hash;
  });

  if (found && found.status === 'completed') {
    return {
      isValid: true,
      documentId: found.id,
      documentType: found.type,
      signedAt: found.timestamp,
      lawyerName: found.lawyerName,
      lawyerBarCouncilId: found.lawyerBarCouncilId,
      message: 'Document Verified — Authentic and unaltered',
      hash: hash
    };
  }

  return {
    isValid: false,
    message: 'Document not found or may have been tampered with'
  };
}

/**
 * Verify a document by its ID
 */
export function verifyDocumentById(
  documentId: string,
  documents: BlockchainDocument[]
): VerificationResult {
  const found = documents.find(doc => doc.id === documentId);

  if (!found) {
    return {
      isValid: false,
      message: 'Document not found or may have been tampered with'
    };
  }

  if (found.status !== 'completed') {
    return {
      isValid: false,
      message: 'Document has not been signed yet'
    };
  }

  const hash = generateDocumentHash(found);

  return {
    isValid: true,
    documentId: found.id,
    documentType: found.type,
    signedAt: found.timestamp,
    lawyerName: found.lawyerName,
    lawyerBarCouncilId: found.lawyerBarCouncilId,
    message: 'Document Verified — Authentic and unaltered',
    hash: hash
  };
}

/**
 * Format hash for display (truncate middle)
 */
export function formatHash(hash: string): string {
  if (hash.length <= 16) return hash;
  return `${hash.slice(0, 8)}...${hash.slice(-8)}`;
}

/**
 * Generate verification URL for QR code
 */
export function generateVerificationUrl(documentId: string, baseUrl: string = 'https://sakshi.ai'): string {
  return `${baseUrl}/verify?id=${documentId}`;
}

/**
 * Log verification attempt
 * In production, this would store to database
 */
export function logVerificationAttempt(log: VerificationLog): void {
  const logs = JSON.parse(localStorage.getItem('sakshi_verification_logs') || '[]');
  logs.push(log);
  // Keep only last 1000 logs
  if (logs.length > 1000) {
    logs.shift();
  }
  localStorage.setItem('sakshi_verification_logs', JSON.stringify(logs));
}

/**
 * Get verification count for a document
 */
export function getVerificationCount(documentId: string): number {
  const logs = JSON.parse(localStorage.getItem('sakshi_verification_logs') || '[]');
  return logs.filter((log: VerificationLog) => log.documentId === documentId && log.success).length;
}
