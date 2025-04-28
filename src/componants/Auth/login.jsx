import { AuthContext } from '../../contexts/AuthContext';
import InputAuth from '../ui/AuthInput'
import Button from '../ui/SecondaryBtn'
import SideLeftAuth from '../ui/SideLeftAuth'
import LoadingSpinner from '../LoadingSpinner'
import {loginSchema} from '../../../utils/FormValidation'
import { useNavigate, NavLink } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { Formik, Form } from 'formik';
import { Mail } from 'lucide-react';
import { RiLockPasswordLine } from 'react-icons/ri';

import Bg from '../../assets/loginBg.png'


const Login = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated, loading, error, user } = useContext(AuthContext);

  // Redirect to appropriate dashboard based on user role if already authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === 'ADMIN') {
        navigate('/admin', { replace: true });
      } else {
        navigate('/dashboard', { replace: true });
      }
    }
  }, [isAuthenticated, navigate, user]);

  // Initial form values
  const initialValues = {
    email: '',
    password: ''
  };

  // Form submission handler
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const success = await login(values.email, values.password);
      if (success) {
        // Navigate based on user role
        if (user && user.role === 'admin') {
          navigate('/admin/dashboard', { replace: true });
        } else {
          navigate('/dashboard', { replace: true });
        }
      }
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner size={50} color="#4A90E2" />
      </div>
    );
  }

  // Don't render login form if authenticated
  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="md:flex h-[100vh]">
      <div className="md:w-[50%]">
        <SideLeftAuth h1="Login" src={Bg} alt="Login Background" />
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
                    {error && (
                      <div className="text-red-500 text-center">
                        {error}
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
                        label={loading ? "Logging in..." : "Login"} 
                        disabled={isSubmitting || loading} 
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
