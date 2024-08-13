
<template>
  <div class="container-fluid px-0">
    <!-- <HeroHead is-not-home>
      <div class="d-flex">
        <span @click="router.go(-1)" class="material-icons me-3 my-auto text-black cursor-pointer">west</span>
        <span class="gilroy-medium fs-60 lh-70 text-black my-auto">Choose preferred plan</span>
      </div>
    </HeroHead> -->
    <HeroHead is-not-home>
        <div class="pricing-intro">
          <div class="container">
            <div class="row">
              <div class="col-lg-12 pt-5 pt-lg-0 d-flex justify-content-center">
                <span @click="router.go(-1)" class="material-icons me-3 text-black cursor-pointer my-auto">west</span>
                <div class="title fw-bold gilroy-medium text-blue-dk-1 text-uppercase text-center my-auto">Choose preferred plan</div>
              </div>

            </div>
          </div>
        </div>
      </HeroHead>
    <PlansComponent :category="category" :categories="categories" @new:category="category=$event" @submit:plan="submitToCreateCart" />
  
  </div>
 
</template>

<script lang="ts" setup>
import {ref,computed,onMounted, type Ref} from 'vue'
import {useRouter} from 'vue-router'
import {getSubscription,createCart, addUpdateCart} from '../services'
import PlansComponent from './components/PlansComponent.vue'
import {getTransRef} from '../helpers'
import * as AlertService from '@/services/alert-service'

const transRef = ref(getTransRef())
const router = useRouter()

const showMoreInfo = ref (false)
const modalInfo = ref ([] as any)

let category:Ref<any> = ref ('')
let categories:Ref<any> = ref([])

const {
  // isLoading: subscriptionIsLoading,
  execute: executeGetSubscription,
} = getSubscription();

const {
  // isLoading: createCartIsLoading,
  isSuccessful: createCartIsSuccessfully,
  execute: executeCreateCart,
} = createCart(0);

const {
  // isLoading: addUpdateCartItemIsLoading,
  isSuccessful: addCartIsSuccessfully,
  execute: executeAddUpdateCartItem,
} = addUpdateCart();


onMounted(()=>{
  executeGetSubscription().then((res: any) => {
    console.log('subscription', res.data)
    for(let category in res.data){
      let plans = res.data[category].map((plan: any) => {
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
})

const  humanize = (str:any) => {
  let name = str.split('_').join(' ').split('-').join(' ');
  return name.charAt(0).toUpperCase() + name.slice(1)
}

const showInfo = (info:any) =>{
  modalInfo.value = info
  showMoreInfo.value=true
}

const categoryPlans = computed(()=>{
  let categoryPlans = []
  let categoryData = categories.value.find((cat:any)=>cat.name == category.value)
  if(categoryData?.name){
    categoryPlans = categoryData.plans.map((plan:any)=>{
      plan.items = JSON.parse(plan.metadata)
      return plan
    })
  }
  return categoryPlans
})

const submitToCreateCart = (subscriptionId:number) => {
  if(!transRef.value){
    executeCreateCart({data:{subscription_id:subscriptionId}}).then((res:any)=>{
      if(createCartIsSuccessfully.value){
        AlertService.toast('success', 'Success', res.message)
        router.push({name:"Subscription.Cart"})
      }
    })
  } else {
    executeAddUpdateCartItem({data: {subscription_id: subscriptionId, unit: 1, default:true}}).then((res: any)=>{
      if(addCartIsSuccessfully.value){
        AlertService.toast('success', 'Success', res.message)
        router.push({name:"Subscription.Cart"})
      }
    })
  }
}


</script>


<style lang="scss" scoped>
@import '../style.scss';
.title {
  font-size: calc(1.5rem + .3vw);
}

@media (min-width: 1024px) {
  .title{
    font-size: calc(2.75rem + .3vw);
  }
}



@media (max-width: 1024px) {  
    .pricing-intro{
      padding-top: 60px;
      padding-bottom: 90px;
    }
}

@media (max-width: 500px) {  
    .pricing-intro{
      padding-top: 30px;
      padding-bottom: 90px;
    }
}

@media (min-width: 1200px) {  
    .pricing-intro{
      padding: 100px 150px
    }
}
</style>

