import React from 'react';
import { useFormik } from 'formik';
import { companySchema } from '../../../../utils/FormValidation';

import Input from '../../ui/authInput';
import Button from '../../ui/secondaryBtn';

const CompanyCase = () => {
  const initialValues = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    registrationNumber: '',
    taxIdentificationNumber: '',
    companyPhoneNumber: '',
    companyAddress: '',
    responsiblePersonName: '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema: companySchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    formik.setFieldValue(name, value);
    formik.setFieldError(name, '');
  };

  return (
    <form className="Form space-y-[35px] md:space-y-[50px]" onSubmit={formik.handleSubmit}>
      <div className='space-y-[30px] md:space-y-[40px]'>
        <div className="flex justify-center">
          <Input
            label="Company Name"
            name="companyName"
            type="text"
            placeholder="Ex: inTruck company"
            onChange={handleInputChange}
            errors={formik.errors.companyName}
          />
        </div>
        <div className="flex justify-center">
          <Input
            label="Registration Number (RC)"
            name="registrationNumber"
            type="text"
            placeholder="Ex: 12345678"
            onChange={handleInputChange}
            errors={formik.errors.registrationNumber}
          />
        </div>
        <div className="flex justify-center">
          <Input
            label="Tax Identification Number (IF)"
            name="taxIdentificationNumber"
            type="text"
            placeholder="Ex: 987654321"
            onChange={handleInputChange}
            errors={formik.errors.taxIdentificationNumber}
          />
        </div>
        <div className="flex justify-center">
          <Input
            label="Company Email"
            name="email"
            type="email"
            placeholder="Ex: inTruck@example.com"
            onChange={handleInputChange}
            errors={formik.errors.email}
          />
        </div>
        <div className="flex justify-center">
          <Input
            label="Company Phone Number"
            name="companyPhoneNumber"
            type="text"
            placeholder="Ex: +212 564253424"
            onChange={handleInputChange}
            errors={formik.errors.companyPhoneNumber}
          />
        </div>
        <div className="flex justify-center">
          <Input
            label="Company Address"
            name="companyAddress"
            type="text"
            placeholder="Ex: Avenue Hassan II, Casablanca, Maroc"
            onChange={handleInputChange}
            errors={formik.errors.companyAddress}
          />
        </div>
        <div className="flex justify-center">
          <Input
            label="Responsible Person's Full Name"
            name="responsiblePersonName"
            type="text"
            placeholder="full name"
            onChange={handleInputChange}
            errors={formik.errors.responsiblePersonName}
          />
        </div>
        <div className="flex justify-center">
          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="Ex: MySecurePass2024!"
            onChange={handleInputChange}
            errors={formik.errors.password}
          />
        </div>
        <div className="flex justify-center">
          <Input
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            placeholder="MySecurePass2024!"
            onChange={handleInputChange}
            errors={formik.errors.confirmPassword}
          />
        </div>
      </div>
      <div className="flex items-center justify-center mx-auto">
        <Button label="Create Account" type="enabled" />
      </div>
    </form>
  );
};

export default CompanyCase;