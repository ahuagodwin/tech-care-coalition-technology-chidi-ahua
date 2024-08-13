import Cookies,{CookieAttributes} from 'js-cookie'
import * as HelperService from './helper-service'



/* 
Note: CookieAttributes is an interface with the below properties
interface CookieAttributes {
  expires?: number | Date | undefined;
  path?: string | undefined;
  domain?: string | undefined;
  secure?: boolean | undefined;
  sameSite?: 'strict' | 'Strict' | 'lax' | 'Lax' | 'none' | 'None' | undefined;
  [property: string]: any;
} */

export const TOKEN_KEY = '@accessToken';
export const REFRESH_TOKEN_KEY = '@refreshToken'; 
export const USER_DATA_KEY = '@user'; 

// rewrite token service to use the cookie storage
const TokenService = {
  get(key:string):string{
    if (process.env.NODE_ENV === 'production') {
      if(Cookies.get(key)){
        return JSON.parse(HelperService.decrypt(Cookies.get(key) as string))
      }
      return ""
    }else{
      return Cookies.get(key) as string;
    }
  },

  set(key:string, data:any,options?: CookieAttributes):void{
    if (process.env.NODE_ENV === 'production') {
      data = HelperService.encrypt(JSON.stringify(data))
    }
    Cookies.set(key, data, options)
  },

  remove(key:string, options?: CookieAttributes):void{
    Cookies.remove(key, options)
  },

  getTokenKey():string{
    return TOKEN_KEY;
  },

  getToken():string | undefined {
      return this.get(TOKEN_KEY);
  },

  saveToken(token:string,options?: CookieAttributes) {
      this.set(TOKEN_KEY, token, options);
  },

  removeToken(options?: CookieAttributes) {
      Cookies.remove(TOKEN_KEY, options);
  },

  getRefreshTokenKey():string{
    return REFRESH_TOKEN_KEY;
  },

  getRefreshToken() {
      return this.get(REFRESH_TOKEN_KEY);
  },

  saveRefreshToken(refreshToken:string) {
      this.set(REFRESH_TOKEN_KEY, refreshToken);
  },

  removeRefreshToken() {
      Cookies.remove(REFRESH_TOKEN_KEY);
  },

};

export default TokenService;