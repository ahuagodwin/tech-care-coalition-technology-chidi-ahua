<template>
    <div class="d-flex flex-column" :class="[wrapperClass]">
        <div class="d-flex justify-content-between">
            <FormLabel
                v-if="label"
                :label="label"
                :required="required"
                :fieldId="fieldId"
                :labelClass="labelClass"
                class="my-auto mb-2"
            />
        </div>

        <span class="position-relative d-flex">
            <input  
                :id="fieldId"
                :type="type" 
                class="form-control"
                :class="[inputCssClasses,elementClass,{'pepx-15':showCheckIcon}]"
                v-bind="$attrs"
                :required="required"
                :value="modelValue"
                @input="(e:Event)=>{$emit('update:modelValue', (e.target as HTMLInputElement).value)}"
                @keypress="acceptOnlyNumber($event); acceptDecimalPlaceOf($event);"
                @paste="acceptOnlyNumber($event); acceptDecimalPlaceOf($event);"
            >
            <span  class="position-absolute icon right d-flex" v-if="showCheckIcon">
                <span class="material-icons fs-15 checkCircle">check_circle</span>
            </span>
        </span>
        <!-- <div :id="`${fieldId}-feedback`" class="invalid-feedback" v-if="errorMsg && showError">
            {{errorMsg}}.
        </div>  -->
        <ErrorMessage :id="fieldId" :msg="errorMsg"  v-if="errorMsg && showError"/>
    </div>
</template>


<script lang="ts" setup>
    import { computed } from 'vue'
    import {allowOnlyNumber,allowedDecimalPlaces} from '@/services/helper-service'
    type inputProps = {
        name?: string;
        id?: string,
        type?: "text" | "password" | "email" | "hidden" | "number" | "url";
        size?: "sm" | "lg";
        modelValue:string|number;
        label?:string;
        required?:boolean;
        showCheckIcon?:boolean;
        errorMsg?:string;
        showError?:boolean;
        acceptNumberOnly?:boolean,
        allowedDecimalPoint?:number,
        labelClass?:string|Record<string,any>
        wrapperClass?:string|Record<string,any>
        elementClass?:string|Record<string,any>
    }
    // eslint-disable-next-line
    const props = withDefaults(defineProps<inputProps>(),{
        type:'text',
        showError:true,
    })

    // eslint-disable-next-line
    defineEmits(['update:modelValue'])
    const fieldId = computed(() => props.id || `input-${props.type || 'text'}-${Math.floor(Math.random() * 100)}`);


    const inputCssClasses = computed(() => {
        let classNames = props.size ? `form-control-${props.size}` : "";
        classNames += props.errorMsg ? ' is-invalid' : ''
        return classNames
    });

    const acceptOnlyNumber = (e:KeyboardEvent | ClipboardEvent) =>{
        if(props.acceptNumberOnly){
            allowOnlyNumber(e)
        }
    }
    const acceptDecimalPlaceOf = (e:KeyboardEvent | ClipboardEvent) =>{
        if(props.allowedDecimalPoint){
            allowedDecimalPlaces(e,props.allowedDecimalPoint as number)
        }
    }

</script>

<style lang="scss" scoped>
  /* .input-element{
    box-sizing: border-box;
    border: 1px solid #8692A6;
    border-radius: 6px;
    background: #FFFFFF;
    &:focus, &:hover{
      border: 1px solid #1227E2!important;
      box-shadow: 0px 4px 10px 3px rgba(0, 0, 0, 0.11)!important;
    }
  } */

.icon {
    top: 50%;
    transform: translate(0%, -50%);
    &.left{
        left: 15px;
    }
    &.right{
        right: 15px;
    }
    .checkCircle{
        color:#08AD36
    }
}
</style>