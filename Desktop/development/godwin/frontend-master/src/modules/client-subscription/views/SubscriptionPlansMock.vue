
<template>
  <div class="d-flex justify-content-center pbpx-500">
    <HeroHead is-not-home>
      <div class="d-flex">
        <span @click="router.go(-1)" class="material-icons me-3 my-auto text-black cursor-pointer">west</span>
        <span class="gilroy-medium fs-60 lh-70 text-black my-auto">Choose preferred plan</span>
      </div>
    </HeroHead>
    <PlansComponent :category="category" :categories="categories" @new:category="category=$event" />

  </div>
 
</template>

<script lang="ts" setup>
import {reactive,ref,computed, type Ref} from 'vue'
import {useRouter} from 'vue-router'
import PlansComponent from './components/PlansComponent.vue'


const router = useRouter()

let allPlansItems = [
  {title:'Unlimited graphic design',showIcon:true, type:'basic', metadata:['Background removal','Ebook Cover','Print designs']},
  {title:'Unlimited logos & branding',showIcon:false, type:'basic'},
  {title:'Unlimited brands',showIcon:false, type:'basic'},
  {title:'Unlimited team members',showIcon:false, type:'basic'},
  {title:'24 hrs turnaround',showIcon:false, type:'basic'},
  {title:'Source files',showIcon:false, type:'basic'},
  {title:'Custom illustrations',showIcon:false},
  {title:'Presentation designs',showIcon:false, type:'standard'},
  {title:'Basic animated gif',showIcon:false, type:'standard'},
  {title:'Designated designer',showIcon:false, type:'standard'},
  {title:'Motion graphics',showIcon:false},
]

const basicPlansItems = computed(()=>allPlansItems.filter((item:any)=>item.type=='basic'))
const standardPlansItems = computed(()=>allPlansItems.filter((item:any)=>item.type))

const showMoreInfo = ref (false)
const category = ref ('Monthly')
const categories = [
  {
    name:'Monthly',
    plans:[
      {
        title:'M Basic',
        description:'M For day-to-day graphic design needs',
        default:false,
        discounted:null,
        price:'25,000',
        type:'monthly',
        items:basicPlansItems.value,
      },
      {
        title:'M Standard',
        description:'M For day-to-day marketing needs and big campaigns.',
        default:true,
        discounted:null,
        price:'150,000',
        type:'monthly',
        items:standardPlansItems.value,
      },
      {
        title:'M Pro',
        description:'M Covers day-to-day Graphics and motion design for marketing & big campaigns.',
        default:false,
        discounted:'40,999',
        price:'250,000',
        type:'monthly',
        items:allPlansItems,
      },
    ]
  },
  {
    name:'Bi-annually',
    plans:[
      {
        title:'B Basic',
        description:'B For day-to-day graphic design needs',
        default:false,
        discounted:null,
        price:'25,000',
        type:'bi-annually',
        items:basicPlansItems.value,
      },
      {
        title:'B Standard',
        description:'B For day-to-day marketing needs and big campaigns.',
        default:true,
        discounted:null,
        price:'150,000',
        type:'bi-annually',
        items:standardPlansItems.value,
      },
      {
        title:'B Pro',
        description:'B Covers day-to-day Graphics and motion design for marketing & big campaigns.',
        default:false,
        discounted:'40,999',
        price:'250,000',
        type:'bi-annually',
        items:allPlansItems,
      },
    ]
  },
  {
    name:'Annually',
    plans:[
      {
        title:'A Basic',
        description:'A For day-to-day graphic design needs',
        default:false,
        discounted:null,
        price:'25,000',
        type:'annually',
        items:basicPlansItems.value,
      },
      {
        title:'A Standard',
        description:'A For day-to-day marketing needs and big campaigns.',
        default:true,
        discounted:null,
        price:'150,000',
        type:'annually',
        items:standardPlansItems.value,
      },
      {
        title:'A Pro',
        description:'A Covers day-to-day Graphics and motion design for marketing & big campaigns.',
        default:false,
        discounted:'40,999',
        price:'250,000',
        type:'annually',
        items:allPlansItems,
      },
    ]
  },
]

/* const categoryPlans = computed(()=>{
  let categoryData = categories.find((cat)=>cat.name == category.value);
  return categoryData?.plans as any
}) */

</script>


<style lang="scss" scoped>
@import '../style.scss';
</style>

