import React from 'react';
import { ArrowLeft } from "lucide-react";
import { Link } from 'react-router-dom';
import Logo from '../../assets/IT.png';

const NewOrderHeader = ({ onBack, onCancel }) => {
  return (
    <div className="flex justify-between px-3 py-2 mb-10">
      <button className="flex items-center text-[#00b4d8]" onClick={onBack}>
        <ArrowLeft className="w-6 h-6 text-[#00b4d8]" />
        <span className="ml-1 text-lg font-medium underline">Back</span>
      </button>
      <Link to="/">
        <div className="hidden md:flex items-center justify-center">
          <img src={Logo} className="w-15 h-15" alt="InTruck Logo" />
          <h1 className="md:text-2xl text-primary font-bold">InTruck</h1>
        </div>
      </Link>
      <button className="text-primary text-lg font-medium underline" onClick={onCancel}>
        Cancel
      </button>
    </div>
  );
};

export default NewOrderHeader;