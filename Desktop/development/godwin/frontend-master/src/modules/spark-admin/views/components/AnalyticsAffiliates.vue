<template>
    <div class="d-flex flex-column mt-5">

        <!-- <div class="d-flex bg-white rounded-px-20 p-5 mb-5 chart">
               <div class="container">
                    <div class="row pb-4">
                        <div class="d-flex flex-column ps-4 col border-end">

                            <span class="gilroy-regular fs-14 lh-16 fw-400 text-red-lt-6">Total Affiliate Commission</span>
                            <div class="d-flex mt-2">
                                <span class="gilroy-medium fs-30 lh-35 fw-700 text-blue my-auto">₦69,250,000</span>
                                <ValueIndicator percentage="8.3" type="down" class="my-auto ms-2" />
                                <span class="gilroy-regular fs-12 lh-14 fw-400 text-red-lt-6 my-auto ms-2">This month</span>
                            </div>
                            <div class="d-flex mt-2">
                                <span class="gilroy-medium fs-30 lh-35 fw-700 text-blue my-auto">$69,250,000</span>
                                <ValueIndicator percentage="8.3" type="up" class="my-auto ms-2" />
                                <span class="gilroy-regular fs-12 lh-14 fw-400 text-red-lt-6 my-auto ms-2">This month</span>
                            </div>

                        </div>
                        <div class="d-flex flex-column ps-4 col border-end">

                                <span class="gilroy-regular fs-14 lh-16 fw-400 text-red-lt-6">Total Affiliate Commission Paid</span>
                                <div class="d-flex mt-2">
                                    <span class="gilroy-medium fs-30 lh-35 fw-700 text-blue my-auto">₦69,250,000</span>
                                    <ValueIndicator percentage="8.3" type="down" class="my-auto ms-2" />
                                    <span class="gilroy-regular fs-12 lh-14 fw-400 text-red-lt-6 my-auto ms-2">This month</span>
                                </div>
                                <div class="d-flex mt-2">
                                    <span class="gilroy-medium fs-30 lh-35 fw-700 text-blue my-auto">$69,250,000</span>
                                    <ValueIndicator percentage="8.3" type="up" class="my-auto ms-2" />
                                    <span class="gilroy-regular fs-12 lh-14 fw-400 text-red-lt-6 my-auto ms-2">This month</span>
                                </div>

                        </div>
                        <div class="d-flex flex-column ps-4 pt-3 col">

                                <span class="gilroy-regular fs-14 lh-16 fw-400 text-red-lt-6">Total People referred</span>
                                <div class="d-flex mt-2">
                                    <span class="gilroy-medium fs-30 lh-35 fw-700 text-blue my-auto">₦69,250,000</span>
                                    <ValueIndicator percentage="8.3" type="up" class="my-auto ms-2" />
                                    <span class="gilroy-regular fs-12 lh-14 fw-400 text-red-lt-6 my-auto ms-2">This month</span>
                                </div>
                            
                        </div>
                    </div>

                </div>
            </div> -->



            <div class="d-flex bg-white rounded-px-20 p-5 mb-5 chart">
               <div class="container">
                    <div class="row pb-4">
                        <div class="d-flex flex-column ps-4 col border-end">

                            <span class="gilroy-regular fs-14 lh-16 fw-400 text-red-lt-6">Total Affiliate Commission</span>
                            <div class="d-flex mt-2">
                                <span class="gilroy-medium fs-30 lh-35 fw-700 text-blue my-auto">₦{{stats.total_affiliate_naira }}</span>
                                <ValueIndicator percentage="8.3" type="down" class="my-auto ms-2" />
                                <span class="gilroy-regular fs-12 lh-14 fw-400 text-red-lt-6 my-auto ms-2">This month</span>
                            </div>
                            <div class="d-flex mt-2">
                                <span class="gilroy-medium fs-30 lh-35 fw-700 text-blue my-auto">${{ stats.total_affiliate_dollar }}</span>
                                <ValueIndicator percentage="8.3" type="up" class="my-auto ms-2" />
                                <span class="gilroy-regular fs-12 lh-14 fw-400 text-red-lt-6 my-auto ms-2">This month</span>
                            </div>

                        </div>
                        <div class="d-flex flex-column ps-4 col border-end">

                                <span class="gilroy-regular fs-14 lh-16 fw-400 text-red-lt-6">Total Affiliate Commission Paid</span>
                                <div class="d-flex mt-2">
                                    <span class="gilroy-medium fs-30 lh-35 fw-700 text-blue my-auto">₦{{ stats.total_affiliate_paid_naira }}</span>
                                    <ValueIndicator percentage="8.3" type="down" class="my-auto ms-2" />
                                    <span class="gilroy-regular fs-12 lh-14 fw-400 text-red-lt-6 my-auto ms-2">This month</span>
                                </div>
                                <div class="d-flex mt-2">
                                    <!-- <span class="gilroy-medium fs-30 lh-35 fw-700 text-blue my-auto">${{ stats.total_affiliate_paid_dollar }}</span> -->
                                    <span class="gilroy-medium fs-30 lh-35 fw-700 text-blue my-auto">${{ stats.affiliate_payout_paid_dollar }}</span>
                                    <ValueIndicator percentage="8.3" type="up" class="my-auto ms-2" />
                                    <span class="gilroy-regular fs-12 lh-14 fw-400 text-red-lt-6 my-auto ms-2">This month</span>
                                </div>

                        </div>
                        <div class="d-flex flex-column ps-4 pt-3 col">

                                <span class="gilroy-regular fs-14 lh-16 fw-400 text-red-lt-6">Total People referred</span>
                                <div class="d-flex mt-2">
                                    <span class="gilroy-medium fs-30 lh-35 fw-700 text-blue my-auto">{{ stats.total_reffered }}</span>
                                    <ValueIndicator percentage="8.3" type="up" class="my-auto ms-2" />
                                    <span class="gilroy-regular fs-12 lh-14 fw-400 text-red-lt-6 my-auto ms-2">This month</span>
                                </div>
                            
                        </div>
                    </div>

                </div>
            </div>





        <div class="d-flex justify-content-between">
            <div class="d-flex my-auto">
                <span class="tabs hpx-45 px-3 cursor-pointer perfect-center fs-15 lh-19 rounded-start-px-5"
                :class="currentTab == 'affiliates' ? 'bg-blue text-white' : 'bg-white text-black'" @click="currentTab = 'affiliates'">All affiliates</span>
                <span class="tabs hpx-45 px-3 cursor-pointer perfect-center fs-15 lh-19 rounded-end-px-5"
                :class="currentTab == 'payouts' ? 'bg-blue text-white' : 'bg-white text-black'" @click="currentTab = 'payouts'">Payout history</span>
            </div>
        </div>

        <div class="d-flex flex-column bg-white rounded-px-6 mt-3">
            <AuthTextInput 
                element-class="search-input border-0 rounded-0 rounded-top-px-6 bg-blue-lt-15" 
                placeholder="Search Name, code, discount..." 
                :model-value="searchWord || ''"
                @update:model-value="emitSearchWork"
            />
            
            
            <div class="table-responsive ppx-30" v-if="currentTab == 'affiliates'">
                <table class="table table-borderless">
                    <thead>

                        <tr>
                            <th scope="col" class="gilroy-regular fw-500 text-red-dk-5 border-bottom pb-3 fs-14 lh-16 w-35">Affiliate</th>
                            <th scope="col" class="gilroy-regular fw-500 text-red-dk-5 border-bottom pb-3 fs-14 lh-16 w-25 text-center">Referral code</th>
                            <th scope="col" class="gilroy-regular fw-500 text-red-dk-5 border-bottom pb-3 fs-14 lh-16 w-15 text-center">Total commission</th>
                            <th scope="col" class="gilroy-regular fw-500 text-red-dk-5 border-bottom pb-3 fs-14 lh-16 w-15 text-center">Unpaid commission</th>
                            <th scope="col" class="gilroy-regular fw-500 text-red-dk-5 border-bottom pb-3 fs-14 lh-16 w-10 text-center">Action</th>
                        </tr>

                    </thead>

                    <tbody v-if="affiliates.affiliates?.length">
                        <tr v-for="(affiliate, i) in affiliates.affiliates" :key="i">
                            <td>
                                <div class="d-flex">
                                    <UserAvatar 
                                        class="my-auto"
                                        size="43" 
                                        :src="affiliate.avatar"
                                    />
                                    <div class="d-flex flex-column my-auto ms-2">
                                        <span class="gilroy-regular fs-15 lh-18 fw-500">{{ affiliate.full_name }}</span>
                                        <span class="gilroy-regular fs-10 lh-12 fw-400">{{ affiliate.email }}</span>
                                    </div>
                                </div>
                            </td>
                            <td class="gilroy-regular fs-13 lh-15 text-red-lt-9 fw-400 text-center">{{ affiliate.referral_code || 'N/A' }}</td>
                            <td class="gilroy-regular fs-13 lh-15 text-red-lt-9 fw-400 text-center">{{ affiliate.total_commission }}</td>
                            <td class="gilroy-regular fs-13 lh-15 text-red-lt-9 fw-400 text-center">{{ affiliate.unpaid_commission }}</td>
                            <td class="gilroy-regular fs-13 lh-15 text-red-lt-9 fw-400 text-center">
                                <i class="material-icons-outlined cursor-pointer ms-3">delete</i>
                            </td>
                        </tr>
                    </tbody>

                </table>
                <span  class="gilroy-regular fs-12 lh-15 fw-400">{{ affiliates.affiliates?.length }} results showing</span>
            </div>


            
            <div class="table-responsive ppx-30" v-if="currentTab == 'payouts'">
                <table class="table table-borderless">
                    <thead>

                        <tr>
                            <th scope="col" class="gilroy-regular fw-500 text-red-dk-5 border-bottom pb-3 fs-14 lh-16 w-27">Name</th>
                            <th scope="col" class="gilroy-regular fw-500 text-red-dk-5 border-bottom pb-3 fs-14 lh-16 w-25 text-center">Amount</th>
                            <th scope="col" class="gilroy-regular fw-500 text-red-dk-5 border-bottom pb-3 fs-14 lh-16 w-19 text-center">Day requested</th>
                            <th scope="col" class="gilroy-regular fw-500 text-red-dk-5 border-bottom pb-3 fs-14 lh-16 w-19 text-center">Day approved</th>
                            <th scope="col" class="gilroy-regular fw-500 text-red-dk-5 border-bottom pb-3 fs-14 lh-16 w-15 text-center">Payment via</th>
                            <th scope="col" class="gilroy-regular fw-500 text-red-dk-5 border-bottom pb-3 fs-14 lh-16 w-15 text-center">Payment status</th>
                            <th scope="col" class="gilroy-regular fw-500 text-red-dk-5 border-bottom pb-3 fs-14 lh-16 w-10 text-center">Action</th>
                        </tr>

                    </thead>

                    <tbody v-if="affiliates.payouts?.length">
                        <tr v-for="(payout, i) in affiliates.payouts" :key="i">
                            <td>
                                <div class="d-flex">
                                    <UserAvatar 
                                        class="my-auto"
                                        size="43" 
                                        :src="payout.avatar"
                                    />
                                    <div class="d-flex flex-column my-auto ms-2">
                                        <span class="gilroy-regular fs-15 lh-18 fw-500">{{ payout.full_name }}</span>
                                        <span class="gilroy-regular fs-10 lh-12 fw-400">{{ payout.email }}</span>
                                    </div>
                                </div>
                            </td>
                            <td class="gilroy-regular fs-13 lh-15 text-red-lt-9 fw-400 text-center">{{ payout.amount }}</td>
                            <td class="gilroy-regular fs-13 lh-15 text-red-lt-9 fw-400 text-center">{{ dateFormatter(payout.day_requested, 'dd MMM, yyyy') }} {{ dateFormatter(payout.day_requested, 'h:mm aaaa') }}</td>
                            <td class="gilroy-regular fs-13 lh-15 text-red-lt-9 fw-400 text-center">{{ dateFormatter(payout.day_approved, 'dd MMM, yyyy') }} {{ dateFormatter(payout.day_approved, 'h:mm aaaa') }}</td>
                            <td class="gilroy-regular fs-13 lh-15 text-red-lt-9 fw-400 text-center">{{ payout.payment_mode }}</td>
                            <td class="gilroy-regular fs-13 lh-15 text-red-lt-9 fw-400 text-center" v-html="statusBadge(payout.status)"></td>
                            <td class="gilroy-regular fs-13 lh-15 text-red-lt-9 fw-400 text-center">
                                <div class="dropdown" v-if="payout.status == 'in-progress'">
                                    <i class="material-icons-outlined cursor-pointer ms-3"  data-bs-toggle="dropdown" aria-expanded="false">more_vert</i>
                                    <ul class="dropdown-menu border-0 shadow rounded-px-6">
                                        <li><span class="dropdown-item gilroy-regular fs-15 lh-15 fw-400 text-blue-dk-2" @click="submitApproval(payout.payout_id)">Approve</span></li>
                                        <li class="px-3"><hr class="dropdown-divider text-red-lt-3"></li>
                                        <li><span class="dropdown-item gilroy-regular fs-15 lh-15 fw-400 text-blue-dk-2" @click="submitDecline(payout.payout_id)">Decline</span></li>
                                    </ul>
                                </div>
                                <i class="material-icons-outlined cursor-pointer ms-3" v-else>email</i>
                            </td>
                        </tr>
                    </tbody>

                </table>
                <span  class="gilroy-regular fs-12 lh-15 fw-400">{{ affiliates.payouts?.length }} results showing</span>
            </div>  

            
        </div>

    </div>
</template>


<script setup lang="ts">
    import { ref } from 'vue'
    import { dateFormatter } from '@/services/helper-service'
    import { approvePayout, declinePayout } from '../../services'
    import * as AlertService from '@/services/alert-service'

    const currentTab = ref('affiliates')

    // eslint-disable-next-line
    const props = defineProps<{
        affiliates: {
            affiliates?: Record<string, any>[],
            payouts?: Record<string, any>[]
        }
        stats: Record<string, any>
        searchWord?: string
    }>()

    // eslint-disable-next-line
    const emit = defineEmits(['search:word'])

    const emitSearchWork = window.debounce((searchKeyword:string) => {
        emit('search:word', searchKeyword)
    }, 3000)


    const {
        isLoading: approvePayoutIsLoading,
        hasError: approvePayoutHasError,
        isSuccessful: approvePayoutIsSuccessful,
        execute: executeApprovePayout
    } = approvePayout()
    const {
        isLoading: declinePayoutIsLoading,
        hasError: declinePayoutHasError,
        isSuccessful: declinePayoutIsSuccessful,
        execute: executeDeclinePayout
    } = declinePayout()

    const submitApproval = (payoutId: number) => {
        executeApprovePayout({data: { payout_id: payoutId }}).then((res: any) => {
            if (approvePayoutIsSuccessful.value) {
                AlertService.toast('success', 'Success', res.message)
            }
        })
    }

    const submitDecline = (payoutId: number) => {
        executeDeclinePayout({data: { payout_id: payoutId }}).then((res: any) => {
            if (declinePayoutIsSuccessful.value) {
                AlertService.toast('success', 'Success', res.message)
            }
        })
    }


const statusBadge = (status:string) => {
    let string = ''
    switch (status) {
        case 'declined':
            string = `<span class="badge gilroy-regular fs-12 lh-15 fw-600 bg-red-lt-7 text-red-dk-3">Declined</span>`
            break;
        case 'completed':
            string = `<span class="badge gilroy-regular fs-12 lh-15 fw-600 bg-green-lt-1 text-green-dk-1">Completed</span>`
            break;
        case 'payout-requested':
            string = `<span class="badge gilroy-regular fs-12 lh-15 fw-600 bg-blue-lt-3 text-blue">Payout requested</span>`
            break;
        case 'in-progress':
            string = `<span class="badge gilroy-regular fs-12 lh-15 fw-600 bg-blue-lt-3 text-blue">In progress</span>`
            break;
        case 'unsuccessful':
            string = `<span class="badge gilroy-regular fs-12 lh-15 fw-600 bg-yellow-lt-2 text-yellow-dk-1">Unsuccessful</span>`
            break;
        case 'approved':
            string = `<span class="badge gilroy-regular fs-12 lh-15 fw-600 bg-purple-lt-1 text-purple-dk-2">Approved</span>`
            break;
    }
   return string
}
</script>

<style lang="scss" scoped>
    .tabs{
        &:hover{
            background-color: var(--spa-color-yellow) !important;
            color: #000000!important;
        }
    }
</style>