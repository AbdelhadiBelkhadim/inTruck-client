import React, { useState } from 'react';
import { MoreVertical } from "lucide-react";
import Pagination from './Pagination';
import MoreDetails from './MoreDetails';

const Table = ({ 
  data = [], 
  itemsPerPage = 6, 
  currentPage = 1,
  totalItems = 0,
  onPageChange 
}) => {
  const [showMoreDetails, setShowMoreDetails] = useState(false);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);

  const handleMoreClick = (index) => {
    setSelectedRowIndex(index);
    setShowMoreDetails(true);
  };

  const handleCloseMoreDetails = () => {
    setShowMoreDetails(false);
    setSelectedRowIndex(null);
  };

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-[12px] md:text-[14px] text-primary h-16">
            <th className="w-[25%] text-center">ID</th>
            <th className="w-[20%] px-2 py-4 text-center">DESTINATION</th>
            <th className="w-[25%] px-2 py-4 text-center">STATE</th>
            <th className="w-[20%] px-2 py-4 truncate">Total Coverage</th>
            <th className="w-[10%] px-2 py-4"></th>
          </tr>
        </thead>

        <tbody className="bg-white p-2">
          {data.map((item, index) => (
            <tr key={index} className="border-t border-gray-200 hover:bg-primary cursor-pointer hover:text-white text-[10px] md:text-[12px] ">
              <td className="py-3 text-center font-semibold truncate">{item.id}</td>
              <td className="py-3 text-center text-thin truncate">{item.destination}</td>
              <td className="text-center px-2">
                <span
                  className="text-white w-[156px] p-1 md:p-2 px-6 rounded-sm truncate inline-block max-w-full"
                  style={
                    item.state === 'Processing' ? 
                      { backgroundColor: '#F1B966', color: 'black' } : 
                    item.state === 'Delivered' ?
                      { backgroundColor: 'green', color: 'white' } :
                      { backgroundColor: '#00B4D8' }
                  }
                >
                  {item.state}
                </span>
              </td>
              <td className="py-3 text-center text-dark truncate">
                ${item.price}<span className="text-gray-400 text-xs"></span>
              </td>
              <td className="py-3 text-center">
                <button className="mx-auto" onClick={() => handleMoreClick(index)}>
                  <MoreVertical className="w-4 h-4 md:w-5 md:h-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {totalItems > itemsPerPage && (
        <div className="mt-4">
            <Pagination 
              currentPage={currentPage}
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              onPageChange={onPageChange}
            />
        </div>
      )}
      {showMoreDetails && <MoreDetails onClose={handleCloseMoreDetails} />}
    </div>
  );
};

export default Table;
