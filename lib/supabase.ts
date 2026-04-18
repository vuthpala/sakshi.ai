import { createClient } from "@supabase/supabase-js";
import { getSupabaseConfig } from "./config";

const config = getSupabaseConfig();

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

export const supabase = config.URL && config.ANON_KEY 
  ? createClient(config.URL, config.ANON_KEY)
  : dummyClient;
