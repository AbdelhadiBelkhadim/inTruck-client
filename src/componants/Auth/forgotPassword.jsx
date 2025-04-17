import React from 'react';
import { Formik, Form } from 'formik';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { IoMailOutline } from "react-icons/io5";

import { forgotPasswordSchema } from '../../../utils/FormValidation';

import Input from '../ui/authInput';
import Button from '../ui/secondaryBtn';

const ForgotPassword = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
  
    // API function to request password reset
    const forgotPassword = async (forgotPasswordData) => {
        const response = await axios.post('http://localhost:3000/auth/forgotPassword', forgotPasswordData);
        return response.data;
    };

    // Initial form values
    const initialValues = {
        email: ''
    };

    // Set up mutation
    const forgotPasswordMutation = useMutation({
        mutationFn: forgotPassword,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user'] });
            alert('email sent successfully! Check your email for further instructions.');
            navigate('/reset-password');
        },
        onError: (error) => {
            console.error('Password reset request failed:', error);
        }
    });

    // Submit handler
    const handleSubmit = (values, { setSubmitting, resetForm }) => {
        forgotPasswordMutation.mutate(values, {
            onSettled: () => setSubmitting(false),
            onSuccess: () => resetForm()
        });
    };
    
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
            <div className="w-full max-w-lg space-y-[50px] md:space-y-[70px] lg:space-y-[100px]">
                <h2 className="font-newsreader text-3xl md:text-4xl text-primary font-bold text-center">Forgot Password</h2>
                <div className="space-y-[30px] md:space-y-[50px] w-full">
                    <div className="space-y-[20px] md:space-y-[30px] w-full">
                        <Formik
                            initialValues={initialValues}
                            validationSchema={forgotPasswordSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                                <Form className="Form space-y-[20px] md:space-y-[30px]" onSubmit={handleSubmit} autoComplete="off">
                                    {forgotPasswordMutation.isError && (
                                        <div className="text-red-500 text-center w-full">
                                            {forgotPasswordMutation.error.message}
                                        </div>
                                    )}
                                    
                                    <div className="space-y-[30px] md:space-y-[50px] md:max-w-[500px] lg:max-w-[700px]">
                                        <Input 
                                            label="Email" 
                                            type="email" 
                                            name="email"
                                            placeholder="Enter your Email" 
                                            value={values.email}
                                            onChange={handleChange} 
                                            errors={touched.email && errors.email} 
                                            onBlur={handleBlur}
                                        >
                                            <IoMailOutline />
                                        </Input>
                                    </div>
                                    <div className="px-3 md:px-0 md:max-w-[500px] lg:max-w-[700px]">
                                        <Button 
                                            label={forgotPasswordMutation.isLoading ? "Sending..." : "Reset Password"} 
                                            disabled={isSubmitting || forgotPasswordMutation.isLoading} 
                                            type="enabled" 
                                            size="large" 
                                            withprop="full"
                                        />
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;