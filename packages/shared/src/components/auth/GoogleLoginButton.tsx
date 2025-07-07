import React from "react";
import { CircleUserRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import { supabase } from "@repo/shared/lib/superbase/supabaseClient";

export default function GoogleLoginButton() {

  const handleGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  return (
    <div className="grid w-full px-4 sm:px-0">
      <Button type="button" onClick={handleGoogle}>
        <CircleUserRound />
        Google Login
      </Button>
    </div>
  );
}
