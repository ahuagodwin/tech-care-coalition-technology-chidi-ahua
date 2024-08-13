import {projectConfig} from '../config/config'
import  { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
//import {clientIsAvailable,userIsAvailable} from "../helpers/auth"
import {HTTPService} from './axios-interceptor'

let headers:any
const httpService:AxiosInstance = new HTTPService(projectConfig.axios).getInstance()

httpService.interceptors.request.use(
    (config:AxiosRequestConfig)=>{
        /* if(clientIsAvailable()){
            client = AuthService.getClientDetails()
            headers  = {'client-id':client?.data?.client_id}
        } */
        /* if(userIsAvailable()){
            user = AuthService.getLoggedInUser()
            headers  = Object.assign({},headers,{'company-id':user?.company_id})
        } */
        config.headers = Object.assign({},config.headers,headers)
        return config
    },(error:AxiosError)=>Promise.reject(error)
  );  

export default httpService;
