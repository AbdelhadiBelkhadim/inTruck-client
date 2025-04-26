import React, { useState } from 'react';
import Pagination from "../../ui/Pagination";

const Revenue = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const defaultData = [
    {
      id: 1,
      invoice: "INV-2201",
      clientName: "Fatima Transports",
      deliveryId: "DEL-223",
      date: "2025-04-14",
      amount: "3,200.00",
      paymentStatus: "Paid",
      paymentMethod: "Bank Transfer"
    },
    {
      id: 2,
      invoice: "INV-2202",
      clientName: "Atlas Group",
      deliveryId: "DEL-223",
      date: "2025-04-14",
      amount: "5,200.00",
      paymentStatus: "Pending",
      paymentMethod: "Credit Card"
    },
    {
      id: 3,
      invoice: "INV-2203",
      clientName: "El Bahja SARL",
      deliveryId: "DEL-223",
      date: "2025-04-14",
      amount: "8,000.00",
      paymentStatus: "Paid",
      paymentMethod: "Cash"
    },
    {
      id: 4,
      invoice: "INV-2204",
      clientName: "BBM SARL",
      deliveryId: "DEL-223",
      date: "2025-04-14",
      amount: "2,900.00",
      paymentStatus: "Paid",
      paymentMethod: "Bank Transfer"
    },
    {
      id: 5,
      invoice: "INV-2205",
      clientName: "Logistic Pro",
      deliveryId: "DEL-223",
      date: "2025-04-14",
      amount: "3,241.00",
      paymentStatus: "Paid",
      paymentMethod: "Bank Transfer"
    },
    {
      id: 6,
      invoice: "INV-2206",
      clientName: "Logistic MA",
      deliveryId: "DEL-223",
      date: "2025-04-14",
      amount: "10,000.00",
      paymentStatus: "Paid",
      paymentMethod: "Cash"
    }
  ];

  // Pagination calculations
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = defaultData.slice(startIndex, endIndex);

  const getStatusStyle = (status) => {
    return status === "Paid" ? "bg-[#20b950]" : "bg-[#ff0000]";
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className='text-xl lg:text-4xl font-bold text-primary mb-4'>Revenue</h1>
      
      <div className="overflow-x-auto">
        <table className="min-w-[1000px] md:min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-primary">Invoice</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-primary">Client Name</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-primary">Delivery ID</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-primary">Date</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-primary">Amount (MAD)</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-primary">Payment Status</th>
              <th className="px-4 py-3 text-center text-sm font-medium text-primary">Payment Method</th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedData.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3.5 text-sm text-gray-900 whitespace-nowrap">{item.invoice}</td>
                <td className="px-4 py-3.5 text-sm text-gray-600">{item.clientName}</td>
                <td className="px-4 py-3.5 text-sm text-gray-600">{item.deliveryId}</td>
                <td className="px-4 py-3.5 text-sm text-gray-600">{item.date}</td>
                <td className="px-4 py-3.5 text-sm text-gray-600">{item.amount}</td>
                <td className="px-4 py-3.5">
                  <span className={`inline-flex items-center justify-center w-[100px] px-3 py-1 rounded-md text-xs font-normal text-white ${getStatusStyle(item.paymentStatus)}`}>
                    {item.paymentStatus}
                  </span>
                </td>
                <td className="px-4 py-3.5 text-sm text-gray-600 text-center">{item.paymentMethod}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {defaultData.length > itemsPerPage && (
  <div className="flex justify-center mt-4 w-full">
    <Pagination
      currentPage={currentPage}
      totalItems={defaultData.length}
      itemsPerPage={itemsPerPage}
      onPageChange={setCurrentPage}
    />
  </div>
)}
    </div>
  );
};

export default Revenue;