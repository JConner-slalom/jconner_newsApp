"use client";

import ArticlesGridDisplay from "@/app/search/components/articlesGridDisplay";
import TrendingArticlesSection from "./trendingArticles";
import { type SearchArticle } from "@/app/search/components/searchConstants";

type SearchContentProps = {
    loading: boolean;
    error: string;
    hasSearched: boolean;
    results: SearchArticle[];
};

export default function SearchContent({ loading, error, hasSearched, results }: SearchContentProps) {
    if (loading) {
        return <div className="text-center text-zinc-600 py-8">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500 py-8">{error}</div>;
    }

    if (hasSearched && results.length === 0) {
        return <div className="text-center text-zinc-600 py-8">No articles found for your search.</div>;
    }

    if (hasSearched && results.length > 0) {
        return <ArticlesGridDisplay featured={results} />;
    }

    return <TrendingArticlesSection />;
}
