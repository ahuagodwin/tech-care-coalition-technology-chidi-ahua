<template>
    <div class="invalid-feedback" :id="`${fieldId}-feedback`">
        {{ msg }}
    </div> 
</template>


<script lang="ts" setup>
import { computed } from 'vue'
    interface ErrorProps {
        id?: string;
        msg: string;
    }
    //eslint-disable-next-line
    const props = defineProps<ErrorProps>()
    const fieldId = computed(() => props.id || `field-${Math.floor(Math.random() * 100)}`);
</script>