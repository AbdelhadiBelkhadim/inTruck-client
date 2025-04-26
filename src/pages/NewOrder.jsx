import React, { useState } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate, Link } from 'react-router-dom';
import NewOrderHeader from '../componants/ui/NewOrderHead.jsx';
import NewOrderMain from '../componants/sections/newOrderSection/NewOrderMain.jsx';
import NewOrderDetailsMain from '../componants/sections/newOrderSection/NewOrderDetailsMain.jsx';
import NewOrderDetailsPackageMain from '../componants/sections/newOrderSection/NewOrderDetailsPackageMain.jsx';
import NewOrderFullCoverageMain from '../componants/sections/newOrderSection/NewOrderFullCoverageMain.jsx';
import PickUpLocationMain from '../componants/sections/newOrderSection/PickUpLocationMain.jsx';
import WhereDelivery from '../componants/sections/newOrderSection/WhereDelivered.jsx';
import SetUpPaymentMain from '../componants/sections/newOrderSection/SetupPayment.jsx';
import CheckingOrderMain from '../componants/sections/newOrderSection/CheckingOrderMain.jsx';
import CheckingDone from '../componants/sections/newOrderSection/CheckingDoneMain.jsx';
import NextButton from '../componants/ui/NextButton.jsx';

const NewOrder = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    pickupLocation: '',
    deliveryLocation: '',
    packageDetails: '',
    fullCoverage: false,
    paymentMethod: '',
  });

  const [selectedIndex, setSelectedIndex] = useState(null);

  const steps = [
    { path: '', label: 'Main' },
    { path: 'details', label: 'Details', field: 'packageDetails' },
    { path: 'package', label: 'Package', field: 'packageDetails' },
    { path: 'pickup', label: 'Pickup', field: 'pickupLocation' },
    { path: 'delivery', label: 'Delivery', field: 'deliveryLocation' },
    { path: 'coverage', label: 'Coverage', field: 'fullCoverage' },
    { path: 'payment', label: 'Payment', field: 'paymentMethod' },
    { path: 'check', label: 'Check' },
    { path: 'done', label: 'Done' },
  ];

  const getCurrentStepIndex = () => {
    return steps.findIndex((step) => {
      const currentPath = location.pathname.replace('/new-order/', '');
      return currentPath === step.path;
    });
  };

  const handleNext = () => {
    const currentIndex = getCurrentStepIndex();
    if (currentIndex < steps.length - 1) {
      navigate(`/new-order/${steps[currentIndex + 1].path}`);
    }
  };

  const handleBack = () => {
    const currentIndex = getCurrentStepIndex();
    if (currentIndex > 0) {
      const currentStep = steps[currentIndex];
      // Remove the field related to the current step
      if (currentStep.field) {
        setFormData((prevData) => ({
          ...prevData,
          [currentStep.field]: '',
        }));
      }
      navigate(-1);
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="bg-[#F2F2F2] w-full h-full container mx-auto">
      <NewOrderHeader 
        onBack={handleBack} 
        onCancel={() => navigate('/')} 
      />

      <Routes>
        <Route path="/" element={<NewOrderMain formData={formData} setFormData={setFormData} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} />} />
        <Route path="details" element={<NewOrderDetailsMain formData={formData} setFormData={setFormData} />} />
        <Route path="package" element={<NewOrderDetailsPackageMain formData={formData} setFormData={setFormData} />} />
        <Route path="pickup" element={<PickUpLocationMain formData={formData} setFormData={setFormData} />} />
        <Route path="delivery" element={<WhereDelivery formData={formData} setFormData={setFormData} />} />
        <Route path="coverage" element={<NewOrderFullCoverageMain formData={formData} setFormData={setFormData} />} />
        <Route path="payment" element={<SetUpPaymentMain formData={formData} setFormData={setFormData} />} />
        <Route path="check" element={<CheckingOrderMain formData={formData} />} />
        <Route path="done" element={<CheckingDone />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {/* Always show Next button, except on final page */}
      {getCurrentStepIndex() < steps.length - 1 && (
        <NextButton onClick={handleNext} />
      )}
    </div>
  );
};

export default NewOrder;

