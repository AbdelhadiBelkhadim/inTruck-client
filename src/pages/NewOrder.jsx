import React from 'react';
import Header from '../componants/ui/Header';
import NewOrderMain from '../componants/ui/NewOrderMain';

const NewOrder = () => {
  return (
    <div className="bg-[#F2F2F2] w-full h-full container mx-auto">
      <Header />
      <NewOrderMain />
    </div>
  );
};

export default NewOrder;