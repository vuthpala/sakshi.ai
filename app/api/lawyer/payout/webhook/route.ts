import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

// POST /api/lawyer/payout/webhook
export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get("x-razorpay-signature");
    
    // Verify signature
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET || "")
      .update(body)
      .digest("hex");
    
    if (signature !== expectedSignature) {
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 400 }
      );
    }

    const event = JSON.parse(body);
    
    // Handle payout events
    switch (event.event) {
      case "payout.processed":
        // Update payout status to paid
        // await db.payouts.update({
        //   razorpayPayoutId: event.payload.payout.entity.id,
        //   status: "paid",
        //   processedAt: new Date().toISOString(),
        // });
        
        // Notify lawyer via SMS/email
        // await sendNotification(lawyerId, "Payout completed", `₹${amount} has been transferred to your account`);
        break;
        
      case "payout.failed":
        // Update payout status to failed
        // await db.payouts.update({
        //   razorpayPayoutId: event.payload.payout.entity.id,
        //   status: "failed",
        //   failureReason: event.payload.payout.entity.status_details?.reason,
        // });
        
        // Refund the amount to pending payout
        // await db.lawyers.update({
        //   id: lawyerId,
        //   pendingPayout: { increment: amount },
        // });
        break;
        
      case "payout.reversed":
        // Handle reversed payouts
        break;
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
