import React, { useState, useEffect } from 'react';
import SearchBar from '../../ui/SearchBar';
import TableAdmin from '../../ui/TableAdmin';
import Pagination from '../../ui/Pagination';

const DeliveriesAdmin = () => {
  const [originalData] = useState([
    {
      company: "Ste GoodWay",
      id: '#DJFJSAD526SAD9',
      destination: 'Tanger',
      state: 'Delivered',
      totalCoverage: 15000.00
    },
    {
        company: "Ste GoodWay",
        id: '#DJFJSAD526SAD9',
        destination: 'Tanger',
        state: 'Delivered',
        totalCoverage: 15000.00
      },
    {
      company: "HAMZA AJIJAO",
      id: '#DJFJSAD526SAD7',
      destination: 'Rabat',
      state: 'Delivered',
      totalCoverage: 8000.00
    },
    {
      company: "Africa Logistics",
      id: '#DJFJSAD526SAD6',
      destination: 'Marrakech',
      state: 'Delivered',
      totalCoverage: 18000.00
    },
    {
      company: "Mediterranean Trans",
      id: '#DJFJSAD526SAD5',
      destination: 'Agadir',
      state: 'Delivered',
      totalCoverage: 9500.00
    },
    {
      company: "EuroAfrica Logistics",
      id: '#DJFJSAD526SAD3',
      destination: 'Tangier',
      state: 'Delivered',
      totalCoverage: 14000.00
    },
    {
      company: "Sahara Transport",
      id: '#DJFJSAD526SAD2',
      destination: 'Meknes',
      state: 'Delivered',
      totalCoverage: 7500.00
    },
  ]);

  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    let filtered = originalData.filter(item =>
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.destination.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  }, [searchTerm, originalData]);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <h1 className='text-xl lg:text-4xl font-bold text-primary mb-10'>Deliveries</h1>
      <div className='mb-8'>
        <SearchBar onSearch={setSearchTerm} />
      </div>

      <TableAdmin 
        data={paginatedData}
        totalItems={filteredData.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      {filteredData.length > itemsPerPage && (
        <div className="mt-6">
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

export default DeliveriesAdmin;