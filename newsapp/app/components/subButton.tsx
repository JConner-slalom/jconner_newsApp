import { useSubscription } from "@/app/context/subscriptionContext";
import { useRouter } from "next/navigation";

export default function SubscriptionIndicator() {
  const { subscribed, setSubscribed } = useSubscription();
  const router = useRouter();

  const handleSubscribe = () => {
    document.cookie = `subscribed=true; path=/; max-age=31536000`;
    setSubscribed(true);
    router.refresh();
  };

  const handleUnsubscribe = () => {
    document.cookie = `subscribed=false; path=/; max-age=31536000`;
    setSubscribed(false);
    router.refresh();
  };

  return (
    <span className="inline-flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-200">
      <span className="hidden sm:inline">
        {subscribed ? "Subscribed" : "Not Subscribed"}
      </span>
      {!subscribed && (
        <button
          className="ml-2 px-3 py-1 rounded bg-black text-white dark:bg-white dark:text-black font-medium hover:opacity-80 transition"
          onClick={handleSubscribe}
        >
          Subscribe
        </button>
      )}
      {subscribed && (
        <button
          className="ml-2 px-3 py-1 rounded bg-red-500 text-white dark:bg-red-500 dark:text-white font-medium hover:opacity-80 transition"
          onClick={handleUnsubscribe}
        >
          Unsubscribe
        </button>
      )}
    </span>
  );
}