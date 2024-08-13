import {createRequest} from '@/services/http-process'
import { type RequestDemoForm } from './types'

export const getComments = () => {
    return createRequest({ method: 'get', url: '/api/comments' }, (res: any) => {
        return res.data
    })
}
export const getPortfolio = () => {
    return createRequest({ method: 'get', url: '/api/admin/portfolio_category' }, (res: any) => {
        return res.data
    })
}
export const requestDemo = (data:RequestDemoForm) => {
    return createRequest({ method: 'post', url: '/api/request_demo', data: data }, (res: any) => {
        return res.data
    })
}

export const getSubscription = () => {
    return createRequest({ method: 'get', url: '/api/subscription' }, (res: any) => {
        return res.data
    })
}