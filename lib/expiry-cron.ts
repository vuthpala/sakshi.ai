// Expiry Cron Job for Sakshi.ai
// Checks for expiring documents and sends reminders
// Can be run as a scheduled job (daily at 9 AM IST)

import { DocumentWithExpiry } from './mock-data';
import { findExpiringDocuments, markReminderSent } from './expiry-tracking';
import { 
  generate30DayReminderEmail,
  generate7DayReminderEmail,
  generate1DayReminderEmail
} from './expiry-email-templates';

export interface ReminderResult {
  sent: number;
  failed: number;
  errors: string[];
}

/**
 * Main cron job function - checks all expiring documents
 * Run this daily at 9:00 AM IST
 */
export async function checkExpiries(
  documents: DocumentWithExpiry[]
): Promise<{
  days30: ReminderResult;
  days7: ReminderResult;
  days1: ReminderResult;
}> {
  const expiring = findExpiringDocuments(documents);
  
  const results = {
    days30: await sendReminders(expiring.days30, '30', generate30DayReminderEmail),
    days7: await sendReminders(expiring.days7, '7', generate7DayReminderEmail),
    days1: await sendReminders(expiring.days1, '1', generate1DayReminderEmail)
  };
  
  return results;
}

/**
 * Send reminders for a specific batch of documents
 */
async function sendReminders(
  documents: DocumentWithExpiry[],
  type: '30' | '7' | '1',
  emailGenerator: (doc: DocumentWithExpiry, name: string) => { subject: string; html: string; text: string }
): Promise<ReminderResult> {
  const result: ReminderResult = { sent: 0, failed: 0, errors: [] };
  
  for (const doc of documents) {
    try {
      // Generate email
      const email = emailGenerator(doc, doc.userName);
      
      // Send email (in production, call actual email API)
      await sendExpiryEmail(doc.userPhone, email.subject, email.html, email.text);
      
      // Send WhatsApp (in production, integrate with Twilio)
      await sendWhatsAppReminder(doc, type);
      
      // Mark as sent
      markReminderSent(doc.id, type);
      result.sent++;
      
      console.log(`[Expiry Cron] Sent ${type}-day reminder for document ${doc.id}`);
    } catch (error) {
      result.failed++;
      const errorMsg = `Failed to send ${type}-day reminder for ${doc.id}: ${error}`;
      result.errors.push(errorMsg);
      console.error(`[Expiry Cron] ${errorMsg}`);
    }
  }
  
  return result;
}

/**
 * Send expiry email (placeholder - integrate with actual email service)
 */
async function sendExpiryEmail(
  userPhone: string,
  subject: string,
  html: string,
  text: string
): Promise<void> {
  // In production, this would call your email API
  // For now, we log it
  console.log(`[Email] To: ${userPhone}, Subject: ${subject}`);
  
  // Example integration:
  // await fetch('/api/notifications/email', {
  //   method: 'POST',
  //   body: JSON.stringify({ to: userPhone, subject, html, text })
  // });
}

/**
 * Send WhatsApp reminder via Twilio (placeholder)
 */
async function sendWhatsAppReminder(
  document: DocumentWithExpiry,
  daysRemaining: '30' | '7' | '1'
): Promise<void> {
  const message = generateWhatsAppMessage(document, daysRemaining);
  
  console.log(`[WhatsApp] To: ${document.userPhone}, Message: ${message}`);
  
  // In production, integrate with Twilio:
  // await fetch('/api/sms/send', {
  //   method: 'POST',
  //   body: JSON.stringify({
  //     to: document.userPhone,
  //     message,
  //     type: 'whatsapp'
  //   })
  // });
}

/**
 * Generate WhatsApp message for reminders
 */
function generateWhatsAppMessage(
  document: DocumentWithExpiry,
  daysRemaining: '30' | '7' | '1'
): string {
  const documentType = formatDocumentType(document.type);
  const urgencyEmoji = daysRemaining === '1' ? '🚨' : daysRemaining === '7' ? '⚠️' : '⏰';
  
  return `${urgencyEmoji} Hi ${document.userName}, your ${documentType} on Sakshi.ai expires in ${daysRemaining} days.

📄 Document: ${documentType}
🏠 Property: ${document.propertyAddress || 'N/A'}
📅 Expires: ${formatDate(document.endDate!)}

Renew here 👉 https://sakshi.ai/dashboard

Need help? Call: 9949649606

- Sakshi.ai 🇮🇳`;
}

/**
 * Setup cron job (for Node.js backend)
 * Run this in your server.ts or main entry file
 */
export function setupExpiryCron(cron: any, documents: DocumentWithExpiry[]): void {
  // Run daily at 9:00 AM IST
  // Cron format: minute hour day month dayOfWeek
  cron.schedule('0 9 * * *', async () => {
    console.log('[Expiry Cron] Starting daily expiry check at 9:00 AM IST...');
    
    try {
      const results = await checkExpiries(documents);
      
      console.log('[Expiry Cron] Results:');
      console.log(`  - 30-day reminders: ${results.days30.sent} sent, ${results.days30.failed} failed`);
      console.log(`  - 7-day reminders: ${results.days7.sent} sent, ${results.days7.failed} failed`);
      console.log(`  - 1-day reminders: ${results.days1.sent} sent, ${results.days1.failed} failed`);
    } catch (error) {
      console.error('[Expiry Cron] Error running expiry check:', error);
    }
  }, {
    scheduled: true,
    timezone: 'Asia/Kolkata' // IST timezone
  });
  
  console.log('[Expiry Cron] Scheduled daily at 9:00 AM IST');
}

/**
 * Test cron job (runs every minute for testing)
 */
export function setupTestCron(cron: any, documents: DocumentWithExpiry[]): void {
  cron.schedule('* * * * *', async () => {
    console.log('[Expiry Cron] Running test check (every minute)...');
    
    try {
      const results = await checkExpiries(documents);
      console.log('[Expiry Cron Test] Check completed');
    } catch (error) {
      console.error('[Expiry Cron Test] Error:', error);
    }
  });
  
  console.log('[Expiry Cron] TEST MODE: Running every minute');
}

// Helper functions
function formatDocumentType(type: string): string {
  return type.split('_').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}
