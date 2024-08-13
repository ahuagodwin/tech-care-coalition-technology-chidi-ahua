<template>
    <ModalBox 
            class="h-100" 
            v-model="callModal" 
            :staticBackDrop="true"
            modal-custom-class="book-a-call" modalSize="modal-lg" modalWidth="350px"
            @modal:closed="emits('modal:closed', true)" :modalId="`modal-${Date.now()}`"
        >
            <template #default>
                
                <div class="d-flex flex-column p-0">
                    <span class="material-icons fs-22 lh-23 fw-500 text-red-lt-5 position-absolute top-0 end-0 me-2 mt-2 cursor-pointer" @click="emits('modal:closed', true)">close</span>
                    <img src="@/assets/img/home/book-a-call.svg" alt=""/>
                    <div class="d-flex flex-column px-4 pb-4">
                        <span class="gilroy-bold fs-18 lh-23 text-secondary-dk-2 mt-4">Do you want us to call you back?</span>
                        <span class="gilroy-regular fs-14 lh-18 text-red-dk-2 mt-1">Do you want us to call you back?</span>
                        <div class="mb-3 mt-4">
                            <AuthTextInput 
                                element-class="auth-element hpx-50 rounded-0" 
                                required 
                                label="Full name" 
                                placeholder="Enter your name here" 
                                v-model="form.full_name"
                                :error-msg="serverError.full_name?.[0]"
                            />
                        </div>
                        <div class="mb-3">
                            <AuthTextInput 
                                acceptNumberOnly
                                element-class="auth-element hpx-50 rounded-0" 
                                required 
                                label="Mobile number" 
                                placeholder="Enter mobile number" 
                                v-model="form.mobile_no"
                                :error-msg="serverError.mobile_no?.[0]"
                            />
                        </div>
                        <div class="d-flex">
                            <FormButton label="No, thanks" class="hpx-40 rounded-0 px-4 me-3" buttonType="outline" @click="emits('modal:closed', true)"/>
                            <FormButton label="Yes, call me" class="hpx-40 rounded-0 px-4" @click="bookTheCall" />
                        </div>
                    </div>
                </div>
            </template>
        </ModalBox>
</template>

<script lang="ts" setup>
    import { computed, ref } from "vue"
    import { bookACall } from '../service'
    import * as AlertService from "@/services/alert-service"
    import * as HelperService from "@/services/helper-service"

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

const form = ref({
    full_name:'',
    mobile_no:'',
})

const {
    //isLoading: bookACallIsLoading,
    error: bookACallError,
    isSuccessful: bookACallIsSuccessful,
    execute: executeBookACall,
} = bookACall(form.value);

const bookTheCall = () =>{
    executeBookACall().then((res:any)=>{
        if (bookACallIsSuccessful.value) {
            AlertService.toast('success','Success',res.message)
            emits('modal:closed', true)
        }
    })
}
const serverError = computed(() => {
  return HelperService.getObjectProperty(bookACallError, "value.errors", {});
});
</script>

<style lang="scss" scoped>
    ::v-deep(.book-a-call){
        .modal-body{
            padding:0;
        }
    }
</style>