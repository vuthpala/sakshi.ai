// Email templates for document expiry reminders
// Sakshi.ai - India's Legal Witness

import { DocumentWithExpiry } from './mock-data';
import { formatExpiryMessage } from './expiry-tracking';

interface EmailTemplate {
  subject: string;
  html: string;
  text: string;
}

/**
 * 30 Days Before Expiry Email
 */
export function generate30DayReminderEmail(
  document: DocumentWithExpiry,
  userName: string
): EmailTemplate {
  const documentType = formatDocumentType(document.type);
  const expiryMsg = formatExpiryMessage(calculateDaysRemaining(document.endDate!));
  
  return {
    subject: `Your ${documentType} expires in 30 days`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #16a34a; color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0; font-size: 24px;">Sakshi.ai - India's Legal Witness</h1>
        </div>
        
        <div style="padding: 30px; background: #f9fafb;">
          <h2 style="color: #1f2937; margin-top: 0;">Hi ${userName},</h2>
          
          <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">
            Your <strong>${documentType}</strong> is set to expire soon.
          </p>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #fbbf24;">
            <p style="margin: 0 0 10px 0;"><strong>Document:</strong> ${documentType}</p>
            <p style="margin: 0 0 10px 0;"><strong>Property:</strong> ${document.propertyAddress || 'N/A'}</p>
            <p style="margin: 0 0 10px 0;"><strong>Expiry Date:</strong> ${formatDate(document.endDate!)}</p>
            <p style="margin: 0; color: #f59e0b; font-weight: bold;">${expiryMsg}</p>
          </div>
          
          <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">
            Don't wait until the last minute. Renew your document now to avoid any legal complications.
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://sakshi.ai/dashboard" 
               style="background: #16a34a; color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">
              Renew Now
            </a>
          </div>
          
          <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
            Need help? Contact us at hello@sakshi.ai or call 9949649606
          </p>
        </div>
        
        <div style="background: #1f2937; color: #9ca3af; padding: 20px; text-align: center; font-size: 12px;">
          <p>© 2024 Sakshi.ai - India's Legal Witness. All rights reserved.</p>
          <p>Made with ❤️ for India 🇮🇳</p>
        </div>
      </div>
    `,
    text: `
Hi ${userName},

Your ${documentType} is set to expire soon.

Document: ${documentType}
Property: ${document.propertyAddress || 'N/A'}
Expiry Date: ${formatDate(document.endDate!)}
${expiryMsg}

Don't wait until the last minute. Renew your document now to avoid any legal complications.

Renew here: https://sakshi.ai/dashboard

Need help? Contact us at hello@sakshi.ai or call 9949649606

© 2024 Sakshi.ai - India's Legal Witness. All rights reserved.
Made with ❤️ for India 🇮🇳
    `.trim()
  };
}

/**
 * 7 Days Before Expiry Email (Urgent)
 */
export function generate7DayReminderEmail(
  document: DocumentWithExpiry,
  userName: string
): EmailTemplate {
  const documentType = formatDocumentType(document.type);
  const expiryMsg = formatExpiryMessage(7);
  
  return {
    subject: `⚠️ 7 days left — ${documentType} expiring`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #ea580c; color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0; font-size: 24px;">⚠️ Urgent: Document Expiring Soon</h1>
        </div>
        
        <div style="padding: 30px; background: #fff7ed;">
          <h2 style="color: #1f2937; margin-top: 0;">Hi ${userName},</h2>
          
          <p style="color: #9a3412; font-size: 18px; font-weight: bold; margin: 20px 0;">
            Your ${documentType} expires in just 7 days!
          </p>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border: 2px solid #f97316;">
            <p style="margin: 0 0 10px 0; color: #c2410c;"><strong>Document:</strong> ${documentType}</p>
            <p style="margin: 0 0 10px 0;"><strong>Property:</strong> ${document.propertyAddress || 'N/A'}</p>
            <p style="margin: 0 0 10px 0;"><strong>Expiry Date:</strong> ${formatDate(document.endDate!)}</p>
            <p style="margin: 0; color: #ea580c; font-weight: bold; font-size: 18px;">${expiryMsg}</p>
          </div>
          
          <p style="color: #7c2d12; font-size: 16px; line-height: 1.6;">
            <strong>Don't risk losing your legal protection!</strong> Renew immediately to ensure continuous coverage.
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://sakshi.ai/dashboard" 
               style="background: #ea580c; color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold; font-size: 18px;">
              Renew Now →
            </a>
          </div>
          
          <div style="background: #fef3c7; padding: 15px; border-radius: 6px; margin: 20px 0;">
            <p style="margin: 0; color: #92400e; font-size: 14px;">
              <strong>Why renew?</strong> An expired document can lead to legal disputes, loss of deposit, or eviction issues. Stay protected with Sakshi.ai.
            </p>
          </div>
        </div>
        
        <div style="background: #1f2937; color: #9ca3af; padding: 20px; text-align: center; font-size: 12px;">
          <p>© 2024 Sakshi.ai - India's Legal Witness. All rights reserved.</p>
          <p>Made with ❤️ for India 🇮🇳</p>
        </div>
      </div>
    `,
    text: `
⚠️ URGENT: Document Expiring Soon

Hi ${userName},

Your ${documentType} expires in just 7 days!

Document: ${documentType}
Property: ${document.propertyAddress || 'N/A'}
Expiry Date: ${formatDate(document.endDate!)}
${expiryMsg}

Don't risk losing your legal protection! Renew immediately to ensure continuous coverage.

Renew here: https://sakshi.ai/dashboard

Why renew? An expired document can lead to legal disputes, loss of deposit, or eviction issues. Stay protected with Sakshi.ai.

© 2024 Sakshi.ai - India's Legal Witness. All rights reserved.
Made with ❤️ for India 🇮🇳
    `.trim()
  };
}

/**
 * 1 Day Before Expiry Email (Critical)
 */
export function generate1DayReminderEmail(
  document: DocumentWithExpiry,
  userName: string
): EmailTemplate {
  const documentType = formatDocumentType(document.type);
  
  return {
    subject: `🚨 URGENT — ${documentType} expires tomorrow`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #dc2626; color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0; font-size: 24px;">🚨 CRITICAL: Document Expires Tomorrow!</h1>
        </div>
        
        <div style="padding: 30px; background: #fef2f2;">
          <h2 style="color: #991b1b; margin-top: 0;">${userName},</h2>
          
          <p style="color: #dc2626; font-size: 20px; font-weight: bold; margin: 20px 0;">
            Your ${documentType} expires TOMORROW!
          </p>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border: 3px solid #dc2626;">
            <p style="margin: 0 0 10px 0; color: #dc2626; font-size: 18px;"><strong>⏰ Expires: ${formatDate(document.endDate!)}</strong></p>
            <p style="margin: 0 0 10px 0;"><strong>Document:</strong> ${documentType}</p>
            <p style="margin: 0 0 10px 0;"><strong>Property:</strong> ${document.propertyAddress || 'N/A'}</p>
            <p style="margin: 0; color: #991b1b; font-weight: bold;">⚠️ ACT NOW TO AVOID LEGAL ISSUES</p>
          </div>
          
          <p style="color: #7f1d1d; font-size: 16px; line-height: 1.6;">
            <strong>This is your final reminder.</strong> Once expired, your legal protections may be void and you could face:
          </p>
          
          <ul style="color: #991b1b; margin: 15px 0; padding-left: 20px;">
            <li>Loss of security deposit claims</li>
            <li>Invalidated dispute resolutions</li>
            <li>Legal complications in court</li>
          </ul>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://sakshi.ai/dashboard" 
               style="background: #dc2626; color: white; padding: 18px 40px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold; font-size: 20px; box-shadow: 0 4px 6px rgba(220, 38, 38, 0.3);">
              RENEW IMMEDIATELY →
            </a>
          </div>
          
          <p style="color: #7f1d1d; font-size: 14px; text-align: center; margin-top: 20px;">
            <strong>Questions?</strong> Call us immediately: <a href="tel:9949649606" style="color: #dc2626;">9949649606</a>
          </p>
        </div>
        
        <div style="background: #1f2937; color: #9ca3af; padding: 20px; text-align: center; font-size: 12px;">
          <p>© 2024 Sakshi.ai - India's Legal Witness. All rights reserved.</p>
          <p>Made with ❤️ for India 🇮🇳</p>
        </div>
      </div>
    `,
    text: `
🚨 CRITICAL: Document Expires Tomorrow!

${userName},

Your ${documentType} expires TOMORROW!

⏰ Expires: ${formatDate(document.endDate!)}
Document: ${documentType}
Property: ${document.propertyAddress || 'N/A'}

⚠️ ACT NOW TO AVOID LEGAL ISSUES

This is your final reminder. Once expired, your legal protections may be void and you could face:
- Loss of security deposit claims
- Invalidated dispute resolutions
- Legal complications in court

RENEW IMMEDIATELY: https://sakshi.ai/dashboard

Questions? Call us immediately: 9949649606

© 2024 Sakshi.ai - India's Legal Witness. All rights reserved.
Made with ❤️ for India 🇮🇳
    `.trim()
  };
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

function calculateDaysRemaining(endDate: string): number {
  const end = new Date(endDate);
  const now = new Date();
  const diffTime = end.getTime() - now.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}
