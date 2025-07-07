"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "@repo/shared/lib/superbase/supabaseClient";

import { useAppDispatch } from "@repo/shared/redux/hooks";
import { updateUser } from "@repo/shared/redux/slices/user/userSlice";
import {
  mapSupabaseUser,
  userSupaType,
} from "@repo/shared/types/auth";

import { DrawerDialogLogin } from "@/components/modals/login";
import { Skeleton } from "@/components/ui/skeleton";
import UserMenu from "@/components/dropdowns/UserMenu";

export default function UserLoginButton() {
  const dispatch = useAppDispatch();

  const [isLoggedIn, setIsloggedIn] = useState<boolean | undefined>();
  const [user, setUser] = useState({} as userSupaType);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setIsloggedIn(false);
      setUser({} as userSupaType);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const getSupabaseUser = async () => {
    const { data: user, error: userError } = await supabase.auth.getUser();

    if (user?.user) {
      const userData = mapSupabaseUser(user?.user);

      setIsloggedIn(true);
      setUser(userData);

      dispatch(updateUser(userData));
    } else {
      setIsloggedIn(false);
    }
  };

  useEffect(() => {
    getSupabaseUser();
  }, []);

  if (isLoggedIn === undefined) {
    return <Skeleton className="h-8 w-8 rounded-full" />;
  }

  return (
    <>
      {user?.id ? (
        <UserMenu user={user} logout={handleLogout} />
      ) : (
        <DrawerDialogLogin />
      )}
    </>
  );
}
