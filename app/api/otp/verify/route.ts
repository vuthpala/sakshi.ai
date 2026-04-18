import { NextRequest, NextResponse } from "next/server";
import { otpStore } from "../send/route";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { phone, email, otp } = body;

    const key = phone || email;
    const storedData = otpStore.get(key);

    if (!storedData) {
      return NextResponse.json(
        { success: false, error: "OTP expired or not found" },
        { status: 400 }
      );
    }

    // Check expiry
    if (storedData.expiresAt < Date.now()) {
      otpStore.delete(key);
      return NextResponse.json(
        { success: false, error: "OTP expired" },
        { status: 400 }
      );
    }

    // Verify OTP
    if (storedData.otp !== otp) {
      return NextResponse.json(
        { success: false, error: "Invalid OTP" },
        { status: 400 }
      );
    }

    // Success - delete OTP
    otpStore.delete(key);

    return NextResponse.json({ 
      success: true, 
      message: "OTP verified successfully" 
    });

  } catch (error) {
    console.error("OTP Verify Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to verify OTP" },
      { status: 500 }
    );
  }
}
