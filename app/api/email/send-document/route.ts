import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// Initialize Resend only if API key is available
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request: NextRequest) {
  try {
    // Check if Resend is configured
    if (!resend) {
      console.log("Email service not configured - simulating success");
      return NextResponse.json({ 
        success: true, 
        messageId: "mock-email-id",
        note: "Email service not configured - this is a mock response" 
      });
    }

    const { to, subject, documentType, documentContent, userName } = await request.json();

    if (!to || !subject || !documentContent) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Convert document content to PDF buffer (base64)
    const pdfBuffer = Buffer.from(documentContent, "base64");

    const { data, error } = await resend.emails.send({
      from: "PaperWise <documents@paperwise.in>",
      to: [to],
      subject: subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #f97316 0%, #dc2626 100%); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">PaperWise</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Your Legal Document is Ready</p>
          </div>
          
          <div style="padding: 30px; background: #ffffff; border: 1px solid #e5e7eb;">
            <p style="font-size: 16px; color: #374151; margin-bottom: 20px;">
              Dear ${userName || "User"},
            </p>
            
            <p style="font-size: 16px; color: #374151; margin-bottom: 20px;">
              Your <strong>${documentType}</strong> has been successfully generated and is attached to this email.
            </p>
            
            <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0;">
              <p style="margin: 0; color: #92400e; font-size: 14px;">
                <strong>Important:</strong> Please review the document carefully before using it. For registered documents, visit your nearest Sub-Registrar office.
              </p>
            </div>
            
            <p style="font-size: 16px; color: #374151; margin-bottom: 20px;">
              If you have any questions or need assistance, feel free to contact our support team.
            </p>
            
            <p style="font-size: 16px; color: #374151; margin-bottom: 10px;">
              Best regards,<br>
              <strong>Team PaperWise</strong>
            </p>
          </div>
          
          <div style="background: #f3f4f6; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
            <p style="font-size: 12px; color: #6b7280; margin: 0;">
              © 2024 PaperWise. All rights reserved.<br>
              Legal documents made simple and accessible.
            </p>
          </div>
        </div>
      `,
      attachments: [
        {
          filename: `${documentType.replace(/\s+/g, "-").toLowerCase()}.pdf`,
          content: pdfBuffer.toString("base64"),
        },
      ],
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, messageId: data?.id });
  } catch (error) {
    console.error("Email sending error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
