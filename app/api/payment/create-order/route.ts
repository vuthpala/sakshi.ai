import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import { getRazorpayConfig } from "@/lib/config";

// Initialize Razorpay with config (includes fallback values)
function getRazorpay() {
  const config = getRazorpayConfig();
  
  if (!config.KEY_ID || !config.KEY_SECRET) {
    return null;
  }
  
  return new Razorpay({
    key_id: config.KEY_ID,
    key_secret: config.KEY_SECRET,
  });
}

export async function POST(request: NextRequest) {
  try {
    const { amount, receipt } = await request.json();

    const razorpay = getRazorpay();

    if (!razorpay) {
      return NextResponse.json(
        { error: "Payment service not configured" },
        { status: 500 }
      );
    }

    const options = {
      amount: amount * 100, // Convert to paise
      currency: "INR",
      receipt: receipt || `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
