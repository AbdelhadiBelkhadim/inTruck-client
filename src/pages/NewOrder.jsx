import React, { useState } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import NewOrderHeader from '../componants/ui/NewOrderHead.jsx'; // Fixed typo in 'components'
import NewOrderMain from '../componants/sections/newOrderSection/NewOrderMain.jsx'; // Fixed typo in 'components'
import NewOrderDetailsMain from '../componants/sections/newOrderSection/NewOrderDetailsMain.jsx'; // Fixed typo in 'components'
import NewOrderDetailsPackageMain from '../componants/sections/newOrderSection/NewOrderDetailsPackageMain'; // Fixed typo in 'components'
import NewOrderFullCoverageMain from '../componants/sections/newOrderSection/NewOrderFullCoverageMain'; // Fixed typo in 'components'
import PickUpLocationMain from '../componants/sections/newOrderSection/PickUpLocationMain'; // Fixed typo in 'components'
import WhereDelivery from '../componants/sections/newOrderSection/WhereDelivered.jsx'; // Fixed typo in 'components'
import SetUpPaymentMain from '../componants/sections/newOrderSection/SetupPayment.jsx'; // Fixed typo in 'components'
import CheckingDone from '../componants/sections/newOrderSection/CheckingDoneMain'; // Fixed typo in 'components'
import CheckingOrderMain from '../componants/sections/newOrderSection/CheckingOrderMain'; // Fixed typo in 'components'
import NextButton from '../componants/ui/NextButton'; // Fixed typo in 'components'

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
        <NextButton 
          to={`/new-order/${steps[getCurrentStepIndex() + 1].path}`} 
          onClick={(e) => {
            e.preventDefault(); // Prevent default link behavior
            handleNext();
          }} 
        />
      )}
    </div>
  );
};

export default NewOrder;