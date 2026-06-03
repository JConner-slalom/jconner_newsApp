import { cacheLife } from "next/cache";

type StaticArticleRecord = {
    id?: string;
    slug?: string;
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "https://vercel-daily-news-api.vercel.app/api";
const API_BYPASS = process.env.API_BYPASS_TOKEN || "";

export async function fetchArticleStaticParams(): Promise<{ slug: string }[]> {
    "use cache";
    cacheLife({ revalidate: 300 });
    try {
        const res = await fetch(`${API_BASE}/articles`, {
            headers: { "x-vercel-protection-bypass": API_BYPASS },
        });
        if (!res.ok) return [];

        const data = await res.json();
        const articles = (data?.data ?? []) as StaticArticleRecord[];

        return articles
            .map((article) => article.id ?? article.slug)
            .filter((value): value is string => Boolean(value))
            .map((slug) => ({ slug }));
    } catch {
        return [];
    }
}
