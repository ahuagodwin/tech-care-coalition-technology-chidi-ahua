
 import type {ObjectDirective, DirectiveBinding} from 'vue'

 
const ClickOutside: ObjectDirective = {
    beforeMount(el, binding:DirectiveBinding) {
        el.clickOutsideEvent = (evt:MouseEvent) => {
          evt.stopPropagation()
          if (!(el === evt.target || el.contains(evt.target))) {
            binding.value(evt, el)
          }
        }
        // Wait 1 frame otherwise a potential click that mounted the element will immediately trigger a click-outside event:
        window.requestAnimationFrame(() => {
          document.addEventListener('click', el.clickOutsideEvent)
        })
    },
    unmounted(el) {
        document.removeEventListener('click', el.clickOutsideEvent)
    },
};
export default ClickOutside;
