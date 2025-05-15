import React from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { CircleUserRound } from "lucide-react";

import { useAppDispatch } from "@repo/shared/redux/hooks";
import { updateUser } from "@repo/shared/redux/slices/user/userSlice";

import { auth } from "@repo/shared/lib/firebase/firebaseConfig";
import { mapUser } from "@repo/shared/types/auth";

import { Button } from "@/components/ui/button";

export default function GoogleLoginButton() {
  const dispatch = useAppDispatch();

  const handleGoogle = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      const user = result.user;
      const userData = mapUser(user);

      dispatch(updateUser(userData));
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <Button type="button" onClick={handleGoogle}>
      <CircleUserRound /> Google Login
    </Button>
  );
}
