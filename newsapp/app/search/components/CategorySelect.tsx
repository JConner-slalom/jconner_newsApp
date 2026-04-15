import React from "react";

interface CategorySelectProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  categories: string[];
}


function CategorySelect({ value, onChange, categories }: CategorySelectProps) {
  return (
    <select
      className="border border-zinc-300 dark:border-zinc-700 rounded px-4 py-2 bg-white dark:bg-zinc-900"
      value={value}
      onChange={onChange}
    >
      {categories.map((category) => (
        <option key={category} value={category}>{category}</option>
      ))}
    </select>
  );
}

export default CategorySelect;
