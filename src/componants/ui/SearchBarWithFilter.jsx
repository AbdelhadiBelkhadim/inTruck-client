import React from 'react';
import PropTypes from 'prop-types';
import SearchBar from './SearchBar';
import FilterMenu from './FilterMenu';

const SearchBarWithFilter = ({ 
  searchPlaceholder = 'Search',
  onSearch,
  onFilterChange,
  filterOptions = [
    { value: 'all', label: 'All' },
    { value: 'id', label: 'ID' },
    { value: 'destination', label: 'Destination' },
    { value: 'state', label: 'State' },
    { value: 'fullCoverage', label: 'Full Coverage' }
  ]
}) => {
  return (
    <div className="flex gap-2 mb-8">
      <SearchBar searchPlaceholder={searchPlaceholder} onSearch={onSearch} />
      <FilterMenu filterOptions={filterOptions} onFilterChange={onFilterChange} />
    </div>
  );
};

SearchBarWithFilter.propTypes = {
  searchPlaceholder: PropTypes.string,
  onSearch: PropTypes.func,
  onFilterChange: PropTypes.func,
  filterOptions: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
};

export default SearchBarWithFilter;
