<template>
    <label 
        v-bind="$attrs"
        :for="fieldId" 
        :class="[labelClass]"
        class="form-label fs-16 lh-19" 
        v-required="required || false"
    >{{label}}</label>
</template>

<script lang="ts" setup>
    // eslint-disable-next-line
    withDefaults(defineProps<{
        fieldId?:string;
        label:string;
        required?:boolean;
        labelClass?:string;
    }>(),{
        labelClass:'text-blue-lt-2'
    })
</script>


<style lang="scss" scoped>
    /* label{
        color: #696F79;
    } */
</style>