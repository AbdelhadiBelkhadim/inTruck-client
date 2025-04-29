import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import NewOrderHeader from '../components/ui/newOrderHead.jsx';
import NewOrderMain from '../components/sections/newOrderSection/NewOrderMain.jsx';
import NewOrderDetailsMain from '../components/sections/newOrderSection/NewOrderDetailsMain.jsx';
import NewOrderDetailsPackageMain from '../components/sections/newOrderSection/NewOrderDetailsPackageMain.jsx';
import NewOrderFullCoverageMain from '../components/sections/newOrderSection/NewOrderFullCoverageMain.jsx';
import PickUpLocationMain from '../components/sections/newOrderSection/PickUpLocationMain.jsx';
import WhereDelivery from '../components/sections/newOrderSection/WhereDelivered.jsx';
import SetUpPaymentMain from '../components/sections/newOrderSection/SetupPayment.jsx';
import CheckingDone from '../components/sections/newOrderSection/CheckingDoneMain.jsx';
import CheckingOrderMain from '../components/sections/newOrderSection/CheckingOrderMain.jsx';
import NextButton from '../components/ui/NextButton.jsx';
import { submitOrder } from '../services/OrderService.js';
import { calculateDirectDistance } from '../services/DirectDistanceService.js';

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
    // Pickup Information
    postcode: '',
    address: '',
    address2: '',
    city: '',
    contactName: '',
    contactPhone: '',
    pickupCoordinates: { lat: 0, lng: 0 },
    
    // Delivery Information
    deliveryPostcode: '',
    deliveryAddress: '',
    deliveryAddress2: '',
    deliveryCity: '',
    receiverName: '',
    receiverPhone: '',
    deliveryCoordinates: { lat: 0, lng: 0 },
    
    // Package Details
    packageType: 'standard',
    weight: 0,
    length: 0,
    width: 0,
    height: 0,
    description: '',
    fragile: false,
    value: 0,
    
    // Coverage Details
    hasCoverage: false,
    coverageType: 'basic',
    coverageAmount: 0,
    
    // Payment Details
    paymentMethod: 'card',
    amount: 0,

    // Price calculated from distance
    calculatedPrice: 0,
    distance: 0,
    distanceText: '',
    duration: ''
  });

  // State to track if the current step is valid
  const [isStepValid, setIsStepValid] = useState(false);

  // Loading and error states
  const [isLoading, setIsLoading] = useState(false);
  const [isPriceLoading, setIsPriceLoading] = useState(false);
  const [error, setError] = useState(null);

  // Add state for tracking order submission success
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);

  // Validation functions for each step
  const validatePickupLocation = () => {
    const { postcode, address, city, contactName, contactPhone } = formData;
    return postcode.trim() !== '' && 
           address.trim() !== '' && 
           city.trim() !== '' && 
           contactName.trim() !== '' && 
           contactPhone.trim() !== '';
  };

  const validateDelivery = () => {
    const { deliveryPostcode, deliveryAddress, deliveryCity, receiverName, receiverPhone } = formData;
    return deliveryPostcode.trim() !== '' && 
           deliveryAddress.trim() !== '' && 
           deliveryCity.trim() !== '' && 
           receiverName.trim() !== '' && 
           receiverPhone.trim() !== '';
  };

  const validatePackage = () => {
    // Basic validation for package details - return true even with minimal info
    const { packageType, description } = formData;
    
    // Weight and dimensions should be numbers but can be 0
    const weight = parseFloat(formData.weight) || 0;
    const length = parseFloat(formData.length) || 0;
    const width = parseFloat(formData.width) || 0;
    const height = parseFloat(formData.height) || 0;
    
    // Just check if package type is selected and description is provided
    return packageType.trim() !== '' && description.trim() !== '';
  };

  const validatePayment = () => {
    // Basic validation for payment
    const { paymentMethod } = formData;
    const amount = parseFloat(formData.amount) || 0;
    return paymentMethod.trim() !== '' && amount > 0;
  };

  // Check validation based on current step
  useEffect(() => {
    const currentStepIndex = getCurrentStepIndex();
    const currentStep = steps[currentStepIndex]?.path || '';
    
    let valid = true;
    
    switch (currentStep) {
      case 'pickup':
        valid = validatePickupLocation();
        break;
      case 'delivery':
        valid = validateDelivery();
        break;
      case 'package':
        valid = validatePackage();
        break;
      case 'payment':
        valid = validatePayment();
        break;
      case 'check':
        // For the check page, validate all steps
        valid = validatePickupLocation() && 
                validateDelivery() && 
                validatePackage() && 
                validatePayment();
        break;
      // Other steps don't have required validations or are handled differently
      default:
        valid = true;
    }
    
    setIsStepValid(valid);
  }, [formData, location.pathname]);

  // handleChange function to update formData state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle city selection with coordinates
  const handleCitySelect = (field, city) => {
    console.log(`City selected for ${field}:`, city);
    
    if (field === 'pickup') {
      const updatedCoords = { lat: parseFloat(city.lat), lng: parseFloat(city.lng) };
      console.log('Updating pickup coordinates to:', updatedCoords);
      
      setFormData((prevData) => {
        const newData = {
          ...prevData,
          city: city.city,
          pickupCoordinates: updatedCoords
        };
        console.log('Updated pickup form data:', newData);
        return newData;
      });
    } else if (field === 'delivery') {
      const updatedCoords = { lat: parseFloat(city.lat), lng: parseFloat(city.lng) };
      console.log('Updating delivery coordinates to:', updatedCoords);
      
      setFormData((prevData) => {
        const newData = {
          ...prevData,
          deliveryCity: city.city,
          deliveryCoordinates: updatedCoords
        };
        console.log('Updated delivery form data:', newData);
        return newData;
      });
    }
  };

  // Calculate delivery price based on pickup and delivery coordinates
  const calculateDeliveryPrice = async () => {
    // Validate that both pickup and delivery coordinates exist
    if (
      !formData.pickupCoordinates?.lat ||
      !formData.pickupCoordinates?.lng ||
      !formData.deliveryCoordinates?.lat ||
      !formData.deliveryCoordinates?.lng
    ) {
      console.error("Missing coordinates for price calculation");
      return false;
    }

    try {
      setIsPriceLoading(true);

      // Package details from form data
      const packageDetails = {
        weight: formData.weight || 1, // Default to 1kg if not specified
        length: formData.length || 20,
        width: formData.width || 20,
        height: formData.height || 20,
        quantity: 1
      };

      console.log("Calculating price with coordinates:", {
        pickup: formData.pickupCoordinates,
        delivery: formData.deliveryCoordinates,
        package: packageDetails
      });

      // Use direct distance calculation instead of the backend API
      const result = await calculateDirectDistance(
        formData.pickupCoordinates,
        formData.deliveryCoordinates,
        packageDetails
      );

      console.log("Price calculation result:", result);

      // Make sure price is a number by parsing if it's a string
      let priceValue = result.price;
      if (typeof result.price === 'string' && result.price.includes('dh')) {
        const priceMatch = result.price.match(/\d+/);
        if (priceMatch) {
          priceValue = parseInt(priceMatch[0], 10);
        } else {
          priceValue = 0;
        }
      }

      // Create the updated form data with calculation results
      const updatedFormData = {
        ...formData,
        calculatedPrice: priceValue,
        distance: result.distance || 0,
        distanceText: result.distanceText || '',
        duration: result.duration || '',
        amount: priceValue // Set the amount to the calculated price
      };
      
      console.log("Setting updated form data:", updatedFormData);
      
      // Update the state with the new data
      return new Promise((resolve) => {
        setFormData(updatedFormData);
        // Small timeout to ensure state update completes
        setTimeout(() => {
          setIsPriceLoading(false);
          resolve(true);
        }, 100);
      });
    } catch (error) {
      console.error("Error in price calculation:", error);
      setIsPriceLoading(false);
      return false;
    }
  };

  const handleNext = async () => {
    const currentIndex = getCurrentStepIndex();
    const currentStep = steps[currentIndex]?.path || '';
    
    // Validate the current step before proceeding
    let valid = true;
    
    switch (currentStep) {
      case 'pickup':
        valid = validatePickupLocation();
        if (!valid) {
          toast.error('Please fill all required pickup location fields');
        }
        break;
      case 'delivery':
        valid = validateDelivery();
        if (!valid) {
          toast.error('Please fill all required delivery fields');
          return;
        }
        
        // Calculate price when moving from delivery to coverage
        setIsPriceLoading(true); // Show loading state
        console.log("Starting price calculation before moving to coverage");
        
        // Price calculation is now handled in the NewOrderFullCoverageMain component
        setTimeout(() => {
          setIsPriceLoading(false);
          if (valid && currentIndex < steps.length - 1) {
            const nextPath = steps[currentIndex + 1].path;
            console.log("Moving to next path:", nextPath);
            navigate(`/new-order/${nextPath}`);
          }
        }, 200);
        return; // Early return to prevent double navigation
        break;
      case 'package':
        valid = validatePackage();
        if (!valid) {
          toast.error('Please fill all required package details');
        }
        break;
      case 'payment':
        valid = validatePayment();
        if (!valid) {
          toast.error('Please fill all required payment details');
        }
        // Check if "cash on delivery" is selected, skip to "check" if so
        if (formData.paymentMethod === 'cash') {
          navigate('/new-order/check');
          return;
        }
        break;
    }
    
    // For all other steps, navigate directly
    if (valid && currentIndex < steps.length - 1) {
      const nextPath = steps[currentIndex + 1].path;
      console.log("Moving to next path:", nextPath);
      navigate(`/new-order/${nextPath}`);
    }
  };

  // Add a new effect to recalculate price if needed on coverage page
  useEffect(() => {
    const currentPath = location.pathname.split('/').pop();
    
    // If we're on the coverage page and missing price data, recalculate
    if (currentPath === 'coverage' && 
        (!formData.calculatedPrice || formData.calculatedPrice <= 0) && 
        formData.pickupCoordinates?.lat && 
        formData.deliveryCoordinates?.lat) {
      
      console.log("On coverage page with missing price data - recalculating");
      calculateDeliveryPrice().then(success => {
        if (success) {
          console.log("Recalculated price data for coverage page:", formData);
        } else {
          console.error("Failed to recalculate price data for coverage page");
        }
      });
    }
  }, [location.pathname]);

  // Submit order function
  const handleSubmitOrder = async () => {
    // Validate all required fields before submission
    if (!validatePickupLocation() || !validateDelivery() || 
        !validatePackage() || !validatePayment()) {
      toast.error('Please fill all required fields in all steps before submitting');
      return;
    }

    // Additional validation for required backend fields
    if (!formData.calculatedPrice || formData.calculatedPrice <= 0) {
      toast.error('Price calculation is required. Please go back to the delivery page.');
      return;
    }

    if (!formData.pickupCoordinates?.lat || !formData.pickupCoordinates?.lng ||
        !formData.deliveryCoordinates?.lat || !formData.deliveryCoordinates?.lng) {
      toast.error('Location coordinates are missing. Please select valid cities.');
      return;
    }

    // Ensure numeric values are actually numbers
    const numericFields = ['weight', 'width', 'height', 'length'];
    const invalidFields = numericFields.filter(field => 
      formData[field] && isNaN(Number(formData[field]))
    );
    
    if (invalidFields.length > 0) {
      toast.error(`Invalid numeric values for: ${invalidFields.join(', ')}`);
      return;
    }
    
    try {
      setIsLoading(true);
      setError(null);
      setIsSubmitSuccess(false);
      
      // Navigate to the loading page first
      navigate('/new-order/done');
      
      console.log('Submitting order with data:', formData);
      
      // Submit the order data to the API
      const response = await submitOrder(formData);
      console.log('Order submission response:', response);
      
      // Show success message
      toast.success('Order created successfully!');
      
      // Set the success flag to trigger redirection
      setIsSubmitSuccess(true);
      
      // Reset form data
      setFormData({
        postcode: '',
        address: '',
        address2: '',
        city: '',
        contactName: '',
        contactPhone: '',
        pickupCoordinates: { lat: 0, lng: 0 },
        deliveryPostcode: '',
        deliveryAddress: '',
        deliveryAddress2: '',
        deliveryCity: '',
        receiverName: '',
        receiverPhone: '',
        deliveryCoordinates: { lat: 0, lng: 0 },
        packageType: 'standard',
        weight: 0,
        length: 0,
        width: 0,
        height: 0,
        description: '',
        fragile: false,
        value: 0,
        hasCoverage: false,
        coverageType: 'basic',
        coverageAmount: 0,
        paymentMethod: 'card',
        amount: 0,
        calculatedPrice: 0,
        distance: 0,
        distanceText: '',
        duration: ''
      });
      
    } catch (error) {
      console.error('Error submitting order:', error);
      // Display more specific error message if available
      const errorMessage = error.message || 'Failed to create order. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
      
      // Navigate back to check page if there's an error
      navigate('/new-order/check');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#F2F2F2] w-full h-full container mx-auto">
      <NewOrderHeader />
      <Routes>
        <Route path="" element={<NewOrderMain />} />
        <Route path="details" element={<NewOrderDetailsMain formData={formData} handleChange={handleChange} />} />
        <Route path="package" element={<NewOrderDetailsPackageMain formData={formData} handleChange={handleChange} />} />
        <Route 
          path="pickup" 
          element={
            <PickUpLocationMain 
              formData={formData} 
              handleChange={handleChange} 
              handleCitySelect={(city) => handleCitySelect('pickup', city)} 
            />
          } 
        />
        <Route 
          path="delivery" 
          element={
            <WhereDelivery 
              formData={formData} 
              handleChange={handleChange} 
              handleCitySelect={(city) => handleCitySelect('delivery', city)} 
            />
          } 
        />
        <Route 
          path="coverage" 
          element={
            <NewOrderFullCoverageMain 
              formData={formData} 
              handleChange={handleChange}
            />
          } 
        />
        <Route 
          path="payment" 
          element={<SetUpPaymentMain formData={formData} handleChange={handleChange} />} 
        />
        <Route 
          path="check" 
          element={
            <CheckingOrderMain 
              formData={formData} 
              isLoading={isLoading} 
              error={error} 
              handleSubmit={handleSubmitOrder} 
            />
          } 
        />
        <Route path="done" element={
          <CheckingDone 
            orderSuccess={isSubmitSuccess}
          />
        } />
        <Route path="*" element={<Navigate to="" replace />} />
      </Routes>
      {/* Removed NextButton to allow each page to handle its own navigation */}
    </div>
  );
};

export default NewOrder;