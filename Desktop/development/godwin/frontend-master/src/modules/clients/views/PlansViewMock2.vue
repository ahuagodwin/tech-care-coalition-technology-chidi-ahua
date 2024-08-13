<template>
<div class="d-flex flex-column px-4">

    <div class="container">
        <div class="row gx-5 d-flex justify-content-between flex-wrap mt-4">
            <div class="col col-lg-6 col-md-12 col-sm-12 col-xs-12">

                <div class="d-flex flex-column hpx-336 ppx-25 hpx-160 mbpx-20 rounded-px-20 bg-blue">
                    <span class="gilroy-regular fs-25 lh-29 text-white mb-4">Payment Method</span>
                    <span class="gilroy-medium fs-50 lh-59 text-white mb-2">N250,000/mo</span>
                    <span class="gilroy-regular fs-14 lh-16 text-white mb-5">Renews on  Nov. 2021 | Annual plan</span>
                    <div class="d-flex">
                        <FormButton label="Upgrade plan" class="hpx-35 border-0 me-2 my-auto rounded-px-8" variant="yellow" @click="updateSubscription=true"/>
                        <FormButton label="Cancel plan" class="hpx-35 me-2 my-auto rounded-px-8 border border-white" @click.prevent="cancelSubscription=true"/>
                    </div>
                    

                    <div class="d-flex form-check form-switch mt-4">
                        <input class="form-check-input my-auto" type="checkbox" role="switch" id="flexSwitchCheckDefault">
                        <label class="form-check-label gilroy-regular fs-16 lh-19 text-white my-auto ms-3" for="flexSwitchCheckDefault">Auto-renew subscription</label>
                    </div>
                </div>

            </div>

            <div class="col col-lg-6 col-md-12 col-sm-12 col-xs-12">

                <div class="d-flex flex-column hpx-336 ppx-25 hpx-160 mbpx-20 rounded-px-20 bg-blue-lt-1 text-black">
                    <span class="gilroy-medium fs-25 lh-29 text-black mb-4">What is included</span>
                    <span class="gilroy-regular fs-16 lh-18 text-black mb-2 d-flex" v-for="(feature, i) in features" :key="i">
                        <i class="material-icons me-2 fs-14 my-auto">check</i>
                        <span class="my-auto">{{feature}}</span>
                    </span>

                    <FormButton label="Add other services" class="hpx-35 w-fit-content rounded-px-8 mt-4" @click.prevent="addServiceModal=true"/>
                
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
                    <span class="wpx-87 hpx-58 border rounded-px-6 my-auto perfect-center">
                        <img src="@/assets/img/clients/visa.svg" class="wpx-68 hpx-38"/>
                    </span>
                    <span class="gilroy-medium fs-16 lh-19 my-auto ms-3">Visa ending in 2255</span>
                </div>
                <div class="cta col col-lg-6 col-md-12 col-sm-12 col-xs-12 my-auto pe-0">
                    <FormButton label="Update Billing" class="hpx-33 me-2"/>
                    <FormButton label="Remove" class="hpx-33" variant='light'/>
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
                        <th scope="col" class="gilroy-medium fs-14 lh-16 w-30 text-center">Type</th>
                        <th scope="col" class="gilroy-medium fs-14 lh-16 w-40 text-center">Receipts</th>
                    </tr>

                </thead>

                <tbody>
                    <tr v-for="n in 5" :key="n">
                        <td class="gilroy-regular fs-16 lh-19 text-blue-dk-1">Oct. 21, 2021</td>
                        <td class="gilroy-regular fs-16 lh-19 text-blue-dk-1 text-center">Graphics Pro plan</td>
                        <td class='d-flex justify-content-center'>
                            <FormButton label="Download" class="hpx-33" variant='light'/>
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
    </div>

    <ModalBox 
        class="h-100" 
        v-model="addServiceModal" 
        :staticBackDrop="false"
        modalContentClass="rounded-px-20"
        modal-custom-class="add-services-class" modalSize="modal-lg" modalWidth="980px"
        @modal:closed="addServiceModal = false" :modalId="`modal-add-${Date.now()}`"
      >
      <template #default>
        <div class="d-flex flex-wrap p-5">

        <div class="d-flex flex-column wpx-385 h-min-150 bg-secondary-lt-5 rounded-px-10 ppx-16 text-blue-dk-1 my-3 mx-3" v-for="(service,i) in services" :key="i">
          <span class="fs-24 lh-28 gilroy-medium mb-2">{{service.title}}</span>
          <span class="fs-15 lh-18 gilroy-regular mb-4 text-wrap">{{service.description}}</span>
          
          <div class="d-flex" :class="service.requestable ? 'justify-content-end' : 'justify-content-between'">
            <div class="d-flex plan-font gilroy-regular my-auto" v-if="!service.requestable">
              <span class="fs-12 mt-auto lh-19 fw-400 text-black plan-font gilroy-regular">₦</span>
              <span class="fs-20 lh-23 text-black plan-font gilroy-bold">{{service.price}}</span>
              <span class="fs-12 mt-auto lh-19 fw-400 text-black plan-font gilroy-regular">/{{service.type}}</span>
            </div>
            <!-- <FormButton v-if="!service.requestable && !service.subscription_added" label="Add subscription" class="px-2 hpx-35 my-auto rounded-px-10" size="sm" buttonType="outline" @click="subscribeToService(service)"/>
            <FormButton v-else-if="service.requestable" label="Request a brief" class="px-2 hpx-35 my-auto rounded-px-10" size="sm" buttonType="outline" @click="requestBriefOnService(service)"/>
            <FormButton v-else label="Added" class="px-2 hpx-35 my-auto rounded-px-10" size="sm"/> -->
            <FormButton v-if="!service.requestable && !service.subscription_added" label="Add subscription" class="px-2 hpx-35 my-auto rounded-px-10" size="sm" buttonType="outline"/>
            <FormButton v-else-if="service.requestable" label="Request a brief" class="px-2 hpx-35 my-auto rounded-px-10" size="sm" buttonType="outline"/>
            <FormButton v-else label="Added" class="px-2 hpx-35 my-auto rounded-px-10" size="sm"/>
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
                Your monthly subscription is not due until <b>May 10, 2020.</b> If you would like to proceed with canceling your subscription, please select <b>"Cancel Subscription"</b> below.
            </span>
            <div class="d-flex mt-5">
                <FormButton label="Don’t cancel subscription" class="px-5 hpx-53 my-auto rounded-0"/>
                <FormButton label="Cancel subscription" class="ms-3 px-5 hpx-53 my-auto rounded-0" buttonType="outline" @click.prevent="cancelSubscription = false"/>
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

            <PlansComponent :category="category" :categories="categories" @new:category="category=$event" usedInModal />
            
        </div>
      </template>
      </ModalBox>

    
</div>
</template>


<script lang="ts" setup>
    import {getWorkspaceTeam,addWorkspaceMember,deleteWorkspaceMember} from '../services'
    import {ref,reactive, onMounted,computed} from 'vue'
    import {validateNewWorkspaceMember} from '../validator'
    import * as HelperService from '@/services/helper-service'
    import * as AlertService from '@/services/alert-service'
    import PlansComponent from '@/modules/client-subscription/views/components/PlansComponent.vue'


    const planData = ref({} as any)
    const features = [
        'Unlimited graphics design',
        'Unlimited logo & branding',
        'Unlimited brand',
        'Unlimited team members',
        '48hrs turnaround',
        'Source files',
    ]

    const updateSubscription = ref(false)
    const cancelSubscription = ref(false)
    const addServiceModal = ref(false)
    const services = [
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


let allPlansItems = [
  {title:'Unlimited graphic design',showIcon:true, type:'basic'},
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
</style>