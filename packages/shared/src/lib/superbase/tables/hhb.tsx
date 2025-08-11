import { supabase } from "@repo/shared/lib/superbase/supabaseClient";

export const postHHB = async (payload: any) => {
  const { error } = await supabase.from("home_helps").upsert(payload);

  return error;
};

export const updateHHB = async (payload: any) => {
  const { error } = await supabase
    .from("home_helps")
    .update(payload)
    .eq("type", payload.type)
    .eq("user_id", payload.user_id);
  return error;
};
