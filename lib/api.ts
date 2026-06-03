"use cache";

import { cacheLife } from "next/cache";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "https://vercel-daily-news-api.vercel.app/api";
const API_BYPASS = process.env.API_BYPASS_TOKEN || "";

export async function fetchFeaturedArticles() {
    cacheLife({ revalidate: 60 });
    const res = await fetch(`${API_BASE}/articles?featured=true`, {
        headers: { "x-vercel-protection-bypass": API_BYPASS },
    });
    if (!res.ok) throw new Error("Failed to fetch featured articles");
    const data = await res.json();
    return data.data;
}

export async function fetchBreakingNews() {
    cacheLife({ revalidate: 30 });
    try {
        const res = await fetch(`${API_BASE}/breaking-news`, {
            headers: { "x-vercel-protection-bypass": API_BYPASS },
        });
        if (!res.ok) throw new Error("Failed to fetch breaking news");
        const data = await res.json();
        return data.data;
    } catch (error) {
        console.error("fetchBreakingNews error", error);
        throw error;
    }
}

export async function fetchArticleById(id: string) {
    cacheLife({ revalidate: 60 });
    const res = await fetch(`${API_BASE}/articles/${id}`, {
        headers: { "x-vercel-protection-bypass": API_BYPASS },
    });
    if (!res.ok) throw new Error("Failed to fetch article");
    const data = await res.json();
    return data.data;
}

export async function fetchTrendingArticles() {
    cacheLife({ revalidate: 30 });
    const res = await fetch(`${API_BASE}/articles/trending`, {
        headers: { "x-vercel-protection-bypass": API_BYPASS },
    });
    if (!res.ok) throw new Error("Failed to fetch trending articles");
    const data = await res.json();
    return data.data;
}

