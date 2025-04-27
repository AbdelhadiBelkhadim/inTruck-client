import React, { useState } from 'react';
import Input from '../../ui/AuthInput';
import axios from 'axios';
import { toast } from 'react-toastify';

const API_BASE_URL = 'https://intruck-backend-production.up.railway.app';

const AddNewDT = () => {
  const [selectedOption, setSelectedOption] = useState('driver');
  const [loading, setLoading] = useState(false);
  
  // Driver form state
  const [driverForm, setDriverForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    nationalId: '',
    license: '',
    expiryDate: ''
  });
  
  // Truck form state
  const [truckForm, setTruckForm] = useState({
    plateNumber: '',
    capacity: '',
    year: '',
    type: '',
    brand: '',
    inspectionDate: ''
  });

  const handleDriverChange = (e) => {
    const { name, value } = e.target;
    setDriverForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTruckChange = (e) => {
    const { name, value } = e.target;
    setTruckForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateDriverForm = () => {
    if (!driverForm.fullName) return 'Full name is required';
    if (!driverForm.phone) return 'Phone number is required';
    if (!driverForm.nationalId) return 'National ID is required';
    if (!driverForm.license) return 'Driver license number is required';
    if (!driverForm.expiryDate) return 'License expiry date is required';
    return null;
  };

  const validateTruckForm = () => {
    if (!truckForm.plateNumber) return 'Plate number is required';
    if (!truckForm.capacity) return 'Capacity is required';
    if (!truckForm.year) return 'Year is required';
    if (!truckForm.type) return 'Truck type is required';
    if (!truckForm.brand) return 'Brand/Model is required';
    return null;
  };

  const handleAddDriver = async () => {
    const error = validateDriverForm();
    if (error) {
      toast.error(error);
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        toast.error('Authentication token is missing. Please log in again.');
        setLoading(false);
        return;
      }

      // Format the driver data with the correct field name for the license expiry date
      const formattedDriverData = {
        fullName: driverForm.fullName,
        phone: driverForm.phone,
        email: driverForm.email || undefined, // Only send if not empty
        nationalId: driverForm.nationalId,
        license: driverForm.license,
        licenseExpire: driverForm.expiryDate // Match the field name expected by the backend
      };

      console.log('Sending driver data:', formattedDriverData);

      const response = await axios.post(`${API_BASE_URL}/admin/drivers/add`, formattedDriverData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      
      toast.success('Driver added successfully!');
      console.log('Driver added:', response.data);
      
      // Reset form after successful addition
      setDriverForm({
        fullName: '',
        phone: '',
        email: '',
        nationalId: '',
        license: '',
        expiryDate: ''
      });
    } catch (err) {
      console.error('Error adding driver:', err);
      toast.error(err.response?.data?.message || 'Failed to add driver');
    } finally {
      setLoading(false);
    }
  };

  const handleAddTruck = async () => {
    const error = validateTruckForm();
    if (error) {
      toast.error(error);
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        toast.error('Authentication token is missing. Please log in again.');
        setLoading(false);
        return;
      }

      // Format the truck data with the correct field names according to Prisma schema
      const formattedTruckData = {
        truckNumber: truckForm.plateNumber, // Use plateNumber as truckNumber 
        capacity: parseInt(truckForm.capacity, 10), // Convert to number
        truckYear: parseInt(truckForm.year, 10), // Renamed from year to truckYear
        truckType: truckForm.type, // Renamed from type to truckType
        model: truckForm.brand, // Renamed from brand to model
        technicalDate: truckForm.inspectionDate || undefined, // Technical inspection date
        location: "AVAILABLE" // Add required location field with default value
      };

      console.log('Sending truck data:', formattedTruckData);

      const response = await axios.post(`${API_BASE_URL}/admin/trucks/add`, formattedTruckData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      
      toast.success('Truck added successfully!');
      console.log('Truck added:', response.data);
      
      // Reset form after successful addition
      setTruckForm({
        plateNumber: '',
        capacity: '',
        year: '',
        type: '',
        brand: '',
        inspectionDate: ''
      });
    } catch (err) {
      console.error('Error adding truck:', err);
      toast.error(err.response?.data?.message || 'Failed to add truck');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedOption === 'driver') {
      handleAddDriver();
    } else {
      handleAddTruck();
    }
  };

  return (
    <div className="px-4 md:px-8 lg:px-16">
      <h1 className='text-xl lg:text-4xl font-bold text-primary mb-4'>Add new (Driver/Truck)</h1>

      {/* Switch Buttons */}
      <div className='flex items-center justify-center my-8'>
        <div className='flex justify-between items-center mb-8 w-full md:w-[40%]'>
          <button 
            onClick={() => setSelectedOption('driver')}
            className={`px-8 py-2 rounded-full border ${
              selectedOption === 'driver' 
                ? 'bg-primary text-white' 
                : 'bg-transparent text-primary'
            }`}
            type="button"
          >
            Driver
          </button>
          <span className="bg-secondaire w-[2px] h-[40px]"></span>
          <button 
            onClick={() => setSelectedOption('truck')}
            className={`px-8 py-2 rounded-full border ${
              selectedOption === 'truck' 
                ? 'bg-primary text-white' 
                : 'bg-transparent text-primary'
            }`}
            type="button"
          >
            Truck
          </button>
        </div>
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-[30px] md:space-y-15">
        {selectedOption === 'driver' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-[30px] md:gap-y-15">
            <Input
              label="Full Name"
              name="fullName"
              placeholder="Ahmed El Amrani"
              value={driverForm.fullName}
              onChange={handleDriverChange}
              required
            />
            <Input
              label="Phone Number"
              name="phone"
              type="tel"
              placeholder="+212 6 42 34 56 78"
              value={driverForm.phone}
              onChange={handleDriverChange}
              required
            />
            <Input
              label="Email Address (optional)"
              name="email"
              type="email"
              placeholder="driver@example.com"
              value={driverForm.email}
              onChange={handleDriverChange}
            />
            <Input
              label="National ID / CIN"
              name="nationalId"
              placeholder="AB123456"
              value={driverForm.nationalId}
              onChange={handleDriverChange}
              required
            />
            <Input
              label="Driver License Number"
              name="license"
              placeholder="DL-MAR-90812"
              value={driverForm.license}
              onChange={handleDriverChange}
              required
            />
            <div className="relative">
              <label className="block mb-2 text-sm text-primary font-bold">
                License Expiry Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="expiryDate"
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                value={driverForm.expiryDate}
                onChange={handleDriverChange}
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Format: YYYY-MM-DD
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-[30px] md:gap-y-15">
            <Input
              label="Truck Plate Number"
              name="plateNumber"
              placeholder="Truck Plate Number"
              value={truckForm.plateNumber}
              onChange={handleTruckChange}
              required
            />
            <Input
              label="Truck Capacity (kg)"
              name="capacity"
              type="number"
              placeholder="7500"
              value={truckForm.capacity}
              onChange={handleTruckChange}
              required
            />
            <Input
              label="Year"
              name="year"
              type="number"
              placeholder="2022"
              value={truckForm.year}
              onChange={handleTruckChange}
              required
            />
            <Input
              label="Truck Type"
              name="type"
              placeholder="Box Truck, Flatbed, Refrigerated, etc."
              value={truckForm.type}
              onChange={handleTruckChange}
              required
            />
            <Input
              label="Brand / Model"
              name="brand"
              placeholder="Mercedes Actros 1845"
              value={truckForm.brand}
              onChange={handleTruckChange}
              required
            />
            <div className="relative">
              <label className="block mb-2 text-sm text-primary font-bold">
                Technical Inspection Date
              </label>
              <input
                type="date"
                name="inspectionDate"
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                value={truckForm.inspectionDate}
                onChange={handleTruckChange}
              />
              <p className="text-xs text-gray-500 mt-1">
                Format: YYYY-MM-DD
              </p>
            </div>
          </div>
        )}

        <div className="mt-[40px] md:mt-[50px] flex justify-center col-span-full">
          <button 
            type="submit"
            className={`bg-primary text-white px-12 py-3 rounded-full hover:bg-primary-dark transition ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewDT;