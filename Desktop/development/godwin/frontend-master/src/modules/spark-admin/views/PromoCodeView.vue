<template>
    <div class="d-flex flex-column px-4">
        <div class="d-flex justify-content-between">
            <div class="d-flex my-auto">
                <DateRangePicker class="my-auto" :display-value="dateDisplayValue" @update:modelValue="getRange"/>
                <!-- <span class="my-auto cursor-pointer ms-3" :class="{'text-blue': hasFilters, 'text-muted': !hasFilters }" @click="clearFilter">Clear filters</span> -->
                <div class="d-flex ms-3 bg-blue-lt-14 rounded-px-19 pxpx-20 pypx-8 cursor-pointer hpx-40 my-auto">
                    <i class="material-icons-outlined my-auto">file_download</i>
                    <span class="ms-2 my-auto fs-12 lh-18 fw-400 gilroy-regular">Export as CSV</span>
                </div>
            </div>

            <FormButton label="Create coupon" class="hpx-39 mb-auto rounded-px-10 my-auto" @click="openCouponModal"/>
        </div>



        <!-- <div class="row row-cols-1 row-cols-md-3 g-4">

            <div class="col">
                <div class="card">


                </div>
            </div>

            <div class="col">
                <div class="card">


                </div>
            </div>

            <div class="col">
                <div class="card">


                </div>
            </div>

        </div> -->

        <div class="row row-cols-1 row-cols-md-3 g-4 mt-4">

            <div class="col">
                <div class="card">

                    <div class="d-flex flex-column justify-content-center p-5 hpx-150">
                        <div class="d-flex">
                            <span class="text-blue gilroy-regular fs-30 lh-33 fw-400 my-auto">{{ promoCodes.redemption_total }}</span>

                            <ValueIndicator percentage="8" type="up" />

                        </div>
                        <span class="gilroy-regular fs-15 lh-18 fw-400 text-blue-dk-2 mt-2">Total  redemption</span>
                    </div>

                </div>
            </div>

            <div class="col">
                <div class="card">

                    <div class="d-flex flex-column justify-content-center p-5 hpx-150">
                        <div class="d-flex">
                            <span class="text-blue gilroy-regular fs-30 lh-33 fw-400 my-auto">{{ promoCodes.redemption_new }}</span>

                            <ValueIndicator percentage="8" type="down" />

                        </div>
                        <span class="gilroy-regular fs-15 lh-18 fw-400 text-blue-dk-2 mt-2">New  redemption this month</span>
                    </div>

                </div>
            </div>

            <div class="col">
                <div class="card">

                    <div class="d-flex flex-column justify-content-center p-5 hpx-150">
                        <div class="d-flex">
                            <span class="text-blue gilroy-regular fs-30 lh-33 fw-400 my-auto">₦{{ promoCodes.redemption_amount_naira }}</span>

                            <ValueIndicator percentage="8" type="up" />

                        </div>
                        <div class="d-flex">
                            <span class="text-blue gilroy-regular fs-30 lh-33 fw-400 my-auto">${{promoCodes.redemption_amount_dollar}}</span>

                            <ValueIndicator percentage="8" type="down" />

                        </div>
                        <span class="gilroy-regular fs-15 lh-18 fw-400 text-blue-dk-2 mt-2">Redemption Amount</span>
                    </div>

                </div>
            </div>
            
        </div>




        <div class="d-flex flex-column bg-white rounded-px-6 mt-4">
            
            <AuthTextInput 
                element-class="search-input border-0 rounded-0 rounded-top-px-6 bg-blue-lt-15" 
                placeholder="Search Name, code, discount..." 
                v-model="searchKeyword"
            />
            <div class="table-responsive ppx-30">
                <table class="table table-borderless">
                    <thead>

                        <tr>
                            <th scope="col" class="gilroy-regular fw-500 text-red-dk-5 border-bottom pb-3 fs-14 lh-16 w-20">Name</th>
                            <th scope="col" class="gilroy-regular fw-500 text-red-dk-5 border-bottom pb-3 fs-14 lh-16 w-10 text-center">Code</th>
                            <th scope="col" class="gilroy-regular fw-500 text-red-dk-5 border-bottom pb-3 fs-14 lh-16 w-10 text-center">Duration</th>
                            <th scope="col" class="gilroy-regular fw-500 text-red-dk-5 border-bottom pb-3 fs-14 lh-16 w-20 text-center">Expiry Date</th>
                            <th scope="col" class="gilroy-regular fw-500 text-red-dk-5 border-bottom pb-3 fs-14 lh-16 w-10 text-center">Plans</th>
                            <th scope="col" class="gilroy-regular fw-500 text-red-dk-5 border-bottom pb-3 fs-14 lh-16 w-10 text-center">Discount</th>
                            <th scope="col" class="gilroy-regular fw-500 text-red-dk-5 border-bottom pb-3 fs-14 lh-16 w-10 text-center">Redemptions</th>
                            <th scope="col" class="gilroy-regular fw-500 text-red-dk-5 border-bottom pb-3 fs-14 lh-16 w-10 text-center">Action</th>
                        </tr>

                    </thead>

                    <tbody>
                        <tr v-for="(promo, i) in promoCodes.coupons" :key="i">
                            <td class="gilroy-regular fs-16 lh-19 text-blue-dk-1">{{ promo.name }}</td>
                            <td class="gilroy-regular fs-16 lh-19 text-blue-dk-1 text-center">{{ promo.code }}</td>
                            <td class="gilroy-regular fs-16 lh-19 text-blue-dk-1 text-center">{{ promo.duration }}</td>
                            <td class="gilroy-regular fs-16 lh-19 text-blue-dk-1 text-center">{{ promo.expiration_date ? dateFormatter(new Date(promo.expiration_date), 'yyyy-MMM-dd')  : 'N/A' }}</td>
                            <td class="gilroy-regular fs-16 lh-19 text-blue-dk-1 text-center">{{ promo.plans.map((plan: any)=>plan.name).join(',') }}</td>
                            <td class="gilroy-regular fs-16 lh-19 text-blue-dk-1 text-center">{{ getDiscount(promo.currency, promo.amount) }}</td>
                            <td class="gilroy-regular fs-16 lh-19 text-blue-dk-1 text-center">{{ promo.redemptions }}</td>
                            <td class='d-flex justify-content-center'>
                                <i class="material-icons-outlined cursor-pointer" @click="openCouponModal(promo)">edit</i>
                                <!-- <i class="material-icons-outlined cursor-pointer ms-3">delete</i> -->
                            </td>
                        </tr>
                    </tbody>

                </table>
            </div>  
        </div>






            <ModalBox 
                class="h-100" 
                v-model="showNewCouponModal" 
                :staticBackDrop="true"
                modalContentClass="rounded-0"
                modal-custom-class="promo-code-class" modalSize="modal-xl" modalWidth="1040px"
                @modal:closed="showNewCouponModal = false" :modalId="`modal-promo-code-class-${Date.now()}`"
            >
            <template #default>
                <div class="position-relative">
                    <span class="bg-blue-lt-1 wpx-30 hpx-30 perfect-center rounded-circle my-auto position-absolute end-0 me-3 mt-3 cursor-pointer" @click="showNewCouponModal = false">
                        <i class="material-icons-outlined fs-14 lh-14 text-blue-dk-2 fw-bold">close</i>
                    </span>
                    
                    
                    


    <div class="row g-3 p-5">
        <span class="gilroy-regular fw-400 fs-30 lh-35 text-blue my-3">Create promo code</span>
      <div class="col-md-6">
        <!-- <AuthTextInput 
            element-class="auth-element hpx-50 rounded-0" 
            required 
            label="Promo name" 
            placeholder="Please enter promo code name" 
            v-model="form.name"
            :error-msg="serverError.name?.[0]"
        /> -->
        <AuthTextInput 
            element-class="auth-element hpx-50 rounded-px-6" 
            required 
            label="Promo name" 
            placeholder="Please enter promo code name" 
            v-model="form.name"
            :error-msg="serverError.name?.[0] || v$.name.$errors[0]?.$message"
        />
      </div>
      <div class="col-md-6">
        <AuthTextInput 
            element-class="auth-element hpx-50 rounded-px-6" 
            required 
            label="Promo code" 
            placeholder="Please enter promo code" 
            v-model="form.code"
            :error-msg="serverError.code?.[0] || v$.code.$errors[0]?.$message"
        />
      </div>
      
      <div class="col-md-6">
        <div class="d-flex justify-content-between mb-2">
            <FormLabel
                label="Start date"
                required
                class="my-auto"
            />
        </div>
        <div class="d-flex flex-column">
            <Datepicker 
                input-class-name="auth-element hpx-50 rounded-px-6" 
                auto-apply 
                :enable-time-picker="false" 
                :clearable="false" 
                v-model="form.start" 
            />
            <ErrorMessage :msg="serverError?.start?.[0] || v$.start.$errors[0]?.$message"  v-if="serverError?.start?.[0] || v$.start.$errors[0]?.$message"/>
        </div>
      </div>
      <div class="col-md-6">
        <div class="d-flex justify-content-between mb-2">
            <FormLabel
                label="End date"
                required
                class="my-auto"
            />
        </div>
        <div class="d-flex flex-column">
            <Datepicker 
                input-class-name="auth-element hpx-50 rounded-px-6" 
                auto-apply 
                :enable-time-picker="false" 
                :clearable="false" 
                v-model="form.ends" 
            />
            <ErrorMessage :msg="serverError?.ends?.[0] || v$.ends.$errors[0]?.$message"  v-if="serverError?.ends?.[0] || v$.ends.$errors[0]?.$message"/>
        </div>
      </div>

      <div class="col-md-6">
        <div class="input-group">
            <AuthTextInput 
                class="flex-grow-1"
                element-class="auth-element hpx-50 rounded-px-6" 
                required 
                label="Amount" 
                placeholder="Amount or discount %" 
                v-model="form.amount"
                :error-msg="serverError.amount?.[0] || v$.amount.$errors[0]?.$message"
            />
            <select class="auth-element hpx-50 mtpx-27 w-15 ms-1 rounded-start-px-6" v-model="form.amount_symbol" @change="getSubscriptions">
                <option value="%" selected>%</option>
                <option value="NGN">₦</option>
                <option value="USD">$</option>
            </select>
        </div>
      </div>

      
      <div class="col-md-6">
        <div class="d-flex justify-content-between mb-3">
            <FormLabel
                label="Discount duration for recurring services"
                required
                class="my-auto"
            />
        </div>
        <div class="d-flex">
            <div class="d-flex flex-column">
                <div class="d-flex">
                    <span class="my-auto">Month(s)</span>
                    <AuthTextInput 
                        class="my-auto ms-2"
                        element-class="auth-element hpx-35 wpx-50 text-center rounded-px-6" 
                        v-model="form.recurring"
                    />
                </div>
                <ErrorMessage :msg="serverError?.recurring?.[0] || v$.recurring.$errors[0]?.$message"  v-if="serverError?.recurring?.[0] || v$.recurring.$errors[0]?.$message"/>
            </div>
            <div class="d-flex flex-column ms-2">
                <div class="d-flex">
                    <span class="my-auto">Usage(s)</span>
                    <AuthTextInput 
                        class="my-auto ms-2"
                        element-class="auth-element hpx-35 wpx-50 text-center rounded-px-6" 
                        v-model="form.no_of_usage"
                    />
                </div>
                <ErrorMessage :msg="serverError?.no_of_usage?.[0] || v$.no_of_usage.$errors[0]?.$message"  v-if="serverError?.no_of_usage?.[0] || v$.no_of_usage.$errors[0]?.$message"/>
            </div>

        </div>
      </div>
      
      <div class="col-md-6" v-if="subscriptions.length">
        <div class="d-flex justify-content-between mb-3">
            <FormLabel
                label="Plan"
                required
                class="my-auto"
            />
        </div>
        <div class="d-flex flex-column">
            <div class="d-flex flex-wrap">
                <div class="form-check form-check-inline" v-for="(subscription, i) in subscriptions" :key="i">
                    <input class="form-check-input" type="checkbox" :id="`basic-${subscription.subscription_id}`" :value="subscription.subscription_id"  v-model="form.subscriptions">
                    <label class="form-check-label gilroy-regular fw-400" :for="`basic-${subscription.subscription_id}`">{{subscription.name}}</label>
                </div>
            </div>
            <ErrorMessage :msg="serverError?.subscriptions?.[0] || v$.subscriptions.$errors[0]?.$message"  v-if="serverError?.subscriptions?.[0] || v$.subscriptions.$errors[0]?.$message"/>
        </div>
      </div>
      
      <div class="col-md-6">
        <div class="d-flex justify-content-between mb-3">
            <FormLabel
                label="Billing type"
                required
                class="my-auto"
            />
        </div>
        <div class="d-flex flex-column">
            <div class="d-flex flex-wrap">
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" id="monthly" value="monthly"  v-model="form.billing_type">
                    <label class="form-check-label gilroy-regular fw-400" for="monthly">Monthly</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" id="quarterly" value="quarterly" v-model="form.billing_type">
                    <label class="form-check-label gilroy-regular fw-400" for="quarterly">Quarterly</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" id="bi-annually" value="bi-annually" v-model="form.billing_type">
                    <label class="form-check-label gilroy-regular fw-400" for="bi-annually">Bi-annually</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" id="annually" value="annually" v-model="form.billing_type">
                    <label class="form-check-label gilroy-regular fw-400" for="annually">Annually</label>
                </div>
            </div>
            <ErrorMessage :msg="serverError?.billing_type?.[0] || v$.billing_type.$errors[0]?.$message"  v-if="serverError?.billing_type?.[0] || v$.billing_type.$errors[0]?.$message"/>
        </div>
      </div>
    </div>

    <div class="row g-3 px-5 pb-5">
      <div class="col-md-6"><FormButton label="Cancel" class="perfect-center hpx-50 w-100" buttonType='outline'/></div>
      <div class="col-md-6"><FormButton label="Save" class="perfect-center hpx-50 w-100" @click="submitPromoCode"/></div>
    </div>



                </div>
            </template>
            </ModalBox>
    </div>
</template>


<script setup lang="ts">
    import { type Ref, ref, computed, onMounted, watch } from 'vue'
    import { validatePromoCodeForm } from '../validator'
    import Datepicker from '@vuepic/vue-datepicker'
    import { addPromoCode, getPlans, getPromoCodes, updatePromoCode } from '../services'
    import { getObjectProperty, dateFormatter } from '@/services/helper-service'
    import * as AlertService from '@/services/alert-service'
    
    let { form, v$ } = validatePromoCodeForm();
    
    const showNewCouponModal = ref(false)
    const couponId = ref(null)

    const searchKeyword = ref('')

    let subscriptions = ref([] as any)
    
    let promoCodes = ref([] as any)
    

    const requestParams: Ref<{
        date_from?: string,
        date_to?: string
    }> = ref({})

    const {
        isLoading: getPromoCodesIsLoading,
        execute: executeGetPromoCodes
    } = getPromoCodes()

    onMounted(()=>{
       getPromoCodesFromServer()
    })

    watch(requestParams, () => {
        getPromoCodesFromServer()
    }, { deep: true })

    const getPromoCodesFromServer = () =>{
        executeGetPromoCodes({url: '/api/admin/promo', params: requestParams.value }).then((res)=>{
            promoCodes.value = res
        })
    }

    const dateDisplayValue: Ref<string | undefined> = ref('')

    const getRange = (range: any) => {
        dateDisplayValue.value = `${dateFormatter(range[0], 'dd MMM, YYY')} - ${dateFormatter(range[1], 'dd MMM, YYY')}`
        requestParams.value.date_from = dateFormatter(range[0], 'yyyy-MM-dd')
        requestParams.value.date_to = dateFormatter(range[1], 'yyyy-MM-dd')
    }

    const hasFilters = computed(()=>{
        return !!requestParams.value.date_from
        ||  !!requestParams.value.date_to
    })

    const clearFilter = () => {
        if (hasFilters.value) {
            dateDisplayValue.value = undefined
            requestParams.value = {
                date_from: '',
                date_to: '',
            }
        }
    }

    const openCouponModal = (coupon?:any) =>{
        if(!coupon){
            const { form: newForm, } = validatePromoCodeForm();
            form = newForm

            couponId.value = null
        }else{
            form.value = {...form.value, ...{
                name: coupon.name,
                code: coupon.code,
                start: new Date(coupon.start_date),
                ends: new Date(coupon.expiration_date),
                amount: coupon.amount,
                amount_symbol: coupon.type == 'flat' ? coupon.currency : '%',
                recurring: coupon.recurring,
                no_of_usage: coupon.no_of_usage,
                billing_type: coupon.billing_types || [],
                subscriptions: coupon?.plans?.map((plan:any)=>plan.id)
            }}
            // form.value.name = coupon.name
            // form.value.code = coupon.code
            // form.value.start = new Date(coupon.start_date)
            // form.value.ends = new Date(coupon.expiration_date)
            // form.value.amount = coupon.amount
            // form.value.amount_symbol = coupon.type == 'flat' ? coupon.currency : '%'
            // form.value.recurring = coupon.recurring
            // form.value.no_of_usage = coupon.no_of_usage
            // form.value.billing_type = coupon.billing_types
            //form.value.start = coupon.recurring
            getSubscriptions()

            couponId.value = coupon.id
        }
        showNewCouponModal.value = true
    }

    const {
        isLoading: addPromoCodeIsLoading,
        error: addPromoCodeError,
        isSuccessful: addPromoCodeIsSuccessful,
        execute: executeAddPromoCode,
    } = addPromoCode();

    const {
        isLoading: updatePromoCodeIsLoading,
        error: updatePromoCodeError,
        isSuccessful: updatePromoCodeIsSuccessful,
        execute: executeUpdatePromoCode,
    } = updatePromoCode();

const submitPromoCode = () => {
    v$.value.$validate();
    if(v$.value.$invalid) return;
    (form.value as any).billing_types = form.value.billing_type
    form.value.start = dateFormatter(new Date(form.value.start), 'yyyy-MM-dd')
    form.value.ends = dateFormatter(new Date(form.value.ends), 'yyyy-MM-dd')

    if(!couponId.value){
        executeAddPromoCode({ data: form.value }).then((res: any) => {
            if (addPromoCodeIsSuccessful.value) {
                AlertService.toast('success', 'Success', res.message)
                showNewCouponModal.value = false
            }
        })
    }else{
        executeUpdatePromoCode({ data: form.value , url: `/api/admin/promo/${couponId.value}` }).then((res: any) => {
            if (updatePromoCodeIsSuccessful.value) {
                AlertService.toast('success', 'Success', res.message)
                showNewCouponModal.value = false
            }
        })
    }
}

const serverError = computed(() => {
    return getObjectProperty(addPromoCodeError, "value.errors", {});
});

const getSubscriptions = () => {
    if (form.value.amount_symbol != '%') {
        form.value.type = 'flat'
        ; (form.value as any).currency = form.value.amount_symbol
        const {
            isLoading: getAddonsIsLoading,
            execute: executeGetAddons
        } = getPlans({ currency: form.value.amount_symbol })

        executeGetAddons().then((res) => {
            subscriptions.value = res
        })
    } else {
        form.value.type = 'percentage'
        ; (form.value as any).currency = null
        subscriptions.value = []
    }
}

const getDiscount = (currency:string, amount:string) => {
    if (currency == 'USD') {
        return `$${amount}`
    }else if(currency == 'NGN'){
        return `₦${amount}`
    } else {
        return `${amount}%`
    }
}
</script>



<style lang="scss" scoped>
    .card{
        border:none;
        box-shadow: 0px 5px 26px 0px #E7E9FC;
    }

    .search-input:focus{
        outline: 0px none #fff !important;
        box-shadow: none !important;
    }
</style>