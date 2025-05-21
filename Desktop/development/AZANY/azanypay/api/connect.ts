import { config } from '@/config/config';
import { asyncStorageAuthKey, getFromAsyncStorage } from '@/config/storage';
import axios from 'axios';

const timeout = 150000;

// Create axios instances for public and user requests
export const publicRequest = axios.create({
  baseURL: config.apiBaseUrl,
  timeout,
  headers: { "Content-Type": "application/json" },
});

export const userRequest = axios.create({
  baseURL: config.apiBaseUrl,
  timeout,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// Set the auth token in axios headers
export const setAuthToken = (token: string) => {
  userRequest.defaults.headers.Authorization = `Bearer ${token}`;
};


// Load token on app start - _layout.tsx
export const initializeAuthToken = async () => {
  try {
    const token = await getFromAsyncStorage(asyncStorageAuthKey)
    if (token) {
      setAuthToken(token);
      return token;
    }
    return null;
  } catch (error) {
    console.error('Error initializing auth token:', error);
    return null;
  }
};

// Request interceptor to handle errors
userRequest.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Handling 401 errors (unauthorized) - e.g., token expired
    if (error.response && error.response.status === 401) {
      //TODO: implement token refresh logic here
      // For now, i'll just return the error
    }
    return Promise.reject(error);
  }
);