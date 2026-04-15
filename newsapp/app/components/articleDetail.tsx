
import ArticlePageDetailUnsubscribed from "./articlePageDetailUnsubscribed";
import ArticlesPageDetail from "./articlePageDetail";
import { cookies } from "next/headers";


export default async function ArticleDetail({ id }: { id: string }) {
    const subscriptionCookie = await cookies();
    const subscription = subscriptionCookie.get("subscribed")?.value === "true";

    if (!subscription) {
        return <ArticlePageDetailUnsubscribed id={id} />;
    } else {
        return <ArticlesPageDetail id={id} />;
    }
}