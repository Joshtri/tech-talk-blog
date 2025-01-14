import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false); // Untuk efek fokus

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value); // Memanggil fungsi pencarian
  };

  return (
    <div className="flex justify-center my-6">
      <div className="relative flex items-center bg-white dark:bg-gray-800 shadow-md rounded-full w-full max-w-lg transition-all duration-300">
        {/* Ikon Pencarian */}
        <div className="flex items-center pl-4">
          <FaSearch
            className={`text-gray-400 dark:text-gray-300 transition-all duration-300 ${
              isFocused ? "text-blue-500 dark:text-blue-400" : ""
            }`}
          />
        </div>
        {/* Input */}
        <input
          type="text"
          className="flex-grow bg-transparent border-none focus:ring-0 focus:border-none focus:outline-none px-4 py-3 text-gray-700 placeholder-gray-400 dark:text-gray-200 dark:placeholder-gray-400"
          placeholder="Cari artikel di blog..."
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {/* Tombol Cari */}
        <button
          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 dark:from-blue-600 dark:to-blue-700 dark:hover:from-blue-700 dark:hover:to-blue-800 text-white px-6 py-2 rounded-full transition duration-300 shadow hover:shadow-lg focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 absolute right-0 mr-1"
          onClick={() => onSearch(searchTerm)}
        >
          Cari
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
