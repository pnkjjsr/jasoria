"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function useLoginSuccessRedirect(shouldAutoRedirect = false) {
  const [prevUrl, setPrevUrl] = useState<string>("/");
  const [isLoading, setIsLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);

    if (typeof window !== "undefined") {
      try {
        const url = sessionStorage.getItem("redirectURL") || "/";
        setPrevUrl(url);

        if (shouldAutoRedirect && url && url !== "/") {
          sessionStorage.removeItem("redirectURL");
          router.push(url);
        }
      } catch (error) {
        console.error("Error accessing sessionStorage:", error);
        setPrevUrl("/");
      } finally {
        setIsLoading(false);
      }
    }
  }, [router, shouldAutoRedirect]);

  const updateRedirectUrl = (url: string) => {
    if (typeof window !== "undefined") {
      try {
        sessionStorage.setItem("redirectURL", url);
        setPrevUrl(url);
      } catch (error) {
        console.error("Error setting sessionStorage:", error);
      }
    }
  };

  const clearRedirectUrl = () => {
    if (typeof window !== "undefined") {
      try {
        sessionStorage.removeItem("redirectURL");
        setPrevUrl("/");
      } catch (error) {
        console.error("Error clearing sessionStorage:", error);
      }
    }
  };

  const redirectToPrevUrl = () => {
    if (typeof window !== "undefined" && prevUrl && prevUrl !== "/") {
      console.log("Manually redirecting to previous URL:", prevUrl);
      clearRedirectUrl();
      router.push(prevUrl);
    }
  };

  return {
    prevUrl,
    isLoading,
    isClient,
    updateRedirectUrl,
    clearRedirectUrl,
    redirectToPrevUrl,
  };
}
