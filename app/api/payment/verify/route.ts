import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { supabase } from "@/lib/supabase";
import { getRazorpayConfig } from "@/lib/config";

function getRazorpayKeySecret(): string {
  const config = getRazorpayConfig();
  if (!config.KEY_SECRET) {
    throw new Error("Razorpay key secret not configured");
  }
  return config.KEY_SECRET;
}

export async function POST(request: NextRequest) {
  try {
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature,
      documentId 
    } = await request.json();

    // Verify signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", getRazorpayKeySecret())
      .update(body)
      .digest("hex");

    const isValid = expectedSignature === razorpay_signature;

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid payment signature" },
        { status: 400 }
      );
    }

    // Update document status
    const { error } = await supabase
      .from("documents")
      .update({
        payment_status: "paid",
        razorpay_payment_id: razorpay_payment_id,
      })
      .eq("id", documentId);

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to update payment status" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      status: "success",
      message: "Payment verified successfully",
    });
  } catch (error) {
    console.error("Error verifying payment:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
