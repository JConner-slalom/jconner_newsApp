import { Suspense } from "react";
import Search from "@/app/search/components/search";

export default function SearchPage() {
    return (
        <div className="py-12 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Search Articles</h1>
            <Search />
        </div>
    );
}


