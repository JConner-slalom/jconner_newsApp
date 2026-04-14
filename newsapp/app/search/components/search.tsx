"use client";
import { Suspense, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { searchArticles } from "../../../lib/api";
import ArticlesGridDisplay from "@/app/search/components/articlesGridDisplay";
import TrendingArticlesSection from "@/app/search/components/trendingArticles";


const CATEGORIES = [
  "Select Category",
  "customers",
  "community",
  "company-news",
  "changelog",
  "engineering",
];

export default function SearchComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(() => searchParams.get("q") || "");
  const [category, setCategory] = useState(() => searchParams.get("category") || "All");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(() => !!searchParams.get("q") || !!searchParams.get("category"));
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Sync state with URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (category && category !== "All") params.set("category", category);
    const paramStr = params.toString();
    router.replace(`/search?${paramStr}`);
  }, [query, category, router]);

  // Perform search when query/category changes
  useEffect(() => {
    if (!query && (!category || category === "All")) {
      setHasSearched(false);
      setResults([]);
      setError("");
      return;
    }
    setHasSearched(true);
    setLoading(true);
    setError("");
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if (query.length >= 3 || (query.length === 0 && category !== "Select Category")) {
        searchArticles(query, category && category !== "Select Category" ? category : undefined)
          .then((res) => {
            console.log("searchArticles response", res);
            setResults(res ? res.slice(0, 5) : []);
            setLoading(false);
          })
          .catch(() => {
            setResults([]);
            setError("Failed to fetch search results.");
            setLoading(false);
          });
      } else {
        setResults([]);
        setLoading(false);
        setError("");
      }
    }, query.length >= 3 ? 350 : 0);
    // Only debounce if query is at least 3 chars
    // Otherwise, search immediately for category-only filter
  }, [query, category]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (query.length === 0 && (category === "Select Category" || !category)) {
      setHasSearched(false);
      setResults([]);
      setError("");
      return;
    }
    setHasSearched(true);
    setLoading(true);
    setError("");
    searchArticles(query, category && category !== "Select Category" ? category : undefined)
      .then((res) => {
        setResults(res ? res.slice(0, 5) : []);
        setLoading(false);
      })
      .catch(() => {
        setResults([]);
        setError("Failed to fetch search results.");
        setLoading(false);
      });
  };

  return (
    <div>
      <form className="flex flex-col sm:flex-row gap-3 items-stretch" onSubmit={handleSearch}>
        <input
          type="text"
          className="flex-1 border border-zinc-300 dark:border-zinc-700 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search for articles..."
          value={query}
          onChange={handleInput}
          minLength={0}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch(e);
          }}
        />
        <select
          className="border border-zinc-300 dark:border-zinc-700 rounded px-4 py-2 bg-white dark:bg-zinc-900"
          value={category}
          onChange={handleCategory}
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <button
          type="submit"
          className="px-6 py-2 rounded bg-black text-white dark:bg-white dark:text-black font-medium hover:opacity-80 transition"
          disabled={loading}
        >
          Search
        </button>
      </form>

      {loading && (
        <div className="text-center text-zinc-500 py-8">Loading...</div>
      )}

      {!loading && error && (
        <div className="text-center text-red-500 py-8">{error}</div>
      )}

      {!loading && hasSearched && !error && results.length === 0 && (
        <div className="text-center text-zinc-500 py-8">No articles found for your search.</div>
      )}

      {!loading && hasSearched && results.length > 0 && (
        <ArticlesGridDisplay featured={results} />
      )}

      {/* {!loading && !hasSearched && (
        <TrendingArticlesSection />
      )} */}
    </div>
  );
}

