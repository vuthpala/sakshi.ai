import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Create a dummy client for build time when env vars are not available
const dummyClient = {
  from: () => ({
    select: () => ({
      eq: () => ({
        single: async () => ({ data: null, error: new Error("Supabase not configured") }),
      }),
    }),
    insert: () => ({
      select: () => ({
        single: async () => ({ data: null, error: new Error("Supabase not configured") }),
      }),
    }),
    update: () => ({
      eq: () => ({
        select: () => ({
          single: async () => ({ data: null, error: new Error("Supabase not configured") }),
        }),
      }),
    }),
  }),
} as any;

export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : dummyClient;
