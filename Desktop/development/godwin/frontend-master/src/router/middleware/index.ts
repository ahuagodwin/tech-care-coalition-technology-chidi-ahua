
import {RouteLocationNormalized, NavigationGuardNext, Router } from 'vue-router'
import AuthService from "@/services/auth-service"
import * as HelperService from '@/services/helper-service'
import axios from 'axios'

interface MiddlewareFactoryContext {
    router?:Router,
    store:any,
    from:RouteLocationNormalized,
    to:RouteLocationNormalized,
    next:NavigationGuardNext,
}

export const RequiredAuth = ({ next, router}:MiddlewareFactoryContext)=>{
    if (AuthService.isLoggedIn()) {
        const user = AuthService.getLoggedInUser()
        if (user.roles?.includes('client')) {
            router?.push({name:"Clients.Dashboard"})
        } else if (user.roles?.includes('admin')) {
            router?.push({name:"Spark.Admin.Overview"});
        }
    }
    return next();
}

export const PreventAuth = ({ next, router }:MiddlewareFactoryContext)=>{
    if(!AuthService.isLoggedIn()){
        router?.push({name:"Auth.Login"});
    }
    return next();
}

export const GetVisitorInfo = ({ next }:MiddlewareFactoryContext)=>{
    const visitorInfo = HelperService.getLocalStorageItem('@visInfo')
    if(!visitorInfo){
        axios.get('https://ipinfo.io/').then((res:any)=>{
            HelperService.setLocalStorageItem('@visInfo',res.data)
        })
    }
    return next();
}

export function CheckPermissions({ next, router, to, from }: MiddlewareFactoryContext) {
    if (AuthService.isLoggedIn()) {
        const user = AuthService.getLoggedInUser()
        const permissions = user.permissions.map((permission: any) => permission.ability);
        
        type AuthRolesAndPermission = {roles?:Array<string>,permissions?:Array<string>};
        const authorization: AuthRolesAndPermission | undefined = to.meta.authorization as AuthRolesAndPermission;
        if (authorization?.permissions) {
            if (authorization.permissions.some((permission) => permissions.includes(permission))) {
                return next();
            } else {
                router?.push({name:"Auth.Login"});
            }
        }
    }
    return next();
}
