import React, { useState } from 'react';
import SearchBar from '../../ui/SearchBar';
import FilterMenu from '../../ui/FilterMenu';
import TableAdmin from '../../ui/TableAdmin';
import Pagination from '../../ui/Pagination';

const TrackingAdmin = () => {
  const [tableData] = useState([
    {
      company: "Ste GoodWay",
      id: "#0JF5AD525SAD9",
      destination: "Tanger",
      state: "On the road",
      totalCoverage: 15000.00
    },
    {
      company: "HAMZA AJIJAO",
      id: "#8GH2KL341LMN7",
      destination: "Dakhla",
      state: "Loading",
      totalCoverage: 18000.50
    },
    {
      company: "Ste GoodWay",
      id: "#0JF5AD525SAD9",
      destination: "Benine",
      state: "On the road",
      totalCoverage: 20000.00
    },
    {
      company: "Trans Europe",
      id: "#5RT9YU672GHJ4",
      destination: "Barcelona",
      state: "Loading",
      totalCoverage: 22500.75
    },
    {
      company: "Ste GoodWay",
      id: "#0JF5AD525SAD9",
      destination: "Marseille",
      state: "Loading",
      totalCoverage: 17500.00
    },
    {
      company: "Africa Logistics",
      id: "#3QW4ER789TZP6",
      destination: "Casablanca",
      state: "On the road",
      totalCoverage: 13200.00
    },
    {
      company: "Ste GoodWay",
      id: "#0JF5AD525SAD9",
      destination: "Lisbon",
      state: "Loading",
      totalCoverage: 21000.50
    },
    {
      company: "Mediterranean Trans",
      id: "#7VB2NM341KLP9",
      destination: "Valencia",
      state: "On the road",
      totalCoverage: 18500.00
    },
    {
      company: "Ste GoodWay",
      id: "#0JF5AD525SAD9",
      destination: "Genoa",
      state: "Loading",
      totalCoverage: 16500.75
    },
    {
      company: "Sahara Transport",
      id: "#9PL0KI852MNB3",
      destination: "Algiers",
      state: "On the road",
      totalCoverage: 14200.00
    },
    {
      company: "Ste GoodWay",
      id: "#0JF5AD525SAD9",
      destination: "Naples",
      state: "Loading",
      totalCoverage: 19500.00
    },
    {
      company: "EuroAfrica Logistics",
      id: "#2WS8XC456VFR7",
      destination: "Malaga",
      state: "On the road",
      totalCoverage: 12800.50
    }
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 6;

  // Corrected filter options to match actual state values
  const filterOptions = [
    { value: 'all', label: 'All States' },
    { value: 'Loading', label: 'Loading' },
    { value: 'On the road', label: 'On the Road' },
  ];

  // Fixed filtering logic
  const filteredData = tableData.filter(item => {
    const matchesSearch = item.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    if(selectedFilter === 'all') return matchesSearch;
    return matchesSearch && item.state === selectedFilter;
  });

  // Pagination calculations
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    setCurrentPage(1);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  return (
    <div>
      <h1 className='text-xl lg:text-4xl font-bold text-primary'>Tracking</h1>

      <div className='flex space-x-1 my-10 items-center'>
        <SearchBar onSearch={handleSearch} />
        <FilterMenu 
          filterOptions={filterOptions}
          onFilterChange={handleFilterChange}
        />
      </div>

      <TableAdmin 
        data={paginatedData}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={filteredData.length}
        onPageChange={setCurrentPage}
      />

      {filteredData.length > itemsPerPage && (
        <div className="mt-4">
          <Pagination 
            currentPage={currentPage}
            totalItems={filteredData.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
};

export default TrackingAdmin;