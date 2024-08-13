<template>
    <button v-bind="$attrs" :class="classes" :disabled="disabled"> 
        <slot name="content" >
            <div class="d-flex justify-content-center align-items-center">
                <span class="me-2"><slot name="left"></slot></span> 
                <span><slot>{{ label }} </slot></span>
                <span class="ms-2"><slot name="right"></slot></span> 
            </div>
        </slot>
    </button>
</template>


<script lang="ts" setup>
import {computed} from 'vue';
interface buttonPropInterface{
    label:string,
    buttonType?: "default" | "outline"
    variant?: 'blue' | 'dark' | 'light' | 'yellow'
    size?: "default" | "sm" | "lg" 
    active?: boolean
    disabled?: boolean
    customized?: boolean
}
// eslint-disable-next-line
const buttonProps = withDefaults(defineProps<buttonPropInterface>(),{
    buttonType:"default",
    variant:"blue",
    size:"default",
    active:false,
    disabled:false
})

const classes = computed(()=>{
    return !buttonProps.customized ? {
        'gilroy-regular':true,
        btn:true,
        [`btn-${buttonProps.size}`]:buttonProps.size != 'default',
        'fs-15 lh-19 bg-blue text-white': buttonProps.buttonType == "default" && buttonProps.variant == 'blue' && !buttonProps.disabled,
        'fs-15 lh-19 bg-yellow text-black': buttonProps.buttonType == "default" && buttonProps.variant == 'yellow' && !buttonProps.disabled,
        'fs-15 lh-19 bg-blue-dk-1 text-white': buttonProps.buttonType == "default" && buttonProps.variant == 'dark' && !buttonProps.disabled,
        'fs-15 lh-19 bg-blue-lt-1 text-blue': buttonProps.buttonType == "default" && buttonProps.variant == 'light' && !buttonProps.disabled,
        'fs-15 lh-19 bg-white border-blue text-blue':buttonProps.buttonType =='outline' && buttonProps.variant == 'blue' && !buttonProps.disabled,
        'disabled 15 lh-18 bg-blue-lt-3 border-0 text-blue-dk-2':buttonProps.disabled,
        active:buttonProps.active,
    } : {
        btn: true,
    }
})
</script>



<style lang="scss" scoped>
    button{ 
        &.bg-blue-lt-1{
            &:hover{
                color: var(--spa-color-white)!important;
                background-color: var(--spa-color-blue)!important;
            }
        }
    }
</style>