"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { searchArticles } from "../../../lib/api";
import ArticlesGridDisplay from "@/app/search/components/articlesGridDisplay";
import SearchInput from "@/app/search/components/SearchInput";
import CategorySelect from "@/app/search/components/CategorySelect";
import SearchButton from "@/app/search/components/SearchButton";


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
    const [query, setQuery] = useState(getInitialQuery);
    const [category, setCategory] = useState(getInitialCategory);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [hasSearched, setHasSearched] = useState(getInitialHasSearched);
    const debounce = useRef<number | null>(null);


    function getInitialQuery() {
        return searchParams.get("q") || "";
    }
    function getInitialCategory() {
        return searchParams.get("category") || "Select Category";
    }

    function getInitialHasSearched() {
        return !!searchParams.get("q") || !!searchParams.get("category");
    }
    // Sync state with URL
    useEffect(() => {
        const params = new URLSearchParams();
        if (query) params.set("q", query);
        if (category && category !== "Select Category") params.set("category", category);
        const paramStr = params.toString();
        router.replace(`/search?${paramStr}`);
    }, [query, category, router]);

    // Perform search when query/category changes
    useEffect(() => {
        if (!query && (!category || category === "Select Category")) {
            setHasSearched(false);
            setResults([]);
            setError("");
            return;
        }
        setHasSearched(true);
        setLoading(true);
        setError("");
        if (debounce.current) clearTimeout(debounce.current);
        debounce.current = window.setTimeout(() => {
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
    }, [query, category]);


    const handleInput = (value: string) => {
        setQuery(value);
    };

    const handleCategory = (value: string) => {
        setCategory(value);
    };

    function handleSearch() {
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
    }

    return (
        <div>
        <form className="flex flex-col sm:flex-row gap-3 items-stretch" onSubmit={e => { e.preventDefault(); handleSearch(); }}>
            <SearchInput
                value={query}
                onChange={handleInput}
                onEnter={handleSearch}
            />
            <CategorySelect
                value={category}
                onChange={handleCategory}
                categories={CATEGORIES}
            />
            <SearchButton loading={loading} />
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

