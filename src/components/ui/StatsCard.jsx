import React from 'react';
import { ArrowRight } from 'lucide-react';

const StatsCard = ({ icon: Icon, value, title, currency }) => {
  return (
    <div className="bg-primary text-white p-4 md:p-12 rounded-lg relative">
      <div className="flex items-center mb-1">
        {Icon && <Icon size={30} className="mr-2 md:size-15" />}
        <div className="flex items-center space-x-4">
          <span className="text-2xl md:text-4xl font-semibold">
            {value.toLocaleString()}
          </span>
          {currency && <span className="text-xl lg:text-2xl font-semibold">{currency}</span>}
        </div>
      </div>
      <div className="text-[18px] md:text-[20px] lg:text-[24px]">
        {title}
      </div>
      <div className="absolute bottom-2 right-2">
        <ArrowRight size={20} className="md:size-10" />
      </div>
    </div>
  );
};

export default StatsCard;