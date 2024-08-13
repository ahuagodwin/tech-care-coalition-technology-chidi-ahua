import {createRequest} from '@/services/http-process'
import {BrandFormType,WorkspaceTeamType, NewProjectFormType} from './types'

export const getBrands = () => {
    return createRequest({ method: 'get', url: '/api/dashboard/brand' }, (res: any) => {
        return res.data.data
    })
}
export const saveBrand = (data:BrandFormType) => {
    const headers = {
        'Content-Type': 'multipart/form-data'
    }
    return createRequest({ method: 'post', url: `/api/dashboard/brand`,data:data, headers: headers }, (res: any) => {
        return res.data
    })
}
export const editBrand = (brandId:number) => {
    return createRequest({ method: 'put', url: `/api/dashboard/brand/${brandId}` }, (res: any) => {
        return res.data.data
    })
}
export const deleteBrand = (brandId?:number) => {
    return createRequest({ method: 'delete', url: `/api/dashboard/brand/${brandId}` }, (res: any) => {
        return res.data
    })
}



export const getWorkspaceTeam = () => {
    return createRequest({ method: 'get', url: `/api/dashboard/teams` }, (res: any) => {
        return res.data
    })
}

export const addWorkspaceMember = (data:WorkspaceTeamType) => {
    return createRequest({ method: 'post', url: '/api/dashboard/teams/invite',data:data }, (res: any) => {
        return res.data.data
    })
}

export const deleteWorkspaceMember = (memberId?:number) => {
    return createRequest({ method: 'delete', url: `/api/dashboard/teams/${memberId}` }, (res: any) => {
        return res.data
    })
}

export const getProjectChats = (project_id:number) => {
    return createRequest({ method: 'get', url: `/api/dashboard/requests/messages/${project_id}` }, (res: any) => {
        return res.data.data
    })
}

export const createProjectChats = (data?:any) => {
    const headers = {
        'Content-Type': 'multipart/form-data'
    }
    return createRequest({ method: 'post', url: `/api/dashboard/requests/messages`,data:data || {}, headers: headers }, (res: any) => {
        return res.data
    })
}

export const getProjectRequests = () => {
    return createRequest({ method: 'get', url: '/api/dashboard/requests' }, (res: any) => {
        return res.data.data
    })
}


export const getProjectRequestTeam = (projectId: any) => {
    return createRequest({ method: 'get', url: `/api/dashboard/requests/users/team/${projectId}` }, (res: any) => {
        return res.data.data
    })
}

export const createProject = (data?:NewProjectFormType) => {
    const headers = {
        'Content-Type': 'multipart/form-data'
    }
    return createRequest({ method: 'post', url: `/api/dashboard/requests`,data:data || {}, headers: headers }, (res: any) => {
        return res.data
    })
}


export const deleteProject = (projectId?:number) => {
    return createRequest({ method: 'delete', url: `/api/dashboard/requests/${projectId}` }, (res: any) => {
        return res.data
    })
}



export const updateProjectUsers = (project_id:number, users: number[]) => {
    return createRequest({ method: 'post', url: `/api/dashboard/requests/users`,data:{project_id, users} }, (res: any) => {
        return res.data
    })
}

export const deleteDeliverable = (deliverableId?:number) => {
    return createRequest({ method: 'delete', url: `/api/dashboard/deliverables/${deliverableId}` }, (res: any) => {
        return res.data
    })
}


export const getPlanExpiringStatus = () => {
    return createRequest({ method: 'get', url: '/api/dashboard/plan/three_days_expiration_reminder' }, (res: any) => {
        return res.data.data
    })
}

export const getCurrentPlan= () => {
    return createRequest({ method: 'get', url: '/api/dashboard/plan' }, (res: any) => {
        return res.data.data
    })
}

export const cancelPlan = (subscriptionId:number) => {
    return createRequest({ method: 'post', url: '/api/subscription/cancel_subscription', data:{subscription_id:subscriptionId} }, (res: any) => {
        return res.data.data
    })
}

export const setAutoRenew = (autoRenew:string) => {
    return createRequest({ method: 'post', url: '/api/dashboard/plan/auto_renewal', data:{auto_renew:autoRenew} }, (res: any) => {
        return res.data
    })
}

export const removeCard = () => {
    return createRequest({ method: 'post', url: '/api/dashboard/plan/remove_card_details' }, (res: any) => {
        return res.data
    })
}