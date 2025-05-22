import React from "react";
type SearchBarProps = {
  search: string;
  handleChange: (value: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ search, handleChange }) => {
  return (
    <form className="flex-grow max-w-lg mx-4">
      <input
        type="search"
        placeholder="Search post..."
        className="w-80 px-3 py-2 rounded-full ring-1 text-white focus:outline-none focus:ring-1 focus:ring-green-500"
        value={search}
        onChange={(e) => handleChange(e.target.value)}
      />
    </form>
  );
};

export default SearchBar;
