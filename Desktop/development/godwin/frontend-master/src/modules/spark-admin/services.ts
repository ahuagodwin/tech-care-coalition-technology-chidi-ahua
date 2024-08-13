import { createRequest } from '@/services/http-process'


export const getOverview= () => {
    return createRequest({ method: 'get', url: '/api/admin/overview/total_overview' }, (res: any) => {
        return res.data.data
    })
}

export const getWorkspaces= () => {
    return createRequest({ method: 'get', url: '/api/admin/workspace' }, (res: any) => {
        return res.data.data
    })
}

export const getWorkspaceProjects= () => {
    return createRequest({ method: 'get', url: '/api/admin/workspace/company?company=1&pending=true' }, (res: any) => {
        return res.data.data
    })
}
export const modifyWorkspaceMemberList= () => {
    return createRequest({ method: 'post', url: '/api/admin/workspace/add_or_remove_user_from_workspace' }, (res: any) => {
        return res.data.data
    })
}





export const getAnalyticsTotalOverview = () => {
    return createRequest({ method: 'get', url: '/api/admin/analytics/total_overview' }, (res: any) => {
        return res.data.data
    })
}

export const getAnalyticsOrderStats = () => {
    return createRequest({ method: 'get', url: '/api/admin/analytics/order_overview_month_stats' }, (res: any) => {
        return res.data.data
    })
}


export const getAnalyticsOrderList = () => {
    return createRequest({ method: 'get', url: '/api/admin/analytics/order_overview_list' }, (res: any) => {
        return res.data.data
    })
}

export const getAnalyticsUserList = () => {
    return createRequest({ method: 'get', url: '/api/admin/analytics/user_overview_list' }, (res: any) => {
        return res.data.data
    })
}

export const getAnalyticsCustomerList = () => {
    return createRequest({ method: 'get', url: '/api/admin/analytics/customer_overview_list' }, (res: any) => {
        return res.data.data
    })
}

export const getAffiliateStats = () => {
    return createRequest({ method: 'get', url: '/api/admin/analytics/affiliate_overview_month_stats' }, (res: any) => {
        return res.data.data
    })
}

export const getAffiliateOverviewList = () => {
    return createRequest({ method: 'get', url: '/api/admin/analytics/affiliate_overview_list' }, (res: any) => {
        return res.data.data
    })
}

export const getAffiliatePayoutList = () => {
    return createRequest({ method: 'get', url: '/api/admin/analytics/payout_history' }, (res: any) => {
        return res.data.data
    })
}


export const approvePayout = () => {
    return createRequest({ method: 'post', url: '/api/admin/payout/approve_payout' }, (res: any) => {
        return res.data
    })
}

export const declinePayout = () => {
    return createRequest({ method: 'post', url: '/api/admin/payout/decline_payout' }, (res: any) => {
        return res.data
    })
}




export const getPortfolios = () => {
    return createRequest({ method: 'get', url: '/api/admin/portfolio_category' }, (res: any) => {
        return res.data.data
    })
}

export const addPortfolioCategory = () => {
    return createRequest({ method: 'post', url: '/api/admin/portfolio_category'}, (res: any) => {
        return res.data
    })
}
export const updatePortfolioCategory = (name:string, id:number) => {
    return createRequest({ method: 'post', url: `/api/admin/portfolio_category/${id}`, data: {name:name} }, (res: any) => {
        return res.data
    })
}
export const deletePortfolioCategory = (id:number) => {
    return createRequest({ method: 'delete', url: `/api/admin/portfolio_category/${id}`}, (res: any) => {
        return res.data.data
    })
}


export const addPortfolioImages = () => {
    return createRequest({ method: 'post', url: '/api/admin/portfolio/images'}, (res: any) => {
        return res.data
    })
}
export const addPortfolioVideos = () => {
    return createRequest({ method: 'post', url: '/api/admin/portfolio/videos'}, (res: any) => {
        return res.data
    })
}
export const deletePortfolio = (id:number) => {
    return createRequest({ method: 'delete', url: `/api/admin/portfolio/${id}`}, (res: any) => {
        return res.data.data
    })
}








export const getPromoCode = (id:number) => {
    return createRequest({ method: 'get', url: `/api/admin/promo/${id}` }, (res: any) => {
        return res.data.data
    })
}

export const getPromoCodes = (params?:{date_from:string, date_to:string}) => {
    return createRequest({ method: 'get', url: '/api/admin/promo', params: params || {} }, (res: any) => {
        return res.data.data
    })
}


export const addPromoCode = () => {
    return createRequest({ method: 'post', url: '/api/admin/promo/create' }, (res: any) => {
        return res.data
    })
}

export const updatePromoCode = (id?:number) => {
    return createRequest({ method: 'put', url: `/api/admin/promo/${id}` }, (res: any) => {
        return res.data
    })
}

export const deletePromoCode = (id:number) => {
    return createRequest({ method: 'delete', url: `/api/admin/promo/${id}` }, (res: any) => {
        return res.data.data
    })
}



export const getPlans = (params: {type?: string, currency?:string}) => {
    return createRequest({ method: 'get', url: `/api/admin/plans`, params:params }, (res: any) => {
        return res.data.data
    })
}


export const addAddon = () => {
    return createRequest({ method: 'post', url: '/api/admin/plans/create_addon' }, (res: any) => {
        return res.data
    })
}

export const addPlan = () => {
    return createRequest({ method: 'post', url: '/api/admin/plans/create_plan' }, (res: any) => {
        return res.data
    })
}

export const setPlanVisible = (data: {subscription_id: number, status: string}) => {
    return createRequest({ method: 'post', url: '/api/admin/plans/set_visible', data: data}, (res: any) => {
        return res.data
    })
}


export const setPlanPopularity = (data: {subscription_id: number, status: string}) => {
    return createRequest({ method: 'post', url: '/api/admin/plans/set_most_popular', data: data }, (res: any) => {
        return res.data
    })
}

export const updatePlanOrAddon = (id?:number) => {
    return createRequest({ method: 'put', url: `/api/subscription/${id}` }, (res: any) => {
        return res.data
    })
}

export const deletePlan = (id:number) => {
    return createRequest({ method: 'delete', url: `/api/subscription/${id}` }, (res: any) => {
        return res.data.data
    })
}










export const getRoles = () => {
    return createRequest({ method: 'get', url: '/api/admin/roles/get_roles' }, (res: any) => {
        return res.data.data
    })
}

export const getPermissions = () => {
    return createRequest({ method: 'get', url: '/api/admin/roles/get_permissions' }, (res: any) => {
        return res.data.data
    })
}

export const createRole = () => {
    return createRequest({ method: 'post', url: '/api/admin/roles/create_role' }, (res: any) => {
        return res.data
    })
}
export const updateRole = () => {
    return createRequest({ method: 'put', url: '/api/admin/roles/3' }, (res: any) => {
        return res.data
    })
}

export const deleteRole = (id:number) => {
    return createRequest({ method: 'delete', url: `/api/dashboard/teams/${id}` }, (res: any) => {
        return res.data.data
    })
}





export const getTeams = () => {
    return createRequest({ method: 'get', url: `/api/admin/teams/get_admin_teams` }, (res: any) => {
        return res.data.data
    })
}
export const getUserRoles = (id:number) => {
    return createRequest({ method: 'get', url: '/api/admin/roles/get_user_roles', params:{user_id:id} }, (res: any) => {
        return res.data.data
    })
}
export const inviteAdmin = () => {
    return createRequest({ method: 'post', url: '/api/admin/teams/invite_admin'}, (res: any) => {
        return res.data.data
    })
}
export const changeUserRoles = () => {
    return createRequest({ method: 'post', url: '/api/admin/roles/change_role'}, (res: any) => {
        return res.data
    })
}
export const removeUser = (id:number) => {
    return createRequest({ method: 'post', url: '/api/admin/teams/remove_member', data: {user_id: id}}, (res: any) => {
        return res.data.data
    })
}

