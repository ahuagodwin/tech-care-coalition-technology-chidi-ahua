import type { ObjectDirective, DirectiveBinding } from 'vue'
import AuthService from '@/services/auth-service'



const user = AuthService.getLoggedInUser()
const permissions = user?.permissions?.map((permission: any) => permission.ability);

const Can: ObjectDirective = {
    // TODO: Decide either to hide and show based on permission
    beforeMount(el: HTMLElement, binding: DirectiveBinding) {
        if (permissions && permissions.includes(binding.value)) {
            return el.hidden = false
        } else {
            return el.hidden = true
        }
    },

    // TODO: Or remove the element from DOM if user does not have that permission
    mounted(el: HTMLElement, binding: DirectiveBinding) {
        if (permissions && !permissions.includes(binding.value)) {
            el.parentElement?.removeChild(el)
        }
    },
};

export default Can;