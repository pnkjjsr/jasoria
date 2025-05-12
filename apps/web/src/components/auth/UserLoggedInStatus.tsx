import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "@/lib/firebase/firebaseConfig";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DrawerDialogLogin } from "@/components/modals/login";
import { Skeleton } from "@/components/ui/skeleton";

interface userdata {
  email: string;
  displayName: string;
  photoURL: string;
  uid: string;
  phoneNumber: string;
  providerData: {
    providerId: string;
    uid: string;
    displayName: string;
    email: string;
    phoneNumber: string;
  }[];
}

export default function UserLoggedInStatus(props: any) {
  const [isLoggedIn, setIsloggedIn] = useState<boolean | any>();
  const [user, setUser] = useState({} as userdata);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setIsloggedIn(false);
      setUser({} as userdata);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsloggedIn(true);
        setUser({
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
        });
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
        <Avatar className="cursor-pointer" onClick={handleLogout}>
          <AvatarImage src={user.photoURL} alt={user.displayName} />
          <AvatarFallback>{user.displayName}</AvatarFallback>
        </Avatar>
      ) : (
        <DrawerDialogLogin />
      )}
    </>
  );
}
