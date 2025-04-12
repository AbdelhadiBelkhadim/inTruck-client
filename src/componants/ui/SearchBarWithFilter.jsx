import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Search, Filter, ChevronDown } from 'lucide-react';

const SearchBarWithFilter = ({ 
  searchPlaceholder = 'Search',
  onSearch,
  onFilterChange 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filterOptions = [
    { value: 'all', label: 'All' },
    { value: 'id', label: 'ID' },
    { value: 'destination', label: 'Destination' },
    { value: 'state', label: 'State' },
    { value: 'fullCoverage', label: 'Full Coverage' }
  ];

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch?.(value, selectedFilter);
  };

  const handleSearchClick = () => {
    onSearch?.(searchTerm, selectedFilter);
  };

  const handleFilterSelect = (filter) => {
    setSelectedFilter(filter);
    setShowFilterMenu(false);
    onFilterChange?.(filter);
  };

  return (
    <div className="flex gap-2 mb-8">
      <div className="flex-1 relative">
        <input
          type="text"
          placeholder={searchPlaceholder}
          aria-label="Search input"
          value={searchTerm}
          onChange={handleSearchChange}
          onKeyPress={(e) => e.key === 'Enter' && handleSearchClick()}
          className="w-full py-3 px-4 text-primary bg-white font-semibold border border-gray-300 rounded-md focus:outline-none"
        />
        <button 
          className="absolute right-3 top-1/2 -translate-y-1/2 text-primary"
          aria-label="Search"
          onClick={handleSearchClick}
        >
          <Search className="w-5 h-5" />
        </button>
      </div>
      
      <div className="relative">
        <button 
          className="bg-primary text-white p-3 rounded-md flex items-center gap-2"
          aria-label="Filter"
          onClick={() => setShowFilterMenu(!showFilterMenu)}
        >
          <Filter className="w-5 h-5" />
          <ChevronDown className="w-4 h-4" />
        </button>
        
        {showFilterMenu && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
            {filterOptions.map((option) => (
              <button
                key={option.value}
                className={`block w-full text-left px-4 py-2 text-sm ${
                  selectedFilter === option.value 
                    ? 'bg-primary text-white' 
                    : 'text-dark hover:bg-gray-100'
                }`}
                onClick={() => handleFilterSelect(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

SearchBarWithFilter.propTypes = {
  searchPlaceholder: PropTypes.string,
  onSearch: PropTypes.func,
  onFilterChange: PropTypes.func
};

export default SearchBarWithFilter;
