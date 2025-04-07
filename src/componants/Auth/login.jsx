import React from 'react'
import { NavLink } from 'react-router-dom'
import { useFormik } from 'formik';
import { loginSchema } from "../../../utils/FormValidation";

import InputAuth from '../ui/authInput'
import Button from '../ui/secondaryBtn'
import SideLeftAuth from '../ui/sideLeftAuth'

import Bg from '../../assets/loginBg.png'

const onSubmit = async (values, actions) => {
  console.log(values);
  console.log(actions);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  actions.resetForm();
};

const Login = () => {


  const {
    errors,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit,
  });
  console.log(errors);
  return (
    <div className="md:flex h-[100vh]">
      <div className="md:w-[50%] ">
        <SideLeftAuth h1="Login" src={Bg} />
      </div>

      {/* SideRight/ */}
      <div className="SideRight flex items-center justify-center py-[15px] md:py-[47px] lg:py-[67px] px-[20px] md:px-[50px] lg:px-[80px] md:w-[50%] h-auto">
        <div className="md:w-full space-y-[40px]">
          <h2 className="font-newsreader text-4xl text-primary font-bold text-center">Welcome Back!!</h2>
          <div className="space-y-[30px] md:space-y-[50px]">
            <div className="space-y-[20px] md:space-y-[30px]">
              <form className="Form space-y-[32px] md:space-y-[48px]" onSubmit={handleSubmit} autoComplete="off">
                <div className="space-y-[30px] md:space-y-[50px]">
                  <InputAuth 
                    label="Email" 
                    type="email" 
                     // Changed to lowercase
                     name="email" // Changed to lowercase
                    placeholder="Enter your Email" 
                    onChange={handleChange} 
                    errors={errors.email} 
                    onBlur={handleBlur}
                  />
                  <InputAuth 
                    label="Password" 
                    type="password"
                    name="password" // Changed to lowercase
                    placeholder="Enter Password" 
                    onChange={handleChange} 
                    errors={errors.password} 
                    onBlur={handleBlur}
                  />
                </div>
                <div>
                  <Button label="Login" disabled={isSubmitting} type="enabled" size="large" withprop="full"/>
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
    };
    
    export default Login;

