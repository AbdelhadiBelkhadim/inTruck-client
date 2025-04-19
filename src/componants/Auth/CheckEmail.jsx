// CheckEmail.jsx
import React from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import { CheckCircle, Mail } from 'lucide-react';

const CheckEmail = () => {
    const location = useLocation();
    const email = location.state?.email || "your email";

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4 text-center">
            <div className="w-full max-w-lg space-y-8">
                <div className="flex justify-center">
                    <div className="rounded-full bg-cyan-100 p-3">
                        <Mail size={48} className="text-secondaire" />
                    </div>
                </div>
                
                <h1 className="text-3xl font-bold text-center text-primary">
                    Check Your Email
                </h1>
                
                <div className="bg-gray-50 rounded-lg p-6 text-center space-y-4">
                    <p className="text-gray-600">
                        We've sent a password reset link to:
                    </p>
                    <p className="font-medium text-gray-800">
                        {email}
                    </p>
                    <div className="flex items-center justify-center text-green-600 gap-2">
                        <CheckCircle size={20} />
                        <span>Email sent successfully</span>
                    </div>
                </div>
                
                <div className="space-y-6 pt-4">
                    <p className="text-gray-500">
                        The link will expire in 1 hour. If you don't see the email, check your spam folder.
                    </p>
                    
                    <div className="space-y-4">
                        <NavLink 
                            to="/forgot-password" 
                            className="block text-secondaire hover:text-cyan-600 font-medium"
                        >
                            Didn't receive an email? Try again
                        </NavLink>
                        
                        <NavLink 
                            to="/login" 
                            className="block text-gray-500 hover:text-gray-600"
                        >
                            Back to login
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckEmail;