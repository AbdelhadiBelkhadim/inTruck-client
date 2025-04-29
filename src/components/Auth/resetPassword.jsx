import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate, useParams, NavLink } from 'react-router-dom';
import { RiLockPasswordLine } from "react-icons/ri";
import { AlertCircle } from "lucide-react";

import { resetPasswordSchema } from '../../../utils/FormValidation';

import Input from '../ui/AuthInput';
import Button from '../ui/secondaryButton';

const ResetPassword = () => {
    const navigate = useNavigate();
    const { token } = useParams(); // Get token from URL path instead of query params
    const [tokenError, setTokenError] = useState('');
    
    useEffect(() => {
        const storedToken = localStorage.getItem('resetToken');
        if (!token && !storedToken) {
            setTokenError('Invalid reset link. Please request a new password reset.');
        } else if (!token && storedToken) {
            navigate(`/reset-password/${storedToken}`);
        } else {
            localStorage.setItem('resetToken', token);
        }
    }, [token, navigate]);
    
    // API function to reset password
    const resetPassword = async (resetPasswordData) => {
        const response = await axios.post(`https://intruck-backend-production.up.railway.app/auth/reset_password/${token}`, {
            ...resetPasswordData
        });
        return response.data;
    };

    // Initial form values
    const initialValues = {
        password: '',
        confirmPassword: ''
    };

    // Set up mutation
    const resetPasswordMutation = useMutation({
        mutationFn: resetPassword,
        onSuccess: () => {
            navigate('/reset-success');
        },
        onError: (error) => {
            console.error('Password reset failed:', error);
            if (error.response?.data?.message?.includes('token')) {
                setTokenError('This reset link has expired or is invalid. Please request a new password reset.');
            } else {
                setTokenError(error.response?.data?.message || 'An error occurred while resetting your password.');
            }
        }
    });

    // Submit handler
    const handleSubmit = (values, { setSubmitting }) => {
        const storedToken = localStorage.getItem('resetToken');
        if (!token && !storedToken) {
            setTokenError('Invalid reset link. Please request a new password reset.');
            return;
        }

        const activeToken = token || storedToken;
        resetPasswordMutation.mutate({ ...values, token: activeToken }, {
            onSettled: () => setSubmitting(false)
        });
    };

    useEffect(() => {
        return () => {
            localStorage.removeItem('resetToken');
        };
    }, []);

    if (tokenError) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
                <div className="w-full max-w-lg text-center space-y-6">
                    <div className="flex justify-center">
                        <AlertCircle size={48} className="text-red-500" />
                    </div>
                    <h1 className="text-3xl font-bold text-red-600">Invalid Reset Link</h1>
                    <p className="text-gray-600">{tokenError}</p>
                    <div className="pt-4">
                        <NavLink 
                            to="/forgot-password" 
                            className="inline-block px-6 py-3 bg-cyan-500 text-white rounded-full hover:bg-cyan-600 transition-colors"
                        >
                            Request New Reset Link
                        </NavLink>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4 space-y-4 md:space-y-10">
            <div className="w-full max-w-lg">
                <h1 className="text-4xl font-bold text-center text-blue-800 mb-16">
                    Reset Password
                </h1>

                <Formik
                    initialValues={initialValues}
                    validationSchema={resetPasswordSchema}
                    onSubmit={handleSubmit}
                >
                    {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
                        <Form className="space-y-10">
                            {resetPasswordMutation.isError && (
                                <div className="text-red-500 text-center">
                                    {resetPasswordMutation.error.response?.data?.message || resetPasswordMutation.error.message}
                                </div>
                            )}
                            
                            <div className="space-y-[30px] md:space-y-[50px] md:max-w-[500px] lg:max-w-[700px]">
                                <Input
                                    label="Password"
                                    type="password"
                                    name="password"
                                    placeholder="Ex: MySecurePass2024!"
                                    value={values.password}
                                    onChange={handleChange}
                                    errors={touched.password && errors.password}
                                    onBlur={handleBlur}
                                >
                                    <RiLockPasswordLine />
                                </Input>
                    
                                <Input
                                    label="Confirm Password"
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="MySecurePass2024!"
                                    value={values.confirmPassword}
                                    onChange={handleChange}
                                    errors={touched.confirmPassword && errors.confirmPassword}
                                    onBlur={handleBlur}
                                >
                                    <RiLockPasswordLine />
                                </Input>
                            </div>

                            <Button
                                label={resetPasswordMutation.isLoading ? "Resetting..." : "Reset Password"}
                                disabled={isSubmitting || resetPasswordMutation.isLoading}
                                type="enabled"
                                size="large"
                                withprop="full"
                                className="w-full py-4 px-6 bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded-full transition duration-200 ease-in-out"
                            />
                        </Form>
                    )}
                </Formik>
            </div>
            <div className="flex items-center justify-center relative bottom-0 pb-3 md:pb-5">
                <p className="text-[16px] text-gray-400 font-light">
                    Already have an account?{" "}
                    <NavLink to="/login" className="text-primary font-bold">
                        Sign In
                    </NavLink>
                </p>
            </div>
        </div>
    );
}

export default ResetPassword;