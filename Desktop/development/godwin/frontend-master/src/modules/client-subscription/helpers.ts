import TokenService from "@/services/token-service";


export const setTransRef = (ref:string) =>{
    TokenService.set('@tranxRef',ref)
}

export const getTransRef = () =>{
    return TokenService.get('@tranxRef')
}

export const removeTransRef = () =>{
    return TokenService.remove('@tranxRef')
}


export const setTransItemsCount = (count:string) =>{
    TokenService.set('@tranxItemsCount',count)
}

export const getTransItemsCount = () =>{
    return TokenService.get('@tranxItemsCount')
}

export const removeTransItemsCount = () =>{
    return TokenService.remove('@tranxItemsCount')
}

