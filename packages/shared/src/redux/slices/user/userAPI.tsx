import { onAuthStateChanged } from "firebase/auth";

import { auth } from "@repo/shared/lib/firebase/firebaseClient";
import { supabase } from "@repo/shared/lib/superbase/supabaseClient";

import { mapProfile, userType } from "@repo/shared/types/user";

export const fetchUser = onAuthStateChanged(auth, (user) => {
  if (user) {
    const userData = {
      email: user.email || "",
      displayName: user.displayName || "",
      photoURL: user.photoURL || "",
      uid: user.uid,
      phoneNumber: user.phoneNumber || "",
      providerData: user.providerData.map((provider) => ({
        providerId: provider.providerId,
        uid: provider.uid,
        displayName: provider.displayName || "",
        email: provider.email || "",
        phoneNumber: provider.phoneNumber || "",
      })),
    };
    const result = userData;
    return result;
  }
});

export const postProfile = async (data: userType) => {
  let response;

  const { data: profile_exists, error } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("user_id", data.user_id);

  if (profile_exists && profile_exists?.length <= 0) {
    const { data: profile_add, error } = await supabase
      .from("user_profiles")
      .insert(data)
      .select();

    response = profile_add;
  } else {
    const { data: profile_update, error } = await supabase
      .from("user_profiles")
      .upsert(data, { onConflict: "user_id" })
      .select();

    response = profile_update;
  }

  try {
    return response;
  } catch (error) {
    return error;
  }
};

export const getProfile = async (uid: string) => {
  let { data: profile_data, error } = await supabase
    .from("user_profiles")
    .select("*");

  if (profile_data && profile_data.length >= 0) {
    const profile = profile_data[0] as userType;
    const mappedProfile = mapProfile(profile);
    return mappedProfile;
  } else return null;
};
