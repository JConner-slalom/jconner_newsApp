import React from "react";

interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEnter: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}


function SearchInput({ value, onChange, onEnter }: SearchInputProps) {
  return (
    <input
      type="text"
      className="flex-1 border border-zinc-300 dark:border-zinc-700 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Search for articles..."
      value={value}
      onChange={onChange}
      minLength={0}
      onKeyDown={onEnter}
    />
  );
}

export default SearchInput;
