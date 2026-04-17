"use client";
import { useState, useEffect } from "react";
import { fetchTrendingArticlesSearch } from "../../../lib/api";
import ArticlesGridDisplay from "@/app/search/components/articlesGridDisplay";

export default function TrendingArticles() {
    return (
        <div className="py-12 max-w-2xl mx-auto">
            <TrendingArticlesSection />
        </div>
    );
}

function TrendingArticlesSection() {
    const [trending, setTrending] = useState<any[] | null>(null);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchTrending() {
            try {
                const res = await fetchTrendingArticlesSearch();
                console.log("fetchTrendingArticles response", res);
                setTrending(res ? res.slice(0, 5) : []);
            } catch (err) {
                setTrending([]);
                setError("Failed to fetch trending articles.");
            }
        }
        fetchTrending();
    }, []);

    if (error) return <div className="text-center text-red-500 py-8">{error}</div>;
    if (trending === null) {
        return (
            <>
                <div className="text-lg font-semibold mb-4 text-left">Recent Articles</div>
                <section className="mt-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[...Array(5)].map((_, i) => (
                            <div
                                key={i}
                                className="col-span-1 animate-pulse bg-white/60 rounded-lg shadow p-4 flex flex-col"
                            >
                                <div className="rounded bg-gray-300 h-36 w-full mb-4" />
                                <div className="h-4 bg-gray-300 rounded w-1/3 mb-2" />
                                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2" />
                                <div className="h-6 bg-gray-300 rounded w-full mb-2" />
                                <div className="h-4 bg-gray-200 rounded w-3/4 mb-1" />
                                <div className="h-4 bg-gray-100 rounded w-2/3" />
                            </div>
                        ))}
                    </div>
                </section>
            </>
        );
    }
    return (
        <>
            <div className="text-lg font-semibold mb-4 text-left">Trending Articles</div>
            <ArticlesGridDisplay featured={trending} />
        </>
    );
}