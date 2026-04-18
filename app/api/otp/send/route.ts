import { NextRequest, NextResponse } from "next/server";

// Simple in-memory OTP store (use Redis/DB in production)
const otpStore = new Map<string, { otp: string; expiresAt: number }>();

// Clean up expired OTPs every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of otpStore.entries()) {
    if (value.expiresAt < now) {
      otpStore.delete(key);
    }
  }
}, 5 * 60 * 1000);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { phone, email } = body;

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Store OTP with 5-minute expiry
    const key = phone || email;
    otpStore.set(key, {
      otp,
      expiresAt: Date.now() + 5 * 60 * 1000, // 5 minutes
    });

    // Get MSG91 config
    const MSG91_AUTH_KEY = process.env.MSG91_AUTH_KEY;
    const MSG91_TEMPLATE_ID = process.env.MSG91_TEMPLATE_ID;
    const MSG91_SENDER_ID = process.env.MSG91_SENDER_ID || "PAPERW";

    // Send SMS via MSG91 if phone number provided
    if (phone) {
      if (!MSG91_AUTH_KEY || !MSG91_TEMPLATE_ID) {
        // Demo mode - log OTP to console
        console.log(`\n🔐 DEMO OTP for ${phone}: ${otp}\n`);
      } else {
        // Real MSG91 API call
        const msg91Response = await fetch("https://api.msg91.com/api/v5/flow/", {
        method: "POST",
        headers: {
          "authkey": MSG91_AUTH_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          template_id: MSG91_TEMPLATE_ID,
          sender: MSG91_SENDER_ID,
          short_url: "0",
          mobiles: `91${phone.replace(/\D/g, "")}`,
          var1: otp,
        }),
      });

      if (!msg91Response.ok) {
        const error = await msg91Response.text();
        console.error("MSG91 Error:", error);
        throw new Error("Failed to send SMS");
      }

      console.log(`✅ Real OTP sent to ${phone}: ${otp}`);
    }
  } else if (email) {
      // For email, just log it (integrate SendGrid/AWS SES later)
      console.log(`\n📧 DEMO Email OTP for ${email}: ${otp}\n`);
    }

    // Determine if demo mode
    const isDemo = !MSG91_AUTH_KEY || !MSG91_TEMPLATE_ID;

    return NextResponse.json({ 
      success: true, 
      message: "OTP sent successfully",
      demo: isDemo,
      otp: isDemo ? otp : undefined // Only return OTP in demo mode
    });

  } catch (error) {
    console.error("OTP Send Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send OTP" },
      { status: 500 }
    );
  }
}

// Export for verification use
export { otpStore };
