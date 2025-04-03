import React from 'react'
import { Package } from 'lucide-react';

const LastOrders = () => {
    const orders = [
      {
        id: "#DJFJSAD526SAD9",
        from: "Agadir, Morocco",
        to: "Dakkar, Senegal",
        weight: "12",
        status: "On the road",
        statusColor: "bg-primary",
      },
      {
        id: "#DJFJSAD526SAD9",
        from: "Agadir, Morocco",
        to: "Dakhla, Morocco",
        weight: "20",
        status: "Delivered",
        statusColor: "bg-secondaire",
      },
      {
        id: "#DJFJSAD526SAD9",
        from: "Agadir, Morocco",
        to: "Tanger, Morocco",
        weight: "28",
        status: "On the road",
        statusColor: "bg-primary",
      },
    ];

    return (
      <div className="mb-6 lg:col-span-2 lg:row-span-3 md:col-span-2">
        <h2 className="text-2xl font-bold text-indigo-800 mb-4">Last Orders</h2>
        
        <div className="space-y-3">
          {orders.map((order, index) => (
            <div key={index} className="bg-white p-1 md:p-4 rounded-xl flex items-center justify-between oredr-none md:order-last lg:order-none">
              <div className="flex justify-between item-center">
                <div className="p-2 bg-gray-200 rounded-lg mr-3 flex items-center justify-center">
                  <Package size={20} />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-[14px] md:text-[16px]">{order.id}</p>
                  <div className="flex items-center text-secondaire text-[10px] md:text-sm">
                    <span>{order.from}</span>
                    <span className="mx-1 md:mx-2">→</span>
                    <span>{order.to}</span>
                  </div>
                </div>
              </div>
              <div className="md:flex item-center justify-between">
                <div className="text-xl md:text-3xl font-bold text-indigo-800 mr-8">
                  {order.weight}
                  <span className="text-[12px] md:text-[15px] text-secondaire">t</span>
                </div>
                <div className="flex items-center">
                  <div className={`w-2 md:w-3 h-2 md:h-3 ${order.statusColor} rounded-full mr-1 md:mr-2`}></div>
                  <span className="text-[10px] md:text-sm">{order.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
}

export default LastOrders