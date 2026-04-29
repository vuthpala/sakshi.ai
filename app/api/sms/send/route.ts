import { NextRequest, NextResponse } from "next/server";

// Initialize Twilio client (only if credentials are available)
let twilioClient: any = null;

try {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  
  if (accountSid && authToken) {
    const twilio = require("twilio");
    twilioClient = twilio(accountSid, authToken);
  }
} catch (error) {
  console.warn("Twilio not initialized:", error);
}

interface SMSPayload {
  to: string; // Phone number with country code (+91...)
  message: string;
  type: "new_agreement" | "agreement_signed" | "general";
}

// POST /api/sms/send - Send SMS notification
export async function POST(request: NextRequest) {
  try {
    const { to, message, type }: SMSPayload = await request.json();

    // Validate phone number
    if (!to || !to.match(/^\+\d{10,15}$/)) {
      return NextResponse.json(
        { error: "Invalid phone number format. Use E.164 format (+91XXXXXXXXXX)" },
        { status: 400 }
      );
    }

    if (!message || message.length > 1600) {
      return NextResponse.json(
        { error: "Message is required and must be under 1600 characters" },
        { status: 400 }
      );
    }

    // If Twilio is not configured, return mock success for development
    if (!twilioClient) {
      console.log("[MOCK SMS] To:", to);
      console.log("[MOCK SMS] Message:", message);
      console.log("[MOCK SMS] Type:", type);
      
      return NextResponse.json({
        success: true,
        mock: true,
        message: "SMS notification sent (mock)",
        to,
        body: message,
      });
    }

    // Send SMS via Twilio
    const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
    if (!twilioPhoneNumber) {
      throw new Error("TWILIO_PHONE_NUMBER not configured");
    }

    const result = await twilioClient.messages.create({
      body: message,
      from: twilioPhoneNumber,
      to: to,
    });

    return NextResponse.json({
      success: true,
      message: "SMS notification sent",
      sid: result.sid,
      status: result.status,
    });
  } catch (error) {
    console.error("Error sending SMS:", error);
    return NextResponse.json(
      { 
        error: "Failed to send SMS",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// Predefined SMS templates
export function getSMSTemplate(
  type: "new_agreement" | "agreement_signed",
  data: {
    userName?: string;
    lawyerName?: string;
    documentType?: string;
    documentTitle?: string;
    earningAmount?: number;
    dashboardUrl?: string;
  }
): string {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://sakshi.ai";
  
  switch (type) {
    case "new_agreement":
      return `New agreement on Sakshi.ai from ${data.userName}. ${data.documentTitle || data.documentType} — ₹${data.earningAmount} to earn. Login to review: ${appUrl}/lawyer/dashboard`;
    
    case "agreement_signed":
      return `Your document is signed by ${data.lawyerName}. Download: ${appUrl}/dashboard`;
    
    default:
      return `Notification from Sakshi.ai — India's Legal Witness. Visit: ${appUrl}`;
  }
}
