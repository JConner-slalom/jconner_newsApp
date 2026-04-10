// lib/api.ts
// Utility functions for fetching news data from the Vercel Daily News API


const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "https://vercel-daily-news-api.vercel.app/api";
const API_BYPASS = process.env.NEXT_PUBLIC_API_BYPASS_TOKEN || "";

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
  const res = await fetch(`${API_BASE}/articles/trending`, {
    headers: { "x-vercel-protection-bypass": API_BYPASS },
    next: { revalidate: 30 },
  });
  if (!res.ok) throw new Error("Failed to fetch breaking news");
  const data = await res.json();
  return data.data;
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

export async function searchArticles(query: string, category?: string) {
  const params = new URLSearchParams({ q: query });
  if (category) params.append("category", category);
  const res = await fetch(`${API_BASE}/articles/search?${params.toString()}`, {
    headers: { "x-vercel-protection-bypass": API_BYPASS },
    next: { revalidate: 10 },
  });
  if (!res.ok) throw new Error("Failed to search articles");
  const data = await res.json();
  return data.data;
}
