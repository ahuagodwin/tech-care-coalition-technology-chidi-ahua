import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import TokenService from './token-service'
import AuthService from './auth-service'
import * as AlertService from './alert-service'
//import {ShrEventBus} from './event-bus'


interface RefreshToken {
    status: number;
    data: {
      jwt: string;
      jwt_refresh: string;
    };
}
type AxiosConfig = {
  apiBaseUrl: string
  refreshTokenPath: string
  loginUrl: string
  httpHeaders?: Record<string, never>
}

const tokenService = TokenService;

const defaultHeaders = {
  'X-Requested-With':'XMLHttpRequest',
}

export default abstract class HTTPBaseService {
    protected instance: AxiosInstance;
    protected token :string | undefined;
    protected readonly apiBaseUrl?: string;
    protected readonly refreshTokenPath?: string;
    protected readonly loginUrl?: string;
    protected httpHeaders?: Record<string, never>;

    public constructor(config?: AxiosConfig) {

        this.apiBaseUrl = config?.apiBaseUrl || '/';
        this.refreshTokenPath = config?.refreshTokenPath || '';
        this.loginUrl = config?.loginUrl;
        this.httpHeaders = config?.httpHeaders || {};
        this.instance = axios.create({
            baseURL: this.apiBaseUrl
        });

        this.token = tokenService.getToken();
        this.initializeRequestInterceptor();
        this.initializeResponseInterceptor();
    }
    
    public getInstance = () =>{
      return this.instance
    }


    /* private interceptorCallbacks = (config:AxiosRequestConfig, configCallbacks:Function[]) => {
      if (!configCallbacks ||  !Array.isArray(configCallbacks)) {
          throw new Error("callbacks should be an array of functions");
      }
      configCallbacks.forEach((cb) => {
          if(typeof cb !== "function"){
              throw new Error("callback should be a function");
          }
          cb(config);
      });
  } */

    private initializeRequestInterceptor = () => {
        this.instance.interceptors.request.use(
          this.handleRequest,
          error => {Promise.reject(error)}
        );
    };

    private handleRequest = (config: AxiosRequestConfig) => {
        this.token = tokenService.getToken();
        const common = Object.assign({}, config.headers?.common || {},this.httpHeaders, {'Authorization': `Bearer ${this.token}`}, defaultHeaders)

        config.timeout = 20000
        this.token && (config.headers = Object.assign({}, config.headers,{'Authorization': `Bearer ${this.token}`},{common:common}));
        if (!navigator.onLine){
          AlertService.toast('error', 'Error', 'No internet access!');
          return Promise.reject(new Error("No internet access!"));
        }
        return config;
    };

    private initializeResponseInterceptor = () => {
        this.instance.interceptors.response.use(response => {
            if (response.headers && response.headers.authorization) {
                const responseToken = (response.headers.authorization as string).split(' ')[1];
                this.token = responseToken;
                tokenService.saveToken(this.token)
            }
            return response;
        }, this.handleError);
    }

    private handleError = async (error: AxiosError) => {
        const originalRequest: AxiosRequestConfig & { _retry?: boolean } = error.config;
        if (error.response?.status === 403 && !originalRequest?._retry) {
          originalRequest._retry = true;
          const refreshToken = await this.refreshToken();
          if (refreshToken.status === 200) {
              //TODO: modify this based on the returned data from refresh token endpoint
              this.token = refreshToken.data.jwt;
              tokenService.saveToken(this.token)
              tokenService.saveRefreshToken(refreshToken.data.jwt_refresh)
              if (!navigator.onLine){
                AlertService.toast('error', 'Error', 'No internet access!');
                return Promise.reject(new Error("No internet access!"));
              }
              return this.instance(originalRequest);
          }
        }

        if (error.response?.status == 500) {
            if (error.response.data.message){
                AlertService.toast('error', 'Error', error.response.data.message);
            }else {
                AlertService.toast('error', 'Error', 'Unable to process request at this time, please try again');
            }
        }

        if (error.response?.status == 400) {
            if (error.response.data.message){
              AlertService.toast('error', 'Error', error.response.data.message);
            }else {
              AlertService.toast('error', 'Error', 'Bad Request');
            }
        }
        // Show a general validation message on 422
        if (error.response?.status === (422)){
          if (error.response.data.message){
            AlertService.toast('error', 'Error', error.response.data.message);
          } else {
            AlertService.toast('error', 'Error', Object.values(error?.response?.data?.errors as AxiosError)[0][0]);
          }
        }
        if (error.response?.status === 404) {
          AlertService.toast('error', 'Error', `${error.config.url} not found`);
        }
        if (error.response?.status === 401) {
          AuthService.logOut()
          AlertService.toast('error', 'Error', 'Your session has expired, you need to sign in again.');
          setTimeout(() => {location.href = this.loginUrl as string }, 1000)
        }
        return Promise.reject(error.response);
    }

    private async refreshToken(): Promise<RefreshToken> {
        const refreshTokenRequest = {
          jwt_refresh: tokenService.getRefreshToken()
        };
        //TODO: modify the refresh token endpoint
        return axios.post(`${this.apiBaseUrl}${this.refreshTokenPath}`, refreshTokenRequest);
    }
}

export class HTTPService extends HTTPBaseService{}
