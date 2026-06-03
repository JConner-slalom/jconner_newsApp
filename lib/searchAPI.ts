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
    const url = `/api/articles${paramStr ? `?${paramStr}` : ""}`;
    console.log("searchArticles url:", url);
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to search articles");
    const data = await res.json();
    return data.data;
}
