// Then, define the missing interfaces
export interface User {
    id: string;
    first_name: string;
    last_name: string
    email: string;
  }


export interface AuthState {
  auth: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  message: string | null
}
  
  export interface LoginCredentials {
    email: string;
    password: string;
    rememberMe?: boolean
  }
  

  // REGISTER
  export interface RegisterData {
    first_name: string;
    last_name: string
    email: string;
    country_id: string
    password: string;
    message?: string
    status?: number | string
  }

  // COUNTRIES
export type Country = {
    id: number | string,
    code: string,
    name: string
    phonecode: string
}

  export type CountriesAPIResponse = {
    success: true,
    message: string
    data: Country[]     
  }

  // OTP
  export type VerifyAPIResponse = {
    code?: string
    verification_code?: string
    success?: string | number
    message?: string
  }

  export type ForgotAPIResponse = {
    email?: string
    code?: string
    password?: string
    password_confirmation?: string
    success?: string | number | boolean
    message?: string
  }


  // Create a Hook to use the toast
  export interface ToastHook {
    showSuccess: (message: string, position?: ToastPosition, duration?: number, ) => string;
    showError: (message: string, position?: ToastPosition, duration?: number, ) => string;
    showWarning: (message: string, position?: ToastPosition, duration?: number, ) => string;
    showInfo: (message: string, position?: ToastPosition, duration?: number, ) => string;
  }
  