import React from 'react';
import { Formik, Form } from 'formik';
import { useMutation } from '@tanstack/react-query';
import { useNavigate, NavLink } from 'react-router-dom';
import { IoMailOutline } from "react-icons/io5";

import { forgotPassword } from '../../api/api'; // Adjust the import path as needed
import { forgotPasswordSchema } from '../../../utils/FormValidation';

import Input from '../ui/AuthInput';
import Button from '../ui/SecondaryBtn';

const ForgotPassword = () => {
    const navigate = useNavigate();
  


    // Initial form values
    const initialValues = {
        email: ''
    };

    // Set up mutation
    const forgotPasswordMutation = useMutation({
        mutationFn: forgotPassword,
        onSuccess: (data) => {
            alert(data.message || 'Password reset link has been sent to your email!');
            navigate('/check-email', { state: { email: initialValues.email } });
        },
        onError: (error) => {
            console.error('Password reset request failed:', error);
        }
    });

    // Submit handler
    const handleSubmit = (values, { setSubmitting }) => {
        forgotPasswordMutation.mutate(values, {
            onSettled: () => setSubmitting(false)
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
                                            label={forgotPasswordMutation.isLoading ? "Sending..." : "Send Reset Password"} 
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
                    <div className="flex items-center justify-center relative bottom-0 pb-3 md:pb-5">
                        <p className="text-[16px] text-gray-400 font-light">
                            Already have an account?
                            <NavLink to="/login" className="text-primary font-bold">
                                Sign In
                            </NavLink>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;