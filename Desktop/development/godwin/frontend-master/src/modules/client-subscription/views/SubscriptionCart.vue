
<template>

      <div class="auth-page container">


        <div class='d-flex justify-content-center align-items-center hpx-600' v-if="checkoutIsSuccessful">
            <div class="d-flex flex-column my-auto">
              <div class="icon d-flex wpx-112 hpx-112 border border-black rounded-circle mx-auto mt-4">
                <span class="material-icons fw-100 text-black my-auto mx-auto fs-55">
                  check
                </span>
              </div>
              <span class="gilroy-bold fs-60 lh-70 mx-auto">Successful!</span>
              <div class="message fs-18 lh-21 mx-auto mt-3 px-4 gilroy-regular text-color-red-dk-2 wpx-503">
                Welcome to the future of meaningful & sustainable work. We are so happy to have you onboard
              </div>
              <FormButton label="Continue" class="wpx-426 hpx-64 mx-auto rounded-px-10 mt-4" @click="router.push({ name: 'Clients.Dashboard' })"/>
            </div>
        </div>
      
        <div class="cards row justify-content-center align-items-center" v-if="!checkoutIsSuccessful">

          <div class="col-sm-12 col-lg-6 my-auto">


             <div class="cart-left d-flex flex-column rounded-px-10 bg-white mb-4 mx-auto">

                <div class="d-flex flex-column h-min-150 bg-blue rounded-px-10 ppx-16 text-white mb-5">
                  <span class="fs-14 lh-16 gilroy-regular mb-2">Selected plan</span>
                  <span class="fs-24 lh-28 gilroy-bold mb-2">{{ plan?.title }}</span>
                  <span class="fs-13 lh-15 gilroy-regular mb-2">{{ formatMoney(plan?.price) }} /{{ plan?.type }}</span>
                  <span class="fs-13 lh-15 gilroy-regular mb-3">Renews on {{ plan?.renew_date }} | {{ plan?.type }}</span>
                  <FormButton label="Change plan" class="wpx-129 hpx-35 border-0 rounded-px-8" size="sm" variant="yellow" @click="router.push({ name: 'Subscription.Plans' })"/>
                </div>

                <span class="fs-14 lh-16 gilroy-regular mb-2 ps-3">Other services that would help your business grow</span>

                <div class="d-flex flex-column h-min-150 bg-secondary-lt-5 rounded-px-10 ppx-16 text-blue-dk-1 mb-3" v-for="(service, i) in addableServices" :key="i">
                  <span class="fs-24 lh-28 gilroy-medium mb-2">{{ service.title }}</span>
                  <span class="fs-15 lh-18 gilroy-regular mb-4 text-wrap">{{ service.description }}</span>
                
                  <div class="d-flex" :class="service.requestable ? 'justify-content-end' : 'justify-content-between'">
                    <div class="d-flex plan-font gilroy-regular my-auto" v-if="!service.requestable">
                      <span class="fs-12 mt-auto lh-19 fw-400 text-black plan-font gilroy-regular">{{ userCurrency() }}</span>
                      <span class="fs-20 lh-23 text-black plan-font gilroy-bold">{{ formatMoney(service.price, false) }}</span>
                      <span class="fs-12 mt-auto lh-19 fw-400 text-black plan-font gilroy-regular">/{{ service.type }}</span>
                    </div>
                    <FormButton v-if="!service.requestable && !service.subscription_added" label="Add subscription" class="px-2 hpx-35 my-auto rounded-px-10" size="sm" buttonType="outline" @click="subscribeToService(service)"/>
                    <FormButton v-else-if="service.requestable" label="Request a brief" class="px-2 hpx-35 my-auto rounded-px-10" size="sm" buttonType="outline" @click="subscribeToService(service)"/>
                    <FormButton v-else label="Added" class="px-2 hpx-35 my-auto rounded-px-10" size="sm"/>
                  </div>

                </div>

              </div>



          </div>

          <div class="col-sm-12  col-lg-6 my-auto">


            <div class="cart-right d-flex flex-column rounded-px-10 bg-white mb-4 text-blue-dk-1 mx-auto">
            <span class="text-center fs-22 lh-26 mb-5">Your order</span>


            <div class="d-flex flex-column h-min-150 bg-secondary-lt-5 rounded-px-10 ppx-16 mb-3" v-for="(item, i) in cart.items" :key="i">
              <div class="d-flex justify-content-between">
                <span class="my-auto fs-24 lh-28 gilroy-medium mb-2">{{ item.title }}</span>
                <span class="material-icons mb-auto fs-18 text-secondary-lt-1 cursor-pointer" v-if="item.cancelable" @click="removeSubscription(item)">clear</span>
              </div>
              <span class="fs-15 lh-18 gilroy-regular mb-2 text-wrap">{{ formatMoney(item.price) }} /{{ item.type }}</span>
              <div class="d-flex" v-if="item.cancelable && !item.requestable">
                <span class="my-auto fs-16 lh-19 gilroy-regular me-3">Month(s)</span>
                <span class="my-auto text-center d-flex justify-content-center align-items-center cursor-pointer bg-blue-lt-1 rounded-circle wpx-24 hpx-24 fs-16  gilroy-medium me-2" @click="item.unit = modifyUnit(item, 'down')">-</span>
                <span class="my-auto text-center d-flex justify-content-center align-items-center wpx-24 hpx-24 fs-16 lh-19 gilroy-medium me-2">{{ item.unit }}</span>
                <span class="my-auto text-center d-flex justify-content-center align-items-center cursor-pointer bg-blue-lt-1 rounded-circle wpx-24 hpx-24 fs-16 gilroy-medium me-2" @click="item.unit = modifyUnit(item, 'up')">+</span>
              </div>
              <div class="d-flex mt-auto">
                <span class="gilroy-regular fs-16 lh-19 my-auto text-blue-dk-4">Total: </span>
                <span class="gilroy-bold fs-16 lh-19 my-auto ms-1 text-blue">{{ formatMoney(item.total) }}</span>
                <span class="gilroy-regular fs-16 lh-19 my-auto ms-1 text-blue-dk-4"  v-if="!item.cancelable">billed {{ item.type }}</span>
              </div>
            </div>


            <div class="d-flex flex-column mt-4">
              <div class="d-flex justify-content-between mb-2">
                <span class="my-auto fs-14 lh-16 gilroy-regular">Subtotal</span>
                <span class="my-auto fs-14 lh-16 gilroy-regular">{{ formatMoney(cart.subtotal) }}</span>
              </div>
              <div class="d-flex justify-content-between mb-2">
                <span class="mtpx-15 fs-14 lh-16 gilroy-regular">Promo code</span>
                <AuthTextInput element-class="auth-element hpx-33 wpx-144" :modelValue="cart.promo_code" @update:modelValue="updateCoupon"/>
              </div>
              <div class="d-flex justify-content-between my-3 fs-14 lh-16">
                <span class="my-auto gilroy-bold">Total</span>
                <span class="my-auto gilroy-bold">{{ formatMoney(cart.total) }}</span>
              </div>
              <div class="d-flex flex-column mt-auto">

                  <PaystackPay
                    v-if="cart.reference"
                    buttonClass="mt-5 h-min-50 gilroy-regular btn fs-15 lh-19 bg-blue text-white mt-5 h-min-50"
                    buttonText="Go to checkout"
                    :amount="cart.total * 1"
                    :transRef="cart.reference"
                    :onSuccess="checkoutCb"
                    :onCancel="cancelCb"
                  />

                <FormButton label="Home" variant="light" class="mt-3 h-min-50" @click="router.push({ name: 'Home.Index' })"/>
              </div>
            </div>


        </div>




          </div>

        </div>

      </div>

 
</template>

<script lang="ts" setup>
import {ref,onMounted, type Ref} from 'vue'
import { useRouter} from 'vue-router'
import {getCart, getSubscription, addUpdateCart, deleteCartItem, updateCartCouponCode} from '../services'
import {getTransRef, setTransItemsCount, removeTransRef, removeTransItemsCount} from '../helpers'
import { dateFormatter, formatMoney } from '@/services/helper-service'
import * as AlertService from '@/services/alert-service'
//import paystack from 'vue3-paystack';

const userCurrency = () => window.userCurrency()

const router = useRouter()
const checkoutIsSuccessful = ref(false)

const checkoutCb = (eData: any) => {
  console.log('checkout', eData)
  removeTransRef()
  removeTransItemsCount()
  checkoutIsSuccessful.value=true
}
const cancelCb = (eData: any) => {
  console.log('cancel', eData)
}


const {
  // isLoading: cartIsLoading,
  execute: executeGetCart,
} = getCart();
const {
  // isLoading: cartAddonsIsLoading,
  execute: executeGetCartAddons,
} = getSubscription(true);

const {
  // isLoading: addUpdateCartItemIsLoading,
  execute: executeAddUpdateCartItem,
} = addUpdateCart();

const {
  // isLoading: deleteCartItemIsLoading,
  execute: executeDeleteCartItem,
} = deleteCartItem();

const {
  // isLoading: updateCartCouponIsLoading,
  execute: executeUpdateCartCoupon,
} = updateCartCouponCode();



let cart: Ref<any> = ref({
  items:[],
  promo_code:'',
  subtotal:'',
  total:'',
})

let plan:Ref<any> = ref({})
let addableServices:Ref<any> = ref([])

const updateCoupon = window.debounce((code:string)=>{
    let url, method; 
    const data={
        reference: getTransRef(),
        code:''
    };
    if(code){
        url = '/api/cart/coupon/apply'
        data.code = code
        method = 'post'
    }else{
        url = '/api/cart/coupon/remove'
        method = 'delete'
    }
    executeUpdateCartCoupon({method:method,url:url,data:data}).then((res: any)=>{
      let cartResponse = res.data
      if(cartResponse){
        cart.value.promo_code = cartResponse.promo_code || ''
        //cart.value.subtotal = cartResponse.subtotal
        cart.value.total = cartResponse.total
      }else{
        cart.value.promo_code =  ''
        cart.value.total = cart.value.subtotal
      }
    })
},3000)

onMounted(()=>{
  Promise.all([executeGetCart(), executeGetCartAddons()]).then((res:any)=>{
    const cartResponse = res[0].data
    const addonResponse = res[1].data
    console.log(cartResponse, addonResponse)

    for(let category in addonResponse){
      addonResponse[category].forEach((service:any)=>{
        const serviceIsAdded = cartResponse.services.find((serv: any)=>serv?.subscription_id == service.id)
        service.subscription_added = !!serviceIsAdded// To work on this when we get service
        service.requestable = !service.price
        addableServices.value.push(service)

        // Add Service to Cart
        if(serviceIsAdded){
          let addedService = Object.assign({}, service,{
            id:serviceIsAdded.id,
            subscription_id:serviceIsAdded.subscription_id,

            total:serviceIsAdded.total,
            unit:serviceIsAdded.unit,
            cancelable:true,
          })
          cart.value.items.push(addedService)
        }
      })
    }
    // Update rest of cart details
    cart.value.reference = cartResponse.reference
    cart.value.promo_code = cartResponse.promo_code || ''
    cart.value.subtotal = cartResponse.subtotal
    cart.value.total = cartResponse.total

    plan.value = getPlanInfo(cartResponse)
    cart.value.items.unshift(plan.value)
    setTransItemsCount(cart.value.items.length)
  })
})


const getPlanInfo = (planSubscribedFor:any) =>{
  
  let info = Object.assign({},planSubscribedFor.info[0],{
    promo_code: planSubscribedFor?.promo_code || '',
    subtotal: planSubscribedFor?.subtotal,
    type: planSubscribedFor.info[0]?.subscription.type,
    price: planSubscribedFor.info[0]?.subscription.price,
    description: planSubscribedFor.info[0]?.subscription.description,
    title: planSubscribedFor.info[0]?.subscription.title,
    days: planSubscribedFor.info[0]?.subscription?.days,
    renew_date: getRenewalDate(planSubscribedFor.info[0]?.subscription?.days || 2)
  })

  return info
}

const getRenewalDate = (days:any) =>{
  var result = new Date();
  result.setDate(result.getDate() + days);
  //return dateFormatter(result, 'MMM do, yyyy');
  return dateFormatter(result, 'dd MMM. yyyy');
}

const modifyUnit = (service: any, movement:string) =>{
  if(movement=='up'){
    service.unit++;
  }else{
    service.unit--;
    service.unit = service.unit <= 1 ? 1 : service.unit;
  }
  addUpdateService(service,service.unit)
  return service.unit
}


const addUpdateService = (service:any, unit:number) =>{
  
  executeAddUpdateCartItem({data: {subscription_id: service.subscription_id || service.id, unit: unit}}).then((res: any)=>{
      addableServices.value = addableServices.value.map((service:any)=>{
        const serviceIsAdded = res.data.services.find((serv:any)=>serv?.subscription_id == service.id)
        if(serviceIsAdded){
          const cartIndexForService = cart.value.items.findIndex((serv: any)=>serv?.subscription_id == serviceIsAdded.subscription_id)

          if([undefined, null, -1].includes(cartIndexForService)){
            service.subscription_added = true
            cart.value.items.push(Object.assign({}, service, {
              id:serviceIsAdded.id,
              subscription_id:serviceIsAdded.subscription_id,

              cancelable:true,
              unit: serviceIsAdded.unit,
              total: serviceIsAdded.total,
            }))
          }else{
            cart.value.items[cartIndexForService].unit = serviceIsAdded.unit
            cart.value.items[cartIndexForService].total = serviceIsAdded.total
          }

        }
        return service
      })
    // Update rest of cart details
    cart.value.promo_code = res.data.promo_code || ''
    cart.value.subtotal = res.data.subtotal
    cart.value.total = res.data.total
    setTransItemsCount(cart.value.items.length)
  })
}


const subscribeToService = (service:any) => {
  addUpdateService(service, 1)
}


const removeSubscription = (service:any) => {
  executeDeleteCartItem({url:`/api/cart/item/${service.id }`}).then((res:any)=>{
    
      let cartIndex = cart.value.items.findIndex((item:any)=>item.id == service.id);
      cart.value.items.splice(cartIndex,1)
      setTransItemsCount(cart.value.items.length)
      addableServices.value = addableServices.value.map((serv: any)=>{
        if(serv.id==service.subscription_id){
          serv.subscription_added = false
        }
        return serv
      })
      AlertService.toast('success', 'Success', res.message)
  })
}


</script>


<style lang="scss" scoped>
@import '../style.scss';

.h-min-150{
  min-height: 150px;
}
.cart-left, .cart-right{
  min-height: 700px;
  max-width: 450px;
}
.auth-page{
  padding: 1.5rem !important;
}

@media (max-width: 500px) {
  .cart-left, .cart-right {
    padding: 15px;
  }
}
@media (min-width: 600px) {
  .cart-left, .cart-right {
    padding: 25px;
  }
}
@media (min-width: 1024px) {
  .cart-left, .cart-right {
    width: 450px;
  }
  .cart-left{
    float: right;
    margin-right: 2.5rem;
  }

  .cards{
    height: 100vh;
  }
}

@media (min-width: 1320px) {
  .cards{
    max-width: 1280px;
  }
}
</style>

