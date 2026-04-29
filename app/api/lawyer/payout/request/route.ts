import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "",
});

// POST /api/lawyer/payout/request
export async function POST(request: NextRequest) {
  try {
    const { lawyerId, amount, method, bankDetails, upiId } = await request.json();

    if (!lawyerId || !amount || !method) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (amount < 500) {
      return NextResponse.json(
        { error: "Minimum withdrawal amount is ₹500" },
        { status: 400 }
      );
    }

    // Create payout data for Razorpay
    const payoutData: any = {
      account_number: process.env.RAZORPAY_ACCOUNT_NUMBER,
      amount: amount * 100, // Convert to paise
      currency: "INR",
      mode: method === "upi" ? "UPI" : "IMPS",
      purpose: "payout",
      queue_if_low_balance: true,
      reference_id: `payout_${lawyerId}_${Date.now()}`,
    };

    // Add fund account based on method
    if (method === "upi" && upiId) {
      payoutData.fund_account = {
        account_type: "vpa",
        vpa: {
          address: upiId,
        },
      };
    } else if (method === "bank_transfer" && bankDetails) {
      payoutData.fund_account = {
        account_type: "bank_account",
        bank_account: {
          name: bankDetails.accountHolderName,
          ifsc: bankDetails.ifscCode,
          account_number: bankDetails.accountNumber,
        },
      };
    } else {
      return NextResponse.json(
        { error: "Invalid payout method or missing details" },
        { status: 400 }
      );
    }

    // Create Razorpay payout (in production)
    // const razorpayPayout = await razorpay.payouts.create(payoutData);

    // For mock/development, simulate successful creation
    const mockPayout = {
      id: `pout_${Date.now()}`,
      status: "pending",
      amount: amount * 100,
      ...payoutData,
    };

    // In production, save to database
    // await db.payouts.create({...})

    return NextResponse.json({
      success: true,
      payout: {
        id: mockPayout.id,
        status: mockPayout.status,
        amount: amount,
        method,
        requestedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Payout request error:", error);
    return NextResponse.json(
      { error: "Failed to create payout request" },
      { status: 500 }
    );
  }
}
