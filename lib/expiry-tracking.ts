// Document Expiry Tracking System for Sakshi.ai
// Manages document expiration dates and reminder notifications

import { DocumentWithExpiry } from './mock-data';

export interface ExpiryStatus {
  daysRemaining: number;
  status: 'active' | 'expiring_soon' | 'expired';
  color: 'green' | 'yellow' | 'red';
}

export interface ReminderConfig {
  days30: boolean;
  days7: boolean;
  days1: boolean;
}

/**
 * Calculate days remaining until document expiry
 */
export function calculateDaysRemaining(endDate: string): number {
  const end = new Date(endDate);
  const now = new Date();
  const diffTime = end.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

/**
 * Get expiry status for a document
 */
export function getExpiryStatus(endDate: string): ExpiryStatus {
  const daysRemaining = calculateDaysRemaining(endDate);
  
  if (daysRemaining < 0) {
    return { daysRemaining, status: 'expired', color: 'red' };
  }
  
  if (daysRemaining <= 7) {
    return { daysRemaining, status: 'expiring_soon', color: 'red' };
  }
  
  if (daysRemaining <= 30) {
    return { daysRemaining, status: 'expiring_soon', color: 'yellow' };
  }
  
  return { daysRemaining, status: 'active', color: 'green' };
}

/**
 * Find all documents that need reminders sent
 */
export function findExpiringDocuments(
  documents: DocumentWithExpiry[]
): {
  days30: DocumentWithExpiry[];
  days7: DocumentWithExpiry[];
  days1: DocumentWithExpiry[];
} {
  const result = {
    days30: [] as DocumentWithExpiry[],
    days7: [] as DocumentWithExpiry[],
    days1: [] as DocumentWithExpiry[]
  };

  documents.forEach(doc => {
    // Only check completed/signed documents with end dates
    if (doc.status !== 'completed' || !doc.endDate) return;

    const daysRemaining = calculateDaysRemaining(doc.endDate);

    // 30 days reminder
    if (daysRemaining === 30 && !doc.reminder30Sent) {
      result.days30.push(doc);
    }

    // 7 days reminder
    if (daysRemaining === 7 && !doc.reminder7Sent) {
      result.days7.push(doc);
    }

    // 1 day reminder
    if (daysRemaining === 1 && !doc.reminder1Sent) {
      result.days1.push(doc);
    }
  });

  return result;
}

/**
 * Mark reminder as sent for a document
 */
export function markReminderSent(
  documentId: string,
  reminderType: '30' | '7' | '1'
): void {
  const storageKey = `sakshi_reminder_${reminderType}_${documentId}`;
  localStorage.setItem(storageKey, 'true');
}

/**
 * Check if reminder was already sent
 */
export function wasReminderSent(
  documentId: string,
  reminderType: '30' | '7' | '1'
): boolean {
  const storageKey = `sakshi_reminder_${reminderType}_${documentId}`;
  return localStorage.getItem(storageKey) === 'true';
}

/**
 * Get all expiring documents for dashboard display
 */
export function getDashboardExpiringDocuments(
  documents: DocumentWithExpiry[]
): Array<DocumentWithExpiry & { daysRemaining: number; color: string }> {
  return documents
    .filter(doc => 
      doc.status === 'completed' && 
      doc.endDate && 
      calculateDaysRemaining(doc.endDate) <= 30
    )
    .map(doc => {
      const status = getExpiryStatus(doc.endDate!);
      return {
        ...doc,
        daysRemaining: status.daysRemaining,
        color: status.color
      };
    })
    .sort((a, b) => a.daysRemaining - b.daysRemaining);
}

/**
 * Format expiry message for display
 */
export function formatExpiryMessage(daysRemaining: number): string {
  if (daysRemaining < 0) {
    return `Expired ${Math.abs(daysRemaining)} days ago`;
  }
  if (daysRemaining === 0) {
    return 'Expires today';
  }
  if (daysRemaining === 1) {
    return 'Expires tomorrow';
  }
  if (daysRemaining <= 7) {
    return `Expires in ${daysRemaining} days`;
  }
  return `Expires in ${daysRemaining} days`;
}

/**
 * Calculate document end date based on duration
 */
export function calculateEndDate(
  startDate: string,
  duration: string
): string {
  const start = new Date(startDate);
  
  // Parse duration like "11 months", "12 months", "24 months", "1 year"
  const match = duration.match(/(\d+)\s*(month|year|months|years)/i);
  
  if (!match) {
    // Default to 11 months for rent agreements
    start.setMonth(start.getMonth() + 11);
  } else {
    const amount = parseInt(match[1], 10);
    const unit = match[2].toLowerCase();
    
    if (unit.startsWith('year')) {
      start.setFullYear(start.getFullYear() + amount);
    } else {
      start.setMonth(start.getMonth() + amount);
    }
  }
  
  return start.toISOString().split('T')[0];
}

/**
 * Prepare document data for renewal
 */
export function prepareRenewalData(
  originalDoc: DocumentWithExpiry
): Partial<DocumentWithExpiry> {
  const now = new Date();
  const newEndDate = calculateEndDate(
    now.toISOString(),
    originalDoc.duration || '11 months'
  );

  return {
    ...originalDoc,
    id: undefined, // Will be assigned new ID
    status: 'draft',
    createdAt: now.toISOString(),
    completedAt: undefined,
    advocate: undefined,
    eStampNumber: undefined,
    startDate: now.toISOString().split('T')[0],
    endDate: newEndDate,
    reminder30Sent: false,
    reminder7Sent: false,
    reminder1Sent: false,
    renewedFrom: originalDoc.id
  };
}
