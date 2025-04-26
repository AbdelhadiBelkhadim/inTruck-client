import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from "lucide-react";
import Logo from '../../assets/IT.png';

const NewOrderHeader = ({ onBack, onCancel, title = "InTruck" }) => { 
  const navigate = useNavigate();

  return (
    <div className="flex justify-between px-3 py-2">
      <button 
        onClick={onBack || (() => navigate(-1))} 
        className="flex items-center text-[#00b4d8]"
      >
        <ArrowLeft className="w-6 h-6 text-primary" />
        <span className="ml-1 text-lg font-medium underline">Back</span>
      </button>
      <Link to="/">
        <div className="hidden md:flex items-center justify-center">
          <img src={Logo} className="w-15 h-15" />
          <h1 className="md:text-2xl text-primary font-bold">{title}</h1>
        </div>
      </Link>
      <button 
        onClick={onCancel || (() => navigate('/'))} 
        className="text-primary text-lg font-medium underline"
      >
        Cancel Order
      </button>
    </div>
  );
};

export default NewOrderHeader;


