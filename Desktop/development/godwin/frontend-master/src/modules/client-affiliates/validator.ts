import {ref, type Ref,computed} from 'vue'
import { required } from "@vuelidate/validators"
import useValidate from "@vuelidate/core"
import { WithdrawalAccountDetails } from './types'

export function validateWithdrawalAccountDetails() {
    
    const form:Ref<WithdrawalAccountDetails> = ref({
        account_name: '',
        account_number: '',
        bank_code: ''
      })

    const rules = computed(() => {
        return {
            account_name: { required },
            account_number: { required },
            bank_code: { required },
        }
    })

    const v$ = useValidate(rules, form)

    return {
        form,
        v$
    }
}