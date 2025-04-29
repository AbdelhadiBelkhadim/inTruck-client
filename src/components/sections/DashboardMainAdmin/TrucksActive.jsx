import React, { useState } from 'react';
import { ArrowRight } from "lucide-react";
import Pagination from "../../ui/Pagination";

const TrucksActive = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const defaultData = [
    {
      id: 1,
      truckId: "TR-001",
      type: "Box Truck (7T)",
      driverName: "Ahmed El Amrani",
      status: "On the road",
      currentLocation: "Casablanca",
      destination: "Marrakech",
      lastUpdate: "5 min ago"
    },
    {
      id: 2,
      truckId: "TR-005",
      type: "Flatbed",
      driverName: "Ahmed El Amrani",
      status: "Loading",
      currentLocation: "Marrakech",
      destination: "Casablanca",
      lastUpdate: "2 min ago"
    },
    {
      id: 3,
      truckId: "TR-100",
      type: "Refrigerated",
      driverName: "Karim Bakkali",
      status: "Canceled",
      currentLocation: "Rabat",
      destination: "Tanger",
      lastUpdate: "20 min ago"
    },
    {
      id: 4,
      truckId: "TR-20",
      type: "Curtain Side",
      driverName: "Karim Bakkali",
      status: "Loading",
      currentLocation: "Tanger",
      destination: "Rabat",
      lastUpdate: "1 min ago"
    },
    {
      id: 5,
      truckId: "TR-23",
      type: "Refrigerated",
      driverName: "Karim Bakkali",
      status: "Loading",
      currentLocation: "Agadir",
      destination: "Mekness",
      lastUpdate: "26 min ago"
    },
    {
      id: 6,
      truckId: "TR-43",
      type: "Box Truck (3T)",
      driverName: "Karim Bakkali",
      status: "On the road",
      currentLocation: "Mekness",
      destination: "Agadir",
      lastUpdate: "40 min ago"
    }
  ];

  // Pagination calculations
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = defaultData.slice(startIndex, endIndex);

  const getStatusStyle = (status) => {
    switch(status) {
      case 'On the road':
        return 'bg-[#2e3192] text-white';
      case 'Loading':
        return 'bg-[#f1b966] text-white';
      case 'Canceled':
        return 'bg-[#ff0000] text-white';
      default:
        return 'bg-gray-200 text-gray-900';
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className='text-xl lg:text-4xl font-bold text-primary mb-4'>Trucks Active</h1>
      
      <div className="overflow-x-auto ">
        <table className="min-w-[1000px] md:min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-primary">Truck ID</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-primary">Type</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-primary">Driver Name</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-primary">Status</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-primary">Current Location</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-primary"></th>
              <th className="px-4 py-3 text-left text-sm font-medium text-primary">Destination</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-primary">Last Update</th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedData.map((truck) => (
              <tr key={truck.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3.5 text-sm text-gray-900 whitespace-nowrap">{truck.truckId}</td>
                <td className="px-4 py-3.5 text-sm text-gray-600">{truck.type}</td>
                <td className="px-4 py-3.5 text-sm text-gray-600">{truck.driverName}</td>
                <td className="px-4 py-3.5">
  <span className={`inline-flex items-center justify-center w-[100px] px-3 py-1 rounded-md text-xs font-normal ${getStatusStyle(truck.status)}`}>
    {truck.status}
  </span>
</td>
                <td className="px-4 py-3.5 text-sm text-gray-600">{truck.currentLocation}</td>
                <td className="px-4 py-3.5">
                  <ArrowRight className="w-4 h-4 text-[#2e3192]" />
                </td>
                <td className="px-4 py-3.5 text-sm text-gray-600">{truck.destination}</td>
                <td className="px-4 py-3.5 text-sm text-gray-600">{truck.lastUpdate}</td>
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

export default TrucksActive;