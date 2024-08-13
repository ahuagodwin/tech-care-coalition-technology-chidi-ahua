<template>
    <div class="d-flex flex-column mt-5">

        <!-- <div class="d-flex bg-white rounded-px-20 p-5 mb-5 chart">
           <div class="container">
                <div class="row border-bottom pb-4 mb-4">
                    <div class="d-flex flex-column ps-4 col border-end">

                        <span class="gilroy-regular fs-14 lh-16 fw-400 text-red-lt-6">Total Revenue</span>
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

                            <span class="gilroy-regular fs-14 lh-16 fw-400 text-red-lt-6">Total Affiliate commission payout</span>
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
                    <div class="d-flex flex-column ps-4 col">

                            <span class="gilroy-regular fs-14 lh-16 fw-400 text-red-lt-6">Total promo code redeemed</span>
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
                </div>




                <div class="d-flex flex-column ps-3">
                    <span class="gilroy-medium fs-20 lh-23 fw-700 mb-3">Plans</span>
                    <div class="d-flex wpx-950 overflow-scroll">

                        <div class="d-flex flex-column pe-4" v-for="(n) in 7" :key="n">
                            <div class="d-flex">
                                <span class="rounded-circle wpx-15 hpx-15 me-2" :style="{backgroundColor: getRandomColor()}"></span>
                                <span class="gilroy-regular fs-14 lh-16 fw-400 text-red-lt-6">Plan Name {{ n }}</span>
                            </div>
                            <div class="d-flex mt-2">
                                <span class="gilroy-medium fs-30 lh-35 fw-700 my-auto">₦69,250,000</span>
                                <ValueIndicator percentage="8.3" type="down" class="my-auto ms-2" />
                            </div>
                            <div class="d-flex mt-2">
                                <span class="gilroy-medium fs-30 lh-35 fw-700 my-auto">$69,250,000</span>
                                <ValueIndicator percentage="8.3" type="up" class="my-auto ms-2" />
                            </div>

                        </div>

                    </div>
                </div>


                <div class="d-flex flex-column ps-3 mt-4">
                    <span class="gilroy-medium fs-20 lh-23 fw-700 mb-3">Addons</span>
                    <div class="d-flex wpx-950 overflow-scroll">

                        <div class="d-flex flex-column pe-4" v-for="(n) in 7" :key="n">
                            <div class="d-flex">
                                <span class="rounded-circle wpx-15 hpx-15 me-2" :style="{backgroundColor: getRandomColor()}"></span>
                                <span class="gilroy-regular fs-14 lh-16 fw-400 text-red-lt-6">Addon Name {{ n }}</span>
                            </div>
                            <div class="d-flex mt-2">
                                <span class="gilroy-medium fs-30 lh-35 fw-700 my-auto">₦69,250,000</span>
                                <ValueIndicator percentage="8.3" type="down" class="my-auto ms-2" />
                            </div>
                            <div class="d-flex mt-2">
                                <span class="gilroy-medium fs-30 lh-35 fw-700 my-auto">$69,250,000</span>
                                <ValueIndicator percentage="8.3" type="up" class="my-auto ms-2" />
                            </div>

                        </div>

                    </div>
                </div>



            </div>
        </div> -->




        <div class="d-flex bg-white rounded-px-20 p-5 mb-5 chart">
           <div class="container">
                <div class="row border-bottom pb-4 mb-4">
                    <div class="d-flex flex-column ps-4 col border-end">

                        <span class="gilroy-regular fs-14 lh-16 fw-400 text-red-lt-6">Total Revenue</span>
                        <div class="d-flex mt-2">
                            <span class="gilroy-medium fs-30 lh-35 fw-700 text-blue my-auto">₦{{ stats.revenue_naira }}</span>
                            <ValueIndicator percentage="8.3" type="down" class="my-auto ms-2" />
                            <span class="gilroy-regular fs-12 lh-14 fw-400 text-red-lt-6 my-auto ms-2">This month</span>
                        </div>
                        <div class="d-flex mt-2">
                            <span class="gilroy-medium fs-30 lh-35 fw-700 text-blue my-auto">${{ stats.revenue_dollar }}</span>
                            <ValueIndicator percentage="8.3" type="up" class="my-auto ms-2" />
                            <span class="gilroy-regular fs-12 lh-14 fw-400 text-red-lt-6 my-auto ms-2">This month</span>
                        </div>

                    </div>
                    <div class="d-flex flex-column ps-4 col border-end">

                            <span class="gilroy-regular fs-14 lh-16 fw-400 text-red-lt-6">Total Affiliate commission payout</span>
                            <div class="d-flex mt-2">
                                <span class="gilroy-medium fs-30 lh-35 fw-700 text-blue my-auto">₦{{ stats.affiliate_payout_naira }}</span>
                                <ValueIndicator percentage="8.3" type="down" class="my-auto ms-2" />
                                <span class="gilroy-regular fs-12 lh-14 fw-400 text-red-lt-6 my-auto ms-2">This month</span>
                            </div>
                            <div class="d-flex mt-2">
                                <span class="gilroy-medium fs-30 lh-35 fw-700 text-blue my-auto">${{ stats.affiliate_payout_dollar }}</span>
                                <ValueIndicator percentage="8.3" type="up" class="my-auto ms-2" />
                                <span class="gilroy-regular fs-12 lh-14 fw-400 text-red-lt-6 my-auto ms-2">This month</span>
                            </div>

                    </div>
                    <div class="d-flex flex-column ps-4 col">

                            <span class="gilroy-regular fs-14 lh-16 fw-400 text-red-lt-6">Total promo code redeemed</span>
                            <div class="d-flex mt-2">
                                <span class="gilroy-medium fs-30 lh-35 fw-700 text-blue my-auto">₦{{ stats.promo_redeemed_naira }}</span>
                                <ValueIndicator percentage="8.3" type="down" class="my-auto ms-2" />
                                <span class="gilroy-regular fs-12 lh-14 fw-400 text-red-lt-6 my-auto ms-2">This month</span>
                            </div>
                            <div class="d-flex mt-2">
                                <span class="gilroy-medium fs-30 lh-35 fw-700 text-blue my-auto">${{ stats.promo_redeemed_dollar }}</span>
                                <ValueIndicator percentage="8.3" type="up" class="my-auto ms-2" />
                                <span class="gilroy-regular fs-12 lh-14 fw-400 text-red-lt-6 my-auto ms-2">This month</span>
                            </div>
                            
                    </div>
                </div>




                <div class="d-flex flex-column ps-3">
                    <span class="gilroy-medium fs-20 lh-23 fw-700 mb-3">Plans</span>
                    <div class="d-flex wpx-950 overflow-scroll">

                        <div class="d-flex flex-column pe-4" v-for="(plan, i) in stats.plans" :key="i">
                            <div class="d-flex">
                                <span class="rounded-circle wpx-15 hpx-15 me-2" :style="{backgroundColor: getRandomColor()}"></span>
                                <span class="gilroy-regular fs-14 lh-16 fw-400 text-red-lt-6">{{ plan.title }}</span>
                            </div>
                            <div class="d-flex mt-2">
                                <span class="gilroy-medium fs-30 lh-35 fw-700 my-auto">₦{{ plan.amount_naira }}</span>
                                <ValueIndicator percentage="8.3" type="down" class="my-auto ms-2" />
                            </div>
                            <div class="d-flex mt-2">
                                <span class="gilroy-medium fs-30 lh-35 fw-700 my-auto">${{ plan.amount_dollar }}</span>
                                <ValueIndicator percentage="8.3" type="up" class="my-auto ms-2" />
                            </div>

                        </div>

                    </div>
                </div>


                <div class="d-flex flex-column ps-3 mt-4">
                    <span class="gilroy-medium fs-20 lh-23 fw-700 mb-3">Addons</span>
                    <div class="d-flex wpx-950 overflow-scroll">

                        <div class="d-flex flex-column pe-4" v-for="(addon, i) in stats.addons" :key="i">
                            <div class="d-flex">
                                <span class="rounded-circle wpx-15 hpx-15 me-2" :style="{backgroundColor: getRandomColor()}"></span>
                                <span class="gilroy-regular fs-14 lh-16 fw-400 text-red-lt-6">{{ addon.title }}</span>
                            </div>
                            <div class="d-flex mt-2">
                                <span class="gilroy-medium fs-30 lh-35 fw-700 my-auto">₦{{ addon.amount_naira }}</span>
                                <ValueIndicator percentage="8.3" type="down" class="my-auto ms-2" />
                            </div>
                            <div class="d-flex mt-2">
                                <span class="gilroy-medium fs-30 lh-35 fw-700 my-auto">${{ addon.amount_dollar }}</span>
                                <ValueIndicator percentage="8.3" type="up" class="my-auto ms-2" />
                            </div>

                        </div>

                    </div>
                </div>



            </div>
        </div>




        <div class="d-flex justify-content-between">
            <span class="gilroy-regular fs-25 lh-28 fw-400 text-blue-dk-1">Order Overview</span>
        </div>

        <div class="d-flex flex-column bg-white rounded-px-6 mt-3">
            <AuthTextInput 
                element-class="search-input border-0 rounded-0 rounded-top-px-6 bg-blue-lt-15" 
                placeholder="Search Name, code, discount..." 
                :model-value="searchWord || ''"
                @update:model-value="emitSearchWork"
            />
            <div class="table-responsive ppx-30">
                <table class="table table-borderless">
                    <thead>

                        <tr>
                            <th scope="col" class="gilroy-regular fw-500 text-red-dk-5 border-bottom pb-3 fs-14 lh-16 w-10">Invoice</th>
                            <th scope="col" class="gilroy-regular fw-500 text-red-dk-5 border-bottom pb-3 fs-14 lh-16 w-20 text-center">Customer</th>
                            <th scope="col" class="gilroy-regular fw-500 text-red-dk-5 border-bottom pb-3 fs-14 lh-16 w-10 text-center">Plan</th>
                            <th scope="col" class="gilroy-regular fw-500 text-red-dk-5 border-bottom pb-3 fs-14 lh-16 w-11 text-center">Status</th>
                            <th scope="col" class="gilroy-regular fw-500 text-red-dk-5 border-bottom pb-3 fs-14 lh-16 w-12 text-center">Workspace</th>
                            <th scope="col" class="gilroy-regular fw-500 text-red-dk-5 border-bottom pb-3 fs-14 lh-16 w-17 text-center">When due</th>
                            <th scope="col" class="gilroy-regular fw-500 text-red-dk-5 border-bottom pb-3 fs-14 lh-16 w-10 text-center">Free</th>
                            <th scope="col" class="gilroy-regular fw-500 text-red-dk-5 border-bottom pb-3 fs-14 lh-16 w-10 text-center">Promo code</th>
                        </tr>

                    </thead>

                    <tbody v-if="orders?.length">
                        <tr v-for="(order, i) in orders" :key="i">
                            <td class="gilroy-regular fs-14 lh-16 text-blue fw-400">{{ `Inv-${order.order_number}`}}</td>
                            <td>
                                <div class="d-flex">
                                    <UserAvatar 
                                        class="my-auto"
                                        size="43" 
                                        :src="order.avatar"
                                    />
                                    <div class="d-flex flex-column my-auto ms-2">
                                        <span class="gilroy-regular fs-15 lh-18 fw-500">{{ order.full_name }}</span>
                                        <span class="gilroy-regular fs-10 lh-12 fw-400">{{ order.email }}</span>
                                    </div>
                                </div>
                            </td>
                            <td class="gilroy-regular fs-13 lh-15 text-red-lt-9 fw-400 text-center">{{ order.plan }}</td>
                            <td class="text-center">
                                <span v-if="order.status == 'cancelled'" class="badge bg-red-lt-7 text-red-dk-3">Cancelled</span>
                                <span v-else-if="order.status == 'refunded'" class="badge bg-green-lt-1 text-green-dk-1">Refunded</span>
                                <span v-else-if="order.status == 'paid'" class="badge bg-blue-lt-3 text-blue">Paid</span>    
                            </td>
                            <td class="gilroy-regular fs-13 lh-15 text-red-lt-9 fw-400 text-center">{{ order.workspace }}</td>
                            <td class="gilroy-regular fs-13 lh-15 text-red-lt-9 fw-400 text-center">{{ dateFormatter(order.end_date, 'dd MMM, yyyy') }} {{ dateFormatter(order.end_date, 'h:mm aaaa') }}</td>
                            <td class="gilroy-regular fs-13 lh-15 text-red-lt-9 fw-400 text-center">{{ order.fee }}</td>
                            <td class="gilroy-regular fs-13 lh-15 text-red-lt-9 fw-400 text-center">{{ order.promo_code || 'N/A' }}</td>
                        </tr>
                    </tbody>

                </table>
                <span  class="gilroy-regular fs-12 lh-15 fw-400">{{ orders?.length }} results showing</span>
            </div>  
        </div>

    </div>
</template>


<script setup lang="ts">
    import { dateFormatter } from '@/services/helper-service'

    // eslint-disable-next-line
    const props = defineProps<{
        orders?: Record<string, any>[]
        stats: Record<string, any>
        searchWord?: string
    }>()

    // eslint-disable-next-line
    const emit = defineEmits(['search:word'])

    const emitSearchWork = window.debounce((searchKeyword: string) => {
        emit('search:word', searchKeyword)
    }, 3000)


    const getRandomColor = (rgb=false) => {
        // Generate random values for RGB components
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);

        // Convert RGB to hexadecimal and format the color string
        return rgb ? `rgb(${r}, ${g}, ${b})`
        :`#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    }
    
</script>

<style lang="scss" scoped>
    .chart{
        box-shadow: 0px 5px 26px 0px #E7E9FC;
    }
</style>