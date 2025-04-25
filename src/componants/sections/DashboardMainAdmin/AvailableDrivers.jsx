import React, { useState } from 'react';
import { ArrowRight } from "lucide-react";
import Pagination from "../../ui/Pagination";

const AvailableDrivers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const defaultData = [
    {
        id: 1,
        driverName: "Ahmed El Amrani",
        phoneNumber: "+212612345676",
        truckType: "Rov_Truck (77)",
        status: "Available",
        location: "Casablanca",
        assignedDelivery: null,
      },
      {
        id: 2,
        driverName: "Ahmed El Amrani",
        phoneNumber: "+212612345676",
        truckType: "Refrigerated",
        status: "Available",
        location: "Marrakech",
        assignedDelivery: "Agadir",
      },
      {
        id: 3,
        driverName: "Karim Bakkali",
        phoneNumber: "+212612345676",
        truckType: "Flatbed",
        status: "Available",
        location: "Rabat",
        assignedDelivery: null,
      },
      {
        id: 4,
        driverName: "Karim Bakkali",
        phoneNumber: "+212612345676",
        truckType: "Curtain Side",
        status: "Available",
        location: "Tanger",
        assignedDelivery: null,
      },
      {
        id: 5,
        driverName: "Karim Bakkali",
        phoneNumber: "+212612345676",
        truckType: "Curtain Side",
        status: "Available",
        location: "Agadir",
        assignedDelivery: null,
      },
      {
        id: 6,
        driverName: "Karim Bakkali",
        phoneNumber: "+212612345676",
        truckType: "Curtain Side",
        status: "Available",
        location: "Mekness",
        assignedDelivery: null,
      }
  ];

  // Pagination calculations
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = defaultData.slice(startIndex, endIndex);

  return (
    <div>
      <h1 className='text-xl lg:text-4xl font-bold text-primary mb-10'>Avilable Drivers</h1>
      <div className="overflow-x-auto ">
        <table className="min-w-[800px] md:min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-primary w-[15%]">Driver</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-primary w-[15%]">Phone</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-primary w-[15%] hidden md:table-cell">Truck Type</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-primary w-[12%]">Status</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-primary w-[12%] hidden sm:table-cell">Location</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-primary w-[18%]">Assigned Delivery</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-primary w-[13%]">Action</th>
            </tr>
          </thead>
          
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedData.map((driver) => (
              <tr key={driver.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3.5 text-sm text-gray-900 whitespace-nowrap">
                  {driver.driverName}
                </td>
                <td className="px-4 py-3.5 text-sm text-gray-600">{driver.phoneNumber}</td>
                <td className="px-4 py-3.5 text-sm text-gray-600 hidden md:table-cell">
                  {driver.truckType}
                </td>
                <td className="px-4 py-3.5">
                  <span className="inline-flex items-center p-2 rounded-md text-xs font-medium bg-green-900 text-white">
                    {driver.status}
                  </span>
                </td>
                <td className="px-4 py-3.5 text-sm text-gray-600 ">
                  <div className="flex items-center gap-2">
                    {driver.location}
                    <ArrowRight className="h-4 w-4 text-primary" />
                  </div>
                </td>
                <td className="p-2 hidden sm:table-cell">
                      <div className="flex items-center">
                          {driver.assignedDelivery ? (
                          <span className="text-sm font-medium text-secondaire">
                              {driver.assignedDelivery}
                          </span>
                          ) : (
                          <input
                              type="text"
                              placeholder="Assigned Delivery"
                              className="p-2  border border-primary rounded-md 
                                      placeholder:text-secondaire placeholder:text-[10px] focus:outline-none 
                                      text-sm"
                          />
                          )}
                      </div>
                </td>
                <td className="px-2 py-3.5">
                  <div className="flex items-center">
                    <div className={`h-3 w-3 rounded-full mr-2 ${driver.isAssigned ? 'bg-green-500' : 'bg-gray-300'}`} />
                    <span className="text-sm text-gray-700 hidden md:inline">Assign</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination added here - outside scroll container */}
      {defaultData.length > itemsPerPage && (
        <div className="mt-4">
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

export default AvailableDrivers;