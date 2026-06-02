"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { searchArticles } from "../../../lib/api";
import { defaultCat, type SearchArticle } from "@/app/search/components/searchConstants";

export function handleSearchResults() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [query, setQuery] = useState(() => searchParams.get("q") || "");
    const [category, setCategory] = useState(() => searchParams.get("category") || defaultCat);
    const [results, setResults] = useState<SearchArticle[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [hasSearched, setHasSearched] = useState(() => !!searchParams.get("q") || !!searchParams.get("category"));
    const debounce = useRef<number | null>(null);

    useEffect(() => {
        const params = new URLSearchParams();
        if (query) params.set("q", query);
        if (category && category !== defaultCat) params.set("category", category);
        const paramStr = params.toString();
        router.replace(`/search?${paramStr}`);
    }, [query, category, router]);

    useEffect(() => {
        if (query.length < 3) {
            return;
        }

        if (debounce.current) clearTimeout(debounce.current);
        debounce.current = window.setTimeout(() => {
            setHasSearched(true);
            setLoading(true);
            setError("");
            searchArticles(query, category && category !== defaultCat ? category : undefined)
                .then((res) => {
                    setResults(res ? res.slice(0, 5) : []);
                    setLoading(false);
                })
                .catch(() => {
                    setResults([]);
                    setError("Failed to fetch search results.");
                    setLoading(false);
                });
        }, 350);

        return () => {
            if (debounce.current) clearTimeout(debounce.current);
        };
    }, [query, category]);

    const handleInput = (value: string) => {
        setQuery(value);
        if (!value && (!category || category === defaultCat)) {
            setHasSearched(false);
            setResults([]);
            setError("");
        }
    };

    const handleCategory = (value: string) => {
        setCategory(value);
        if (!query && (!value || value === defaultCat)) {
            setHasSearched(false);
            setResults([]);
            setError("");
        }
    };

    const handleSearch = () => {
        if (query.length === 0 && (category === defaultCat || !category)) {
            setHasSearched(false);
            setResults([]);
            setError("");
            return;
        }

        setHasSearched(true);
        setLoading(true);
        setError("");
        searchArticles(query, category && category !== defaultCat ? category : undefined)
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

    return {
        query,
        category,
        results,
        loading,
        error,
        hasSearched,
        handleInput,
        handleCategory,
        handleSearch,
    };
}
