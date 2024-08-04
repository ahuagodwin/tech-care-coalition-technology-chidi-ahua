import { publicRequest } from "@/api/connect";
import { authUserFailure, authUserStart, authUserSuccess } from "@/services/slices/auth/login";
import { toast } from "react-toastify";
import { Dispatch } from "redux";



export const loginAction = (username: string, password: string) => async (dispatch: Dispatch) => {
  try {
    dispatch(authUserStart());

    // encoding the username and password for Basic Auth
    const encodedCredentials = btoa(`${username}:${password}`);
    
    const res = await publicRequest.get('', {
      headers: {
        Authorization: `Basic ${encodedCredentials}`,
      },
      params: {
        username,
        password
      }
    });

    if (res?.status === 200) {
      const authHeader = res?.config?.headers?.Authorization || '';
      localStorage.setItem('@basicAuth', JSON.stringify(authHeader));
      dispatch(authUserSuccess(res?.data));
      toast.success(res?.data?.message || "Authenticated Successfully");
    }
  } catch (isAuthUserError: any) {
    dispatch(authUserFailure(isAuthUserError?.response?.data?.error_message || "Authentication failed. Please try again."));
  }
};
