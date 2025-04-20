import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Filter, ChevronDown } from 'lucide-react';

const FilterMenu = ({ filterOptions = [], onFilterChange }) => {
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(filterOptions[0]?.value || 'all');

  const handleFilterSelect = (filter) => {
    setSelectedFilter(filter);
    setShowFilterMenu(false);
    onFilterChange?.(filter);
  };

  return (
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
  );
};

FilterMenu.propTypes = {
  filterOptions: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  onFilterChange: PropTypes.func,
};

export default FilterMenu;