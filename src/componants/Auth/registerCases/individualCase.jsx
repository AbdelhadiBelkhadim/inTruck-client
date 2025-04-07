import React from 'react'
import { useFormik } from 'formik'
import { individualSchema } from '../../../../utils/FormValidation'

import Input from '../../ui/authInput'
import Button from '../../ui/secondaryBtn'

const IndividualCase = () => {
  const initialValues = {
    fullName: '',
    nationalID: '',
    email: '',
    phoneNumber: '',
    address: '',
    password: '',
    confirmPassword: '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema: individualSchema,
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
            label="Full Name"
            type="text"
            name="fullName"
            placeholder="Your Name"
            onChange={handleInputChange}
            errors={formik.errors.fullName}
          />
        </div>
        <div className="flex justify-center">
          <Input
            label="National ID or Passport Number"
            type="text"
            name="nationalID"
            placeholder="Ex: 12345678"
            onChange={handleInputChange}
            errors={formik.errors.nationalID}
          />
        </div>
        <div className="flex justify-center">
          <Input
            label="Email"
            type="email"
            name="email"
            placeholder="Ex: yourname@gmail.com"
            onChange={handleInputChange}
            errors={formik.errors.email}
          />
        </div>
        <div className="flex justify-center">
          <Input
            label="Phone Number"
            type="text"
            name="phoneNumber"
            placeholder="Ex: +212 564253424"
            onChange={handleInputChange}
            errors={formik.errors.phoneNumber}
          />
        </div>
        <div className="flex justify-center">
          <Input
            label="Address"
            type="text"
            name="address"
            placeholder="Ex: Avenue Hassan II, Casablanca, Maroc"
            onChange={handleInputChange}
            errors={formik.errors.address}
          />
        </div>
        <div className="flex justify-center">
          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="Ex: MySecurePass2024!"
            onChange={handleInputChange}
            errors={formik.errors.password}
          />
        </div>
        <div className="flex justify-center">
          <Input
            label="Confirm Password"
            type="password"
            name="confirmPassword"
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

export default IndividualCase