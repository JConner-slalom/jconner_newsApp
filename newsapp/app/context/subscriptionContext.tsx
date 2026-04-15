// app/context/SubscriptionContext.tsx
"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

type SubscriptionContextType = {
  subscribed: boolean;
  subscribe: () => void;
  unsubscribe: () => void;
};

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export function SubscriptionProvider({ children }: { children: React.ReactNode }) {
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const match = document.cookie.match(/(?:^|; )subscribed=([^;]*)/);
    setSubscribed(match?.[1] === "true");
  }, []);

  const subscribe = () => {
    document.cookie = `subscribed=true; path=/; max-age=31536000`;
    setSubscribed(true);
  };

  const unsubscribe = () => {
    document.cookie = `subscribed=false; path=/; max-age=31536000`;
    setSubscribed(false);
  };

  return (
    <SubscriptionContext.Provider value={{ subscribed, subscribe, unsubscribe }}>
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  const context = useContext(SubscriptionContext);
  if (!context) throw new Error("useSubscription must be used within a SubscriptionProvider");
  return context;
}
