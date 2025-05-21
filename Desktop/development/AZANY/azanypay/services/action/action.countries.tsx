import { AppDispatch } from "@/store";
import { countriesFailure, countriesStart, countriesSuccess } from "../countries/countrySlice";
import { publicRequest } from "@/api/connect";
import { CountriesAPIResponse, ToastHook } from "@/types/types";
import { getNetworkErrorMessage } from "@/utils/utils";
import { apiPaths } from "@/constant/api";


export const getAllCountriesAction = (Toast: ToastHook) => async (dispatch: AppDispatch) => {
    try {
      dispatch(countriesStart());

    const res = await publicRequest.get<CountriesAPIResponse>(apiPaths.getCountries);
        if(res?.status === 200) {
          dispatch(countriesSuccess(res?.data));
        }
    } catch (error: any) {
        let errorMessage = error?.response?.data?.message || error?.response?.data?.error

      if (!errorMessage) {
        errorMessage = getNetworkErrorMessage(error);
      }
  
      dispatch(countriesFailure(errorMessage));
      Toast.showError(errorMessage);
    }
  };