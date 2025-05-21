import { ForgotAPIResponse, RegisterData } from '@/types/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


  interface registerState {
    register: RegisterData | null;
    isRegisterLoading: boolean;
    isRegisterError: string | null;
    registerResendOTP: ForgotAPIResponse | null;
    isRegisterResendOTPLoading: boolean
    isRegisterResendOTPError: string | null
  }


const initialState: registerState = {
  register: null,
  isRegisterLoading: false,
  isRegisterError: null,
  registerResendOTP: null,
  isRegisterResendOTPLoading: false,
  isRegisterResendOTPError: null
};

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    registerStart(state) {
      state.isRegisterLoading = true;
      state.isRegisterError = null;
    },
    registerSuccess(state, action: PayloadAction<RegisterData>) {
      state.register = action.payload;
      state.isRegisterLoading= false;
      state.isRegisterError = null;

    },
    registerFailure(state, action: PayloadAction<string>) {
      state.isRegisterLoading= false;
      state.isRegisterError = action.payload;
    },

     registerResendOTPStart(state) {
          state.isRegisterResendOTPLoading = true;
          state.isRegisterError = null;
        },
        registerResendOTPSuccess(state, action: PayloadAction<ForgotAPIResponse>) {
          state.registerResendOTP = action.payload
          state.isRegisterResendOTPLoading = false;
          state.isRegisterResendOTPError = null;
        },
        registerResendOTPFailure(state, action: PayloadAction<string>) {
          state.isRegisterResendOTPLoading = false;
          state.isRegisterResendOTPError = action.payload;
        },
    
  },
});

export const { registerStart, registerSuccess, registerFailure, registerResendOTPStart, registerResendOTPSuccess, registerResendOTPFailure} = registerSlice.actions;
export default registerSlice.reducer;