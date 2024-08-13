<template>
  <section>
    <div class="passwordInput position-relative">
      <AuthTextInput 
        v-model="password"
        :type="!toggle ? 'password' : 'text'" 
        :name="name"
        :id="id"
        :size="size"
        :disabled="disabled"
        :label="label"
        :wrapperClass="wrapperClass"
        :elementClass="elementClass"
        :required="required"
        :errorMsg="errorMsg"
        :showError="false"
      />
      <!-- <button
        v-if="togglePassword"
        class="toggleBtn btn btn-circle btn-default position-absolute z-1"
        @mousedown="toggle = !toggle" @mouseup="toggle = !toggle"
        type="button"
      > -->
      <button
        v-if="togglePassword"
        class="toggleBtn btn btn-circle btn-default position-absolute z-1"
        @click="toggle = !toggle"
        type="button"
      >
        <span class="material-icons medium text-primary-lt-1 mt-n1 position-relative">{{toggle ? 'visibility' : 'visibility_off'}}</span>
      </button>
    </div>
    <!-- <div :id="`password-${Math.floor(Math.random() * 100)}-feedback`" class="invalid-feedback" v-if="errorMsg">
        {{errorMsg}}.
    </div> -->
    <ErrorMessage :id="`password-${Math.floor(Math.random() * 100)}-feedback`" :msg="errorMsg"  v-if="errorMsg"/>
  </section>
</template>

<script lang="ts" setup>
    import {ref, computed } from "vue"
    type inputProps = {
        name?: string,
        id?: string,
        size?: "sm" | "lg",
        modelValue:string,
        label?:string,
        required?:boolean,
        disabled?:boolean,
        togglePassword?:boolean,
        togglePosition?:string
        errorMsg?:string;
        wrapperClass?:string|Record<string,any>
        elementClass?:string|Record<string,any>
    }
    // eslint-disable-next-line
    const props = withDefaults(defineProps<inputProps>(),{
      elementClass:'hpx-50'
    })
    
    let toggle = ref(false)
    
    // eslint-disable-next-line
    const emit = defineEmits(['update:modelValue'])

    const passwordTogglePosition = computed(() => props.togglePosition ? props.togglePosition : (props.label ? '48%' : '32%'))

    const password = computed({
        get() {
            return props.modelValue as string
        },
        set(value:string) {
            emit('update:modelValue', value)
        }
    })
</script>


<style lang="scss" scoped>
.passwordInput{
    max-height: fit-content;
    .toggleBtn{
        top:v-bind(passwordTogglePosition);
        right:0;    
        height: 30px;
        &:hover, &:focus{
          border: none;
        }
    }
}
</style>