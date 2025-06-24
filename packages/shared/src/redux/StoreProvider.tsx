"use client";

import type { ReactNode } from "react";
import { useEffect, useRef } from "react";

import { Provider } from "react-redux";
import { setupListeners } from "@reduxjs/toolkit/query";

import type { AppStore } from "./store";
import { makeStore } from "./store";

import { Toaster } from "@/components/ui/sonner";

interface Props {
  readonly children: React.ReactPortal | React.ReactElement | React.ReactNode[];
}

export const StoreProvider = ({ children }: Props) => {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }

  useEffect(() => {
    if (storeRef.current != null) {
      // configure listeners using the provided defaults
      // optional, but required for `refetchOnFocus`/`refetchOnReconnect` behaviors
      const unsubscribe = setupListeners(storeRef.current.dispatch);
      return unsubscribe;
    }
  }, []);
  
  return (
    <Provider store={storeRef.current}>
      {children}
      <Toaster richColors position="top-center" expand={false} />
    </Provider>
  );
};
