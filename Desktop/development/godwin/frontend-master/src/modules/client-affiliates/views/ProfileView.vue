<template>
    <div class="d-flex flex-column px-4 align-items-center">
          <input ref="fileUpload" type="file" id="file-upload" @change="handleFileUpload" class="d-none" accept="image/png, image/jpeg"/>

        <div class="card-bg border border-white d-flex flex-wrap  justify-content-between rounded-px-44 w-90 ppx-40 mb-4">
        
            <div class="text-center">
                <span class="cursor-pointer" v-if="previewCompanyImageURL" @click="(fileUpload! as HTMLInputElement).click()">
                    <!-- <UserAvatar 
                        class="my-auto"
                        size="190" 
                        :src="previewCompanyImageURL"
                    /> -->
                    <img :src="previewCompanyImageURL" class="wpx-190 hpx-190 rounded-circle"/>
                </span>
                <span class="cursor-pointer" v-else @click="(fileUpload! as HTMLInputElement).click()">
                    <UserAvatar 
                        class="my-auto"
                        size="190" 
                        :src="userProfile.avatar"
                    />
                </span>
                <div class="d-flex mt-5">
                    <FormButton label="Change Avatar" class="perfect-center h-min-50 px-5 mx-auto" @click="(fileUpload! as HTMLInputElement).click()"/>
                </div>
            </div>

            <div class="d-flex flex-column">
                <div class="mb-3 d-flex justify-content-between">
                    <AuthTextInput 
                        element-class="prof-element hpx-38 bg-transparent rounded-0 border-bottom border-blue-lt-5" 
                        wrapper-class="w-48"
                        placeholder="First name"
                        v-model="form.first_name"
                        :error-msg="serverError.first_name?.[0]"
                    />
                    <AuthTextInput 
                        element-class="prof-element hpx-38 bg-transparent rounded-0 border-bottom border-blue-lt-5" 
                        wrapper-class="w-48"
                        placeholder="Last name"
                        v-model="form.last_name"
                        :error-msg="serverError.last_name?.[0]"
                    />
                </div>
                <div class="mb-3">
                    <AuthTextInput 
                        element-class="prof-element hpx-38 bg-transparent rounded-0 border-bottom border-blue-lt-5" 
                        placeholder="Email"
                        type="email"
                        v-model="form.email"
                        :error-msg="serverError.email?.[0]"
                    />
                </div>
                <div class="mb-3">
                    <AuthPassword 
                        element-class="prof-element hpx-38 bg-transparent rounded-0 border-bottom border-blue-lt-5 pb-2" 
                        wrapper-class="w-100"
                        placeholder="Password" 
                        togglePassword 
                        v-model="form.password"
                        :error-msg="serverError.password?.[0]"
                    />
                </div>
                <div class="mb-3">
                    <AuthTextInput 
                        element-class="prof-element hpx-38 bg-transparent rounded-0 border-bottom border-blue-lt-5" 
                        placeholder="Phone"
                        v-model="form.phone_number"
                        :error-msg="serverError.phone_number?.[0]"
                    />
                </div>
                <div class="d-flex mt-3">
                    <FormButton label="Save changes" :disabled="!enableSaveBtn" class="perfect-center h-min-50 px-5 mx-auto" @click="submitProfile"/>
                </div>
            </div>

        </div>


        <div class="card-bg border border-white d-flex flex-column rounded-px-44 w-90 pxpx-40 pypx-70 mt-auto">
                    
            <span class="gilroy-regular fs-16 lh-19 mb-4">Share your referral link with your friends and families</span>

            <div class="d-flex flex-wrap  justify-content-between">

            <div class="d-flex my-auto justify-content-between hpx-54 rounded-px-35 border border-blue bg-white pspx-10 flex-grow-1 me-5">
                <div class="gilroy-regular fs-13 lh-15 my-auto" style="opacity: 0.7;">affiliates.sparkcreatives.com/david</div>
                <div 
                    class="d-flex wpx-130 h-100 fs-15 bg-blue text-white justify-content-center align-items-center cursor-pointer rounded-end-px-35"
                >
                    Copy link
                </div>
            </div>
            
            <div class="d-flex my-auto mt-2">
                <span class="gilroy-regular fs-16 lh-19 my-auto">Share link on</span>
                <div class="d-flex my-auto ms-3">
                    <div class="my-auto me-2 cursor-pointer wpx-35 hpx-35 rounded-circle d-flex border border-black justify-content-center align-items-center">
                        <img src="@/assets/img/affiliates/link.svg" alt=""/>
                    </div>
                    <div class="my-auto me-2 cursor-pointer wpx-35 hpx-35 rounded-circle d-flex border border-black justify-content-center align-items-center">
                        <img src="@/assets/img/affiliates/facebook.svg" alt=""/>
                    </div>
                    <div class="my-auto me-2 cursor-pointer wpx-35 hpx-35 rounded-circle d-flex border border-black justify-content-center align-items-center">
                        <img src="@/assets/img/affiliates/whatsapp.svg" alt=""/>
                    </div>
                    <div class="my-auto me-2 cursor-pointer wpx-35 hpx-35 rounded-circle d-flex border border-black justify-content-center align-items-center">
                        <img src="@/assets/img/affiliates/instagram.svg" alt=""/>
                    </div>
                    <div class="my-auto me-2 cursor-pointer wpx-35 hpx-35 rounded-circle d-flex border border-black justify-content-center align-items-center">
                        <img src="@/assets/img/affiliates/twitter.svg" alt=""/>
                    </div>
                </div>
            </div>

            </div>




        </div>

    </div>
</template>





<script lang="ts" setup>
    import {ref, onMounted, type Ref, computed, watch, reactive } from 'vue'
    import AuthService from '@/services/auth-service'
    import {getAffiliateData} from '../services'
    import {safeUserProfile} from '@/layouts/service'
    import * as AlertService from '@/services/alert-service'
    import * as HelperService from '@/services/helper-service'

    let affiliateData = ref({} as any)
    
    const userProfile = AuthService.getLoggedInUser()
    const form: Record<string, any> = reactive({
        first_name:userProfile?.first_name || userProfile?.firstName || '',
        last_name:userProfile?.last_name || userProfile?.lastName || '',
        password:'',
        email:userProfile?.email || '',
        phone_number:userProfile?.phone_number || '',
        avatar: '',
        initialized:false
    })
    let enableSaveBtn = ref(false)
    let formInitialized = ref(false)

    watch(()=>({...form}), ()=>{
        if (formInitialized.value) {
            enableSaveBtn.value = true
        } else {
            formInitialized.value = true
        }
    })

    const {
        // isLoading: affiliateDataIsLoading,
        execute: executeGetAffiliateData,
    } = getAffiliateData();

    onMounted(()=>{
        executeGetAffiliateData().then((res:any)=>{
            affiliateData.value = res.data
        })
    })

    const fileUpload = ref(null)
    const previewCompanyImageURL: Ref<string | null> = ref(null)
    const handleFileUpload = (evt: Event) => {
        let files = (evt.target as HTMLInputElement)?.files
        if (!files) return;
        form.avatar = files[0]
        previewCompanyImageURL.value = URL.createObjectURL(files[0])
    }


const {
    // isLoading: userProfileIsLoading,
    error: userProfileError,
    isSuccessful: userProfileIsSuccessful,
    execute: executeSaveUserProfile,
} = safeUserProfile();

const submitProfile = () => {

    let formData = new FormData();
    formData.append('first_name', form.first_name as string)
    formData.append('last_name', form.last_name as string)
    formData.append('password', form.password as string)
    formData.append('email', form.email as string)
    formData.append('phone_number', form.phone_number as string)
    formData.append('_method', 'put' as string)
    if (form.avatar) {
        formData.append('avatar', form.avatar as File)
    }
    executeSaveUserProfile({ data: formData, method:'post' }).then((res: any) => {
        if (userProfileIsSuccessful.value) {
            enableSaveBtn.value = false
            AlertService.toast('success', 'Success', res.message)
        }
    })
}
const serverError = computed(() => {
    return HelperService.getObjectProperty(userProfileError, "value.errors", {});
});

</script>

<style lang="scss" scoped>
::v-deep(.prof-element){
    border-top:0!important;
    border-right:0!important;
    border-left:0!important;
    box-shadow: none!important;
    font-family: Gilroy-Regular;
    font-size: 20px;
    line-height: 23px;
    letter-spacing: -0.02em;
    opacity: 0.7;
}
select:required:invalid {
    color: #666;
    font-size: 16px;
}
option[value=""][disabled] {
    display: none;
}
.card-bg{
    background: linear-gradient(180deg, #E7E9FC 0%, rgba(231, 233, 252, 0) 100%, rgba(231, 233, 252, 0.1) 100%);
}
.h-min-150{
  min-height: 150px;
}
.cart-left, .cart-right{
  min-height: 700px;
}
@media (min-width: 1000px) {
  .cart-left {
    margin-right: 70px;
  }
}
</style>