
import * as Yup from 'yup';

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
export const companySchema = Yup.object().shape({
    email: Yup.string().email("Please enter a valid email").required("Required"),
    password: Yup
        .string()
        .min(6 ,'Password is too short')
        .matches(passwordRules, { message: "Please create a stronger password" })
        .required("Required"),
    confirmPassword: Yup
        .string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Required"),
    companyName: Yup.string().min(2, 'Company name is too short').required('Company name is required'),
    registrationNumber: Yup.string().required('Registration number is required'),
    taxIdentificationNumber: Yup.string().required('Tax identification number is required'),
    companyPhoneNumber: Yup.string().required('Company phone number is required'),
    companyAddress: Yup.string().required('Company address is required'),
    responsiblePersonName: Yup.string().min(3, 'Responsible person name is too short').required('Responsible person name is required'),
});
export const individualSchema = Yup.object().shape({
    fullName: Yup.string().min(3, 'Full name must be at least 3 characters').required('Full name is required'),
    nationalID: Yup.string().required('National ID is required'),
    email: Yup.string().email("Please enter a valid email").required("Required"),
    phoneNumber: Yup.string().required('Phone number is required'),
    address: Yup.string().required('Address is required'),
    password: Yup
        .string()
        .min(6, 'Password is too short')
        .matches(passwordRules, { message: "Please create a stronger password" })
        .required("Required"),
    confirmPassword: Yup
        .string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Required"),
});



export const loginSchema = Yup.object().shape({
    email: Yup.string().email("Please enter a valid email").required("Required"),
    password: Yup.string().min(6, 'Password is too short').required('Password is required'),
});