import { createClient } from "@supabase/supabase-js";
import { ENV } from "../../config/env";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || ENV.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  ENV.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
