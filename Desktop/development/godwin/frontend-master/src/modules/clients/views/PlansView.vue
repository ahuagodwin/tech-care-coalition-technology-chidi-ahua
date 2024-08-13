<template>
<div class="d-flex flex-column px-4">

    <div class="container">
        <div class="row gx-5 d-flex justify-content-between flex-wrap mt-4">
            <div class="col col-lg-6 col-md-12 col-sm-12 col-xs-12">

                <div class="d-flex flex-column hpx-336 ppx-25 hpx-160 mbpx-20 rounded-px-20 bg-blue">
                    <span class="gilroy-regular fs-25 lh-29 text-white mb-4">Your main plan</span>
                    <span class="gilroy-medium fs-50 lh-59 text-white mb-2">{{mainPlan?.title}}</span>
                    <span class="gilroy-regular fs-14 lh-16 text-white mb-5">Renews on  {{mainPlan?.review_on }} | ₦{{mainPlan?.price}} billed {{mainPlan?.type}}</span>
                    <div class="d-flex">
                        <FormButton label="Upgrade plan" class="hpx-35 border-0 me-2 my-auto rounded-px-8" variant="yellow" @click="updateSubscription=true"/>
                        <FormButton label="Cancel plan" class="hpx-35 me-2 my-auto rounded-px-8 border border-white" @click.prevent="cancelSubscription=true"/>
                    </div>
                    

                    <div class="d-flex form-check form-switch mt-4">
                        <input class="form-check-input my-auto" type="checkbox" role="switch" id="flexSwitchCheckDefault" @change="updateRenewingStatus" :checked="autoRenewPlan=='yes'">
                        <label class="form-check-label gilroy-regular fs-16 lh-19 text-white my-auto ms-3" for="flexSwitchCheckDefault">Auto-renew subscription</label>
                    </div>
                </div>

            </div>

            <div class="col col-lg-6 col-md-12 col-sm-12 col-xs-12">

                <div class="d-flex flex-column hpx-336 ppx-25 hpx-160 mbpx-20 rounded-px-20 bg-blue-lt-1 text-black">
                    <span class="gilroy-regular fs-25 lh-29 text-red-lt-6 mb-3">Your add-on plan</span>
                    <div v-if="addedAddons.length">
                      <div class="added-addons hpx-180 overflow-auto">
                        <div class="mb-2 d-flex flex-column" v-for="(addon, i) in addedAddons" :key="i">
                            <span class="gilroy-medium fs-30 lh-35">{{ addon?.title }}</span>
                            <span class="gilroy-regular fs-14 lh-16 text-red-lt-6">Renews on  03  Nov. 2021 | ₦{{ addon?.price }} billed {{ addon?.type }}</span>
                        </div>
                      </div>
                      <FormButton label="Cancel or add a new add-on plan" class="hpx-35 w-fit-content rounded-px-8 mt-4" @click.prevent="addServiceModal = true"/>
                    </div>
                    <div class="d-flex flex-column" v-else>
                      <img class="mx-auto wpx-250" src="@/assets/img/clients/no-addon.svg" />
                      <FormButton label="Add a new add-on plan" class="hpx-35 w-fit-content rounded-px-8 mt-4 mx-auto" @click.prevent="addServiceModal = true"/>
                    </div>
                
                </div>

            </div>
            
        </div>
    </div>

    
    <div class="billings d-flex flex-column bg-white my-4 ppx-30 rounded-px-16">
        <span class="gilroy-medium fs-25 lh-29 text-blue-dk-1 mb-2">Payment Method</span>
        <span class="gilroy-regular fs-14 lh-16 text-secondary-lt-4">Manage billing information and view receipt</span>
        <div class="container mt-4 px-0">
            <div class="d-flex justify-content-between flex-wrap">
                <div class="col col-lg-6 col-md-12 col-sm-12 col-xs-12 my-auto d-flex ps-0">
                    <span class="wpx-87 hpx-58 border rounded-px-6 my-auto perfect-center" v-if="cardDetails?.card_type">
                        <img :src="require(`@/assets/img/clients/${cardDetails?.card_type}.svg`)" class="wpx-68 hpx-38"/>
                    </span>
                    <span class="gilroy-medium fs-16 lh-19 my-auto ms-3"> {{cardDetails?.last4 ? `ending in ${cardDetails?.last4}` : 'No card available'}}</span>
                </div>
                <div class="cta col col-lg-6 col-md-12 col-sm-12 col-xs-12 my-auto pe-0">
                    <FormButton label="Update Billing" class="hpx-33 me-2" @click="addAddonToPlan({ id: 1, price:50 })"/>
                    <FormButton label="Remove" class="hpx-33" variant='light' @click="removeCreditCard"/>
                </div>
            </div>
        </div>
    </div>

    <div class="d-flex flex-column bg-white ppx-30 rounded-px-16">
        <span class="gilroy-medium fs-25 lh-29 text-blue-dk-1 mb-2">Order History</span>
        <span class="gilroy-regular fs-14 lh-16 text-secondary-lt-4">Manage billing information and view receipts</span>
        <div class="table-responsive mt-3">
            <table class="table table-borderless">
                <thead>

                    <tr>
                        <th scope="col" class="gilroy-medium fs-14 lh-16 w-30">Date</th>
                        <th scope="col" class="gilroy-medium fs-14 lh-16 w-30 text-center">Name</th>
                        <th scope="col" class="gilroy-medium fs-14 lh-16 w-40 text-center">Receipts</th>
                    </tr>

                </thead>

                <tbody>
                    <tr v-for="(history, i) in orderHistory" :key="i">
                        <td class="gilroy-regular fs-16 lh-19 text-blue-dk-1">{{history?.history_start_date}}</td>
                        <td class="gilroy-regular fs-16 lh-19 text-blue-dk-1 text-center">{{history?.product_name }}</td>
                        <td class='d-flex justify-content-center'>
                            <FormButton label="Download" class="hpx-33" variant='light' @click="printInvoice(history)"/>
                        </td>
                    </tr>
                </tbody>
                <tfoot>

                    <tr>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col" class="gilroy-medium fs-14 lh-16 text-blue text-decoration-underline ps-4 cursor-pointer w-40 text-center">View more</th>
                    </tr>

                </tfoot>

            </table>
        </div>
            <Suspense>
              <PaystackPay
                :buttonId="planPaymentId"
                buttonClass="d-none"
                buttonText="pay"
                :amount="planCart?.amount ? planCart?.amount * 1 : 0 "
                :transRef="planCart?.reference || ''"
                :onSuccess="checkoutCb"
                :onCancel="cancelCb"
              />
            </Suspense>
                      
    </div>

    <ModalBox 
        class="h-100" 
        v-model="addServiceModal" 
        modalContentClass="rounded-0"
        modal-custom-class="add-services-class" modalSize="modal-lg" modalWidth="980px"
        @modal:closed="addServiceModal = false" :modalId="`modal-add-${Date.now()}`"
      >
      <template #default>
        <div class="d-flex flex-column">
          <div class="gilroy-medium text-center fs-40 lh-47 mt-2">Choose your preferred add-on plan</div>
            <span class="material-icons fs-22 lh-23 fw-900 position-absolute top-0 end-0 me-5 mtpx-35 cursor-pointer opacity-50" @click="addServiceModal=false">close</span>
            <div class="d-flex flex-wrap p-5">

            <div class="d-flex flex-column wpx-385 h-min-150 bg-secondary-lt-5 rounded-px-10 ppx-16 text-blue-dk-1 my-3 mx-3" v-for="(service,i) in sortedAddons" :key="i">
              <span class="fs-24 lh-28 gilroy-medium mb-2">{{service.title}}</span>
              <span class="fs-15 lh-18 gilroy-regular mb-4 text-wrap">{{service.description}}</span>
              
              <div class="d-flex" :class="service.requestable ? 'justify-content-end' : 'justify-content-between'">
                <div class="d-flex plan-font gilroy-regular my-auto" v-if="!service.requestable && !service.subscription_added">
                  <span class="fs-12 mt-auto lh-19 fw-400 text-black plan-font gilroy-regular">₦</span>
                  <span class="fs-20 lh-23 text-black plan-font gilroy-bold">{{service.price}}</span>
                  <span class="fs-12 mt-auto lh-19 fw-400 text-black plan-font gilroy-regular">/{{service.type}}</span>
                </div>
                <div class="d-flex plan-font gilroy-regular my-auto" v-if="service.subscription_added">
                  <span class="fs-12 mt-auto lh-19 fw-400 text-black plan-font gilroy-regular">Renews on: </span>
                  <span class="fs-12 my-auto lh-19 text-black plan-font gilroy-bold ms-1">22 Nov, 2021</span>
                </div>
                <FormButton v-if="!service.requestable && !service.subscription_added" label="Add Plan" class="px-2 hpx-35 my-auto rounded-px-10" size="sm"  variant='light' @click="addAddonToPlan(service)"/>
                <FormButton v-else-if="service.requestable" label="Request a brief" class="px-2 hpx-35 my-auto rounded-px-10" size="sm" buttonType="outline"/>
                <FormButton v-else label="Cancel Plan" variant="yellow" class="px-2 hpx-35 my-auto rounded-px-10" size="sm" @click="cancelSubscriptionPlans(service.id)"/>
              </div>

            </div>
            </div>
          </div>
      </template>
      </ModalBox>

    <ModalBox 
        class="h-100" 
        v-model="cancelSubscription" 
        :staticBackDrop="true"
        modalContentClass="rounded-0"
        modal-custom-class="cancel-sub-class" modalSize="modal-lg" modalWidth="700px"
        @modal:closed="cancelSubscription = false" :modalId="`modal-cancel-${Date.now()}`"
      >
      <template #beforeContent>
        <div class="position-relative">
          <div class="d-flex robot position-absolute">
                <div class="perfect-center bg-white rounded-circle wpx-168 hpx-168">
                    <img class="ms-n3" src="@/assets/img/clients/robot-assistant.svg" />
                </div>
            </div>
        </div>
      </template>
      <template #default>
        <div class="d-flex flex-column p-5">
            <span class="gilroy-medium text-blue fs-40 lh-47 mt-5">We're sorry to see you go! 😩</span>
            <span class="gilroy-regular text-blue-dk-2 fs-18 lh-21 mt-4">
                Your {{mainPlan?.type}} subscription is not due until <b>{{mainPlan?.review_on }}.</b> If you would like to proceed with canceling your subscription, please select <b>"Cancel Subscription"</b> below.
            </span>
            <div class="d-flex mt-5">
                <FormButton label="Don’t cancel subscription" class="px-5 hpx-53 my-auto rounded-0" @click="cancelSubscription=false"/>
                <FormButton label="Cancel subscription" class="ms-3 px-5 hpx-53 my-auto rounded-0" buttonType="outline" @click.prevent="cancelSubscriptionPlans(mainPlan?.id); cancelSubscription = false"/>
            </div>
            
        </div>
      </template>
      </ModalBox>

    <ModalBox 
        class="h-100" 
        v-model="updateSubscription" 
        :staticBackDrop="false"
        modalContentClass="rounded-px-20"
        modal-custom-class="add-sub-class" modalSize="modal-lg" modalWidth="1000px"
        @modal:closed="updateSubscription = false" :modalId="`modal-cancel-${Date.now()}`"
      >
      <template #default>
        <div class="d-flex flex-column">

            <PlansComponent :category="category" :categories="categories" @new:category="category=$event"  @submit:plan="upgradePlan" usedInModal />
            
        </div>
      </template>
      </ModalBox>

    
</div>
</template>


<script lang="ts" setup>
import { getCurrentPlan, cancelPlan, setAutoRenew, removeCard } from '../services'
    import { getSubscription, createCart } from '../../client-subscription/services'
    import { removeTransRef } from '../../client-subscription/helpers'
    import {type Ref, ref, getCurrentInstance, onMounted,computed} from 'vue'
    import {validateNewWorkspaceMember} from '../validator'
    import * as AlertService from '@/services/alert-service'
    import PlansComponent from '@/modules/client-subscription/views/components/PlansComponent.vue'
    import { dateFormatter, setSessionStorageItem } from '@/services/helper-service'
    import { useRouter } from 'vue-router'


    const app = getCurrentInstance()
    const router = useRouter()
    const autoRenewPlan = ref('no')
    const cardDetails = ref({} as any)
    const mainPlan = ref({} as any)
    let availableAddons = ref([] as any)
    let orderHistory = ref([] as any)
    const {
      isLoading: planIsLoading,
      execute: executeGetPlan,
    } = getCurrentPlan();


    const {
      isLoading: cartAddonsIsLoading,
      execute: executeGetPlans,
    } = getSubscription();

    onMounted(()=>{
      Promise.all([executeGetPlan(), executeGetPlans({params:{type:0}})]).then((res: any) => {
        const planResponse = res[0]
        const addonResponse = res[1]?.data

        cardDetails.value = planResponse?.card_authorization
        autoRenewPlan.value = planResponse?.auto_renewal
        mainPlan.value = planResponse?.subscription
        mainPlan.value.review_on = `${ dateFormatter(mainPlan.value?.end_date, 'do MMM, yyyy') }`
        orderHistory.value = planResponse?.history.map((history: any) => {
          history.history_start_date = `${dateFormatter(history?.start_date, 'do MMM, yyyy')}`
          history.history_end_date = `${dateFormatter(history?.end_date, 'do MMM, yyyy')}`
          history.months = getMonthDifference(new Date(history?.start_date), new Date(history?.end_date))
          history.amount = history?.unit_price * history?.quantity
          history.total = history.amount-(history.discounted*1)
          return history
        })
        const addedAddons = planResponse?.addon

        for (let category in addonResponse) {
          addonResponse[category].forEach((addon: any) => { 
            const planIncludesAddon = addedAddons.find((addedAddon: any) => addedAddon.id == addon.id)
            addon.subscription_added = !!planIncludesAddon// To work on this when we get service
            addon.requestable = !addon.price
            availableAddons.value.push(addon)
          })
        }
        
      })
      getCategories()
    })

    const getMonthDifference = (startDate: Date, endDate: Date) => {
      return (
        endDate.getMonth() -
        startDate.getMonth() +
        12 * (endDate.getFullYear() - startDate.getFullYear())
      );
    }


    let category: Ref<any> = ref('')
    let categories: Ref<any> = ref([])
    const getCategories = () =>{
      executeGetPlans().then((res: any) => {
        for (let category in res?.data) {
          let plans = res?.data[category].map((plan: any) => {
            //plan.items = JSON.parse(plan.metadata)
            plan.items = plan.metadata
            return plan
          })
          let cat = {
            name: category.charAt(0).toUpperCase() + category.slice(1),
            plans: plans
          }
          categories.value.push(cat)
        }

        if (categories.value) {
          category.value = categories.value?.[0].name.charAt(0).toUpperCase() + categories.value?.[0].name.slice(1)
        }
      })
    }

    let planCart:Ref<Record<string, any>> = ref({})
    const planPaymentId = `pay-${Date.now()}`;
    const {
      isLoading: addOrChangePlanIsLoading,
      isSuccessful: addOrChangePlanIsSuccessfully,
      execute: executeAddOrChangePlan,
    } = createCart(0);

    const addAddonToPlan = (subscription: Record<string, any>) => {
      executeAddOrChangePlan({ data: { subscription_id: subscription.id } }).then((res: any) => {
        if(addOrChangePlanIsSuccessfully.value){
          planCart.value = {
            reference: res?.data?.reference,
            amount: subscription.price
          }
          addServiceModal.value=false
        }
      }).then(() => {
        let paymentComponent = document.querySelector(`#${planPaymentId}`) as HTMLElement
        paymentComponent?.click()
      })
    }

    const checkoutCb = (eData: any) => {
      removeTransRef()
    }
    const cancelCb = (eData: any) => {
      console.log('cancel', eData)
    }

    const {
      isLoading: cancelPlanIsLoading,
      isSuccessful: cancelPlanIsSuccessfully,
      execute: executeCancelPlan,
    } = cancelPlan(0);

    const cancelSubscriptionPlans = (subscriptionId:number) => {
      executeCancelPlan({ data: { subscription_id: subscriptionId } }).then((res: any) => {
        // if(cancelPlanIsSuccessfully.value){
        // }
      })
    }

  const upgradePlan = (subscriptionId: number) => {
    executeAddOrChangePlan({ data: { subscription_id: subscriptionId } }).then((res: any) => {
      if (addOrChangePlanIsSuccessfully.value) {
        updateSubscription.value = false
        router.push({ name: "Subscription.Cart" })
      }
    })
  }
    
  const updateSubscription = ref(false)
  const cancelSubscription = ref(false)
  const addServiceModal = ref(false)
    
  const sortedAddons = computed(()=>{
    let addons = availableAddons.value
    // Sort services to make sure already added services are listed below
    addons.sort((a:any) => a.subscription_added ? 1 : -1)
    return addons
  })
  const addedAddons = computed(()=>{
    //return []
    let addons = availableAddons.value.filter((service:any) => service.subscription_added)
    return addons
  })

  const updateRenewingStatus = (e: Event) => {
    let autoRenew = (e.target as HTMLInputElement).checked ? 'yes' : 'no'
    const {
      isSuccessful: updatingRenewStatusIsSuccessfully,
      execute: executeUpdatingRenewStatus,
    } = setAutoRenew(autoRenew);

    executeUpdatingRenewStatus().then((res: any) => {
      if (updatingRenewStatusIsSuccessfully.value) {
        AlertService.toast('success','Success',res.message)
      }
    })
  }

  const printInvoice = (items: any) => {
    setSessionStorageItem('CurrentInvoiceDetails', items);
    window.open('/clients/receipt/1', '_blank');
  }


  const removeCreditCard = () => {
    const {
      isSuccessful,
      isLoading: removeCardIsLoading,
      execute: executeRemoveCard,
    } = removeCard();
    executeRemoveCard().then((res: any) => {
      if (isSuccessful.value) {
        cardDetails.value = {}
        AlertService.toast('success','Success', res.message)
      }
    })
  }
</script>


<style lang="scss" scoped>

    ::v-deep(.add-services-class), ::v-deep(.add-sub-class){
        .modal-body{
            background-color: var(--spa-color-blue-lt-1)
        }
        @media (min-width: 992px){
            .modal-lg, .modal-xl {
                --bs-modal-width: 1500px!important;
            }
        }
    }

    ::v-deep(.add-sub-class){
        .modal-body{
            height:680px;
        }
    }

    ::v-deep(.cancel-sub-class){
        .robot{
            top: -290px;
            left: 245px;
            z-index: 1;
            /* transform: translate(-50%, -50%); */
            .perfect-center{
                box-shadow: 0px 5px 26px #E7E9FC;
            }
        }
    }

    .billings{
        min-height:180px;
    }

    .form-switch .form-check-input{
        width:50px;
        height:20px;
        &:focus{
            box-shadow:none!important;
            border-color: rgba(0, 0, 0, 0.25);
            background-image: url('data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%27-4 -4 8 8%27%3e%3ccircle r=%273%27 fill=%27rgba%280, 0, 0, 0.25%29%27/%3e%3c/svg%3e');
        }
        &:checked {
            background-color: var(--spa-color-blue-lt-1);
            border-color:  var(--spa-color-blue-lt-1);
            background-image:url('data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27  viewBox=%27-4 -4 8 8%27%3e%3ccircle r=%273%27 fill=%27%231227E2%27/%3e%3c/svg%3e') 
        }
    }

    @media screen and (max-width:991px){
        .cta{
            margin-top:10px!important;
        }
    }
</style>../../client-subscription/services../../client-subscription/helpers