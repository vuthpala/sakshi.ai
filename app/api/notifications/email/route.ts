import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import {
  getLawyerNewAgreementEmail,
  getUserAgreementSignedEmail,
  getUserAgreementStatusEmail,
} from "@/lib/email-templates";

// Initialize Resend (only if API key is available)
let resend: Resend | null = null;
if (process.env.RESEND_API_KEY) {
  resend = new Resend(process.env.RESEND_API_KEY);
}

interface EmailNotificationPayload {
  to: string;
  userName?: string;
  lawyerName?: string;
  documentType?: string;
  documentTitle?: string;
  earningAmount?: number;
  agreementId?: string;
  type: "new_agreement" | "agreement_signed" | "agreement_opened" | "agreement_reviewing" | "agreement_editing";
}

// POST /api/notifications/email - Send email notification
export async function POST(request: NextRequest) {
  try {
    const payload: EmailNotificationPayload = await request.json();
    const { to, type } = payload;

    // Validate email
    if (!to || !to.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://sakshi.ai";
    
    const templateData = {
      userName: payload.userName,
      lawyerName: payload.lawyerName,
      documentType: payload.documentType,
      documentTitle: payload.documentTitle,
      earningAmount: payload.earningAmount,
      agreementId: payload.agreementId,
      dashboardUrl: appUrl,
    };

    let emailContent: { subject: string; html: string };
    let fromEmail = process.env.FROM_EMAIL || "hello@sakshi.ai";

    switch (type) {
      case "new_agreement":
        emailContent = getLawyerNewAgreementEmail(templateData);
        break;
      
      case "agreement_signed":
        emailContent = getUserAgreementSignedEmail(templateData);
        break;
      
      case "agreement_opened":
        emailContent = getUserAgreementStatusEmail(templateData, "opened");
        break;
      
      case "agreement_reviewing":
        emailContent = getUserAgreementStatusEmail(templateData, "reviewing");
        break;
      
      case "agreement_editing":
        emailContent = getUserAgreementStatusEmail(templateData, "editing");
        break;
      
      default:
        return NextResponse.json(
          { error: "Invalid notification type" },
          { status: 400 }
        );
    }

    // If Resend is not configured, return mock success for development
    if (!resend) {
      console.log("[MOCK EMAIL] To:", to);
      console.log("[MOCK EMAIL] Subject:", emailContent.subject);
      console.log("[MOCK EMAIL] Type:", type);
      
      return NextResponse.json({
        success: true,
        mock: true,
        message: "Email notification sent (mock)",
        to,
        subject: emailContent.subject,
      });
    }

    // Send email via Resend
    const result = await resend.emails.send({
      from: fromEmail,
      to: [to],
      subject: emailContent.subject,
      html: emailContent.html,
    });

    return NextResponse.json({
      success: true,
      message: "Email notification sent",
      id: result.data?.id,
    });
  } catch (error) {
    console.error("Error sending email notification:", error);
    return NextResponse.json(
      { 
        error: "Failed to send email notification",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
