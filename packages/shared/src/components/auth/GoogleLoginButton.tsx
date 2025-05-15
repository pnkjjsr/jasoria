import React from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { CircleUserRound } from "lucide-react";

import { useAppSelector, useAppDispatch } from "@repo/shared/redux/hooks";
import {
  selectUser,
  updateUser,
} from "@repo/shared/redux/slices/user/userSlice";

import { auth } from "@repo/shared/lib/firebase/firebaseConfig";

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
