import React from 'react'
import { useFormik } from 'formik'
import { individualSchema } from '../../../../utils/FormValidation'

import Input from '../../ui/authInput'
import Button from '../../ui/secondaryBtn'

const IndividualCase = () => {
  const initialValues = {
    FullName: '',
    NationalID: '',
    Email: '',
    PhoneNumber: '',
    Address: '',
    Password: '',
    ConfirmPassword: '',
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
    <form className="Form space-y-[32px]" onSubmit={formik.handleSubmit}>
      <div className="">
        <div className="flex justify-center">
          <Input
            label="Full Name"
            type="text"
            name="FullName"
            placeholder="Your Name"
            onChange={(e) => (handleInputChange(e))}
            errors={formik.errors.fullName}
          />
        </div>
        <div className="flex justify-center">
          <Input
            label="National ID or Passport Number"
            type="text"
            name="NationalID"
            placeholder="Ex: 12345678"
            onChange={(e) => (handleInputChange(e))}
            errors={formik.errors.nationalID}
          />
        </div>
        <div className="flex justify-center">
          <Input
            label="Email"
            type="email"
            name="Email"
            placeholder="Ex: yourname@gmail.com"
            onChange={(e) => (handleInputChange(e))}
            errors={formik.errors.email}
          />
        </div>
        <div className="flex justify-center">
          <Input
            label="Phone Number"
            type="text"
            name="PhoneNumber"
            placeholder="Ex: +212 564253424"
            onChange={(e) => (handleInputChange(e))}
            errors={formik.errors.phoneNumber}
          />
        </div>
        <div className="flex justify-center">
          <Input
            label="Address"
            type="text"
            name="Address"
            placeholder="Ex: Avenue Hassan II, Casablanca, Maroc"
            onChange={(e) => (handleInputChange(e))}
            errors={formik.errors.address}
          />
        </div>
        <div className="flex justify-center">
          <Input
            label="Password"
            type="password"
            name="Password"
            placeholder="Ex: MySecurePass2024!"
            onChange={(e) => (handleInputChange(e))}
            errors={formik.errors.password}
          />
        </div>
        <div className="flex justify-center">
          <Input
            label="Confirm Password"
            type="password"
            name="ConfirmPassword"
            placeholder="MySecurePass2024!"
            onChange={(e) => (handleInputChange(e))}
            errors={formik.errors.confirmPassword}
          />
        </div>
      </div>
      <div className="flex items-center justify-center">
        <Button
          label="Register"
          type="submit"
          size="large"
          withprop="full"
        />
      </div>
    </form>
  );
};

export default IndividualCase