import React, { useState, useEffect } from 'react';
import SearchBar from '../../ui/SearchBar';
import TableAdmin from '../../ui/TableAdmin';
import Pagination from '../../ui/Pagination';

const CancelledAdmin = () => {
  const [originalData] = useState([
    {
      company: "Ste GoodWay",
      id: "#CNCLD525SAD9",
      destination: "Tanger",
      state: "Cancelled",
      totalCoverage: 15000.00
    },
    {
      company: "Med Logistics",
      id: "#CNCLD341LMN7",
      destination: "Barcelona",
      state: "Cancelled",
      totalCoverage: 22000.50
    },
    {
      company: "Africa Trans",
      id: "#CNCLD672GHJ4",
      destination: "Casablanca",
      state: "Cancelled",
      totalCoverage: 18500.00
    },
    {
      company: "Euro Cargo",
      id: "#CNCLD789TZP6",
      destination: "Marseille",
      state: "Cancelled",
      totalCoverage: 13200.75
    },
    {
      company: "Ste GoodWay",
      id: "#CNCLD341KLP9",
      destination: "Valencia",
      state: "Cancelled",
      totalCoverage: 21000.00
    },
    {
      company: "Sahara Shipments",
      id: "#CNCLD852MNB3",
      destination: "Algiers",
      state: "Cancelled",
      totalCoverage: 16500.50
    },
    {
      company: "Coastal Logistics",
      id: "#CNCLD456VFR7",
      destination: "Malaga",
      state: "Cancelled",
      totalCoverage: 14200.00
    },
    {
      company: "Ste GoodWay",
      id: "#CNCLD526SAD2",
      destination: "Genoa",
      state: "Cancelled",
      totalCoverage: 19500.00
    }
  ]);

  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const filtered = originalData.filter(item =>
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
      <h1 className='text-xl lg:text-4xl font-bold text-primary mb-10'>Cancelled</h1>

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

export default CancelledAdmin;