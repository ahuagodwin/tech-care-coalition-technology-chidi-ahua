<template>
    <div class="d-flex flex-column">
        <div class="mb-5 d-flex">
            <i class="my-auto me-3 material-icons-outlined text-blue fs-18">west</i>
            <span class="my-auto gilroy-regular fs-20 lh-23 fw-400">{{ 'Paystack' }}'s Workspace</span>
            <span class="my-auto me-3 ms-5 gilroy-regular fs-20 lh-23 fw-400 text-red-lt-10">Account manager: </span>
            <span class="my-auto gilroy-regular fs-20 lh-23 fw-400 text-blue">{{ 'James brown' }}</span>
        </div>
        <RequestComponent is-admin :workspace-id="workspaceId"/>
    </div>
</template>



<script setup lang="ts">
    import { useRoute } from 'vue-router'
    import RequestComponent from '../../clients/views/components/RequestComponent.vue'
    

    const route = useRoute()
    const workspaceId = route.params.workspaceId as string
</script>