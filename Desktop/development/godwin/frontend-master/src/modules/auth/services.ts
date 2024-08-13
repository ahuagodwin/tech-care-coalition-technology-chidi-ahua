import {createRequest} from '@/services/http-process'
import {RegistrationForm,LoginForm, ResetPasswordForm} from './types'
import { setLogIn } from './helpers'

export const login = (data: LoginForm) => {
    return createRequest({ method: 'post', url: '/api/auth/login', data: data }, (res: any) => {
        setLogIn(res.data.data)
        return res.data
    })
}
export const register = (data: RegistrationForm) => {
    return createRequest({ method: 'post', url: '/api/auth/register', data: data }, (res: any) => {
        setLogIn(res.data.data)
        return res.data
    })
}
export const verifyEmail = (data:{code:string, usertype?: string}) => {
    return createRequest({ method: 'post', url: '/api/auth/verify/email', data: data }, (res: any) => {
        return res.data
    })
}
export const resendOTP = () => {
    return createRequest({ method: 'post', url: '/api/auth/resend/verification'}, (res: any) => {
        return res.data
    })
}
export const requestForPasswordReset = (data:{email:string}) => {
    return createRequest({ method: 'post', url: '/api/auth/password/reset', data: data}, (res: any) => {
        return res.data
    })
}
export const resetPassword = (data:ResetPasswordForm) => {
    return createRequest({ method: 'post', url: '/api/auth/password/reset', data: data}, (res: any) => {
        return res.data
    })
}
export const storeCompanyDetails = (data:FormData) => {
    const headers = {
        'Content-Type': 'multipart/form-data'
    }
    return createRequest({ method: 'post', url: '/api/auth/company',data:data, headers: headers}, (res: any) => {
        return res.data
    })
}