<template>
    <div class="d-flex flex-column px-4">
        
        <div class="bg-blue-lt-6 rounded-px-20 pxpx-60 pypx-70">
            <div class="d-flex flex-column">
                <span class="gilroy-medium fs-23 lh-25">Bank Account</span>
                <span class="gilroy-regular fs-13 lh-15 mt-1">Your referral earnings will be creadited into this account</span>
            </div>
            <div class="container mt-4 px-0">
                <div class="d-flex flex-wrap mb-3">
                    <label for="bankName" class="my-auto col-sm-3 col-form-label gilroy-regular fs-20 lh-23">Bank name</label>
                    <div class="my-auto col-sm-9">
                        <!-- <AuthTextInput 
                            element-class="auth-element hpx-53 bg-secondary-lt-5 rounded-0 border-blue-lt-1" 
                            placeholder="Zenith Bank"
                            id="bankName"
                            v-model="form.bank_code"
                            :error-msg="serverError?.bank_code?.[0] || v$.bank_code.$errors[0]?.$message"
                        /> -->

                        <div class="select-border">
                            <select class="prof-element bg-transparent rounded-0 border-bottom border-blue-lt-5 form-select form-select-lg" v-model="form.bank_code" required>
                                <option value="" disabled selected>Select Banks</option>
                                <option :value="bank?.code" v-for="(bank, i) in banks" :key="i">{{bank?.name}}</option>
                            </select>
                        </div>
                        <ErrorMessage :msg="serverError?.bank_code?.[0] || v$.bank_code.$errors[0]?.$message"  v-if="serverError?.bank_code?.[0] || v$.bank_code.$errors[0]?.$message"/>
                    </div>
                </div>
                <div class="d-flex flex-wrap mb-3">
                    <label for="accountNumber" class="my-auto col-sm-3 col-form-label gilroy-regular fs-20 lh-23">Account number</label>
                    <div class="my-auto col-sm-9">
                        <AuthTextInput 
                            element-class="auth-element hpx-53 bg-secondary-lt-5 rounded-0 border-blue-lt-1" 
                            placeholder="2020075293"
                            id="accountNumber"
                            v-model="form.account_number"
                            :error-msg="serverError?.account_number?.[0] || v$.account_number.$errors[0]?.$message"
                        />
                    </div>
                </div>
                <div class="d-flex flex-wrap mb-3">
                    <label for="accountName" class="my-auto col-sm-3 col-form-label gilroy-regular fs-20 lh-23">Account name</label>
                    <div class="my-auto col-sm-9">
                        <AuthTextInput 
                            element-class="auth-element hpx-53 bg-secondary-lt-5 rounded-0 border-blue-lt-1" 
                            placeholder="John Doe" 
                            id="accountName"
                            v-model="form.account_name"
                            readonly
                            :error-msg="serverError?.account_name?.[0] || v$.account_name.$errors[0]?.$message"
                        />
                    </div>
                </div>
                <div class="d-flex flex-wrap mb-3">
                    <label for="bankName" class="my-auto col-sm-3 col-form-label gilroy-regular fs-20 lh-23"></label>
                    <div class="my-auto col-sm-9">
                        <FormButton label="Save" class="w-100 hpx-50 perfect-center rounded-px-10" @click="submit"/>
                    </div>
                </div>
            </div>
        </div>

        <div class="d-flex flex-column bg-white pxpx-60 pypx-40 rounded-px-16 mt-4">
        <div class="d-flex justify-content-between mb-3">
            <!-- <span class="gilroy-medium fs-25 lh-29 text-blue-dk-1">Referral History</span>
            <span class="material-icons-outlined fs-30 lh-29 text-blue-dk-1">filter_alt</span> -->
            <div class="d-flex">
                <span class="hpx-45 px-3 cursor-pointer perfect-center fs-15 lh-19 rounded-start-px-5"
                :class="currentTab == 'referral_history' ? 'bg-blue text-white' : 'bg-blue-lt-7 text-black'" @click="currentTab = 'referral_history'">Referral history</span>
                <span class="hpx-45 px-3 cursor-pointer perfect-center fs-15 lh-19 rounded-end-px-5"
                :class="currentTab == 'payout_history' ? 'bg-blue text-white' : 'bg-blue-lt-7 text-black'" @click="currentTab = 'payout_history'">Payout history</span>
            </div>
            <div class="d-flex">
                <span class="my-auto">Affiliate Bal: {{ affiliateBalance }}</span>
                <FormButton label="Request payout" class="hpx-45 perfect-center my-auto ms-3" @click="makePayoutRequest"/>
            </div>
        </div>  
        
        
        <div class="table-responsive mt-3" v-if="currentTab=='referral_history'">
            <table class="table table-borderless">
                <thead>

                    <tr>
                        <th scope="col" class="gilroy-medium fs-14 lh-16 w-30">User</th>
                        <th scope="col" class="gilroy-medium fs-14 lh-16 w-40 text-center">Earned</th>
                        <th scope="col" class="gilroy-medium fs-14 lh-16 w-30 text-end">Referred date</th>
                    </tr>

                </thead>

                <tbody>
                    <tr v-for="(history,i) in referralHistory" :key="i">
                        <th scope="row">
                            <div class="d-flex">
                                <UserAvatar 
                                    class="my-auto"
                                    size="37" 
                                    :src="history?.user.avatar"
                                />
                                <span class="my-auto gilroy-regular fs-15 lh-18 ms-3">{{ history?.user.first_name}} {{ history?.user.last_name}}</span>
                            </div>
                        </th>
                        <td class="gilroy-regular fs-16 lh-19 text-blue-dk-1 text-center">N5000</td>
                        <th scope="row" class="gilroy-regular fs-16 lh-19 text-blue-dk-1 text-end">{{dateFormatter(history.created_at, 'do MMM, yyyy')}}</th>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col" class="gilroy-medium fs-14 lh-16 text-decoration-underline ps-4 cursor-pointer w-40 text-end">Load more</th>
                    </tr>
                </tfoot>
            </table>
        </div>

        <div class="table-responsive mt-3" v-if="currentTab == 'payout_history'">
            <table class="table table-borderless">
                <thead>

                    <tr>
                        <th scope="col" class="gilroy-medium fs-14 lh-16 w-30">Amount</th>
                        <th scope="col" class="gilroy-medium fs-14 lh-16 w-40 text-center">Requested on</th>
                        <th scope="col" class="gilroy-medium fs-14 lh-16 w-30 text-end">Status</th>
                    </tr>

                </thead>

                <tbody>
                    <tr v-for="(history,i) in paymentHistory" :key="i">
                        <td class="gilroy-regular fs-16 lh-19 text-blue-dk-1">{{history.amount}}</td>
                        <td class="gilroy-regular fs-16 lh-19 text-blue-dk-1 text-center">{{ dateFormatter(history.created_at, 'do MMM, yyyy') }}</td>
                        <th scope="row" class="gilroy-regular fs-16 lh-19 text-blue-dk-1 text-end">
                            <span v-if="history.status=='declined'" class="badge danger bg-red-lt-7 text-red-dk-3">Declined</span>
                            <span v-else-if="history.status=='in-progress'" class="badge inprogress bg-green-lt-1 text-green-dk-1">Payout-in-progress</span>
                            <span v-else-if="history.status == 'completed'" class="badge success bg-blue-lt-3 text-blue">Payout completed</span>
                        </th>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col" class="gilroy-medium fs-14 lh-16 text-decoration-underline ps-4 cursor-pointer w-40 text-end">Load more</th>
                    </tr>
                </tfoot>
            </table>
        </div>


    </div>

    <div class="gilroy-regular fs-12 text-center my-5">Please note that all Payouts are done every last friday of the month.</div>

        <ModalBox 
            class="h-100" 
            v-model="requestPayoutModal" 
            :staticBackDrop="false"
            modalContentClass="rounded-0"
            modal-custom-class="payout-class"
            @modal:closed="requestPayoutModal = false" :modalId="`modal-payout-${Date.now()}`"
        >
        <template #default>
            <div class="d-flex flex-column pxpx-45">
                <span class="gilroy-bold fs-25 lh-29">Request payout to your account</span>
                <span class="gilroy-regular fs-15 lh-19 text-secondary-muted my-3">NB: Withdrawals might take up to 24 hours to reflect in your bank account.</span>
                <div>

                    <AuthTextInput 
                        element-class="auth-element hpx-35 bg-white rounded-0 border-blue-lt-1" 
                        placeholder="$0" 
                        label="Amount"
                        v-model="withdrawalAmount"
                    />
                    <div class="d-flex mt-1">
                        <span class="gilroy-regular fs-13 lh-15 text-secondary-muted me-1">Current balance: </span>
                        <span class="gilroy-regular fs-13 lh-15 text-blue">$5000</span>
                    </div>
                </div>
                <div class="d-flex mt-4 justify-content-center">
                    <FormButton label="Request payout" class="hpx-45 perfect-center rounded-0 px-4" />
                    <FormButton buttonType="outline" label="Discard" class="hpx-45 perfect-center ms-3 rounded-0 px-4" @click="requestPayoutModal = false"/>
                </div>
            </div>
        </template>
        </ModalBox>

    </div>
</template>





<script lang="ts" setup>
    import {type Ref, ref, computed, watch, onMounted } from 'vue'
    import {setWithdrawalAcc, listBanks, verifyBank, requestPayout, getAffiliateBalance, getAffiliateHistory } from '../services'
    import { validateWithdrawalAccountDetails } from '../validator'
    import * as AlertService from '@/services/alert-service'
    import { dateFormatter, getObjectProperty } from '@/services/helper-service'

    let { form, v$ } = validateWithdrawalAccountDetails();

    let banks: Ref<any[]> = ref([])
    let affiliateBalance = ref(0)
    const requestPayoutModal = ref(false)
    const currentTab = ref('referral_history')
    const withdrawalAmount = ref('')


    let paymentHistory: Ref<any[]> = ref([])
    let referralHistory: Ref<any[]> = ref([])


    const {
        // isLoading: getBanksIsLoading,
        isSuccessful: getBankIsSuccessful,
        execute: executeGetBanks
    } = listBanks()
    executeGetBanks().then((res) => {
        if (getBankIsSuccessful.value) {
            banks.value = res?.data
        }
    })


    onMounted(()=>{
        const {
            // isLoading: affiliateHistoryIsLoading,
            isSuccessful: affiliateHistoryIsSuccessful,
            execute: executeGetAffiliateHistory
        } = getAffiliateHistory()
        executeGetAffiliateHistory().then((res) => {
            if (affiliateHistoryIsSuccessful.value) {
                form.value.bank_code = res?.data.bank.bank_code
                form.value.account_number = res?.data.bank.acccount_number
                form.value.account_name = res?.data.bank.account_name
                referralHistory.value = res?.data.referral_history
                paymentHistory.value = res?.data.payment_history
            }
        })
    })

    const {
        // isLoading: getAffiliateBalanceIsLoading,
        isSuccessful: getAffiliateBalanceIsSuccessful,
        execute: executeGetAffiliateBalance
    } = getAffiliateBalance()
    executeGetAffiliateBalance().then((res) => {
        if (getAffiliateBalanceIsSuccessful.value) {
            affiliateBalance.value = res?.data.balance
        }
    })

    watch(form.value, (newForm) => {
        if (newForm?.bank_code && newForm?.account_number?.length === 10) { // Complete NUBAN
            const {
                isSuccessful: verifyBankIsSuccessful,
                execute: executeVerifyBank
            } = verifyBank({bank_code: newForm.bank_code, account_number: newForm.account_number })
            executeVerifyBank().then((res) => {
                if (verifyBankIsSuccessful.value) {
                    form.value.account_name = res?.data.account_name
                }
            })
        }
    });



    const makePayoutRequest = () => {
        const {
            // isLoading: requestPayoutIsLoading,
            // isSuccessful: requestPayoutIsSuccessful,
            execute: executeRequestPayout
        } = requestPayout()
        executeRequestPayout().then((res: any)=>{
            AlertService.toast('success', 'Success', res.message)
        })
    }

    const {
        // isLoading: setWithdrawalAccIsLoading,
        error: setWithdrawalAccError,
        isSuccessful: setWithdrawalAccIsSuccessful,
        execute: executeSetWithdrawal
    } = setWithdrawalAcc()

    const submit = () => {
        v$.value.$validate();
        if (v$.value.$invalid) return;
        executeSetWithdrawal({ data: form.value }).then((res: any) => {
            if (setWithdrawalAccIsSuccessful.value) {
                AlertService.toast('success', 'Success', res.message)
            }
        })
    }
    const serverError = computed(() => {
        return getObjectProperty(setWithdrawalAccError, "value.errors", {});
    });
</script>

<style lang="scss" scoped>
    .select-border{
        border: 1px solid #8692A6;    
        background-color: var(--spa-color-secondary-lt-5) !important;
    }
    ::v-deep(.prof-element){
        border-top:0!important;
        border-right:0!important;
        border-left:0!important;
        border-bottom:0!important;
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
</style>