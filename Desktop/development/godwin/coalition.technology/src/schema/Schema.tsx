import * as yup from "yup"

export const LoginSchema = yup.object({
    username: yup.string().required('Username is Required'),
    password: yup.string().required('Password is Required')
  });


  export const Schema = {
    LoginSchema
  }