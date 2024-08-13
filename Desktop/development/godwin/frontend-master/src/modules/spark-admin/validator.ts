import {ref, type Ref,computed} from 'vue'
import { required, requiredIf, helpers } from "@vuelidate/validators"
import useValidate from "@vuelidate/core"
import { WorkFormType, PromoCodeFormType, AddonFormType, PlanFormType, InviteUserForm } from './types'

export function validateWorkForm() {
    
    const form:Ref<WorkFormType> = ref({
        category:0, 
        videos:[{link:'', thumbnail:null}],
        attachments:[],
      })

    const rules = computed(() => {
        return {
            category: { required },
            videos: {
                required: requiredIf(() => !form.value.attachments?.length ) 
            },
            attachments: {
                required: requiredIf(() => !form.value.videos?.length ) 
            }, 
        }
    })

    const v$ = useValidate(rules, form)

    return {
        form,
        v$
    }
}

export function validatePromoCodeForm() {
    
    const form:Ref<PromoCodeFormType> = ref({
        name:'', 
        code:'', 
        type:[], 
        amount:'', 
        start: new Date(), 
        ends: new Date(), 
        subscriptions:[],
        recurring: 0,
        no_of_usage: 0,
        billing_type: [],
        
        amount_symbol:'%',
      })

    const rules = computed(() => {
        return {
            name: { required },
            code: { required },
            type: { required },
            amount: { required },
            start: { required },
            ends: { required },
            subscriptions: { required },
            recurring: { required },
            no_of_usage: { required },
            billing_type: { required },

            amount_symbol: { required },
        }
    })

    const v$ = useValidate(rules, form)

    return {
        form,
        v$
    }
}


export function validateAddonForm() {
    
    const form: Ref<AddonFormType> = ref({
        // Add Addon and edit addon/plan
        title:'', 
        description: '',
        
        // Adding addon
        price_naira_monthly:'', 
        price_dollar_monthly: '', 
        
        // Edit addon/plan
        price:'', 
        group_identifier:'', 

        // Editing plan
        features:[{title:'', info:''}],
        slash: '',
        discount: ''
      })

    const rules = computed(() => {
        return {
            title: { required },
            price_naira_monthly: {
                required: requiredIf(() => !form.value.price && !form.value.price_dollar_monthly ) 
            },
            price_dollar_monthly: {
                required: requiredIf(() => !form.value.price && !form.value.price_naira_monthly ) 
            },
            price: { // For editing
                required: requiredIf(() => !form.value.price_dollar_monthly && !form.value.price_naira_monthly ) 
            }, 
            group_identifier: { // For editing
                required: requiredIf(() => !form.value.price_dollar_monthly && !form.value.price_naira_monthly ) 
            }, 
        }
    })

    const v$ = useValidate(rules, form)

    return {
        form,
        v$
    }
}

// const mustBeMoney = (money: any) => {
//     const value = +money
//     const regex  = /^[0-9]+(?:\.[0-9]{1,2})?$/;
//     return regex.test(value.toString())
// }

export function validatePlanForm() {
    const planFee = {
            price: '',
            slash_price: '',
            save: '',
        }
    const billingType = {
            naira: {...planFee},
            dollar: {...planFee},
        }
    const form:Ref<PlanFormType> = ref({
        title:'', 
        description:'', 
        features:[{title:'', info:''}], 
        billing: {
            monthly:{...billingType},
            quarterly:{...billingType},
            bi_annually:{...billingType},
            annually:{...billingType}
        }
    })

    const rules = computed(() => {
        return {
            title: { required },
        }
    })

    const v$ = useValidate(rules, form)

    return {
        form,
        v$
    }
}

export function validateInviteUserForm() {
    const form:Ref<InviteUserForm> = ref({
        email:'', 
        role:'', 
    })

    const rules = computed(() => {
        return {
            email: { required },
            role: { required },
        }
    })

    const v$ = useValidate(rules, form)

    return {
        form,
        v$
    }
}