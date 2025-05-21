import * as yup from "yup"

export const profileSchema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
})


export const transferSchema = yup.object().shape({
  selectedCurrency: yup.string().required("Select a currency"),
  sendAmount: yup.number().when("step", {
    is: 2,
    then: (schema) =>
      schema.required("Required").min(1, "Must be greater than 0"),
  }),
  receiveAmount: yup.number().when("step", {
    is: 2,
    then: (schema) => schema.required("Required"),
  }),
})


const LoginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(8, "Password must be at least 6 characters").required("Password is required"),
   rememberMe: yup.boolean()
});

const RegisterSchema = yup.object().shape({
  first_name: yup.string()
  .required('First name is required')
  .min(2, 'First name must be at least 2 characters')
  .max(50, 'First name cannot exceed 50 characters'),

  last_name: yup.string()
    .required('Last name is required')
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name cannot exceed 50 characters'),

  email: yup.string()
    .email('Please enter a valid email address')
    .required('Email address is required'),

  password: yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    ),

  country_id: yup.string()
    .required('Country is required')
});


const verificationSchema = yup.object().shape({
  code: yup.string()
    .required('OTP is required')
    .length(4, 'OTP must be 4 digits')
    .matches(/^[0-9]+$/, 'OTP must contain only numbers')
});


  const forgotSchema = yup.object().shape({
    email: yup.string()
      .email("Please enter a valid email")
      .required("Email is required")
  });

  const forgotVerifySchema = yup.object().shape({
    verification_code: yup.string()
      .required("OTP is required")
      .length(4, "OTP must be 4 digits")
  });

  const forgotResetSchema = yup.object({
    email: yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[A-Z])(?=.*[0-9])/,
        "Password must include at least 1 capital letter and 1 number"
      ),
    password_confirmation: yup.string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Confirm password is required")
  });




// Schema's
export const schema = {
    profileSchema,
    transferSchema,
    LoginSchema,
    RegisterSchema,
    verificationSchema,
    forgotSchema,
    forgotVerifySchema,
    forgotResetSchema
}