import React from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { CircleUserRound } from "lucide-react";

import { auth } from "@repo/shared/lib/firebase/firebaseConfig";
import { useAppSelector, useAppDispatch } from "@repo/shared/redux/hooks";
import {
  selectUser,
  updateUser,
} from "@repo/shared/redux/slices/user/userSlice";

import { Button } from "@/components/ui/button";

export default function GoogleLoginButton() {
  // Redux state and dispatch
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const handleGoogle = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      const user = result.user;
      dispatch(updateUser(user));
      console.log("User logged in:", user);
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
