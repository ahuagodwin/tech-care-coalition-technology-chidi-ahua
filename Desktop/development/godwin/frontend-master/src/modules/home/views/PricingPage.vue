<template>
  <div>
    <HeroHead>
      <div class="pricing-intro">
        <div class="container">
          <div class="row">
            <div class="col-lg-12 pt-5 pt-lg-0 d-flex flex-column justify-content-center">
              <div class="title fw-bold gilroy-medium mb-3 text-blue-dk-1 text-uppercase">Pricing</div>
              <div class="details gilroy-regular lead-text text-blue-dk-1">Select and pay for a plan that suits your needs. if you want a unique plan for your business, we have got you covered. Contact us</div>
            </div>

          </div>
        </div>
      </div>
    </HeroHead>
   
    <div>
      <PlansComponent :category="category" :categories="categories" @new:category="updateCategory" is-non-auth/>
      <div class="mtpx-10">
        <PricingBox />
        <ChatNDemo />
        <FAQComponent />
      </div>
    </div>
  </div>

  <LoadingModal :isLoading="subscriptionIsLoading" />
</template>


<script lang="ts" setup>
import { type Ref, ref, onMounted } from 'vue'
  import PlansComponent from '@/modules/client-subscription/views/components/PlansComponent.vue'
  import PricingBox from './components/PricingBox.vue'
  import ChatNDemo from './components/ChatNDemo.vue'
  import FAQComponent from './components/FAQComponent.vue'
  import LoadingModal from "../../../components/LoadingModal.vue"
  import { getSubscription } from '../services'

const {
  isLoading: subscriptionIsLoading,
  execute: executeGetSubscription,
} = getSubscription();


let category: Ref<any> = ref('')
// let categories: Ref<any> = ref([]
let categories: Ref<Array<{ name: string; plans: any[] }>> = ref([]);

  const updateCategory = (newCategory: string) => {
  category.value = newCategory;
};


onMounted(async () => {
  try {
    const res = await executeGetSubscription();
    if (res?.data) {

      // array of  currency
      const allowedCurrencies = "NGN" || "USD";
      
      categories.value = Object.keys(res.data).map((cat: string) => {
        const filteredPlans = res?.data[cat].filter((plan: any) => allowedCurrencies.includes(plan.currency));
        
        return {
          name: cat.charAt(0).toUpperCase() + cat.slice(1),
          plans: filteredPlans.map((plan: any) => ({
            ...plan,
            items: plan.metadata,
          })),
        };
      })

      if (categories.value.length > 0) {
        category.value = categories.value[0].name;
      }
    }
  } catch (error) {
    console.error('Failed to fetch subscription data:', error);
  }
});



</script>

<style lang="scss" scoped>
.title {
  font-size: calc(2rem + .3vw);
}

.loading-spinner {
  text-align: center;
  font-size: 1.5rem;
  color: #007bff;
  margin-top: 2rem;
}

@media (min-width: 1024px) {
  .title{
    font-size: calc(3.75rem + .3vw);
  }
}



@media (max-width: 1024px) {  
    .pricing-intro{
      padding-top: 60px;
      padding-bottom: 90px;
    }
}

@media (max-width: 500px) {  
    .title, .details {
      text-align: center;
    }
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