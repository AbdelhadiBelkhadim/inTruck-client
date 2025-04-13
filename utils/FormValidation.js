
import * as Yup from 'yup';

const passwordRules = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; // At least one uppercase letter, one lowercase letter, one number, and one special character
export const companySchema = Yup.object().shape({
    email: Yup.string().email("Please enter a valid email").required("Required"),
    password: Yup
        .string()
        .min(6 ,'Password is too short')
        .matches(passwordRules, { message: "'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'" })
        .required("Required"),
    confirmPassword: Yup
        .string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Required"),
    companyName: Yup.string().min(2, 'Company name is too short').required('Company name is required'),
    rc: Yup.string().required('Registration number is required'),
    nIf: Yup.string().required('Tax identification number is required'),
    phone: Yup.string().matches(/^\+?[0-9]{10,14}$/, 'Phone number is not valid').required('Company phone number is required'),
    address: Yup.string().required('Company address is required'),
    responsableName: Yup.string().min(3, 'Responsible person name is too short').required('Responsible person name is required'),
});
export const individualSchema = Yup.object().shape({
    fullName: Yup.string().min(3, 'Full name must be at least 3 characters').max(15, 'Must be 15 characters or less').required('Full name is required'),
    nationalId: Yup.string().required('National ID is required'),
    email: Yup.string().email("Please enter a valid email").required("Required"),
    phone: Yup.string().matches(/^\+?[0-9]{10,14}$/, 'Phone number is not valid').required('Phone number is required'),
    address: Yup.string().required('Address is required'),
    password: Yup
        .string()
        .min(6, 'Password is too short')
        .matches(passwordRules, { message: "'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'" })
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