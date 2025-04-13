import React from 'react';
import Header from '../componants/ui/DashboardHeader';
import NewOrderDetailsPackageMain from '../componants/ui/NewOrderDetailsPackageMain';

const NewOrderDetailsPackage = () => {
  return (
    <div className="bg-[#F2F2F2] w-full min-h-screen container mx-auto">
      <Header />
      <NewOrderDetailsPackageMain />
    </div>
  );
};

export default NewOrderDetailsPackage;