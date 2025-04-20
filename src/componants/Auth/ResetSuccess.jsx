// ResetSuccess.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Check } from 'lucide-react';

const ResetSuccess = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4 text-center">
            <div className="w-full max-w-lg space-y-8">
                <div className="flex justify-center">
                    <div className="rounded-full bg-green-100 p-4">
                        <Check size={48} className="text-green-500" />
                    </div>
                </div>
                
                <h1 className="text-3xl font-bold text-center text-primary">
                    Password Reset Successful
                </h1>
                
                <p className="text-gray-600">
                    Your password has been reset successfully. You can now login with your new password.
                </p>
                
                <div className="pt-6">
                    <NavLink 
                        to="/login" 
                        className="inline-block px-8 py-4 bg-secondaire text-white rounded-full hover:bg-cyan-600 transition-colors font-medium"
                    >
                        Back to Login
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default ResetSuccess;