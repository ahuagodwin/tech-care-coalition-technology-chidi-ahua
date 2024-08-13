<template>
    <div class="user-profile d-flex flex-column px-3">
        <div class="d-flex justify-content-center">
            <span class="material-icons me-3 my-auto text-black cursor-pointer" @click="emit('show:workspace',true)">west</span>
            <span class="gilroy-medium fs-30 lh-30 text-black my-auto">Basic profile</span>
        </div>
        <div class="d-flex justify-content-center mt-5">
            <UserAvatar 
                class="my-auto"
                size="98" 
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80"
            />
        </div>
        <div class="d-flex flex-column mt-5">
            <div class="mb-3 d-flex">
                <AuthTextInput 
                    wrapper-class="me-2" 
                    element-class="auth-element auth-element auth-element auth-element hpx-38 bg-blue-lt-1 rounded-0 border-blue-lt-1" 
                    label="First Name" 
                    v-model="form.first_name"
                    :error-msg="serverError.first_name?.[0]"
                    :disabled="saveState=='Edit'"
                />
                <AuthTextInput 
                    wrapper-class="ms-2" 
                    element-class="auth-element hpx-38 bg-blue-lt-1 rounded-0 border-blue-lt-1" 
                    label="Last Name" 
                    v-model="form.last_name"
                    :error-msg="serverError.last_name?.[0]"
                    :disabled="saveState=='Edit'"
                />
            </div>
            <div class="mb-3">
                <AuthTextInput 
                    element-class="auth-element hpx-38 bg-blue-lt-1 rounded-0 border-blue-lt-1" 
                    label="Email" 
                    type="email" 
                    v-model="form.email"
                    :error-msg="serverError.email?.[0]"
                    :disabled="saveState=='Edit'"
                />
            </div>
            <div class="mb-3">
                <AuthTextInput 
                    element-class="auth-element hpx-38 bg-blue-lt-1 rounded-0 border-blue-lt-1" 
                    label="What I do" 
                    v-model="form.company_role"
                    :error-msg="serverError.company_role?.[0]"
                    :disabled="saveState=='Edit'"
                />
            </div>
            <div class="mb-3">
                <AuthPassword 
                    element-class="auth-element hpx-38 bg-blue-lt-1 rounded-0 border-blue-lt-1" 
                    label="Password" 
                    togglePassword 
                    v-model="form.password"
                    :error-msg="serverError.password?.[0]"
                    :disabled="saveState=='Edit'"
                />
            </div>
            <div class="mb-3">
                <AuthTextInput 
                    element-class="auth-element hpx-38 bg-blue-lt-1 rounded-0 border-blue-lt-1" 
                    label="Phone number" 
                    v-model="form.phone_number"
                    :error-msg="serverError.phone_number?.[0]"
                    :disabled="saveState=='Edit'"
                />
            </div>
            <div class="d-flex w-100 mt-3">
                <FormButton :label="saveState" class="w-47 hpx-40 rounded-0" @click="submitProfile"/>
                <FormButton label="Cancel" class="w-47 hpx-40 rounded-0 ms-3" variant="light"  @click="emit('show:workspace',true)"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {ref,computed} from 'vue'
import {safeUserProfile} from '../service'
import * as AlertService from "@/services/alert-service"
import * as HelperService from "@/services/helper-service"

interface UserProfileProps {
    profile:Record<string,any>
}

const saveState = ref('Edit')


//eslint-disable-next-line
const profileProps = defineProps<UserProfileProps>()

//eslint-disable-next-line
const emit = defineEmits(['show:workspace'])


const form = ref({
    first_name:profileProps.profile?.first_name || profileProps.profile?.firstName || '',
    last_name:profileProps.profile?.last_name || profileProps.profile?.lastName || '',
    password:'',
    email:profileProps.profile?.email || '',
    phone_number:profileProps.profile?.phone_number || '',
    company_role:profileProps.profile?.company_role || '',
})

const {
    // isLoading: userProfileIsLoading,
    error: userProfileError,
    isSuccessful: userProfileIsSuccessful,
    execute: executeSaveUserProfile,
} = safeUserProfile(form.value);

const submitProfile = () =>{
    if(saveState.value=='Save'){
        executeSaveUserProfile().then((res:any)=>{
        if (userProfileIsSuccessful.value) {
            AlertService.toast('success','Success',res.message)
            saveState.value = 'Edit'
            emit('show:workspace',true)
        }
        })
    }else{
        saveState.value = 'Save'
    }
}
const serverError = computed(() => {
  return HelperService.getObjectProperty(userProfileError, "value.errors", {});
});
</script>