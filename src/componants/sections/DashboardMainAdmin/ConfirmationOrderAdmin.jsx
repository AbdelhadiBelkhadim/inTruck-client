import React, { useState } from 'react';
import { ArrowRight, FileText } from "lucide-react";
import Pagination from "../../ui/Pagination";

const ConfirmationOrderAdmin = ({ data = [] }) => {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  // Default dataset
  const defaultData = [
    {
      company: "Ste GoodWay",
      id: "#DJFJSAD526SAD9",
      origin: "Agadir, Morocco",
      destination: "Tanger, Morocco",
      weight: 12,
      price: "$ 15,000.00"
    },
    {
      company: "HAMZA AMJAD",
      id: "#FGHJK4598DFG2",
      origin: "Casablanca, Morocco",
      destination: "Marrakech, Morocco",
      weight: 8,
      price: "$ 8,500.00"
    },
    {
      company: "North Africa Trans",
      id: "#QWEASD789123",
      origin: "Rabat, Morocco",
      destination: "Fes, Morocco",
      weight: 15,
      price: "$ 18,200.00"
    },
    {
      company: "Atlas Logistics",
      id: "#TYUIOP456852",
      origin: "Oujda, Morocco",
      destination: "Meknes, Morocco",
      weight: 10,
      price: "$ 12,750.00"
    },
    {
      company: "Sahara Shippers",
      id: "#BNMKLO963258",
      origin: "Dakhla, Morocco",
      destination: "Laayoune, Morocco",
      weight: 20,
      price: "$ 22,000.00"
    },
    {
      company: "Mediterranean Trans",
      id: "#7VB2NM341KLP9",
      origin: "Valencia, Spain",
      destination: "Tangier, Morocco",
      weight: 18,
      price: "$ 19,500.00"
    },
    {
      company: "EuroAfrica Logistics",
      id: "#2WS8XC456VFR7",
      origin: "Malaga, Spain",
      destination: "Casablanca, Morocco",
      weight: 14,
      price: "$ 16,800.00"
    }
  ];

  // Data handling
  const displayData = data.length > 0 ? data : defaultData;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = displayData.slice(startIndex, endIndex);

  return (
    <div>
      <h1 className='text-xl lg:text-4xl font-bold text-primary mb-8'>Confirmation Orders</h1>
      
      <div className="w-full overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-[12px] md:text-[14px] text-primary h-16">
              <th className="text-left py-6 px-4">Company</th>
              <th className="text-left py-6 px-4">ID</th>
              <th className="text-left py-6 px-4">Origin</th>
              <th className="text-left py-6 px-4"></th>
              <th className="text-left py-6 px-4">Destination</th>
              <th className="text-center py-6 px-4">Weight</th>
              <th className="text-right py-6 px-4">Price</th>
              <th className="text-center py-6 px-4">Actions</th>
            </tr>
          </thead>

          <tbody className="bg-white p-2">
            {paginatedData.map((item, index) => (
              <tr key={index} className="border-b hover:bg-gray-50 cursor-pointer">
                <td className="py-6 px-4 text-left font-medium truncate">
                  {item.company}
                </td>
                <td className="py-6 px-4 text-left text-gray-700 truncate">
                  {item.id}
                </td>
                <td className="py-6 px-4 text-left text-gray-700 truncate">
                  {item.origin}
                </td>
                <td className="py-6 px-4 text-center">
                  <ArrowRight className="w-5 h-5 text-[#2e3192] inline-block" />
                </td>
                <td className="py-6 px-4 text-left text-gray-700 truncate">
                  {item.destination}
                </td>
                <td className="py-6 px-4 text-center">
                  <span className="text-[#2e3192] font-bold text-2xl">
                    {item.weight}
                  </span>
                  <span className="text-gray-500 text-sm"> t</span>
                </td>
                <td className="py-6 px-4 text-right text-gray-700">
                  {item.price}
                </td>
                <td className="py-6 px-4 text-center">
                  <div className="flex gap-2 justify-end">
                    <button className="p-2 text-[#fb3748] border border-[#fb3748] rounded-md hover:bg-red-50 transition-colors">
                      <FileText className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-[#20b950] border border-[#20b950] rounded-md hover:bg-green-50 transition-colors">
                      <FileText className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        
      </div>
      {displayData.length > itemsPerPage && (
          <div className="mt-6 pb-4">
            <Pagination 
              currentPage={currentPage}
              totalItems={displayData.length}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
    </div>
  );
};

export default ConfirmationOrderAdmin;