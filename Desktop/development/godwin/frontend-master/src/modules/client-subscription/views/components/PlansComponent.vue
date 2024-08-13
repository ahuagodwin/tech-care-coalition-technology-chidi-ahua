<template>
  <div class="plan-page container-fluid">
  <div class="d-flex justify-content-center mb-5">

  <div 
    class="tabs links d-flex mx-auto text-blue-dk-1 gilroy-medium rounded-px-30"
    :class="usedInModal ? 'bg-white' : 'bg-blue-lt-1 mt-n4'"
    :style="usedInModal ? 'top:40px' : ''"
  >
    <div 
      v-for="(item,i ) in categories" :key="i"
      class="cta text-center text-nowrap cursor-pointer" 
      :class="{active:currentCategory==item.name}" 
      @click="currentCategory=item.name"
    >{{item.name}}</div>
  </div>
  </div>

    <div class="container">

      <div class="plans row gy-3 clearfix">
        <div class="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-6 my-auto mb-5"  v-for="(plan, i) in categoryPlans" :key="i">
        <div class="plan d-flex flex-column bg-white px-4 py-2">

      <!-- godwin please remember to condition the most popular here if yes or no -->
        <span class="plan-font gilroy-regular rounded-px-4 ptpx-2 mt-n2 mx-auto text-center wpx-94 hpx-20 fs-12 lh-15 fw-700" 
          :class="{'bg-blue text-blue-lt-1': plan.most_popular === 'yes'}"
        v-if="plan.default"
        >
        {{ plan.most_popular === "yes" ? "Most Popular" : ``}}
        </span> 
        <div class="row d-flex justify-content-between" :class="plan.default ? 'mtpx-10' : 'mtpx-22'">
          <span class="col-8 col-sm-7 text-truncate text-black flex-grow-1 fs-24 lh-28 gilroy-medium cursor-pointer" :title="plan.title">{{ plan.title }}</span>
          <span class="col-4 col-sm-5 plan-font gilroy-regular rounded-px-4 ptpx-2 px-2 text-center text-blue-dk-2 bg-yellow hpx-20 fs-12 lh-15 fw-700 text-nowrap" v-if="plan.save_up_to">Save {{ formatMoney(plan.save_up_to) }}</span>
        </div>
        <span class="text-secondary-lt-4 gilroy-regular fs-11 lh-14">{{ plan.description }}</span>
        <div class="plan-items mt-4">

          <div class="plan-item row d-flex position-relative mb-2" v-for="(item, i) in plan.items" :key="i">
            <div class="col-10 d-flex my-auto">
              <span class="material-icons me-2 mb-auto ptpx-2 fs-12 fw-bold">check</span>
              <span class="mb-auto text-black lh-15 fs-14 gilroy-regular wpx-170 text-truncate cursor-pointer" :title="item.title">{{ item.title }}</span>
            </div>
            <div class="col-2">
              <span 
                class="position-absolute cursor-pointer end-0 my-auto rounded-circle wpx-16 hpx-16 bg-yellow text-blue-dk-2 mb-auto fs-9 lh-16 text-center align-middle" 
                v-if="!usedInModal && (item.showIcon == 'true' || item.showIcon === true)"
                @click="setModalItem(true, item)"
              >?</span>
            </div>
          </div>

        </div>

          <div class="d-flex flex-column mt-auto">
              <div class="d-flex plan-font gilroy-regular text-red-lt-6 text-decoration-line-through" v-if="plan.discounted">
                <span class="fs-20 lh-24 mt-auto fw-700 plan-font gilroy-regular">{{ formatMoney(plan.discounted) }}</span>
              </div>
              <div class="d-flex plan-font gilroy-regular">
                <span class="fs-25 lh-28 my-auto fw-700 plan-font gilroy-medium text-blue">{{ formatMoney(getMonthlyPrice(plan.price, plan.type)) }}</span>
                <span class="fs-16 lh-19 my-auto fw-400 plan-font gilroy-regular text-black">/mo</span>
              </div>
              <div class="d-flex plan-font gilroy-regular text-red-lt-6" v-if="plan.type != 'monthly'">
                <span class="fs-14 lh-17 mt-auto fw-700 plan-font gilroy-regular">{{ formatMoney(plan.price)}}</span>
                <span class="fs-14 lh-17 mt-auto fw-700 plan-font gilroy-regular ms-1"> billed {{ plan.type }}</span>
              </div>

              <router-link
                  v-if="isNonAuth"
                  to="/register" 
                  class="non-auth-select-plan perfect-center text-decoration-none fs-15 lh-19 gilroy-bold wpx-200 hpx-42 px-3 rounded-px-8 mt-2 mx-auto"
              >Select plan
              </router-link>
            <FormButton v-else label="Select plan" variant="light" class="mt-2 hpx-42 mx-auto" @click.prevent="emits('submit:plan', plan.id)"/>
          </div>
        </div>
        </div>


      </div>

    </div>

      <ModalBox 
        class="h-100" 
        v-model="showMoreInfo" 
        :staticBackDrop="true"
        modal-custom-class="plans-page-class" modalSize="modal-lg" modalWidth="650px"
        @modal:closed="showMoreInfo = false" :modalId="`modal-${Date.now()}`"
      >
      <template #default>
        <div class="d-flex flex-column p-4">
          <i class="material-icons fs-22 text-dark-lt-2 my-auto cursor-pointer position-absolute top-0 end-0 mt-2 me-2"
          @click="setModalItem(false)">close</i>
          <span class="fs-25 lh-10 gilroy-medium text-blue text-center">This package only covers designs for</span>
        
          <div class="d-flex flex-wrap mt-5" v-if="selectedModalItem.info">
            <div class="fs-15 lh-10 gilroy-regular col-4 col-md-4 col-sm-6 mb-3" v-html="selectedModalItem.info"></div>
          </div>

        </div>
      </template>
      </ModalBox>
  </div>
</template>


<script lang="ts" setup>
import { ref, computed } from 'vue'
import { formatMoney } from '@/services/helper-service'

interface Category {
  name: string;
  plans: Plan[];
}

interface Plan {
  title: string;
  description: string;
  items: PlanItem[];
  most_popular: string;
  default: boolean;
  save_up_to?: number;
  discounted?: number;
  price: number;
  type: string;
}

interface PlanItem {
  title: string;
  showIcon: boolean;
  info?: string;
}

interface PlanProps {
  category: string;
  categories: Category[];
  usedInModal?: boolean;
  isNonAuth?: boolean;
}

// eslint-disable-next-line
const props = defineProps<PlanProps>()
// eslint-disable-next-line
const emits = defineEmits(['new:category','submit:plan'])

const selectedModalItem = ref({} as any)


const showMoreInfo = ref(false)

const setModalItem = (show: boolean, item?: any) => {
  showMoreInfo.value = show
  if (show) {
    selectedModalItem.value = item
  }
}
const categoryPlans = computed(()=>{
let categoryData = props.categories.find((cat:any)=>cat.name == currentCategory.value);
return categoryData?.plans as any
})

const currentCategory = computed({
  get(){
      return props.category
  },
  set(newCategory:string){
      emits('new:category', newCategory)
  }
})

const getMonthlyPrice = (price:any , type:any)=>{
  if(type=='monthly') return price;
  let cat:Record<string, any> = {
    'annually': 12,
    'bi-annually': 6,
    'quarterly': 3
  }
  const newPrice = price/cat[type]
  return newPrice.toFixed(2)
}
</script>

<style lang="scss" scoped>
.tabs{
  height: 58px;
  font-size: 16px;
  line-height: 19px;
  .cta{
    padding: 19px 40px;
    &.active{
      height: 58px;
      background: var(--spa-color-blue);
      color: var(--spa-color-white);
      border-radius: 30px;
    }
  }
}

@media (max-width: 600px) {
  .tabs{
    height: 50px;
    font-size: 14px;
    line-height: 16px;
    .cta{
      padding: 16px 35px;
      &.active{
        height: 50px;
      }
    }
  }
}



@media (max-width: 500px) {
  .tabs{
    height: 40px;
    font-size: 12px;
    line-height: 14px;
    .cta{
      padding: 12px 15px;
      &.active{
        height: 40px;
      }
    }
  }
}




.plans{
  .plan{
    max-width: 300px;
    min-height: 500px;
    border-radius: 24px;
    .plan-font{
      font-style: normal;
      opacity: 0.96;
    }
    .plan-items{
      min-height: 300px;
      letter-spacing: -0.02em;
    }
  }
}



.non-auth-select-plan{
  background-color: var(--spa-color-blue-lt-1);
  color: var(--spa-color-blue);
  &:hover{
    color: var(--spa-color-white);
    background-color: var(--spa-color-blue);
  }
}



@media (min-width: 1200px) {
    .plan-page {
        padding-left: 150px;
        padding-right: 150px;
    }
}
</style>