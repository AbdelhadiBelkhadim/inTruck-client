import React from 'react';
import { Formik, Form } from 'formik';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { registerIndividual } from '../../../api/Api'; // Adjust the import path as needed
import { individualSchema } from '../../../../utils/FormValidation';
import Input from '../../ui/AuthInput';
import Button from '../../ui/SecondaryBtn';

const IndividualCase = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();


  // ✅ Initial form values - match backend expectations
  const initialValues = {
    fullName: '',
    nationalId: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: '',
    userType: 'Individual' // Required by backend to branch logic
  };

  // ✅ React Query mutation
  const registerMutation = useMutation({
    mutationFn: registerIndividual,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['user'] });

      if (data.token) {
        localStorage.setItem('token', data.token); // Store token in local storage
      }

      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user)); // Store user data in local storage
      }

      alert('Registration successful!');
      navigate('/login');
    },
    onError: (error) => {
      console.error('❌ Registration failed:', error);
    }
  });

  // ✅ Formik submit handler
  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    const payload = { ...values };
    delete payload.confirmPassword; // not needed by backend

    registerMutation.mutate(payload, {
      onSettled: () => setSubmitting(false),
      onSuccess: () => resetForm()
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={individualSchema}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
        <Form
          className="Form space-y-[32px] md:space-y-[48px]"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <div className="space-y-[30px] md:space-y-[40px]">
            <Input
              label="Full Name"
              type="text"
              name="fullName"
              placeholder="Your Name"
              value={values.fullName}
              onChange={handleChange}
              errors={touched.fullName && errors.fullName}
              onBlur={handleBlur}
            />

            <Input
              label="National ID or Passport Number"
              type="text"
              name="nationalId"
              placeholder="Ex: 12345678"
              value={values.nationalId}
              onChange={handleChange}
              errors={touched.nationalId && errors.nationalId}
              onBlur={handleBlur}
            />

            <Input
              label="Email"
              type="email"
              name="email"
              placeholder="Ex: yourname@gmail.com"
              value={values.email}
              onChange={handleChange}
              errors={touched.email && errors.email}
              onBlur={handleBlur}
            />

            <Input
              label="Phone Number"
              type="text"
              name="phone"
              placeholder="Ex: +212 564253424"
              value={values.phone}
              onChange={handleChange}
              errors={touched.phone && errors.phone}
              onBlur={handleBlur}
            />

            <Input
              label="Address"
              type="text"
              name="address"
              placeholder="Ex: Avenue Hassan II, Casablanca, Maroc"
              value={values.address}
              onChange={handleChange}
              errors={touched.address && errors.address}
              onBlur={handleBlur}
            />

            <Input
              label="Password"
              type="password"
              name="password"
              placeholder="Ex: MySecurePass2024!"
              value={values.password}
              onChange={handleChange}
              errors={touched.password && errors.password}
              onBlur={handleBlur}
            />

            <Input
              label="Confirm Password"
              type="password"
              name="confirmPassword"
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
              label={registerMutation.isLoading ? 'Creating Account...' : 'Create Account'}
              disabled={isSubmitting || registerMutation.isLoading}
              type="enabled"
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default IndividualCase;