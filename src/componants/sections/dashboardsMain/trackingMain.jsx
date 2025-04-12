import React, { useState, useEffect } from 'react';
import Table from '../../ui/Table';
import SearchBarWithFilter from '../../ui/SearchBarWithFilter';

const TrackingMain = () => {
  const [originalData] = useState([
    {id: '#DJFJSAD526SAD9', destination: 'Tanger', state: 'On the road', totalCoverage: '15,000'},
    {id: '#DJFJSAD526SAD8', destination: 'Casablanca', state: 'Delivered', totalCoverage: '12,500'},
    {id: '#DJFJSAD526SAD7', destination: 'Rabat', state: 'Processing', totalCoverage: '8,000'},
    {id: '#DJFJSAD526SAD6', destination: 'Marrakech', state: 'On the road', totalCoverage: '18,000'},
    {id: '#DJFJSAD526SAD5', destination: 'Agadir', state: 'Processing', totalCoverage: '9,500'},
    {id: '#DJFJSAD526SAD4', destination: 'Fes', state: 'Delivered', totalCoverage: '11,000'},
    {id: '#DJFJSAD526SAD3', destination: 'Tangier', state: 'On the road', totalCoverage: '14,000'},
    {id: '#DJFJSAD526SAD2', destination: 'Meknes', state: 'Processing', totalCoverage: '7,500'},
    {id: '#DJFJSAD526SAD1', destination: 'Oujda', state: 'Delivered', totalCoverage: '10,000'},
    {id: '#DJFJSAD526SAD9', destination: 'Tanger', state: 'On the road', totalCoverage: '15,000'},
    {id: '#DJFJSAD526SAD8', destination: 'Casablanca', state: 'Delivered', totalCoverage: '12,500'},
    {id: '#DJFJSAD526SAD7', destination: 'Rabat', state: 'Processing', totalCoverage: '8,000'},
    {id: '#DJFJSAD526SAD6', destination: 'Marrakech', state: 'On the road', totalCoverage: '18,000'},
    {id: '#DJFJSAD526SAD5', destination: 'Agadir', state: 'Processing', totalCoverage: '9,500'},
    {id: '#DJFJSAD526SAD4', destination: 'Fes', state: 'Delivered', totalCoverage: '11,000'},
    {id: '#DJFJSAD526SAD3', destination: 'Tangier', state: 'On the road', totalCoverage: '14,000'},
    {id: '#DJFJSAD526SAD2', destination: 'Meknes', state: 'Processing', totalCoverage: '7,500'},
    {id: '#DJFJSAD526SAD1', destination: 'dakhla', state: 'Delivered', totalCoverage: '10,000'},
  ]);

  const [tableData, setTableData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterState, setFilterState] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    setTableData(originalData);
  }, [originalData]);

  useEffect(() => {
    let filtered = [...originalData];
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.destination.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply state filter
    if (filterState !== 'all') {
      filtered = filtered.filter(item => item.state === filterState);
    }
    
    setTableData(filtered);
  }, [searchTerm, filterState, originalData]);

  const handlePageChange = (page) => {
    console.log('Page change requested:', page);
    setCurrentPage(page);
    console.log('Current page after set:', page);
  };

  // Calculate paginated data
  const paginatedData = tableData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  console.log('Paginating data:', {
    currentPage,
    itemsPerPage,
    start: (currentPage - 1) * itemsPerPage,
    end: currentPage * itemsPerPage,
    totalItems: tableData.length
  });

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (state) => {
    setFilterState(state);
  };

  return (
    <div className="p-4">
      <SearchBarWithFilter 
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
        filterOptions={[
          { value: 'all', label: 'All States' },
          { value: 'On the road', label: 'On the road' },
          { value: 'Delivered', label: 'Delivered' },
          { value: 'Processing', label: 'Processing' }
        ]}
      />
      <Table 
        data={paginatedData}
        onPageChange={handlePageChange}
        totalItems={tableData.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
      />
    </div>
  );
};

export default TrackingMain;
