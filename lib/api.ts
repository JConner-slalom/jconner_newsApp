const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "https://vercel-daily-news-api.vercel.app/api";
const API_BYPASS = process.env.API_BYPASS_TOKEN || "";

export async function fetchFeaturedArticles() {
    const res = await fetch(`${API_BASE}/articles?featured=true`, {
        headers: { "x-vercel-protection-bypass": API_BYPASS },
        next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error("Failed to fetch featured articles");
    const data = await res.json();
    return data.data;
}

export async function fetchBreakingNews() {
    try {
        const res = await fetch(`${API_BASE}/breaking-news`, {
            headers: { "x-vercel-protection-bypass": API_BYPASS },
            next: { revalidate: 30 },
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
    const res = await fetch(`${API_BASE}/articles/${id}`, {
        headers: { "x-vercel-protection-bypass": API_BYPASS },
        next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error("Failed to fetch article");
    const data = await res.json();
    return data.data;
}

export async function fetchTrendingArticles() {
    const res = await fetch(`${API_BASE}/articles/trending`, {
        headers: { "x-vercel-protection-bypass": API_BYPASS },
        next: { revalidate: 30 },
    });
    if (!res.ok) throw new Error("Failed to fetch trending articles");
    const data = await res.json();
    return data.data;
}

export async function fetchTrendingArticlesSearch() {
    const url = "/api/articles/trending";
    console.log("fetchTrendingArticlesSearch url", url);
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch trending articles");
    const data = await res.json();
    return data.data;
}

export async function searchArticles(query: string, category?: string) {
    const params = new URLSearchParams();
    if (query) params.set("search", query);
    if (category && category !== "Select Category") params.set("category", category);
    const paramStr = params.toString();
    const url = `/api/articles${paramStr ? `?${paramStr}` : ''}`;
    console.log("searchArticles url:", url);
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to search articles");
    const data = await res.json();
    return data.data;
}
