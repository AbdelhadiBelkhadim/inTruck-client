import React from 'react';
import { Formik, Form } from 'formik';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { companySchema } from '../../../../utils/FormValidation';

import Input from '../../ui/authInput';
import Button from '../../ui/secondaryBtn';

const CompanyCase = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  
  // API function to register a company //https://intruck-backend-production.up.railway.app/auth/register
  const registerCompany = async (companyData) => {
    const response = await axios.post('https://intruck-backend-production.up.railway.app/auth/register', companyData);
    return response.data;
  };

  // Initial form values (✅ all field names corrected)
  const initialValues = {
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'Company',
    phone: '',
    address: '',
    companyName: '',
    rc: '',
    nIf: '',
    responsableName: ''
  };

  // Set up mutation
  const registerMutation = useMutation({
    mutationFn: registerCompany,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      if (data.token) localStorage.setItem('token', data.token);
      if (data.user) localStorage.setItem('user', JSON.stringify(data.user));
      alert('Company registration successful!');
      navigate('/login');
    },
    onError: (error) => {
      console.error('Registration failed:', error);
    }
  });

  // Submit handler
  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    const registrationData = { ...values };
    delete registrationData.confirmPassword;

    registerMutation.mutate(registrationData, {
      onSettled: () => setSubmitting(false),
      onSuccess: () => resetForm()
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={companySchema}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
        <Form className="Form space-y-[32px] md:space-y-[48px]" onSubmit={handleSubmit} autoComplete="off">
          <div className="space-y-[30px] md:space-y-[40px]">
            <Input
              label="Company Name"
              name="companyName"
              type="text"
              placeholder="Ex: inTruck company"
              value={values.companyName}
              onChange={handleChange}
              errors={touched.companyName && errors.companyName}
              onBlur={handleBlur}
            />
            <Input
              label="Registration Number (RC)"
              name="rc"
              type="text"
              placeholder="Ex: 12345678"
              value={values.rc}
              onChange={handleChange}
              errors={touched.rc && errors.rc}
              onBlur={handleBlur}
            />
            <Input
              label="Tax Identification Number (NIF)"
              name="nIf"
              type="text"
              placeholder="Ex: 987654321"
              value={values.nIf}
              onChange={handleChange}
              errors={touched.nIf && errors.nIf}
              onBlur={handleBlur}
            />
            <Input
              label="Company Email"
              name="email"
              type="email"
              placeholder="Ex: inTruck@example.com"
              value={values.email}
              onChange={handleChange}
              errors={touched.email && errors.email}
              onBlur={handleBlur}
            />
            <Input
              label="Company Phone Number"
              name="phone"
              type="text"
              placeholder="Ex: +212 564253424"
              value={values.phone}
              onChange={handleChange}
              errors={touched.phone && errors.phone}
              onBlur={handleBlur}
            />
            <Input
              label="Company Address"
              name="address"
              type="text"
              placeholder="Ex: Avenue Hassan II, Casablanca, Maroc"
              value={values.address}
              onChange={handleChange}
              errors={touched.address && errors.address}
              onBlur={handleBlur}
            />
            <Input
              label="Responsible Person's Full Name"
              name="responsableName"
              type="text"
              placeholder="Full name"
              value={values.responsableName}
              onChange={handleChange}
              errors={touched.responsableName && errors.responsableName}
              onBlur={handleBlur}
            />
            <Input
              label="Password"
              name="password"
              type="password"
              placeholder="Ex: MySecurePass2024!"
              value={values.password}
              onChange={handleChange}
              errors={touched.password && errors.password}
              onBlur={handleBlur}
            />
            <Input
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              placeholder="MySecurePass2024!"
              value={values.confirmPassword}
              onChange={handleChange}
              errors={touched.confirmPassword && errors.confirmPassword}
              onBlur={handleBlur}
            />
            {registerMutation.isError && (
              <div className="text-red-500 text-sm text-center">
                {registerMutation.error.response?.data?.message || 'An error occurred during registration'}
              </div>
            )}
          </div>
          <div className="flex items-center justify-center mx-auto px-3 md:px-0">
            <Button 
              label={registerMutation.isLoading ? "Creating Account..." : "Create Account"} 
              disabled={isSubmitting || registerMutation.isLoading} 
              type="enabled" 
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CompanyCase;
