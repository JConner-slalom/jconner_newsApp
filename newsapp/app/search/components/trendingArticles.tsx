import { fetchTrendingArticles } from "../../../lib/api";
import ArticlesGridDisplay from "@/app/components/articlesGridDisplay";
import { Suspense } from "react";

export default function TrendingArticles() {
    return (
        <div className="py-12 max-w-2xl mx-auto">
            <Suspense fallback={<TrendingArticlesSkeleton />}>
                <TrendingArticlesSection />
            </Suspense>
        </div>
    );
}

function TrendingArticlesSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(2)].map((_, i) => (
                <div key={i} className="h-40 bg-zinc-200 animate-pulse rounded-lg" />
            ))}
        </div>
    );
}

async function TrendingArticlesSection() {
    let trending: any[] = [];
    try {
        trending = await fetchTrendingArticles();
    } catch {}
    return <ArticlesGridDisplay featured={trending} />;
}