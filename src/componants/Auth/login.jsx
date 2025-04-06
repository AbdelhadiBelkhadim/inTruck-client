import React from 'react'
import { NavLink } from 'react-router-dom'
import { useFormik } from 'formik';

import { loginpSchema } from "../../../utils/FormValidation";

import InputAuth from '../ui/authInput'
import Button from '../ui/secondaryBtn'
import SideLeftAuth from '../ui/sideLeftAuth'

import Bg from '../../assets/loginBg.png'


const Login = () => {

  const initialValues = {
    Email: '',
    Password: ''
  }
  const formik = useFormik({
      initialValues,
      validationSchema: loginpSchema,
      onSubmit: values => {
          console.log('Form Submitted:', values);
      },
  });
  
  const handleInputChange = (e) => {  
      const { name, value } = e.target;
      formik.setFieldValue(name, value);
      formik.setFieldError(name, '');
  }
  
  return (
    <div className="md:flex h-[100vh]">
      <div className="md:w-[40%] lg:w-[45%]">
        <SideLeftAuth h1="Login" src={Bg} />
      </div>
      <div className="SideRight flex items-center justify-center py-[15px] md:py-[47px] lg:py-[67px] px-[20px] md:px-[50px] lg:px-[80px] lg:w-[60%] h-auto">
        <div className="container space-y-[40px]">
          <h2 className="font-newsreader text-4xl text-primary font-bold text-center">Welcome Back!!</h2>
          <div className="space-y-[30px] md:space-y-[50px]">
            <div className="space-y-[20px] md:space-y-[30px]">
              <form className="Form space-y-[32px] md:space-y-[48px]" onSubmit={formik.handleSubmit}>
                <div className="space-y-[30px] md:space-y-[50px]">
                  <InputAuth 
                    label="Email" 
                    type="email" 
                    name="Email"
                    placeholder="Enter your Email" 
                    onchange={handleInputChange} 
                    errors={formik.errors.Email} 
                  />
                  <InputAuth 
                    label="Password" 
                    type="password"
                    name="Password" 
                    placeholder="Enter Password" 
                    onchange={handleInputChange} 
                    errors={formik.errors.Password} 
                  />
                </div>
                <div>
                  <Button label="Login" type="enabled" size="large" withprop="full"/>
                </div>
              </form>
            </div>
            <div className="flex items-center justify-center relative bottom-0">
              <p className="text-[16px] text-gray-400 font-light">
                Don't have an account?{" "}
                <NavLink to="/register/company" className="text-primary font-bold">
                  Sign Up
                </NavLink>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login