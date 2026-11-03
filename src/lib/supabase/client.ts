import { createClient } from "@supabase/supabase-js";

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const rawKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Kiểm tra URL hợp lệ để tránh crash khi build trên Vercel/CI
export const isConfigured = Boolean(
  rawUrl && rawUrl.startsWith("http") && rawKey
);

const supabaseUrl = isConfigured ? rawUrl! : "https://placeholder.supabase.co";
const supabaseAnonKey = isConfigured ? rawKey! : "placeholder-anon-key";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
