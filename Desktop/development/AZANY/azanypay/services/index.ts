import { createRegisterAction, verifyRegisterCodeAction, loginUser, logoutUserAction, forgotPasswordAction, forgotPasswordVerifyAction, forgotPasswordResetAction, forgotPasswordResendOTPAction, registerResendOTPAction } from "./action/action.auth";
import { getAllCountriesAction } from "./action/action.countries"
import { setIsForgotActive } from "./auth/forgotSlice";

export const apiServices = {
    loginUser,
    logoutUserAction,
    createRegisterAction,
    verifyRegisterCodeAction,
    registerResendOTPAction,
    forgotPasswordAction,
    forgotPasswordVerifyAction,
    forgotPasswordResetAction,
    forgotPasswordResendOTPAction,
    setIsForgotActive,


    getAllCountriesAction
}