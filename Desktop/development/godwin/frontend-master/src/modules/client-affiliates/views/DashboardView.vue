<template>
    <div class="d-flex flex-column px-4">
        <div class="d-flex justify-content-between">
            <span class="gilroy-medium fs-25 lh-28 text-blue-dk-1 my-auto">Referral Overview</span>
            <i class="material-icons fs-30 my-auto">cached</i>
        </div>
        <div class="d-flex justify-content-between flex-wrap my-4">
            <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 wpx-260 hpx-165 mbpx-20 rounded-px-20 bg-blue text-white">
                <div class="gilroy-regular fs-17 text-center mtpx-35">Total users referred</div>
                <div class="gilroy-medium fs-40 text-center mtpx-n5">{{affiliateData.total_referral}}</div>
                <div class="gilroy-regular fs-12 text-center mt-4"><span class="gilroy-bold">+55%</span> last week</div>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 wpx-260 hpx-165 mbpx-20 rounded-px-20 bg-blue-lt-1 text-black">
                <div class="gilroy-regular fs-17 text-center mtpx-35">Net Income</div>
                <div class="gilroy-medium fs-40 text-center mtpx-n5">{{ formatMoney(affiliateData.total_payment)}}</div>
                <div class="gilroy-regular fs-12 text-center mt-4">Just Updated</div>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 wpx-260 hpx-165 mbpx-20 rounded-px-20 bg-blue-lt-1 text-black">
                <div class="gilroy-regular fs-17 text-center mtpx-35">Income withdrew</div>
                <div class="gilroy-medium fs-40 text-center mtpx-n5">{{ formatMoney(affiliateData.total_paid)}}</div>
                <div class="gilroy-regular fs-12 text-center mt-4">Just Updated</div>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 wpx-260 hpx-165 mbpx-20 rounded-px-20 bg-blue-lt-1 text-black">
                <div class="gilroy-regular fs-17 text-center mtpx-35">Available for withdrawal</div>
                <div class="gilroy-medium fs-40 text-center mtpx-n5">{{ formatMoney(affiliateData.pending_payment)}}</div>
                <div class="gilroy-regular fs-12 text-center mt-4">Just Updated</div>
            </div>
        </div>
        <div class="referrer d-flex flex-column rounded-bottom-px-20 bg-white w-100 mt-2">
            <div class="d-flex flex-column referrer-head w-100 pxpx-60 py-4 text-white">
                <div class="d-flex">
                    <span class="gilroy-medium my-auto header-title">Refer friends and families & earn</span>
                    <span class="gilroy-bold fs-45 my-auto wpx-204 hpx-63 bg-yellow text-center ms-5 text-blue-dk-2 rounded-px-10">{{ formatMoney (5000)}}</span>
                </div>
                <span class="gilroy-regular mt-n2 header-text">Refer Spark to friends and families & earn {{ formatMoney(5000) }} every time they use our services</span>
            </div>
            <div class="d-flex flex-column w-100 pxpx-50 py-4">
                <span class="gilroy-regular fs-20 mb-4">Share your referral link with your friends and families</span>
                <div class="d-flex flex-wrap justify-content-between">
                    <div class="d-flex my-auto justify-content-between wpx-650 hpx-68 rounded-px-35 border border-blue pspx-70">
                        <div class="gilroy-regular fs-15 my-auto">Promo code: <span class="gilroy-bold">{{affiliateData.referral_code}}</span></div>
                        <div 
                            @click="copyReferrerCode" 
                            class="d-flex wpx-150 h-100 fs-15 bg-blue text-white justify-content-center align-items-center cursor-pointer rounded-end-px-35"
                        >
                            Copy link
                        </div>
                    </div>
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
        <div class="gilroy-regular fs-12 mt-4 text-center">Please note that some Terms and Conditions apply. Your friends will need to verify their identity and also use any of our services before any cash rewards are paid to your account.</div>
    </div>
</template>





<script lang="ts" setup>
    import {ref, onMounted} from 'vue'
    import {getAffiliateData} from '../services'
    import { formatMoney } from '@/services/helper-service'

    let affiliateData = ref({} as any)

    const {
        //isLoading: affiliateDataIsLoading,
        execute: executeGetAffiliateData,
    } = getAffiliateData();

    onMounted(()=>{
        executeGetAffiliateData().then((res: any) => {
            affiliateData.value = res.data
        })
    })
    const copyReferrerCode = ()=>{
        navigator.clipboard.writeText(affiliateData.value?.referral_code);
    }
</script>

<style lang="scss" scoped>
    .referrer{
        min-height: 345px;
        &-head{
            background-image: url(@/assets/img/affiliates/bg-1.svg);
            background-repeat: no-repeat;
            background-size:cover;
            min-height:150px;
            .header-title{
                font-size:3.25vw
            }
            .header-text{
                font-size:1.2vw
            }
        }
    }
</style>