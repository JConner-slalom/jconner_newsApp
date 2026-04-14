// app/context/SubscriptionContext.tsx
"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

type SubscriptionContextType = {
  subscribed: boolean;
  setSubscribed: (val: boolean) => void;
};

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export function SubscriptionProvider({ children }: { children: React.ReactNode }) {
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    function checkCookie() {
      const match = document.cookie.match(/(?:^|; )subscribed=([^;]*)/);
      setSubscribed(match?.[1] === "true");
    }
    checkCookie();
    const interval = setInterval(checkCookie, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <SubscriptionContext.Provider value={{ subscribed, setSubscribed }}>
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  const context = useContext(SubscriptionContext);
  if (!context) throw new Error("useSubscription must be used within a SubscriptionProvider");
  return context;
}
