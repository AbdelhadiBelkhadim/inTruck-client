import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Validation schema using Yup
const validationSchema = Yup.object({
  firstName: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('First name is required'),
  lastName: Yup.string()
    .max(20, 'Must be 20 characters or less')
    .required('Last name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    )
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
  phoneNumber: Yup.string()
    .matches(/^\+?[0-9]{10,14}$/, 'Phone number is not valid')
    .required('Phone number is required'),
  age: Yup.number()
    .positive('Age must be a positive number')
    .integer('Age must be an integer')
    .min(18, 'You must be at least 18 years old')
    .required('Age is required'),
  terms: Yup.boolean()
    .oneOf([true], 'You must accept the terms and conditions')
});

// Initial form values
const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  phoneNumber: '',
  age: '',
  terms: false
};

// Form submission handler
const handleSubmit = (values, { setSubmitting, resetForm }) => {
  // In a real app, you would send the form data to your backend here
  setTimeout(() => {
    console.log('Form values:', values);
    alert('Form submitted successfully!');
    resetForm();
    setSubmitting(false);
  }, 1000);
};

const FormValidationExample = () => {
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Registration Form</h1>
      
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className="space-y-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <Field
                type="text"
                name="firstName"
                id="firstName"
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.firstName && touched.firstName ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <Field
                type="text"
                name="lastName"
                id="lastName"
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.lastName && touched.lastName ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <Field
                type="email"
                name="email"
                id="email"
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.email && touched.email ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <Field
                type="password"
                name="password"
                id="password"
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.password && touched.password ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <Field
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.confirmPassword && touched.confirmPassword ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <Field
                type="text"
                name="phoneNumber"
                id="phoneNumber"
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.phoneNumber && touched.phoneNumber ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              <ErrorMessage name="phoneNumber" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div>
              <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                Age
              </label>
              <Field
                type="number"
                name="age"
                id="age"
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.age && touched.age ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              <ErrorMessage name="age" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div className="flex items-center">
              <Field
                type="checkbox"
                name="terms"
                id="terms"
                className={`h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 ${
                  errors.terms && touched.terms ? 'border-red-500' : ''
                }`}
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                I accept the terms and conditions
              </label>
            </div>
            <ErrorMessage name="terms" component="div" className="text-red-500 text-sm mt-1" />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting...' : 'Register'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormValidationExample;