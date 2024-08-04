import { AuthForm, AuthLayout, Caption, ErrorMessage} from "@/components";
import { Link, useNavigate } from "react-router-dom";
import { coalT } from "@/coalition";
import { useFormik } from "formik";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "@/api/store";
import { useDispatch, useSelector } from 'react-redux'
import { apiService } from "@/services";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { paths } from "@/constants";
import { Schema } from "@/schema/Schema";


const LoginAuth = () => {
  const navigate = useNavigate()
  const dispatch:ThunkDispatch<RootState, void, any> = useDispatch();
  const { isAuthUserError, isAuthUserLoading } = useSelector((state: RootState) => state.authUser)

  const token = localStorage.getItem("@basicAuth")


  useEffect(() => {
    if(isAuthUserError) {
      toast.error(isAuthUserError)
    }
  },[isAuthUserError])


  const formik = useFormik({
    initialValues:  {
      username: "",
      password: ""
    },
    validationSchema: Schema.LoginSchema,
    onSubmit: async (values) => {
        await dispatch(apiService.loginAction(values.username, values.password,  navigate))
    },
  })

  useEffect(() => {
    if (token) {
      navigate(paths?.dashboardPatients);
    }
  }, [navigate, token]);


  return (
    <AuthLayout>
      <AuthForm onSubmit={formik.handleSubmit}>
        <Caption label="Welcome Back, Let's" text='Log you in"' />
        <div className="pt-10">
          <div>
          <coalT.Input
            label="Username"
            type="text"
            placeholder="Enter your username"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
          />
           <ErrorMessage touched={formik.touched.username} error={formik.errors.username} />
          </div>
          <div>
          <coalT.Input
            label="Password"
            type="password"
            placeholder="********"
            padding="mt-5"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
           <ErrorMessage touched={formik.touched.password} error={formik.errors.password} />
          </div>

          <section className="flex justify-between items-center font-outfit pt-4 pb-10">
            <p className="flex justify-start items-center gap-3"><coalT.Switch /> <span className="text-blackHeader text-13 font-normal">Remember me</span></p>
            <Link to={"#"} className="text-primary font-semibold text-13 cursor-pointer">Forgot Password?</Link>
          </section>
        
        <coalT.Button
            type="primary"
            size="large"
            className="w-full text-20 font-outfit font-semibold"
            htmlType="submit"
            loading={isAuthUserLoading} 
          >
            Login
          </coalT.Button>
          <p className="text-center text-13 mt-5 font-outfit font-normal">Don't have an account? <span className="text-primary font-semibold pl-1 cursor-pointer">Sign Up</span></p>
        </div>

      </AuthForm>
    </AuthLayout>
  );
};

export default LoginAuth;
