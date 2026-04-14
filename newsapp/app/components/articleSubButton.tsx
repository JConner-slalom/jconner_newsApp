'use client';
import { useEffect, useState } from "react";
import { useSubscription } from "@/app/context/subscriptionContext";
import { useRouter } from "next/navigation";

export default function ArticleSubButton() {
  const { subscribed, setSubscribed } = useSubscription();
  const router = useRouter();

  useEffect(() => {
    // Check cookie on mount
    const match = document.cookie.match(/(?:^|; )subscribed=([^;]*)/);
    setSubscribed(match?.[1] === "true");
  }, []);

  const handleSubscribe = () => {
    document.cookie = `subscribed=true; path=/; max-age=31536000`;
    setSubscribed(true);
    router.refresh();
  };

  return (
    <span className="inline-flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-200">
      {!subscribed && (
        <button
          className="ml-2 px-3 py-1 rounded bg-black text-white dark:bg-white dark:text-black font-medium hover:opacity-80 transition"
          onClick={handleSubscribe}
        >
          Subscribe To Read More
        </button>
      )}
    </span>
  );
}
