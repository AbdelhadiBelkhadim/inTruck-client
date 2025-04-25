import React, { useState } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import NewOrderHeader from '../componants/ui/NewOrderHeader';
import NewOrderMain from '../componants/ui/NewOrderMain';
import NewOrderDetailsMain from '../componants/ui/NewOrderDetailsMain';
import NewOrderDetailsPackageMain from '../componants/ui/NewOrderDetailsPackageMain';
import NewOrderFullCoverageMain from '../componants/ui/NewOrderFullCoverageMain';
import PickUpLocationMain from '../componants/ui/PickUpLocationMain';
import WhereDelivery from '../componants/ui/WhereDelivery';
import SetUpPaymentMain from '../componants/ui/SetupPaymentMain.jsx';
import CheckingDone from '../componants/ui/CheckingDoneMain';
import CheckingOrderMain from '../componants/ui/CheckingOrderMain';
import NextButton from '../componants/ui/NextButton';

const NewOrder = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Define the steps with their respective routes
  const steps = [
    { path: '', component: NewOrderMain },
    { path: 'details', component: NewOrderDetailsMain },
    { path: 'package', component: NewOrderDetailsPackageMain },
    { path: 'pickup', component: PickUpLocationMain },
    { path: 'delivery', component: WhereDelivery },
    { path: 'coverage', component: NewOrderFullCoverageMain },
    { path: 'payment', component: SetUpPaymentMain },
    { path: 'check', component: CheckingOrderMain },
    { path: 'done', component: CheckingDone },
  ];

  // Get current step index based on the current path
  const getCurrentStepIndex = () => {
    const currentPath = location.pathname.split('/').pop();
    const index = steps.findIndex(step => 
      step.path === currentPath || (currentPath === 'new-order' && step.path === '')
    );
    return index >= 0 ? index : 0;
  };

  // Add formData state to hold form inputs
  const [formData, setFormData] = useState({
    postcode: '',
    address: '',
    address2: '',
    city: '',
    contactName: '',
    contactPhone: '',
    receiverName: '',
    receiverPhone: '',
  });

  // handleChange function to update formData state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleNext = () => {
    const currentIndex = getCurrentStepIndex();
    if (currentIndex < steps.length - 1) {
      const nextPath = steps[currentIndex + 1].path;
      navigate(`/new-order/${nextPath}`);
    }
  };

  return (
    <div className="bg-[#F2F2F2] w-full h-full container mx-auto">
      <NewOrderHeader />
      <Routes>
        <Route path="" element={<NewOrderMain />} />
        <Route path="details" element={<NewOrderDetailsMain />} />
        <Route path="package" element={<NewOrderDetailsPackageMain />} />
        <Route path="pickup" element={<PickUpLocationMain formData={formData} handleChange={handleChange} />} />
        <Route path="delivery" element={<WhereDelivery formData={formData} handleChange={handleChange} />} />
        <Route path="coverage" element={<NewOrderFullCoverageMain />} />
        <Route path="payment" element={<SetUpPaymentMain />} />
        <Route path="check" element={<CheckingOrderMain />} />
        <Route path="done" element={<CheckingDone />} />
        <Route path="*" element={<Navigate to="" replace />} />
      </Routes>
      {getCurrentStepIndex() < steps.length - 1 && (
        <NextButton to={`/new-order/${steps[getCurrentStepIndex() + 1].path}`} onClick={handleNext} />
      )}
    </div>
  );
};

export default NewOrder;