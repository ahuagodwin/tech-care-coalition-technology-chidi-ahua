<template>
    <ModalBox 
            class="h-100" 
            v-model="callModal" 
            :staticBackDrop="true"
            modal-custom-class="expiration-notification" modalSize="modal-lg" modalWidth="640px"
            @modal:closed="emits('modal:closed', true)" :modalId="`modal-${Date.now()}`"
        >
            <template #default>
                
                <div class="d-flex flex-column p-0">
                    <div class="bg-blue hpx-68 perfect-center text-white">
                        <span class="material-icons-outlined fs-20 my-auto">info</span>
                        <span class="gilroy-regular my-auto ms-3">Your subscription has expired</span>
                        <span class="material-icons bg-blue-lt-3 text-blue-dk-2 rounded-circle fs-22 lh-23 fw-500 position-absolute top-0 end-0 me-5 mt-4 cursor-pointer" @click="emits('modal:closed', true)">close</span>
                    </div>
                    <div class="d-flex flex-column bg-white ppx-70">
                        <div class="text-center">After several attempts, we were unable to process payment your for your subscription.</div>
                        <div class="text-center mt-2">To enjoy benefits, please reactivate your preferred plan.</div>

                        <FormButton label="Reactivate my subscription" class="hpx-43 border-0 rounded-px-5 mt-5 mx-auto"/>
                    </div>
                </div>

            </template>
        </ModalBox>
</template>

<script lang="ts" setup>
    import { computed } from "vue"

    //eslint-disable-next-line
    const emits = defineEmits(['modal:closed'])
    
    //eslint-disable-next-line
    const props = defineProps<{openCallModal: boolean}>()

    const callModal = computed({
        get(){
            return props.openCallModal
        },
        set(){
            emits('modal:closed', true)
        }
    })
</script>

<style lang="scss" scoped>
    ::v-deep(.expiration-notification){
        .modal-body{
            padding:0;
        }
    }
</style>