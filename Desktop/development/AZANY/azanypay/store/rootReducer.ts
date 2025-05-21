import { combineReducers } from '@reduxjs/toolkit';
// AUTH
import authReducer from '@/services/auth/loginSlice';
import registerReducer from "@/services/auth/registerSlice"
import verifyReducer from "@/services/auth/verifySlice"
import forgotReducer from "@/services/auth/forgotSlice"

// COUNTRIES
import countriesReducer from "@/services/countries/countrySlice"
// import other reducers here if needed

const rootReducer = combineReducers({
      auth: authReducer,
      register: registerReducer,
      verify: verifyReducer,
      forgot: forgotReducer,
      countries: countriesReducer

});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;