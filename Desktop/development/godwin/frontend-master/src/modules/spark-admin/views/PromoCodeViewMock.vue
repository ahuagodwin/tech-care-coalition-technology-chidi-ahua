<template>
    <div class="d-flex flex-column px-4">
        <div class="d-flex justify-content-between">
            <div class="d-flex my-auto">
                <DateRangePicker class="my-auto"/>
                <div class="d-flex ms-3 bg-blue-lt-14 rounded-px-19 pxpx-20 pypx-8 cursor-pointer hpx-40 my-auto">
                    <i class="material-icons-outlined my-auto">file_download</i>
                    <span class="ms-2 my-auto fs-12 lh-18 fw-400 gilroy-regular">Export as CSV</span>
                </div>
            </div>

            <FormButton label="Create coupon" class="hpx-39 mb-auto rounded-px-10 my-auto" @click="showNewCouponModal = true"/>
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
                            <span class="text-blue gilroy-regular fs-30 lh-33 fw-400 my-auto">3,000</span>

                            <div class="d-flex wpx-36 hpx-21 rounded-px-5 perfect-center my-auto ms-2 bg-green-lt-2">
                                <i class="material-icons-outlined fs-12 lh-15 text-green-dk-2">north</i>
                                <span class="gilroy-regular fs-12 lh-15 fw-400 text-green-dk-2">8%</span>
                            </div>

                        </div>
                        <span class="gilroy-regular fs-15 lh-18 fw-400 text-blue-dk-2 mt-2">Total  redemption</span>
                    </div>

                </div>
            </div>

            <div class="col">
                <div class="card">

                    <div class="d-flex flex-column justify-content-center p-5 hpx-150">
                        <div class="d-flex">
                            <span class="text-blue gilroy-regular fs-30 lh-33 fw-400 my-auto">100</span>

                            <div class="d-flex wpx-36 hpx-21 rounded-px-5 perfect-center my-auto ms-2 bg-red-lt-8">
                                <i class="material-icons-outlined fs-12 lh-15 text-red-dk-3">south</i>
                                <span class="gilroy-regular fs-12 lh-15 fw-400 text-red-dk-3">8%</span>
                            </div>

                        </div>
                        <span class="gilroy-regular fs-15 lh-18 fw-400 text-blue-dk-2 mt-2">New  redemption this month</span>
                    </div>

                </div>
            </div>

            <div class="col">
                <div class="card">

                    <div class="d-flex flex-column justify-content-center p-5 hpx-150">
                        <div class="d-flex">
                            <span class="text-blue gilroy-regular fs-30 lh-33 fw-400 my-auto">₦880,000</span>

                                <div class="d-flex wpx-36 hpx-21 rounded-px-5 perfect-center my-auto ms-2 bg-green-lt-2">
                                    <i class="material-icons-outlined fs-12 lh-15 text-green-dk-2">north</i>
                                    <span class="gilroy-regular fs-12 lh-15 fw-400 text-green-dk-2">8%</span>
                                </div>

                        </div>
                        <div class="d-flex">
                            <span class="text-blue gilroy-regular fs-30 lh-33 fw-400 my-auto">$80,000</span>

                            <div class="d-flex wpx-36 hpx-21 rounded-px-5 perfect-center my-auto ms-2 bg-red-lt-8">
                                <i class="material-icons-outlined fs-12 lh-15 text-red-dk-3">south</i>
                                <span class="gilroy-regular fs-12 lh-15 fw-400 text-red-dk-3">8%</span>
                            </div>

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
                            <th scope="col" class="gilroy-regular fw-500 text-red-dk-5 border-bottom pb-3 fs-14 lh-16 w-10 text-center">Plan</th>
                            <th scope="col" class="gilroy-regular fw-500 text-red-dk-5 border-bottom pb-3 fs-14 lh-16 w-10 text-center">Discount</th>
                            <th scope="col" class="gilroy-regular fw-500 text-red-dk-5 border-bottom pb-3 fs-14 lh-16 w-10 text-center">Redemption</th>
                            <th scope="col" class="gilroy-regular fw-500 text-red-dk-5 border-bottom pb-3 fs-14 lh-16 w-20 text-center">Expiry Date</th>
                            <th scope="col" class="gilroy-regular fw-500 text-red-dk-5 border-bottom pb-3 fs-14 lh-16 w-10 text-center">Action</th>
                        </tr>

                    </thead>

                    <tbody>
                        <tr v-for="(promo, i) in promoCodes" :key="i">
                            <td class="gilroy-regular fs-16 lh-19 text-blue-dk-1">{{ promo.name }}</td>
                            <td class="gilroy-regular fs-16 lh-19 text-blue-dk-1 text-center">{{ promo.code }}</td>
                            <td class="gilroy-regular fs-16 lh-19 text-blue-dk-1 text-center">{{ promo.duration }}</td>
                            <td class="gilroy-regular fs-16 lh-19 text-blue-dk-1 text-center">{{ promo.plan }}</td>
                            <td class="gilroy-regular fs-16 lh-19 text-blue-dk-1 text-center">{{ promo.discount }}</td>
                            <td class="gilroy-regular fs-16 lh-19 text-blue-dk-1 text-center">{{ promo.redemption }}</td>
                            <td class="gilroy-regular fs-16 lh-19 text-blue-dk-1 text-center">{{ promo.expire_at || 'N/A' }}</td>
                            <td class='d-flex justify-content-center'>
                                <i class="material-icons-outlined cursor-pointer">edit</i>
                                <i class="material-icons-outlined cursor-pointer ms-3">delete</i>
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
        />
      </div>
      <div class="col-md-6">
        <AuthTextInput 
            element-class="auth-element hpx-50 rounded-px-6" 
            required 
            label="Promo code" 
            placeholder="Please enter promo code" 
            v-model="form.code"
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
        <Datepicker 
            input-class-name="auth-element hpx-50 rounded-px-6" 
            auto-apply 
            :enable-time-picker="false" 
            :clearable="false" 
            v-model="form.start_date" 
        />
      </div>
      <div class="col-md-6">
        <div class="d-flex justify-content-between mb-2">
            <FormLabel
                label="End date"
                required
                class="my-auto"
            />
        </div>
        <Datepicker 
            input-class-name="auth-element hpx-50 rounded-px-6" 
            auto-apply 
            :enable-time-picker="false" 
            :clearable="false" 
            v-model="form.end_date" 
        />
      </div>

      <div class="col-md-6">
        <div class="input-group">
            <AuthTextInput 
                class="flex-grow-1"
                element-class="auth-element hpx-50 rounded-px-6" 
                required 
                label="Amount" 
                placeholder="Amount or discount %" 
                v-model="form.discount"
            />
            <select class="auth-element hpx-50 mtpx-27 w-15 ms-1 rounded-start-px-6" v-model="form.discount_symbol">
                <option value="%" selected>%</option>
                <option value="₦">₦</option>
                <option value="$">$</option>
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
            <div class="my-auto form-check form-check-inline">
                <input class="form-check-input" type="radio" name="duration" id="forever" value="forever" v-model="form.duration">
                <label class="form-check-label gilroy-regular fw-400" for="forever">Forever</label>
            </div>
            <div class="my-auto form-check form-check-inline">
                <input class="form-check-input" type="radio" name="duration" id="one-time" value="one time" v-model="form.duration">
                <label class="form-check-label gilroy-regular fw-400" for="one-time">One time</label>
            </div>
            <div class="my-auto form-check form-check-inline">
                <input class="form-check-input" type="radio" name="duration" id="recurring" value="recurring" v-model="form.duration">
                <label class="form-check-label gilroy-regular fw-400" for="recurring">Recurring</label>
            </div>
            <AuthTextInput 
                v-if="form.duration=='recurring'"
                class="my-auto ms-1"
                element-class="auth-element hpx-35 wpx-50 text-center rounded-px-6" 
                v-model="form.no_of_recurring"
            />
        </div>
      </div>
      
      <div class="col-md-6">
        <div class="d-flex justify-content-between mb-3">
            <FormLabel
                label="Plan"
                required
                class="my-auto"
            />
        </div>
        <div class="form-check form-check-inline">
            <input class="form-check-input" type="checkbox" id="basic" value="basic"  v-model="form.plans">
            <label class="form-check-label gilroy-regular fw-400" for="basic">Basic</label>
        </div>
        <div class="form-check form-check-inline">
            <input class="form-check-input" type="checkbox" id="standard" value="standard" v-model="form.plans">
            <label class="form-check-label gilroy-regular fw-400" for="standard">Standard</label>
        </div>
        <div class="form-check form-check-inline">
            <input class="form-check-input" type="checkbox" id="pro" value="pro" v-model="form.plans">
            <label class="form-check-label gilroy-regular fw-400" for="pro">Pro</label>
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
        <div class="form-check form-check-inline">
            <input class="form-check-input" type="checkbox" id="monthly" value="monthly"  v-model="form.billing_types">
            <label class="form-check-label gilroy-regular fw-400" for="monthly">Monthly</label>
        </div>
        <div class="form-check form-check-inline">
            <input class="form-check-input" type="checkbox" id="quarterly" value="quarterly" v-model="form.billing_types">
            <label class="form-check-label gilroy-regular fw-400" for="quarterly">Quarterly</label>
        </div>
        <div class="form-check form-check-inline">
            <input class="form-check-input" type="checkbox" id="bi-annually" value="bi-annually" v-model="form.billing_types">
            <label class="form-check-label gilroy-regular fw-400" for="bi-annually">Bi-annually</label>
        </div>
        <div class="form-check form-check-inline">
            <input class="form-check-input" type="checkbox" id="annually" value="annually" v-model="form.billing_types">
            <label class="form-check-label gilroy-regular fw-400" for="annually">Annually</label>
        </div>
      </div>

      <div class="col-md-6"><FormButton label="Cancel" class="perfect-center hpx-50 w-100" buttonType='outline'/></div>
      <div class="col-md-6"><FormButton label="Save" class="perfect-center hpx-50 w-100"/></div>

     
    </div>



                </div>
            </template>
            </ModalBox>
    </div>
</template>


<script setup lang="ts">
    import { ref } from 'vue'
    import { validatePromoCodeForm } from '../validator'
    import Datepicker from '@vuepic/vue-datepicker'
    let { form, v$ } = validatePromoCodeForm();
    
    const showNewCouponModal = ref(false)


    const searchKeyword = ref('')

    let promoCodes = ref([] as any)

    promoCodes = [
        {name: 'Promo 1', code:'xxyyyjj', duration:'forever', plan: 'pro', discount:'20%', redemption: '50', expire_at: null},
        {name: 'Promo 2', code:'aassww', duration:'one time', plan: 'basic', discount:'10%', redemption: '20', expire_at: '07-01-2024'},
        {name: 'Promo 3', code:'123ese', duration:'recurring', plan: 'standard', discount:'$300', redemption: '20', expire_at: '07-07-2024'},
        {name: 'Promo 4', code:'wetsdfd', duration:'forever', plan: 'standard', discount:'$300', redemption: '20', expire_at: null},
    ]
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