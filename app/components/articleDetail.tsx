
import ArticlePageDetailUnsubscribed from "./articlePageDetailUnsubscribed";
import ArticlesPageDetail from "./articlePageDetail";
import { cookies } from "next/headers";
import { Suspense } from "react";


export default async function ArticleDetail({ id }: { id: string }) {
    const subscriptionCookie = await cookies();
    const subscription = subscriptionCookie.get("subscribed")?.value === "true";

    if (!subscription) {
        return (
            <Suspense fallback={<div className="text-center py-8 text-zinc-600">Loading article...</div>}>
                <ArticlePageDetailUnsubscribed id={id} />
            </Suspense>
        );
    } else {
        return (
            <Suspense fallback={<div className="text-center py-8 text-zinc-600">Loading article...</div>}>
                <ArticlesPageDetail id={id} />
            </Suspense>
        );
    }
}
