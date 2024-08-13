import {createRequest} from '@/services/http-process'
import { WithdrawalAccountDetails, AccountDetailsVerification } from './types'

export const listBanks = () => {
    return createRequest({ method: 'get', url: '/api/banks' }, (res: any) => {
        return res.data.data
    })
}
export const verifyBank = (data?:AccountDetailsVerification) => {
    return createRequest({ method: 'post', url: '/api/verify_account', data:data }, (res: any) => {
        return res.data.data
    })
}
export const getAffiliateData = () => {
    return createRequest({ method: 'get', url: '/api/affilate/dashboard' }, (res: any) => {
        return res.data
    })
}
export const getAffiliateHistory = (limit?:number) => {
    return createRequest({ method: 'get', url: '/api/affilate/history', params:{limit: limit} }, (res: any) => {
        return res.data
    })
}
export const getAffiliateBalance = () => {
    return createRequest({ method: 'get', url: '/api/affilate/balance' }, (res: any) => {
        return res.data
    })
}


export const setWithdrawalAcc = (data?:WithdrawalAccountDetails) => {
    return createRequest({ method: 'post', url: '/api/affilate/withdrawal/bank', data:data }, (res: any) => {
        return res.data
    })
}

export const requestPayout = () => {
    return createRequest({ method: 'post', url: '/api/affilate/request_withdrawal' }, (res: any) => {
        return res.data
    })
}