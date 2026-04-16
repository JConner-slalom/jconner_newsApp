import React from "react";

type SearchButtonProps = {
	loading: boolean;
}

function SearchButton({ loading }: SearchButtonProps) {
	return (
		<button
			type="submit"
			className="px-6 py-2 rounded bg-black text-white dark:bg-white dark:text-black font-medium hover:opacity-80 transition"
			disabled={loading}
		>
			Search
		</button>
	);
}

export default SearchButton;
