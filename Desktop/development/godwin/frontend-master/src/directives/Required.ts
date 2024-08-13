/**
 * Required directive for marking required input
 * - Manipulate DOM: Get innerHTML and append to it
 *
 * @param el
 * @param binding
 * @constructor
 */
 import type {ObjectDirective, DirectiveBinding} from 'vue'
const Required: ObjectDirective = {
    beforeMount(el:HTMLElement, binding:DirectiveBinding) {
        const showAsterisks =  binding.value === undefined || binding.value
        if (showAsterisks) {
            el.insertAdjacentHTML(
              "beforeend",
              '<span class="text-danger"> *</span>'
            );
        }
    },
};

export default Required;
