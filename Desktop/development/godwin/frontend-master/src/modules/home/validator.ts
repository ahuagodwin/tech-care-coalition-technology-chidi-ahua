import {ref, type Ref,computed} from 'vue'
import { required, email, minLength, helpers, sameAs } from "@vuelidate/validators"
import useValidate from "@vuelidate/core"
import { type RequestDemoForm } from './types'



export function validateRequestDemoForm() {
    
    const form:Ref<RequestDemoForm> = ref({
        full_name:'', 
        mobile_no:'',
        email:'',
        hear_about_us:'',
      })

    const rules = computed(() => {
        return {
            full_name: { required },
            mobile_no: { required },
            email: { required, email }, 
            hear_about_us: { required },
        }
    })

    const v$ = useValidate(rules, form)

    return {
        form,
        v$
    }
}