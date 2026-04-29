// Email Templates for Notifications

interface EmailTemplateData {
  userName?: string;
  lawyerName?: string;
  documentType?: string;
  documentTitle?: string;
  earningAmount?: number;
  agreementId?: string;
  dashboardUrl?: string;
  appUrl?: string;
}

const baseStyles = `
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f3f4f6; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
    .header { background: linear-gradient(135deg, #F59E0B, #D97706); padding: 24px; text-align: center; }
    .header h1 { color: white; margin: 0; font-size: 24px; }
    .content { padding: 32px; }
    .footer { background: #1f2937; padding: 20px; text-align: center; color: #9ca3af; font-size: 12px; }
    .button { display: inline-block; background: linear-gradient(135deg, #F59E0B, #D97706); color: white; padding: 12px 32px; border-radius: 6px; text-decoration: none; font-weight: 600; margin: 16px 0; }
    .details { background: #f9fafb; padding: 16px; border-radius: 8px; margin: 16px 0; }
    .highlight { color: #D97706; font-weight: 600; }
    .success { color: #10b981; }
    .info { color: #3b82f6; }
  </style>
`;

export function getLawyerNewAgreementEmail(data: EmailTemplateData): { subject: string; html: string } {
  const subject = `🎉 New Agreement from ${data.userName} — ₹${data.earningAmount} to earn`;
  
  const html = `
<!DOCTYPE html>
<html>
<head>
  ${baseStyles}
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎯 New Agreement Available</h1>
    </div>
    
    <div class="content">
      <p>Hello ${data.lawyerName},</p>
      
      <p>Great news! A user has sent you a new document to review and sign.</p>
      
      <div class="details">
        <h3 style="margin-top: 0;">Agreement Details</h3>
        <p><strong>From:</strong> <span class="highlight">${data.userName}</span></p>
        <p><strong>Document:</strong> ${data.documentTitle || data.documentType}</p>
        <p><strong>Your Fee:</strong> <span class="highlight">₹${data.earningAmount}</span></p>
      </div>
      
      <p>Please review this agreement at your earliest convenience. The client is waiting for your response.</p>
      
      <center>
        <a href="${data.dashboardUrl}/lawyer/agreements/${data.agreementId}" class="button">
          Review Agreement
        </a>
      </center>
      
      <p style="font-size: 12px; color: #6b7280;">
        You can also access this agreement from your lawyer dashboard at Sakshi.ai.
      </p>
    </div>
    
    <div class="footer">
      <p>© 2024 Sakshi.ai — India's Legal Witness. All rights reserved.</p>
      <p>This is an automated notification. Please do not reply to this email.</p>
    </div>
  </div>
</body>
</html>
  `;

  return { subject, html };
}

export function getUserAgreementSignedEmail(data: EmailTemplateData): { subject: string; html: string } {
  const subject = `✅ Your Document is Signed! Download Now`;
  
  const html = `
<!DOCTYPE html>
<html>
<head>
  ${baseStyles}
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎉 Document Successfully Signed!</h1>
    </div>
    
    <div class="content">
      <p>Hello ${data.userName},</p>
      
      <p class="success" style="font-size: 18px; font-weight: 600;">
        Your document has been signed by ${data.lawyerName}!
      </p>
      
      <div class="details">
        <h3 style="margin-top: 0;">Document Details</h3>
        <p><strong>Document:</strong> ${data.documentTitle || data.documentType}</p>
        <p><strong>Signed by:</strong> <span class="highlight">${data.lawyerName}</span></p>
        <p><strong>Status:</strong> <span class="success">✅ Completed</span></p>
      </div>
      
      <p>Your legally binding document is now ready for download. You can access it from your dashboard at any time.</p>
      
      <center>
        <a href="${data.dashboardUrl}/dashboard" class="button">
          Download Document
        </a>
      </center>
      
      <p style="font-size: 12px; color: #6b7280; margin-top: 24px;">
        <strong>Need help?</strong> Contact our support team at hello@sakshi.ai
      </p>
    </div>
    
    <div class="footer">
      <p>© 2024 Sakshi.ai — India's Legal Witness. All rights reserved.</p>
      <p>Your trusted platform for legal document automation.</p>
    </div>
  </div>
</body>
</html>
  `;

  return { subject, html };
}

export function getUserAgreementStatusEmail(
  data: EmailTemplateData,
  status: "opened" | "reviewing" | "editing"
): { subject: string; html: string } {
  const statusConfig = {
    opened: { title: "👀 Lawyer Viewed Your Document", color: "#3b82f6" },
    reviewing: { title: "🔍 Lawyer Reviewing Your Document", color: "#f59e0b" },
    editing: { title: "✏️ Lawyer Making Edits", color: "#f97316" },
  };
  
  const config = statusConfig[status];
  const subject = `${config.title.split(" ")[0]} ${data.lawyerName} ${status} your ${data.documentTitle || "document"}`;
  
  const messages = {
    opened: `${data.lawyerName} has opened your document and is reviewing it.`,
    reviewing: `${data.lawyerName} is actively reviewing your document and may suggest edits.`,
    editing: `${data.lawyerName} is making professional edits to improve your document.`,
  };
  
  const html = `
<!DOCTYPE html>
<html>
<head>
  ${baseStyles}
</head>
<body>
  <div class="container">
    <div class="header" style="background: ${config.color};">
      <h1>${config.title}</h1>
    </div>
    
    <div class="content">
      <p>Hello ${data.userName},</p>
      
      <p>${messages[status]}</p>
      
      <div class="details">
        <h3 style="margin-top: 0;">Document Details</h3>
        <p><strong>Document:</strong> ${data.documentTitle || data.documentType}</p>
        <p><strong>Lawyer:</strong> <span class="highlight">${data.lawyerName}</span></p>
        <p><strong>Status:</strong> <span class="info">${status.charAt(0).toUpperCase() + status.slice(1)}</span></p>
      </div>
      
      <p>We&apos;ll notify you when the document is ready for your review.</p>
      
      <center>
        <a href="${data.dashboardUrl}/documents/${data.agreementId}" class="button">
          View Document
        </a>
      </center>
    </div>
    
    <div class="footer">
      <p>© 2024 Sakshi.ai — India's Legal Witness. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
  `;

  return { subject, html };
}
