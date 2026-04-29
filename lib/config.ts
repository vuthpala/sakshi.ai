// Configuration for Sakshi.ai - Environment Variables
// These are demo/test keys for immediate deployment

export const CONFIG = {
  // Razorpay Payment (Test Mode)
  RAZORPAY: {
    KEY_ID: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_SeWnNj3gx4GQ01",
    KEY_SECRET: process.env.RAZORPAY_KEY_SECRET || "JLQz2d79SQA9F2v9TDEv1BJ6",
  },

  // Supabase Database
  SUPABASE: {
    URL: process.env.NEXT_PUBLIC_SUPABASE_URL || "https://yatuxxswgaugitskfoqk.supabase.co",
    ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlhdHV4eHN3Z2F1Z2l0c2tmb3FrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYzOTg4NTcsImV4cCI6MjA5MTk3NDg1N30.4XxDoWLNjEgM7vlK_MTH25U0xMGKY9BjuSSYtGxkZwc",
    SERVICE_KEY: process.env.SUPABASE_SERVICE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlhdHV4eHN3Z2F1Z2l0c2tmb3FrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjM5ODg1NywiZXhwIjoyMDkxOTc0NjU3fQ.fdxXpuvg8AxaeG3z1NhHsbZfTLcxki_BWLyWykP-kGI",
  },

  // Anthropic AI (Optional - mock mode works without this)
  ANTHROPIC: {
    API_KEY: process.env.ANTHROPIC_API_KEY || "",
  },

  // MSG91 SMS (Optional - demo mode works without this)
  MSG91: {
    AUTH_KEY: process.env.MSG91_AUTH_KEY || "",
    TEMPLATE_ID: process.env.MSG91_TEMPLATE_ID || "",
    SENDER_ID: process.env.MSG91_SENDER_ID || "PAPERW",
  },

  // App Settings
  APP: {
    NAME: "Sakshi.ai",
    URL: process.env.NEXT_PUBLIC_APP_URL || "https://sakshi.ai",
    PRICE_PER_DOCUMENT: 499, // in cents ($4.99)
  },
};

// Helper to check if we're in demo mode (no real AI key)
export const isDemoMode = () => !CONFIG.ANTHROPIC.API_KEY;

// Helper to get Razorpay config
export const getRazorpayConfig = () => CONFIG.RAZORPAY;

// Helper to get Supabase config
export const getSupabaseConfig = () => CONFIG.SUPABASE;

// Helper to get MSG91 config
export const getMSG91Config = () => CONFIG.MSG91;
