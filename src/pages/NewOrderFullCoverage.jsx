import React from 'react';
import Header from '../componants/ui/DashboardHeader';
import NewOrderFullCoverageMain from '../componants/ui/NewOrderFullCoverageMain';

const NewOrderFullCoverage = () => {
  return (
    <div className="bg-[#F2F2F2] w-full h-full container mx-auto">
      <Header />
      <NewOrderFullCoverageMain />
    </div>
  );
};

export default NewOrderFullCoverage;