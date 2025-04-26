import React, { useState } from 'react';
import Input from '../../ui/AuthInput';

const AddNewDT = () => {
  const [selectedOption, setSelectedOption] = useState('driver');

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
          >
            Truck
          </button>
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-4xl mx-auto space-y-[30px] md:space-y-15">
        {selectedOption === 'driver' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-[30px] md:gap-y-15">
            <Input
              label="Full Name"
              name="fullName"
              placeholder="Ahmed El Amrani"
            />
            <Input
              label="Phone Number"
              name="phone"
              type="tel"
              placeholder="+212 6 42 34 56 78"
            />
            <Input
              label="Email Address (optional)"
              name="email"
              type="email"
              placeholder="driver@example.com"
            />
            <Input
              label="National ID / CIN"
              name="nationalId"
              placeholder="AB123456"
            />
            <Input
              label="Driver License Number"
              name="license"
              placeholder="DL-MAR-90812"
            />
            <Input
              label="License Expiry Date"
              name="expiryDate"
              type="date"
              placeholder="22/02/2025"
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-[30px] md:gap-y-15">
            <Input
              label="Truck Plate Number"
              name="plateNumber"
              placeholder="Truck Plate Number"
            />
            <Input
              label="Truck Capacity (kg)"
              name="capacity"
              type="number"
              placeholder="7.500kg"
            />
            <Input
              label="Year"
              name="year"
              type="number"
              placeholder="2022"
            />
            <Input
              label="Track Type"
              name="type"
              placeholder="Box Truck, Flatbed, Refrigerated, etc."
            />
            <Input
              label="Brand / Model"
              name="brand"
              placeholder="Mercedes Actros 1845"
            />
            <Input
              label="Technical Inspection Date"
              name="inspectionDate"
              type="date"
              placeholder="22/02/2030"
            />
          </div>
        )}

        <div className="mt-[40px] md:mt-[50px] flex justify-center col-span-full">
          <button className="bg-primary text-white px-12 py-3 rounded-full hover:bg-primary-dark transition">
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNewDT;