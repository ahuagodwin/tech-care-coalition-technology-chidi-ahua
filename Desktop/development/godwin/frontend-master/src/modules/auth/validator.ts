import { reactive, computed } from "vue"
import { required, email, minLength, helpers, sameAs } from "@vuelidate/validators"
import useValidate from "@vuelidate/core"
import {customPasswordValidator} from '@/services/helper-service'
import {RegistrationForm, LoginForm, ResetPasswordForm} from './types'


export function validateLoginForm() {
    const form:LoginForm = reactive({
        email:"",
        password:"",
      })

    const rules = computed(() => {
        return {
            email: { required, email },
            password: {
                required,
                minLength: minLength(8),
                valid: helpers.withMessage('Must contain at least 1 numbers, symbol, upper and lower case letters', customPasswordValidator)
            }
        }
    })

    const v$ = useValidate(rules, form)

    return {
        form,
        v$
    }
}

export function validateResetPasswordForm() {
    const form:ResetPasswordForm = reactive({
        email:"",
        password:"",
        password_confirmation:"",
        token:""
    })

    const rules = computed(() => {
        return {
            password: {
                required,
                minLength: minLength(8),
                valid: helpers.withMessage('Must contain at least 1 numbers, symbol, upper and lower case letters', customPasswordValidator)
            },
            password_confirmation: { required, sameAsPassword: sameAs(form.password) },
        }
    })

    const v$ = useValidate(rules, form)

    return {
        form,
        v$
    }
}

export function validateRegistrationForm() {
    const form:RegistrationForm = reactive({
        first_name:"",
        last_name:"",
        email:"",
        password:"",
        usertype: "",
        agree:false
      })

    const rules = computed(() => {
        return {
            first_name: { required },
            last_name: { required },
            email: { required, email },
            usertype: {required},
            password: {
                required,
                minLength: minLength(8),
                valid: helpers.withMessage('Must contain at least 1 numbers, symbol, upper and lower case letters', customPasswordValidator)
            }
        }
    })

    const v$ = useValidate(rules, form)

    return {
        form,
        v$
    }
}

export function validateVerificationForm() {
    const form = reactive({
        code:"",
        usertype:"",
    })

    const rules = computed(() => {
        return {
            code: { required },
            usertype: { required }
        }
    })

    const v$ = useValidate(rules, form)

    return {
        form,
        v$
    }
}

export function forgotPasswordForm() {
    const form = reactive({
        email:"",
    })

    const rules = computed(() => {
        return {
            email: { required,email }
        }
    })

    const v$ = useValidate(rules, form)

    return {
        form,
        v$
    }
}