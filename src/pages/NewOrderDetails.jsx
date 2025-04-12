import React from 'react';
import Header from '../componants/ui/Header';
import NewOrderDetailsMain from '../componants/ui/NewOrderDetailsMain';

const NewOrderDetails = () => {
  return (
    <div className="bg-[#F2F2F2] w-full min-h-screen container mx-auto">
      <Header />
      <NewOrderDetailsMain />
    </div>
  );
};

export default NewOrderDetails;