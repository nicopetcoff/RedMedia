import * as yup from "yup";

export const signUpValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required")
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/, 'Password must contain at least one letter and one number'),
  name: yup
    .string()
    .required("Name is required"),
  lastName: yup
    .string()
    .required("Last name is required"),
  nick: yup
    .string()
    .required("Nickname is required"),
});

export const SignInValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required"),
});