import {createRequest} from '@/services/http-process'

export const getDashboardData = () => {
    return createRequest({ method: 'get', url: '/api/dashboard' }, (res: any) => {
        return res.data
    })
}
export const getUserProfile = () => {
    return createRequest({ method: 'get', url: '/api/auth/user/profile' }, (res: any) => {
        return res.data
    })
}
export const safeUserProfile = (data?:any) => {
    return createRequest({ method: 'put', url: '/api/auth/user/profile', data:data }, (res: any) => {
        return res.data
    })
}

export const bookACall = (data: {full_name:string, mobile_no:string}) => {
    return createRequest({ method: 'post', url: '/api/request_call', data: data }, (res: any) => {
        return res.data
    })
}

export const setDesktopNotification = (data: {desktop_notification:'yes'|'no'}) => {
    return createRequest({ method: 'post', url: '/api/user/set_desktop_notification', data: data }, (res: any) => {
        return res.data
    })
}

export const setEmailFrequency = (data: {email_notification:'never'|'periodically'|'instantly'}) => {
    return createRequest({ method: 'post', url: '/api/user/set_email_notification', data: data }, (res: any) => {
        return res.data
    })
}

export const setUpdateNotification = (data: {notification:'yes'|'no'}) => {
    return createRequest({ method: 'post', url: '/api/user/set_internal_notification', data: data }, (res: any) => {
        return res.data
    })
}
export const getAllNotification = () => {
    return createRequest({ method: 'get', url: '/api/dashboard/notifications' }, (res: any) => {
        return res.data.data
    })
}

export const setCurrentWorkspace = (workspaceId: number) => {
    return createRequest({ method: 'post', url: `/api/dashboard/set_workspace/${workspaceId}` }, (res: any) => {
        return res.data
    })
}
