import React, { useState } from 'react';
import NewOrderHeader from '../componants/ui/NewOrderHeader';
import NewOrderMain from '../componants/ui/NewOrderMain';
import NewOrderDetailsMain from '../componants/ui/NewOrderDetailsMain';
import NewOrderDetailsPackageMain from '../componants/ui/NewOrderDetailsPackageMain';
import NewOrderFullCoverageMain from '../componants/ui/NewOrderFullCoverageMain';
import PickUpLocationMain from '../componants/ui/PickUpLocationMain';
import WhereDelivery from '../componants/ui/WhereDelivery';
import SetUpPaymentMain from '../componants/ui/SetUpPaymentMain';
import CheckingDone from '../componants/ui/CheckingDoneMain';
import CheckingOrderMain from '../componants/ui/CheckingOrderMain';
import NextButton from '../componants/ui/NextButton';

const steps = [
  NewOrderMain,
  NewOrderDetailsMain,
  NewOrderDetailsPackageMain,
  PickUpLocationMain,
  WhereDelivery,
  NewOrderFullCoverageMain,
  SetUpPaymentMain,
  CheckingOrderMain,
  CheckingDone,
];

const NewOrder = () => {
  const [currentStep, setCurrentStep] = useState(0);

  // Add formData state to hold form inputs for PickUpLocationMain
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

  const StepComponent = steps[currentStep];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <div className="bg-[#F2F2F2] w-full h-full container mx-auto">
      <NewOrderHeader />
      {/* Pass formData and handleChange to PickUpLocationMain and WhereDelivery */}
      {(StepComponent === PickUpLocationMain || StepComponent === WhereDelivery) ? (
        <StepComponent formData={formData} handleChange={handleChange} />
      ) : (
        <StepComponent />
      )}
      {currentStep < steps.length - 1 && <NextButton onClick={handleNext} />}
    </div>
  );
};

export default NewOrder;
