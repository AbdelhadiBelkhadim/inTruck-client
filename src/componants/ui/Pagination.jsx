import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ 
  totalItems = 0, 
  itemsPerPage = 10,
  currentPage = 1,
  onPageChange
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [activePage, setActivePage] = useState(currentPage);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setActivePage(page);
    onPageChange?.(page);
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, activePage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`w-10 h-10 flex items-center justify-center rounded-md 
            ${i === activePage ? 'bg-primary text-white' : 'text-dark hover:bg-gray-100'}`}
        >
          {i}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="flex flex-col items-center gap-4 mt-8">
      <div className="flex justify-center items-center gap-2">
        <button 
          onClick={() => handlePageChange(activePage - 1)}
          disabled={activePage === 1}
          className="p-2 text-primary disabled:opacity-50"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        
        {renderPageNumbers()}
        
        <button 
          onClick={() => handlePageChange(activePage + 1)}
          disabled={activePage === totalPages}
          className="p-2 text-primary disabled:opacity-50"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
      <div className="text-sm text-gray-500">
        Page {activePage} of {totalPages}
      </div>
    </div>
  );
};

export default Pagination;
