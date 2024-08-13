<template>
    <div class="d-flex flex-column px-4">
        


        <div class="d-flex flex-wrap justify-content-center">

            <div class="cart-left card-bg border border-white d-flex flex-column rounded-px-44 wpx-450 ppx-40 mb-4">

                <div class="text-center">

                    <UserAvatar 
                        class="my-auto"
                        size="190" 
                        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80"
                    />
                </div>
                
                <div class="d-flex flex-column mt-5">
                    <div class="mb-3 d-flex justify-content-between">
                        <AuthTextInput 
                            element-class="prof-element hpx-38 bg-transparent rounded-0 border-bottom border-blue-lt-5" 
                            wrapper-class="w-48"
                            placeholder="First name"
                        />
                        <AuthTextInput 
                            element-class="prof-element hpx-38 bg-transparent rounded-0 border-bottom border-blue-lt-5" 
                            wrapper-class="w-48"
                            placeholder="Last name"
                        />
                    </div>
                    <div class="mb-3">
                        <AuthTextInput 
                            element-class="prof-element hpx-38 bg-transparent rounded-0 border-bottom border-blue-lt-5" 
                            placeholder="Email"
                            type="email"
                        />
                    </div>
                    <div class="mb-3">
                        <AuthPassword 
                            element-class="prof-element hpx-38 bg-transparent rounded-0 border-bottom border-blue-lt-5 pb-2" 
                            wrapper-class="w-100"
                            placeholder="Password" 
                            togglePassword 
                        />
                    </div>
                    <div class="mb-3">
                        <AuthTextInput 
                            element-class="prof-element hpx-38 bg-transparent rounded-0 border-bottom border-blue-lt-5" 
                            placeholder="Phone"
                        />
                    </div>
                    <div class="mb-3">
                        <select class="prof-element bg-transparent rounded-0 border-bottom border-blue-lt-5 form-select form-select-lg" required>
                            <option value="" disabled selected>Please select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    <div class="d-flex mt-3">
                        <FormButton label="Edit" class="perfect-center h-min-50 px-4 mx-auto"/>
                    </div>
                </div>

            </div>

            <div class="cart-right d-flex flex-column wpx-450 px-0 mb-4">
                
                <div class="card-bg border border-white d-flex flex-column rounded-px-44 pxpx-40 pypx-70">
                    
                    <div class="d-flex justify-content-between mb-4 border-bottom border-blue-lt-5">
                        <span class="my-auto gilroy-regular fs-20 lh-23" style="opacity: 0.7;">Country</span>
                        <select class="prof-element bg-transparent rounded-0 form-select form-select-lg my-auto w-50" required>
                            <option value="" disabled selected>Please select</option>
                            <option value="nig">Nigeria</option>
                            <option value="can">Canada</option>
                            <option value="usa">USA</option>
                        </select>
                    </div>
                
                    <div class="d-flex justify-content-between mb-4 border-bottom border-blue-lt-5">
                        <span class="my-auto gilroy-regular fs-20 lh-23" style="opacity: 0.7;">Currency</span>
                        <select class="prof-element bg-transparent rounded-0 form-select form-select-lg my-auto w-50" required>
                            <option value="" disabled selected>Please select</option>
                            <option value="ngn">Naira</option>
                            <option value="bpd">Pounds</option>
                            <option value="usd">Dollar</option>
                        </select>
                    </div>
                
                    <div class="d-flex justify-content-between">
                        <span class="my-auto gilroy-regular fs-20 lh-23" style="opacity: 0.7;">Time zone</span>
                        <select class="prof-element bg-transparent border-0 rounded-0 form-select form-select-lg my-auto w-50" required>
                            <option value="" disabled selected>Please select</option>
                            <option value="0:00">0:00 GMT</option>
                            <option value="1:00">1:00 GMT</option>
                            <option value="2:00">2:00 GMT</option>
                        </select>
                    </div>

                </div>
                
                
                <div class="card-bg border border-white d-flex flex-column rounded-px-44 pxpx-40 pypx-70 mt-auto">
                    
                    <span class="gilroy-regular fs-16 lh-19 mb-4">Share your referral link with your friends and families</span>

                    <div class="d-flex my-auto justify-content-between hpx-54 rounded-px-35 border border-blue bg-white pspx-10">
                        <div class="gilroy-regular fs-13 lh-15 my-auto" style="opacity: 0.7;">affiliates.sparkcreatives.com/david</div>
                        <div 
                            class="d-flex wpx-130 h-100 fs-15 bg-blue text-white justify-content-center align-items-center cursor-pointer rounded-end-px-35"
                        >
                            Copy link
                        </div>
                    </div>
                    
                    <div class="d-flex mt-4">
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



    </div>
</template>





<script lang="ts" setup>
    import {ref, onMounted} from 'vue'
    import {getAffiliateData} from '../services'

    let affiliateData = ref({} as any)

    const {
        isLoading: affiliateDataIsLoading,
        execute: executeGetAffiliateData,
    } = getAffiliateData();

    onMounted(()=>{
        executeGetAffiliateData().then((res:any)=>{
            affiliateData.value = res.data
        })
    })
    const copyReferrerCode = ()=>{
        navigator.clipboard.writeText(affiliateData.value?.referral_code);
    }
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