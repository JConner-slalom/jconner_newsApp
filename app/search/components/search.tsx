"use client";
import SearchInput from "@/app/search/components/SearchInput";
import CategorySelect from "@/app/search/components/CategorySelect";
import SearchButton from "@/app/search/components/SearchButton";
import SearchContent from "@/app/search/components/SearchContent";
import { handleSearchResults } from "@/app/search/components/handleSearch";
import { Categories } from "@/app/search/components/searchConstants";

export default function SearchComponent() {
    const {
        query,
        category,
        results,
        loading,
        error,
        hasSearched,
        handleInput,
        handleCategory,
        handleSearch,
    } = handleSearchResults();

    return (

        <div>
        <form className="flex flex-col sm:flex-row gap-3 items-stretch" onSubmit={e => { e.preventDefault(); handleSearch(); }}>
            <SearchInput
                value={query}
                onChange={handleInput}
                onEnter={handleSearch}
            />
            <SearchButton loading={loading} />
        </form>
        <div className="mt-3">
            <div className="text-sm font-medium mb-1">Refine by Category:</div>
            <CategorySelect
                value={category}
                onChange={handleCategory}
                categories={Categories}
            />
        </div>

        <SearchContent loading={loading} error={error} hasSearched={hasSearched} results={results} />
        </div>
    );
}

