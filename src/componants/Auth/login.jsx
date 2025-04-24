import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Formik, Form } from 'formik';
import { useMutation } from '@tanstack/react-query';
import { Mail } from 'lucide-react';
import { RiLockPasswordLine } from "react-icons/ri";
import { loginUser } from '../../api/api'; // Adjust the import path as needed


import { loginSchema } from "../../../utils/FormValidation";

import InputAuth from '../ui/AuthInput'
import Button from '../ui/SecondaryBtn'
import SideLeftAuth from '../ui/SideLeftAuth'

import Bg from '../../assets/loginBg.png'

const Login = () => {
  const navigate = useNavigate();
  
  // Initial form values
  const initialValues = {
    email: '',
    password: ''
  };

  // React Query mutation hook
  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      alert('Login successful!');
      navigate('/dashboard'); // Redirect to dashboard or home page
    },
    onError: (error) => {
      alert(`Login failed: ${error.message}`);
      console.error('Login error:', error);
    }
  });
  

  // Form submission handler with React Query
  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    loginMutation.mutate(values);
    
    // Reset form and submitting state when mutation completes
    setTimeout(() => {
      if (!loginMutation.isLoading) {
        setSubmitting(false);
        if (loginMutation.isSuccess) {
          resetForm();
        }
      }
    }, 1000);
  };
  
  return (
    <div className="md:flex h-[100vh]">
      <div className="md:w-[50%] ">
        <SideLeftAuth h1="Login" src={Bg} />
      </div>

      {/* SideRight */}
      <div className="SideRight flex items-center justify-center py-[15px] md:py-[47px] lg:py-[67px] px-[20px] md:px-[50px] lg:px-[80px] md:w-[50%] h-auto">
        <div className="md:w-full space-y-[40px]">
          <h2 className="font-newsreader text-4xl text-primary font-bold text-center">Welcome Back!!</h2>
          <div className="space-y-[30px] md:space-y-[50px]">
            <div className="space-y-[20px] md:space-y-[30px]">
              <Formik
                initialValues={initialValues}
                validationSchema={loginSchema}
                onSubmit={handleSubmit}
              >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                  <Form className="Form space-y-[32px] md:space-y-[48px]" onSubmit={handleSubmit} autoComplete="off">
                    {loginMutation.isError && (
                      <div className="text-red-500 text-center">
                        Your email or password is incorrect.
                      </div>
                    )}
                    
                    <div className="space-y-2">
                      <div className="space-y-[30px] md:space-y-[50px]">
                        <InputAuth 
                          label="Email" 
                          type="email" 
                          name="email"
                          placeholder="Enter your Email" 
                          value={values.email}
                          onChange={handleChange} 
                          errors={touched.email && errors.email} 
                          onBlur={handleBlur}
                        >
                          <Mail />
                        </InputAuth>
                        <InputAuth 
                          label="Password" 
                          type="password"
                          name="password" 
                          placeholder="Enter Password"
                          value={values.password} 
                          onChange={handleChange} 
                          errors={touched.password && errors.password} 
                          onBlur={handleBlur}
                        >
                          <RiLockPasswordLine />
                        </InputAuth>
                      </div>
                      <div className="flex items-center justify-end">
                        <NavLink to="/forgot-password" className="text-primary font-bold text-[16px]">
                          Forgot Password?
                        </NavLink>
                      </div>
                    </div>
                    <div className="px-3 md:px-0">
                      <Button 
                        label={loginMutation.isLoading ? "Logging in..." : "Login"} 
                        disabled={isSubmitting || loginMutation.isLoading} 
                        type="enabled" 
                        size="large" 
                        withprop="full"
                      />
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
            <div className="flex items-center justify-center relative bottom-0">
              <p className="text-[16px] text-gray-400 font-light">
                Don't have an account?{" "}
                <NavLink to="/register" className="text-primary font-bold">
                  Sign Up
                </NavLink>
              </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
      );
    };
    
export default Login;

