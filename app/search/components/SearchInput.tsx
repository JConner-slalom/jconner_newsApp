import React from "react";

type SearchInputProps = {
	value: string;
	onChange: (value: string) => void;
	onEnter: () => void;
};


function SearchInput({ value, onChange, onEnter }: SearchInputProps) {
	return (
		   <input
			   type="text"
			   className="flex-1 border border-zinc-300 dark:border-zinc-700 rounded px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
			   placeholder="Search for articles..."
			   value={value}
			   onChange={e => onChange(e.target.value)}
			   minLength={0}
			   onKeyDown={e => {
				   if (e.key === "Enter") onEnter();
			   }}
		   />
	);
}

export default SearchInput;
