import { createSlice, PayloadAction } from '@reduxjs/toolkit';


const initialState: AuthUserState = {
  authUser: JSON.parse(localStorage.getItem('@accessToken') || 'null') || null,
  isAuthUserLoading: false,
  isAuthUserError: null,
};


const authUserSlice = createSlice({
  name: 'authUser',
  initialState,
  reducers: {
    authUserStart(state) {
      state.isAuthUserLoading = true;
      state.isAuthUserError = null;
    },

    authUserSuccess(state, action: PayloadAction<AuthUserResponseData>) {
      state.authUser = action.payload;
      state.isAuthUserLoading = false;
      state.isAuthUserError = null;
      localStorage.setItem('@accessToken', JSON.stringify(action.payload));
    },

    authUserFailure(state, action: PayloadAction<string>) {
      state.isAuthUserLoading = false;
      state.isAuthUserError = action.payload;
    },

    logout(state) {
      state.authUser = null;
      localStorage.removeItem('@accessToken');
      localStorage.removeItem('@basicAuth');
    },
  },
});

export const { authUserStart, authUserSuccess, authUserFailure, logout} = authUserSlice.actions;
export default authUserSlice.reducer;