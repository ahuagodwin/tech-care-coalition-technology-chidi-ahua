import {createRequest} from '@/services/http-process'

export const getBrands = () => {
    return createRequest({ method: 'get', url: '/api/dashboard/brand' }, (res: any) => {
        return res.data
    })
}