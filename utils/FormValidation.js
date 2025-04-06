import * as Yup from 'yup';
export const companySchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password is too short').required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirmation password is required'),
    companyName: Yup.string().min(2, 'Company name is too short').required('Company name is required'),
    registrationNumber: Yup.string().required('Registration number is required'),
    TaxIdentificationNumber: Yup.string().required('Tax identification number is required'),
    companyPhoneNumber: Yup.string().required('Company phone number is required'),
    companyAddress: Yup.string().required('Company address is required'),
    responsiblePersonName: Yup.string().min(3, 'Responsible person name is too short').required('Responsible person name is required'),
});
export const individualSchema = Yup.object().shape({
    fullName: Yup.string().min(3, 'Full name must be at least 3 characters').required('Full name is required'),
    nationalID: Yup.string().required('National ID is required'),
    email: Yup.string().email('You need a valid email').required('Email is required'),
    phoneNumber: Yup.string().required('Phone number is required'),
    address: Yup.string().required('Address is required'),
    password: Yup.string().min(6, 'Password is too short').required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirmation password is required'),
});


export const loginpSchema = Yup.object().shape({
    Email: Yup.string().email('Invalid email').required('you need a valid email'),
    Password: Yup.string().min(6, 'Password is too short').required('you need a strong password'),
});