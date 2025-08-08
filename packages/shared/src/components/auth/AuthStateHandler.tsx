"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@repo/shared/lib/superbase/supabaseClient";

export default function AuthStateHandler() {
  const router = useRouter();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        const redirectUrl = sessionStorage.getItem("redirectURL");

        if (redirectUrl && redirectUrl !== "/") {
          sessionStorage.removeItem("redirectURL");
          router.push(redirectUrl);
        } else {
          router.push("/");
        }
      }

      if (event === "SIGNED_OUT") {
        router.push("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  return null;
}
