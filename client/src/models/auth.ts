import * as yup from 'yup';

export interface User {
  name: string;
  username: string;
  password: string;
  gender: string;
  email: string;
}

export const registerSchema = yup.object({
  name: yup.string().required('Name is required'),
  username: yup.string().required('Username is required'),
  password: yup
    .string()
    .min(3, 'Password must be at least 3 characters')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  gender: yup.string().required('Gender is required'),
});

export const loginSchema = yup.object({
  username: registerSchema.fields.username,
  password: registerSchema.fields.password,
});
