'use client';
import { useEffect, useState } from "react";
import { useSubscription } from "@/app/context/subscriptionContext";
import { useRouter } from "next/navigation";

export default function ArticleSubButton() {
	const { subscribed, subscribe } = useSubscription();
	const router = useRouter();

	const handleSubscribe = () => {
		subscribe();
		router.refresh();
	};

	return (
		<span className="inline-flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-200">
			{!subscribed && (
				   <button
					   className="ml-2 px-3 py-1 rounded border-2 border-zinc-800 dark:border-zinc-900 bg-black text-white dark:bg-white dark:text-black font-medium transition
						   hover:bg-white hover:text-black hover:border-zinc-800
						   dark:hover:bg-black dark:hover:text-white dark:hover:border-zinc-900
						   focus:bg-white focus:text-black focus:border-zinc-800
						   dark:focus:bg-black dark:focus:text-white dark:focus:border-zinc-900
					   "
					   onClick={handleSubscribe}
				   >
					   Subscribe To Read More
				   </button>
			)}
		</span>
	);
}
