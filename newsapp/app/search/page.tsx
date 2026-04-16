import Search from "@/app/search/components/search";
import { Suspense } from "react";


export default function SearchPage() {
    return (
        <div className="py-12 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Search Articles</h1>
            <Suspense fallback={<div className="text-center text-gray-500 py-8">Loading search...</div>}>
                <Search />
            </Suspense>
        </div>
    );
}


