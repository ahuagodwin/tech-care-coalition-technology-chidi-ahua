import { publicRequest, setAuthToken, userRequest } from "@/api/connect";
import { AppDispatch, persistor } from "@/store";
import { ForgotAPIResponse, LoginCredentials, RegisterData, ToastHook, VerifyAPIResponse } from "@/types/types";
import { registerFailure, registerStart, registerSuccess } from "../auth/registerSlice";
import { getNetworkErrorMessage } from "@/utils/utils"
import { apiPaths } from "@/constant/api";
import { router } from "expo-router";
import { verifyFailure, verifyStart, verifySuccess } from "../auth/verifySlice";
import { loginFailure, loginStart, loginSuccess, logoutFailure, logoutStart, logoutSuccess } from "../auth/loginSlice";
import { asyncStorageAuthKey, removeFromAsyncStorage } from "@/config/storage";
import { forgotFailure, forgotOTPFailure, forgotOTPStart, forgotOTPSuccess, forgotResetFailure, forgotResetStart, forgotResetSuccess, forgotStart, forgotSuccess } from "../auth/forgotSlice";

export const loginUser = (credentials: LoginCredentials, Toast: ToastHook) => async (dispatch: AppDispatch) => {
  try { 
    dispatch(loginStart());
    const res = await publicRequest.post(apiPaths.login, credentials);
      if(res?.status === 200) {
        const { data, message } = res.data;
        dispatch(loginSuccess({ auth: data?.user, token: data?.token, message }));
        Toast.showSuccess(res?.data?.message);
      } 
  } catch (error: any) {
    let errorMessage = error?.response?.data?.message || error?.response?.data?.error

    if (!errorMessage) {
      errorMessage = getNetworkErrorMessage(error);
    }
      dispatch(loginFailure(errorMessage));
      Toast.showError(errorMessage);
  }
};


export const createRegisterAction = (credentials: RegisterData, Toast: ToastHook) => async (dispatch: AppDispatch) => {
    try {
      dispatch(registerStart());

    const res = await publicRequest.post<RegisterData>(apiPaths.register, credentials);
        if(res?.status === 201) {
          dispatch(registerSuccess(res?.data));
          Toast.showSuccess(res?.data?.message || res?.statusText)

        router.navigate({
          pathname: "/verifySignup",
          params: { email: credentials?.email }
        });
        }
    } catch (error: any) {
        let errorMessage = error?.response?.data?.message || error?.response?.data?.error

      if (!errorMessage) {
        errorMessage = getNetworkErrorMessage(error);
      }
      dispatch(registerFailure(errorMessage));
      Toast.showError(errorMessage);
    }
  };


  export const verifyRegisterCodeAction = (credentials: VerifyAPIResponse, Toast: ToastHook) => async (dispatch: AppDispatch) => {
    try {
      dispatch(verifyStart());

    const res = await publicRequest.post<VerifyAPIResponse>(apiPaths.verify, credentials);
        if(res?.status === 200) {
          dispatch(verifySuccess(res?.data));
          // Toast.success(res?.data?.message || res?.statusText)
          router.replace("/success");
        }
    } catch (error: any) {
        let errorMessage = error?.response?.data?.message || error?.response?.data?.error

      if (!errorMessage) {
        errorMessage = getNetworkErrorMessage(error);
      }
      dispatch(verifyFailure(errorMessage));
      Toast.showError(errorMessage);
    }
  };


  export const logoutUserAction = (Toast: ToastHook) => async (dispatch: AppDispatch) => {
    try {
      dispatch(logoutStart());

    const res = await userRequest.post(apiPaths.logout);
        if(res?.status === 200) {
          dispatch(logoutSuccess());
          await persistor.purge();
          Toast.showSuccess(res?.data?.message || res?.statusText)
          await removeFromAsyncStorage(asyncStorageAuthKey)
          setAuthToken('');
        }
    } catch (error: any) {
        let errorMessage = error?.response?.data?.message || error?.response?.data?.error

      if (!errorMessage) {
        errorMessage = getNetworkErrorMessage(error);
      }
      dispatch(logoutFailure(errorMessage));
      Toast.showError(errorMessage);
    }
  };


  export const forgotPasswordAction = (credentials: ForgotAPIResponse, Toast: ToastHook) => async (dispatch: AppDispatch) => {
    try {
      dispatch(forgotStart());
    const res = await publicRequest.post<ForgotAPIResponse>(apiPaths.forgot, credentials);
        if(res?.status === 200) {
          dispatch(forgotSuccess(res?.data));
        }
    } catch (error: any) {
        let errorMessage = error?.response?.data?.message || error?.response?.data?.error

      if (!errorMessage) {
        errorMessage = getNetworkErrorMessage(error);
      }
      dispatch(forgotFailure(errorMessage));
      Toast.showError(errorMessage);
    }
  };


  export const forgotPasswordVerifyAction = (credentials: VerifyAPIResponse, router: any, Toast: ToastHook) => async (dispatch: AppDispatch) => {
    try {
      dispatch(forgotOTPStart());
    const res = await publicRequest.post<VerifyAPIResponse>(apiPaths.forgot_verify, credentials);
        if(res?.status === 200) {
          const { message } = res?.data
          dispatch(forgotOTPSuccess(res?.data));
          Toast.showSuccess(message || res?.statusText);
          router()
        }
    } catch (error: any) {
        let errorMessage = error?.response?.data?.message || error?.response?.data?.error

      if (!errorMessage) {
        errorMessage = getNetworkErrorMessage(error);
      }
      dispatch(forgotOTPFailure(errorMessage));
      Toast.showError(errorMessage);
    }
  };

  export const forgotPasswordResetAction = (credentials: ForgotAPIResponse, Toast: ToastHook) => async (dispatch: AppDispatch) => {
    try {
      dispatch(forgotResetStart());
    const res = await publicRequest.post<ForgotAPIResponse>(apiPaths.forgot_reset, credentials);
        if(res?.status === 200) {
          const { message } = res?.data
          dispatch(forgotResetSuccess(res?.data));
          Toast.showSuccess(message || res?.statusText);
          router.replace("/success")
        }
    } catch (error: any) {
        let errorMessage = error?.response?.data?.message || error?.response?.data?.error

      if (!errorMessage) {
        errorMessage = getNetworkErrorMessage(error);
      }
      dispatch(forgotResetFailure(errorMessage));
      Toast.showError(errorMessage);
    }
  };



  export const forgotPasswordResendOTPAction = (credentials: ForgotAPIResponse, Toast: ToastHook) => async (dispatch: AppDispatch) => {
    try {
      dispatch(forgotStart());
    const res = await publicRequest.post<ForgotAPIResponse>(apiPaths.forgot_resend, credentials);
        if(res?.status === 200) {
          dispatch(forgotSuccess(res?.data));
          Toast.showSuccess(res?.data?.message || res?.statusText)
        }
    } catch (error: any) {
        let errorMessage = error?.response?.data?.message || error?.response?.data?.error

      if (!errorMessage) {
        errorMessage = getNetworkErrorMessage(error);
      }
      dispatch(forgotFailure(errorMessage));
      Toast.showError(errorMessage);
    }
  };