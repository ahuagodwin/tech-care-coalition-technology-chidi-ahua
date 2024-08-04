import { configureStore } from '@reduxjs/toolkit';
import authUserReducer from "../services/slices/auth/login"


export const store = configureStore({
    reducer: {
        authUser: authUserReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;