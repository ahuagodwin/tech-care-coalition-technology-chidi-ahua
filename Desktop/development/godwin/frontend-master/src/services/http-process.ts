import { reactive,toRefs, type Ref} from 'vue'
import type {AxiosResponse,AxiosError, AxiosInstance,AxiosRequestConfig} from 'axios'
import httpService from '@/services/http'

/* 
How To Use
=============
import { HttpProcess} from "@shr/ui-library-v2"

  const {
      isLoading,
      response:actionResponse, 
      error:actionError, 
      isSuccessful:actionIsSuccessful, 
      hasError:actionHasError,
      execute:executeAction
  } = HttpProcess.createRequest(
      httpService,  // Axios instance
      {
        method:'post', // Http request method
        url:'/api/v1/auth/login',  // Http request URL without the apiBaseURL from the config
        data:data, headers:headers // Http headers
        .... other axios config
      },
      ,(res:any)=>{return res.data} // Handle response from here to do whatever you want to do and return response data to be returned from this service
    )

  const method = () =>{
    executeAction().then(res=>{
        ...execute some action
    })
  }

*/

interface CreateRequest {
  response: Ref<AxiosResponse | null>;
  error: Ref<AxiosError | null>;
  isLoading: Ref<boolean>;
  isSuccessful: Ref<boolean>;
  hasError: Ref<boolean>;
  execute: (data?: any) => Promise<AxiosResponse | undefined>;
}

export function createRequest<PostConfig = Pick<AxiosRequestConfig, 'data' | 'params'>>(
  preConfig:AxiosRequestConfig,
  handleResponse: (response: AxiosResponse) => Promise<AxiosResponse>,
  axiosInstance?:AxiosInstance,
): CreateRequest {
  const xhr = reactive({
    response:null as AxiosResponse | null,
    error:null as AxiosError | null,
    isLoading:false,
    isSuccessful:false,
    hasError:false,
  })
  const execute = async (postConfig?:PostConfig) => {
    const request = (axiosInstance || httpService).request(postConfig ? {...preConfig,...postConfig} : preConfig) as Promise<AxiosResponse>
    xhr.isLoading = true;
    try {
      const response = await request.then(handleResponse);

      xhr.response = response as AxiosResponse;
      xhr.error = null
      xhr.isSuccessful = true
      xhr.hasError = false
      return response;
    } catch (e:any) {
      xhr.response = null
      xhr.error= e?.data as AxiosError;
      xhr.isSuccessful = false
      xhr.hasError = true
    } finally {
      xhr.isLoading = false;
    }
  };
  return {
    ...toRefs(xhr),
    execute,
  };
}