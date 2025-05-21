import { ForgotAPIResponse, VerifyAPIResponse } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface forgotState {
  forgot: ForgotAPIResponse | null;
  forgotOtp: VerifyAPIResponse | null;
  isForgotLoading: boolean;
  isForgotOtpLoading: boolean;
  isForgotError: string | null;
  isForgotOtpError: string | null;
  forgotReset: ForgotAPIResponse | null;
  isForgotResetLoading: boolean;
  isForgotResetError: string | null;
  isActive: boolean;
}

const initialState: forgotState = {
  forgot: null,
  forgotOtp: null,
  isForgotLoading: false,
  isForgotOtpLoading: false,
  isForgotError: null,
  isForgotOtpError: null,
  forgotReset: null,
  isForgotResetLoading: false,
  isForgotResetError: null,
  isActive: false,
};

const forgotSlice = createSlice({
  name: "forgot",
  initialState,
  reducers: {
    forgotStart(state) {
      state.isForgotLoading = true;
      state.isForgotError = null;
      state.isActive = false;
    },
    forgotSuccess(state, action: PayloadAction<ForgotAPIResponse>) {
      state.forgot = action.payload;
      state.isActive = true;
      state.isForgotLoading = false;
      state.isForgotError = null;
    },
    forgotFailure(state, action: PayloadAction<string>) {
      state.isForgotLoading = false;
      state.isForgotError = action.payload;
      state.isActive = false;
    },

    // VERIFY FORGOT OTP
    forgotOTPStart(state) {
      state.isForgotOtpLoading = true;
      state.isForgotOtpError = null;
      state.isActive = false;
    },
    forgotOTPSuccess(state, action: PayloadAction<VerifyAPIResponse>) {
      state.forgotOtp = action.payload;
      state.isActive = true;
      state.isForgotOtpLoading = false;
      state.isForgotOtpError = null;
    },
    forgotOTPFailure(state, action: PayloadAction<string>) {
      state.isForgotOtpLoading = false;
      state.isForgotOtpError = action.payload;
      state.isActive = false;
    },

    // VERIFY FORGOT OTP
    forgotResetStart(state) {
      state.isForgotResetLoading = true;
      state.isForgotResetError = null;
      state.isActive = false;
    },
    forgotResetSuccess(state, action: PayloadAction<ForgotAPIResponse>) {
      state.forgotReset = action.payload;
      state.isActive = true;
      state.isForgotResetLoading = false;
      state.isForgotResetError = null;
    },
    forgotResetFailure(state, action: PayloadAction<string>) {
      state.isForgotResetLoading = false;
      state.isForgotResetError = action.payload;
      state.isActive = false;
    },
    setIsForgotActive(state, action: PayloadAction<boolean>) {
      state.isActive = action.payload;
    },
  },
});

export const {
  forgotStart,
  forgotSuccess,
  forgotFailure,
  setIsForgotActive,
  forgotOTPStart,
  forgotOTPSuccess,
  forgotOTPFailure,
  forgotResetFailure,
  forgotResetStart,
  forgotResetSuccess
} = forgotSlice.actions;
export default forgotSlice.reducer;
