"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@repo/shared/lib/superbase/supabaseClient";
import { useSearchParams, usePathname } from "next/navigation";

export default function AuthStateHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        const redirectUrl = sessionStorage.getItem("redirectURL");

        if (redirectUrl && redirectUrl !== "/") {
          sessionStorage.removeItem("redirectURL");
          router.push(redirectUrl);
        }
      } else {
        if (typeof window !== "undefined" && searchParams?.toString() !== "") {
          let fullPath = `${pathname}?${searchParams?.toString()}`;
          sessionStorage.setItem("redirectURL", fullPath);
        }
      }

      if (event === "SIGNED_OUT") {
        sessionStorage.removeItem("redirectURL");
        router.push("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  return null;
}
