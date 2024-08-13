import {createRequest} from '@/services/http-process'
import { setTransRef,getTransRef } from './helpers'

export const getSubscription = (addons?:boolean) => {
    //const url = type ? `/api/subscription?type=` : '/api/subscription'
    return createRequest({ method: 'get', url: '/api/subscription', params: addons ? { type: 0 } : {} }, (res: any) => {
        return res.data
    })
}
export const createCart = (subscriptionId:number) => {
    return createRequest({ method: 'post', url: '/api/cart/create', data:{subscription_id:subscriptionId}}, (res: any) => {
        setTransRef(res.data?.data?.reference)
        return res.data
    })
}


export const getCart = () => {
    const transRef = getTransRef()
    return createRequest({ method: 'get', url: `/api/cart/${transRef}` }, (res: any) => {
        return res.data
    })
}
export const addUpdateCart = (data?:{subscription_id:number,unit:number, default?:boolean}) => {
    const transRef = getTransRef()
    return createRequest({ method: 'put', url: `/api/cart/${transRef}`, data:data }, (res: any) => {
        return res.data
    })
}
export const deleteCartItem = () => {
    return createRequest({ method: 'delete' }, (res: any) => {
        return res.data
    })
}

export const updateCartCouponCode = () =>{
    return createRequest({}, (res: any) => {
        return res.data
    })
}

export const addCouponCodeToCart = (data:{code:string, reference?:string}) => {
    data.reference = getTransRef()
    return createRequest({ method: 'post', url: `/api/cart/coupon/apply`, data:data }, (res: any) => {
        return res.data
    })
}
export const removeCouponCodeFromCart = () => {
    const data = {
        reference:getTransRef()
    }
    return createRequest({ method: 'delete', url: `/api/cart/coupon/remove`, data:data }, (res: any) => {
        return res.data
    })
}