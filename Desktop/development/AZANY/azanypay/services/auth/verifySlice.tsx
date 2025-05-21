
import { VerifyAPIResponse } from '@/types/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


  interface verifyState {
    verify: VerifyAPIResponse | null;
    isVerifyLoading: boolean;
    isVerifyError: string | null;
  }

const initialState: verifyState = {
  verify: null,
  isVerifyLoading: false,
  isVerifyError: null,
};

const verifySlice = createSlice({
  name: 'verify',
  initialState,
  reducers: {
    verifyStart(state) {
      state.isVerifyLoading = true;
      state.isVerifyError = null;
    },
    verifySuccess(state, action: PayloadAction<VerifyAPIResponse>) {
      state.verify = action.payload;
      state.isVerifyLoading= false;
      state.isVerifyError = null;

    },
    verifyFailure(state, action: PayloadAction<string>) {
      state.isVerifyLoading= false;
      state.isVerifyError = action.payload;
    }
  },
});

export const { verifyStart, verifySuccess, verifyFailure} = verifySlice.actions;
export default verifySlice.reducer;