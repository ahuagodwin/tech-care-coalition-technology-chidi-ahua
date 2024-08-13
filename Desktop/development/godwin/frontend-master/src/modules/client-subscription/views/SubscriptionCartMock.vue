
<template>
  <div class="d-flex justify-content-center">
    <div class="d-flex flex-wrap justify-content-center">

      <div class="cart-left d-flex flex-column rounded-px-10 wpx-450 bg-white ppx-40 mb-4">

        <div class="d-flex flex-column h-min-150 bg-blue rounded-px-10 ppx-16 text-white mb-5">
          <span class="fs-14 lh-16 gilroy-regular mb-2">Selected plan</span>
          <span class="fs-24 lh-28 gilroy-bold mb-2">{{plan?.info?.title}}</span>
          <span class="fs-13 lh-15 gilroy-regular mb-2">₦{{plan?.info?.price}} /{{plan?.info?.type}}</span>
          <span class="fs-13 lh-15 gilroy-regular mb-3">Renews on {{plan?.info?.renew_date}} | {{plan?.info?.type}}</span>
          <FormButton label="Change plan" class="wpx-129 hpx-35 border-0 rounded-px-8" size="sm" variant="yellow"/>
        </div>

        <span class="fs-14 lh-16 gilroy-regular mb-2 ps-3">Other services that would help your business grow</span>

        <div class="d-flex flex-column h-min-150 bg-secondary-lt-5 rounded-px-10 ppx-16 text-blue-dk-1 mb-3" v-for="(service,i) in plan.services" :key="i">
          <span class="fs-24 lh-28 gilroy-medium mb-2">{{service.title}}</span>
          <span class="fs-15 lh-18 gilroy-regular mb-4 text-wrap">{{service.description}}</span>
          
          <div class="d-flex" :class="service.requestable ? 'justify-content-end' : 'justify-content-between'">
            <div class="d-flex plan-font gilroy-regular my-auto" v-if="!service.requestable">
              <span class="fs-12 mt-auto lh-19 fw-400 text-black plan-font gilroy-regular">₦</span>
              <span class="fs-20 lh-23 text-black plan-font gilroy-bold">{{service.price}}</span>
              <span class="fs-12 mt-auto lh-19 fw-400 text-black plan-font gilroy-regular">/{{service.type}}</span>
            </div>
            <FormButton v-if="!service.requestable && !service.subscription_added" label="Add subscription" class="px-2 hpx-35 my-auto rounded-px-10" size="sm" buttonType="outline" @click="subscribeToService(service)"/>
            <FormButton v-else-if="service.requestable" label="Request a brief" class="px-2 hpx-35 my-auto rounded-px-10" size="sm" buttonType="outline" @click="requestBriefOnService(service)"/>
            <FormButton v-else label="Added" class="px-2 hpx-35 my-auto rounded-px-10" size="sm"/>
          </div>

        </div>

      </div>

      <div class="cart-right d-flex flex-column rounded-px-10 wpx-450 bg-white ppx-40 mb-4 text-blue-dk-1">
          <span class="text-center fs-22 lh-26 mb-5">Your order</span>


          <div class="d-flex flex-column h-min-150 bg-secondary-lt-5 rounded-px-10 ppx-16 mb-3" v-for="(item, i) in cartItems" :key="i">
            <div class="d-flex justify-content-between">
              <span class="my-auto fs-24 lh-28 gilroy-medium mb-2">{{item.title}}</span>
              <span class="material-icons mb-auto fs-18 text-secondary-lt-1 cursor-pointer" v-if="item.cancelable" @click="removeSubscription(item)">clear</span>
            </div>
            <span class="fs-15 lh-18 gilroy-regular mb-4 text-wrap">₦{{item.price}} /{{item.type}}</span>
            <div class="d-flex" v-if="item.cancelable">
              <span class="my-auto fs-16 lh-19 gilroy-regular me-3">Month(s)</span>
              <span class="my-auto text-center d-flex justify-content-center align-items-center cursor-pointer bg-blue-lt-1 rounded-circle wpx-24 hpx-24 fs-16  gilroy-medium me-2" @click="item.unit = modifyUnit(item.unit,'down')">-</span>
              <span class="my-auto text-center d-flex justify-content-center align-items-center wpx-24 hpx-24 fs-16 lh-19 gilroy-medium me-2">{{item.unit}}</span>
              <span class="my-auto text-center d-flex justify-content-center align-items-center cursor-pointer bg-blue-lt-1 rounded-circle wpx-24 hpx-24 fs-16 gilroy-medium me-2" @click="item.unit = modifyUnit(item.unit,'up')">+</span>
            </div>
          </div>


          <div class="d-flex flex-column mt-4">
            <div class="d-flex justify-content-between mb-2">
              <span class="my-auto fs-14 lh-16 gilroy-regular">Subtotal</span>
              <span class="my-auto fs-14 lh-16 gilroy-regular">₦{{plan.info.subtotal}}</span>
            </div>
            <div class="d-flex justify-content-between mb-2">
              <span class="mtpx-15 fs-14 lh-16 gilroy-regular">Promo code</span>
              <AuthTextInput element-class="auth-element hpx-33 wpx-144" v-model="promoCode"/>
            </div>
            <div class="d-flex justify-content-between my-3 fs-14 lh-16">
              <span class="my-auto gilroy-bold">Total</span>
              <span class="my-auto gilroy-bold">₦{{plan.info.total}}</span>
            </div>
            <div class="d-flex flex-column mt-auto">
              <FormButton label="Go to checkout" class="mt-5 h-min-50"/>
              <FormButton label="Home" variant="light" class="mt-3 h-min-50"/>
            </div>
          </div>


      </div>
    </div>

  </div>
 
</template>

<script lang="ts" setup>
import {ref,onMounted, type Ref} from 'vue'
//import { useRouter} from 'vue-router'
import {getCart} from '../services'
import {getTransRef} from '../helpers'

//const router = useRouter()
const promoCode = ref('')
let plan = ref({
  reference: getTransRef(),
  info:{
    title:'Graphics Pro',
    description:'Graphics Pro design needs',
    default:false,
    discounted:null,
    price:'25,000',
    type:'monthly',
    unit:1,
    renew_date:'Nov, 2021',
    subtotal:"23,0000",
    total:"23,0000",
  },
  services:[
    {
      title:'Social media management',
      description:'Need help with your online presence? This is for you!',
      default:false,
      discounted:null,
      price:'30,000',
      type:'monthly',
      unit:1,
      subscription_added:false,
      requestable:false,
      cancelable:true,
    },
    {
      title:'Copywriting',
      description:'Need help with your online presence? This is for you!',
      default:false,
      discounted:null,
      price:'20,000',
      type:'monthly',
      unit:1,
      subscription_added:false,
      requestable:false,
      cancelable:true,
    },
    {
      title:'Website design',
      description:'Need a functioning business website? We can help you!',
      default:false,
      discounted:null,
      price:null,
      type:'monthly',
      unit:1,
      subscription_added:false,
      requestable:true,
      cancelable:true,
    },
  ]
})

let cartItems:Ref<any> = ref([])


const {
  //isLoading: cartIsLoading,
  execute: executeGetCart,
} = getCart(getTransRef());

onMounted(()=>{
  executeGetCart().then((res:any)=>{
    safeLog('server',res.data)
    safeLog('mock',plan.value)
    //safeLog(getTransRef())
    cartItems.value.push(plan.value.info)
  })
})

const modifyUnit = (unit: number, movement:string) =>{
  if(movement=='up'){
    unit++;
  }else{
    unit--;
    unit = unit <= 1 ? 1 : unit;
  }
  return unit
}
const subscribeToService = (service:any) => {
  let serviceInfoIndex = plan?.value?.services?.findIndex((serv:any)=>serv.title == service.title) // Use service.id instead of title
  let serviceInfo = plan?.value?.services[serviceInfoIndex]
  serviceInfo.subscription_added = true
  cartItems?.value?.push(serviceInfo)
}
const removeSubscription = (service:any) => {
  let serviceInfoIndex = plan?.value?.services?.findIndex((serv:any)=>serv.title == service.title) // Use service.id instead of title
  let serviceInfo = plan?.value?.services[serviceInfoIndex]
  serviceInfo.subscription_added = false
  serviceInfo.unit = 1

  let cartIndex = cartItems?.value?.findIndex((item:any)=>item.title == service.title);
  cartItems.value.splice(cartIndex,1)
}
const requestBriefOnService = () => {
  safeLog('service requested')
}

</script>


<style lang="scss" scoped>
@import '../style.scss';

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

