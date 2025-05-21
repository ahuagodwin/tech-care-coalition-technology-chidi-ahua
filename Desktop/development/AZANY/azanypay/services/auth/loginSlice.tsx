import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setAuthToken } from '@/api/connect';
import { AuthState, User } from '@/types/types';
import { asyncStorageAuthKey, saveToAsyncStorage } from '@/config/storage';


const initialState: AuthState = {
  auth: null,
  isLoading: false,
  error: null,  
  token: null,
  message: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess(state, action: PayloadAction<{ auth: User, token: string,  message: string }>) {
      const { auth, message, token } = action.payload;
      state.auth = auth;
      state.message = message;
      state.token = token;
      state.isLoading = false;
      state.error = null;

      // Store token object in asyncStorage
      saveToAsyncStorage(asyncStorageAuthKey, token);

      setAuthToken(token);
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
      state.message = action.payload;
    },

    // LOGOUT
    logoutStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    logoutSuccess(state) {
      state.auth = null;
      state.message = null;
      state.token = null;
      state.isLoading = false;
      state.error = null;

    },
    logoutFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
      state.message = action.payload;
    },
  },
});

// Export actions and reducer
export const { loginStart, loginSuccess, loginFailure, logoutStart, logoutSuccess, logoutFailure } = authSlice.actions;
export default authSlice.reducer;

