/**
 * PipeSeparator directive for separating two or more elements with pipe
 * - Manipulate DOM: Get innerHTML and append to it
 * Usage
 * v-spipeseparator (postioned right, colored with #d8e4f1, no css class, no style)
 * v-spipeseparator.left (postioned left, colored with #d8e4f1, no css class, no style)
 * v-spipeseparator.left="{color:'#574dff',class:'my-auto',style:'top:50px'}" (postioned left, colored with #574dff, with class and with style)
 *
 * @param el
 * @param binding
 * @constructor
 */
 import type {ObjectDirective, DirectiveBinding} from 'vue'
import {get} from 'lodash-es';
const PipeSeparator: ObjectDirective = {
    beforeMount(el:HTMLElement, binding:DirectiveBinding) {
        const color: string = get(binding, 'value.color') || "#d8e4f1";
        const userClasses: string = get(binding, 'value.class') || "";
        const userStyle: string = get(binding, 'value.style') || "";

        let style = `height:25px !important;`, position:InsertPosition, cls;

        if(binding?.modifiers?.left){
            position = "afterbegin";
            style += `border-left:1px solid ${color} !important;`;
            cls = "ms-3 ps-3"
        }else{
            position = "beforeend";
            style += `border-right:1px solid ${color} !important;`;
            cls = "me-3 pe-3"
        }
        el.insertAdjacentHTML(
            position,
            `<span class="${cls} ${userClasses}" style="${userStyle} ${style}"></span>`
        );
    },
};

export default PipeSeparator;
