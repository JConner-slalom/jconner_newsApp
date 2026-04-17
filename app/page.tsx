import { Suspense } from "react";
import { fetchBreakingNews, fetchFeaturedArticles } from "../lib/api";
import ArticlesGridDisplay from "./components/articlesGridDisplay";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Home",
    description: "JC News Daily",
    openGraph: {
        title: "Home | JC News Daily",
        description: "JC News Daily",
    },
    twitter: {
        title: "Home | JC News Daily",
        description: "JC News Daily",
    },
};


export default function Home() {
    return (
        <div className="flex flex-col gap-8">
            <Suspense fallback={<BreakingNewsSkeleton />}>
                <BreakingNewsSection />
            </Suspense>

            <section className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-16 py-8">
                <div className="flex-1">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">JC News in partnership with Vercel</h1>
                    <p className="text-lg text-zinc-600 dark:text-zinc-700 mb-6 max-w-xl">
                      News you can trust, quick reads and detailed coverage for what matters to you
                    </p>
                </div>
                <div className="flex-1 flex justify-center md:justify-end">
                    <Suspense fallback={<div className="w-72 h-44 bg-zinc-200 animate-pulse rounded-lg" /> }>
                      <FeaturedHeroImage />
                    </Suspense>
                </div>
            </section>

            <Suspense fallback={<FeaturedArticlesSkeleton />}>
                <FeaturedArticlesSection />
            </Suspense>
        </div>
    );
}

function BreakingNewsSkeleton() {
    return <div className="w-full h-10 bg-zinc-200 animate-pulse rounded mb-4" />;
}

async function BreakingNewsSection() {
    let breakingNews: any = null;
    try {
        breakingNews = await fetchBreakingNews();
    } catch {}
    if (!breakingNews) return null;
    return (
        <div className="w-full bg-black text-white py-2 px-4 rounded mb-4 flex items-center gap-2">
            <span className="font-bold text-xs bg-red-600 px-2 py-1 rounded mr-2">BREAKING</span>
            <span>{breakingNews.headline}</span>
        </div>
    );
}

async function FeaturedHeroImage() {
    let featured: any[] = [];
    try {
        featured = await fetchFeaturedArticles();
    } catch {}
    return (
        <img src={featured[0]?.image || "/pro-plan.png"} alt="Featured story" className="rounded-lg shadow-lg w-72 h-44 object-cover" />
    );
}


function FeaturedArticlesSkeleton() {
    return (
        <section className="mt-8">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Featured</h2>
                <span className="text-sm text-zinc-600">Loading...</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-40 bg-zinc-200 animate-pulse rounded-lg" />
                ))}
            </div>
        </section>
    );
}

async function FeaturedArticlesSection() {
    let featured: any[] = [];
    try {
        featured = await fetchFeaturedArticles();
    } catch {}
    return <ArticlesGridDisplay featured={featured} sectionTitle="Featured Articles"/>;
}
