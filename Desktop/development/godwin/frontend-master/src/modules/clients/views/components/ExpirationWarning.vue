<template>
    <div v-if="statusIsAvailable">
        <div class="d-flex bg-white hpx-89 border-start border-4 border-red-dk-3 rounded-top-right-px-5 rounded-bottom-right-px-5 pxpx-66 pypx-32 mb-5 mepx-22" v-if="showWarningMessage">
            <span class="material-icons-outlined fs-20 my-auto">info</span>
            <span class="fs-15 lh-19 my-auto ms-3 me-5">Your main plan expires in the next <span class="gilroy-bold">{{ planStatus?.days }} day(s)</span>. Kindly ensure your card is funded in order to enjoy in interrupted service</span>
            <span class="material-icons bg-blue-lt-3 text-blue-dk-2 rounded-circle fs-22 lh-23 fw-500 my-auto cursor-pointer" @click="showWarningMessage = false">close</span>
        </div>
        <ExpirationNotification :openCallModal="planExpired" @modal:closed="planExpired = false"/>
    </div>
</template>

<script setup lang="ts">
    import {ref, onMounted, type Ref, computed } from 'vue'
    import { getPlanExpiringStatus } from '../../services'
    import ExpirationNotification from './ExpirationNotification.vue'
    
    
    const planStatus: Ref<{ status: string, days?: number } | null> =  ref(null)

    const {
        isLoading: getPlanStatusIsLoading,
        isSuccessful: getPlanStatusIsSuccessful,
        execute: executeGetPlanStatus
    } = getPlanExpiringStatus()

    const showWarningMessage = ref(false)
    const planExpired = ref(false)
    onMounted(()=>{
        executeGetPlanStatus().then((res:any) => {
            planStatus.value = res
            if (planStatus.value?.status == 'expiring') {
                showWarningMessage.value = true
            }
            if (planStatus.value?.status == 'expired') {
                planExpired.value = true
            }
        })
    })

    const statusIsAvailable = computed(() => {
        return getPlanStatusIsSuccessful.value
    })
</script>