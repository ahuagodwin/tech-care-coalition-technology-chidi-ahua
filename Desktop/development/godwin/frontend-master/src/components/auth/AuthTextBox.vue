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
            <textarea
                :required="required"
                :id="fieldId"
                v-bind="$attrs"
                :class="[customCssStyle,elementClass]" 
                class="form-control" 
                v-model="value" 
            ></textarea>
        </span>
        <!-- <div :id="`${fieldId}-feedback`" class="invalid-feedback" v-if="errorMsg && showError">
            {{errorMsg}}.
        </div> -->
        <ErrorMessage :id="fieldId" :msg="errorMsg"  v-if="errorMsg && showError"/>
    </div>
</template>


<script lang="ts" setup>
    import { computed } from 'vue'
    type inputProps = {
        name?: string;
        id?: string,
        size?: "sm" | "lg";
        modelValue:string;
        label?:string;
        required?:boolean;
        errorMsg?:string;
        showError?:boolean;
        labelClass?:string|Record<string,any>
        wrapperClass?:string|Record<string,any>
        elementClass?:string|Record<string,any>
    }
    // eslint-disable-next-line
    const props = withDefaults(defineProps<inputProps>(),{
        showError:true,
    })

    // eslint-disable-next-line
    const emit = defineEmits(['update:modelValue'])



    const value = computed({
        get() {
            return props.modelValue as any
        },
        set(value:any) {
            emit('update:modelValue', value)
        }
    })
    const fieldId = computed(() => props.id || `input-textarea-${Math.floor(Math.random() * 100)}`);


    const customCssStyle = computed(() => {
        let classNames = props.size ? `form-control-${props.size}` : "";
        classNames += props.errorMsg ? ' is-invalid' : ''
        return classNames
    });

</script>

<style lang="scss" scoped>

</style>