import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Search } from 'lucide-react';

const SearchBar = ({ searchPlaceholder = 'Search', onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch?.(value);
  };

  const handleSearchClick = () => {
    onSearch?.(searchTerm);
  };

  return (
    <div className="flex-1 relative">
      <input
        type="text"
        placeholder={searchPlaceholder}
        aria-label="Search input"
        value={searchTerm}
        onChange={handleSearchChange}
        onKeyPress={(e) => e.key === 'Enter' && handleSearchClick()}
        className="w-full py-3 px-4 placeholder:text-[#00B4D8] text-primary bg-white font-semibold border border-gray-300 rounded-md focus:outline-none"
      />
      <button
        className="absolute right-3 top-1/2 -translate-y-1/2 text-primary"
        aria-label="Search"
        onClick={handleSearchClick}
      >
        <Search className="w-5 h-5" />
      </button>
    </div>
  );
};

SearchBar.propTypes = {
  searchPlaceholder: PropTypes.string,
  onSearch: PropTypes.func,
};

export default SearchBar;