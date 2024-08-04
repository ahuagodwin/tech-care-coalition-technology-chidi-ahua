
import { coalition } from '@/config';
import axios from 'axios';


export const publicRequest = axios.create({
  baseURL: coalition.apiBaseUrl,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const userRequest = axios.create({
  baseURL: coalition.apiBaseUrl,
  headers: {
    "Content-Type": "application/json",

  },
});

export const setAuthToken = (TOKEN: any) => {
  userRequest.defaults.headers.Authorization = `Bearer ${TOKEN}`;
};


const TOKEN: string | null = JSON.parse(localStorage.getItem("@accessToken") || "null");

if (TOKEN) {
  setAuthToken(TOKEN);
}