import TokenService from "@/services/token-service";


export const setTransRef = (ref:string) =>{
    TokenService.set('@tranxRef',ref)
}

export const getTransRef = () =>{
    return TokenService.get('@tranxRef')
}

