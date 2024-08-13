<template>
    <div class="d-flex flex-column px-4">
        <div class="d-flex justify-content-between">
            <span class="gilroy-regular fs-25 lh-28 fw-400 text-blue-dk-1">Analytics</span>
            <div class="d-flex my-auto">
                <div class="d-flex me-3 bg-blue-lt-14 rounded-px-19 pxpx-20 pypx-8 cursor-pointer hpx-40 my-auto">
                    <i class="material-icons-outlined my-auto">file_download</i>
                    <span class="ms-2 my-auto fs-12 lh-18 fw-400 gilroy-regular">Export as CSV</span>
                </div>
                <DateRangePicker class="my-auto me-3" :display-value="dateDisplayValue" @update:modelValue="getRange"/>
                <span class="my-auto cursor-pointer" :class="{'text-blue': hasFilters, 'text-muted': !hasFilters }" @click="clearFilter">Clear filters</span>
            </div>
        </div>



        <div class="row row-cols-1 row-cols-md-4 g-4 mt-4">

            <div class="col">
                <div class="card cursor-pointer" :class="{'selected': currentPage =='orders'}" @click="switchPage('orders')">

                    <div class="d-flex align-items-center p-4 hpx-150">
                        <span class="icon-bg wpx-66 hpx-66 rounded-circle perfect-center my-auto">
                            <i class="icon material-icons-outlined fs-30">monetization_on</i>
                        </span>
                        <div class="d-flex flex-column my-auto ms-2">
                            <span class="title gilroy-regular fs-15 lh-18 fw-400">Total Orders</span>
                            <span class="value gilroy-regular fs-30 lh-33 fw-400">80000</span>
                        </div>
                    </div>

                </div>
            </div>

            <div class="col">
                <div class="card cursor-pointer" :class="{ 'selected': currentPage == 'users' }" @click="switchPage('users')">

                    <div class="d-flex align-items-center p-4 hpx-150">
                        <span class="icon-bg wpx-66 hpx-66 rounded-circle perfect-center my-auto">
                            <i class="icon material-icons-outlined fs-30">groups</i>
                        </span>
                        <div class="d-flex flex-column my-auto ms-2">
                            <span class="title gilroy-regular fs-15 lh-18 fw-400">Total Users</span>
                            <span class="value gilroy-regular fs-30 lh-33 fw-400">500</span>
                        </div>
                    </div>

                </div>
            </div>

            <div class="col">
                <div class="card cursor-pointer" :class="{ 'selected': currentPage == 'customers' }" @click="switchPage('customers')">

                    <div class="d-flex align-items-center p-4 hpx-150">
                        <span class="icon-bg wpx-66 hpx-66 rounded-circle perfect-center my-auto">
                            <i class="icon material-icons-outlined fs-30">groups_3</i>
                        </span>
                        <div class="d-flex flex-column my-auto ms-2">
                            <span class="title gilroy-regular fs-15 lh-18 fw-400">Total Customers</span>
                            <span class="value gilroy-regular fs-30 lh-33 fw-400">300</span>
                        </div>
                    </div>

                </div>
            </div>

            <div class="col">
                <div class="card cursor-pointer" :class="{ 'selected': currentPage == 'affiliates' }" @click="switchPage('affiliates')">

                    <div class="d-flex align-items-center p-4 hpx-150">
                        <span class="icon-bg wpx-66 hpx-66 rounded-circle perfect-center my-auto">
                            <i class="icon material-icons-outlined fs-30">campaign</i>
                        </span>
                        <div class="d-flex flex-column my-auto ms-2">
                            <span class="title gilroy-regular fs-15 lh-18 fw-400">Total Affiliates</span>
                            <span class="value gilroy-regular fs-30 lh-33 fw-400">300</span>
                        </div>
                    </div>

                </div>
            </div>

        </div>


        <div class="mt-3">
            <AnalyticsOrders 
                v-if="currentPage == 'orders'" 
                :orders="orders" 
                :stats="orderStats" 
                @search:word="modifySearchWord" 
                :search-word="requestParams.search"
            />
            <AnalyticsUsers 
                v-if="currentPage == 'users'"
                :users="users"  
                @search:word="modifySearchWord" 
                :search-word="requestParams.search"
            />
            <AnalyticsCustomers 
                v-if="currentPage == 'customers'" 
                :customers="customers" 
                @search:word="modifySearchWord" 
                :search-word="requestParams.search"
            />
            <AnalyticsAffiliates 
                v-if="currentPage == 'affiliates'" 
                :affiliates="affiliatesData" 
                :stats="affiliateStats" 
                @search:word="modifySearchWord" 
                :search-word="requestParams.search"
            />
        </div>



    </div>
</template>




<script setup lang="ts">
    import { ref,Ref, computed, onMounted, watch } from 'vue'
    import AnalyticsUsers from './components/AnalyticsUsers.vue'
    import AnalyticsCustomers from './components/AnalyticsCustomers.vue'
    import AnalyticsOrders from './components/AnalyticsOrders.vue'
    import AnalyticsAffiliates from './components/AnalyticsAffiliates.vue'
    import { dateFormatter } from '@/services/helper-service'
    import {
        getAnalyticsTotalOverview,
        getAnalyticsOrderStats,
        getAnalyticsOrderList,
        getAnalyticsUserList,
        getAnalyticsCustomerList,
        getAffiliateStats,
        getAffiliateOverviewList,
        getAffiliatePayoutList
    } from '../services'

    const switchPage = (page: string) => {
        clearFilter()
        currentPage.value = page
    }
    const currentPage = ref('users')
    const requestParams: Ref<{
        date_from?: string,
        date_to?: string
        search?: string
    }> = ref({})

    const overviewTotals = ref([])
    const affiliateStats = ref({})
    const orderStats = ref({})
    const orders = ref([])
    const users = ref([])
    const customers = ref([])
    const affiliatesData: Ref<{
        affiliates: any[],
        payouts: any[]
    }> = ref({
        affiliates: [],
        payouts: []
    })

    onMounted(()=>{
        getAllAnalyticStats()
        getAllAnalyticsData()
    })


    const dateDisplayValue: Ref<string | undefined> = ref('')

    const getRange = (range: any) => {
        dateDisplayValue.value = `${dateFormatter(range[0], 'dd MMM, YYY')} - ${dateFormatter(range[1], 'dd MMM, YYY')}`
        requestParams.value.date_from = dateFormatter(range[0], 'yyyy-MM-dd')
        requestParams.value.date_to = dateFormatter(range[1], 'yyyy-MM-dd')
    }

    const modifySearchWord = (searchKeyword: string) =>{
        requestParams.value.search = searchKeyword
    }



    const hasFilters = computed(()=>{
        return !!requestParams.value.date_from
        ||  !!requestParams.value.date_to
        ||  !!requestParams.value.search
    })

    const clearFilter = () => {
        if (hasFilters.value) {
            dateDisplayValue.value = undefined
            requestParams.value = {
                date_from: '',
                date_to: '',
                search: ''
            }
        }
    }

    watch(requestParams, () => {
        getAllAnalyticsData()
    }, { deep: true })



    const {
        isLoading: analyticsTotalOverviewIsLoading,
        execute: executeGetAnalyticsTotalOverview
    } = getAnalyticsTotalOverview()

    const {
        isLoading: analyticsOrderListIsLoading,
        execute: executeGetAnalyticsOrderList
    } = getAnalyticsOrderList()

    const {
        isLoading: analyticsUserListIsLoading,
        execute: executeGetAnalyticsUserList
    } = getAnalyticsUserList()

    const {
        isLoading: analyticsCustomerListIsLoading,
        execute: executeGetAnalyticsCustomerList
    } = getAnalyticsCustomerList()

    const {
        isLoading: affiliateOverviewListIsLoading,
        execute: executeGetAffiliateOverviewList
    } = getAffiliateOverviewList()

    const {
        isLoading: affiliatePayoutListIsLoading,
        execute: executeGetAffiliatePayoutList
    } = getAffiliatePayoutList()

    const {
        isLoading: orderStatsIsLoading,
        execute: executeOrderStats
    } = getAnalyticsOrderStats()

    const {
        isLoading: affiliateStatsIsLoading,
        execute: executeAffiliateStats
    } = getAffiliateStats()

    const getAllAnalyticStats = () =>{
        Promise.all([
            executeGetAnalyticsTotalOverview(),
            executeOrderStats(),
            executeAffiliateStats()
        ]).then((res: any) => {
            overviewTotals.value = res[0]
            orderStats.value = res[1]
            affiliateStats.value = res[2]
        })
    }


    const getAllAnalyticsData = () => {
        Promise.all([
            executeGetAnalyticsOrderList({ url: '/api/admin/analytics/order_overview_list', params: requestParams.value}),
            executeGetAnalyticsUserList({ url: '/api/admin/analytics/user_overview_list', params: requestParams.value}),
            executeGetAnalyticsCustomerList({ url: '/api/admin/analytics/customer_overview_list', params: requestParams.value}),
            executeGetAffiliatePayoutList({ url: '/api/admin/analytics/affiliate_overview_list', params: requestParams.value}),
            executeGetAffiliateOverviewList({ url: '/api/admin/analytics/payout_history', params: requestParams.value}),
        ]).then((res: any) => {
            orders.value = res[0]
            users.value = res[1]
            customers.value = res[2]
            affiliatesData.value = {
                affiliates: res[3],
                payouts: res[4],
            }
        })
    }



</script>



<style lang="scss" scoped>
    .card{
        border:none;
        box-shadow: 0px 5px 26px 0px #E7E9FC;
        border-radius: 20px;
        .icon-bg{
            background-color: var(--spa-color-blue);
        }
        .icon{
            color: var(--spa-color-white);
        }
        .title{
            color: var(--spa-color-blue-dk-2);
        }
        .value{
            color: var(--spa-color-blue);
        }

        &.selected{
            background-color: var(--spa-color-blue) !important;
            .icon-bg{
                background-color: var(--spa-color-white) !important;
            }
            .icon{
                color: var(--spa-color-blue) !important;
            }
            .title{
                color: var(--spa-color-white) !important;
            }
            .value{
                color: var(--spa-color-white) !important;
            }
        }
    }

</style>