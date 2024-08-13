
import * as HelperService from './helper-service'
import TokenService from './token-service'

export const APP_CLIENT = '@appClient';
export const LOGGED_IN_USER = '@loggedInUser'; 
export const USER_ACCOUNTS = '@userAccounts'; 

const AuthService = {
    
    setClientDetails: (client:Record<string, unknown>):void => {
        HelperService.setLocalStorageItem(APP_CLIENT, client)
    },
    getClientDetails: () => {
        return HelperService.getLocalStorageItem(APP_CLIENT)
    },
    removeClientDetails: ():void => {
        localStorage.removeItem(APP_CLIENT);
    },



    setLoggedInUser: (user:Record<string, unknown>):void => {
        HelperService.setLocalStorageItem(LOGGED_IN_USER, user)
        AuthService.addUserAccount(user)
    },
    getLoggedInUser: () => {
        return HelperService.getLocalStorageItem(LOGGED_IN_USER)
    },
    removeLoggedInUser: ():void=> {
        AuthService.removeUserAccount(AuthService.getLoggedInUser())
        localStorage.removeItem(LOGGED_IN_USER);
    },

    addUserAccount: (user:Record<string, unknown>):void => {
        const users:Array<Record<string, unknown>> = AuthService.getUserAccounts() || [];
        //check if user exist
        const userIndex = users.findIndex((u)=>u.email==user.email)
        if(userIndex >= 0){
            users[userIndex].token = user.token
        }else{
            users.push(user)
        }
        HelperService.setLocalStorageItem(USER_ACCOUNTS, users)
    },
    getUserAccounts: () => {
        return HelperService.getLocalStorageItem(USER_ACCOUNTS)
    },
    removeUserAccount: (user:Record<string, unknown>):void=> {
        const users:Array<Record<string, unknown>> = AuthService.getUserAccounts()
        const newUsers = users.filter((u)=>u.email!=user.email)
        HelperService.setLocalStorageItem(USER_ACCOUNTS, newUsers)
    },

    isLoggedIn: ():boolean => {
        return AuthService.hasLoggedIn() ?  true : false;
    },
    logOut: ():void => {
        TokenService.removeToken()
        AuthService.removeLoggedInUser()
    },
    hasLoggedIn: ():boolean => {
        const user = AuthService.getLoggedInUser()
        return user?.id || user?.token
    },
}

export default AuthService