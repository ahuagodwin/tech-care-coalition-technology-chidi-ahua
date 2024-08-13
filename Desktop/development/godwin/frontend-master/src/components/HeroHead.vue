<template>
    <div 
        class="container-fluid overflow-hidden hero-head top-0 start-0"
    >
        <slot></slot>
    </div>
</template>


<script lang="ts" setup>
    //eslint-disable-next-line
    const props = defineProps<{isNotHome?: boolean}>()
</script>


<style lang="scss" scoped>
    .hero-head{
    /* background: linear-gradient(271.32deg, rgba(18, 39, 226, 0.2) 34.29%, rgba(255, 205, 5, 0.2) 96.18%); */
    background: linear-gradient(271.32deg, rgba(18, 39, 226, 0.2) 34.29%, rgb(243 229 104 / 47%) 96.18%);
    }
</style>