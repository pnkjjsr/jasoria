"use client";
import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "@repo/shared/lib/firebase/firebaseClient";

import { useAppDispatch } from "@repo/shared/redux/hooks";
import { updateUser } from "@repo/shared/redux/slices/user/userSlice";
import { userType, mapUser } from "@repo/shared/types/auth";

import { DrawerDialogLogin } from "@/components/modals/login";
import { Skeleton } from "@/components/ui/skeleton";
import UserMenu from "@/components/dropdown/UserMenu";

export default function UserLoginButton() {
  const dispatch = useAppDispatch();

  const [isLoggedIn, setIsloggedIn] = useState<boolean | undefined>();
  const [user, setUser] = useState({} as userType);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setIsloggedIn(false);
      setUser({} as userType);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userData = mapUser(user);

        setIsloggedIn(true);
        setUser(userData);

        dispatch(updateUser(userData));
      } else {
        setIsloggedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (isLoggedIn === undefined) {
    return <Skeleton className="h-8 w-8 rounded-full" />;
  }

  return (
    <>
      {user?.photoURL ? (
        <UserMenu user={user} logout={handleLogout} />
      ) : (
        <DrawerDialogLogin />
      )}
    </>
  );
}
