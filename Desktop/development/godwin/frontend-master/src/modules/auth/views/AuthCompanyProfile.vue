
<template>

<div class="auth-page container">
  <div class="page-container row d-flex align-item-center">
    <div class="authContainer col-sm-12 col-md-11 bg-white my-auto mx-auto">

      <div class="d-flex flex-column">
        <span class="title text-black text-center">Complete your company profile!</span>
        <span class="auth-instruction text-center">Let us get to kow about your business</span>
        <input ref="fileUpload" type="file" id="file-upload" @change="handleFileUpload" class="d-none" accept="image/png, image/jpeg"/>

        <hr class="mypx-20 authDivider"/>

          <div class="container">
            <div class="row">
                <div class="form-left col-12 col-sm-12 col-md-12 col-lg-6">

                  <div class="d-flex flex-column">

                      <div class="company-name order-2  order-lg-1">
                        <AuthTextInput element-class="auth-element hpx-50" label="Company name" placeholder="Please enter company name" v-model="form.name"/>
                      </div>
                      
                      <div class="company-photo row d-flex order-1 order-lg-2 mb-4">
                        <div class="col-12 col-sm-6 my-auto">

                          <div class="d-flex mb-3">
                            <span class="auth-instruction fs-15 lh-28 mt-1">Company photo</span>
                          </div>

                          <div class="d-flex " @click="(fileUpload! as HTMLInputElement).click()">
                              <img :src="previewCompanyImageURL" class="img wpx-130 hpx-130 rounded-circle cursor-pointer" v-if="previewCompanyImageURL"/>
                              <img src="@/assets/img/no-image.svg" class="img border wpx-130 hpx-130 rounded-circle cursor-pointer" v-else/>
                          </div>
                          
                        </div>

                        <div class="cta col-12 col-sm-6 mt-auto">
                          <div class="d-flex flex-column">
                            <FormButton label="Add company photo" class="cta-btn text-nowrap w-fit-content mt-4 hpx-46" @click.prevent="(fileUpload! as HTMLInputElement).click()"/>
                            <span class="description fs-12 lh-14 gilroy-regular text-red-lt-6 mt-3 text-nowrap">Jpg, png & gif are allowed</span>
                          </div>
                        </div>
                      
                      </div>


                  </div>

                </div>


                <div class="form-right col-12 col-sm-12 col-md-12 col-lg-6">

                  <div class="my-4">
                    <AuthTextInput element-class="auth-element hpx-50" label="Location" placeholder="eg Lagos, Nigeria" v-model="form.description"/>
                  </div>
                  <!-- <div class="mb-4">
                    <AuthTextInput label="How did you hear about us?" placeholder="Please select" v-model="form.how"/>
                  </div> -->

                  <div class="mb-4">
                    <FormLabel
                      label="How did you hear about us?"
                      fieldId="how-you-hear"
                    />
                    <select v-model="form.hear_about_us" class="form-select form-select-lg auth-element" required>
                      <option value="" disabled selected>Please select</option>
                      <option :value="how" v-for="(how, i) in HEAR_ABOUT_US" :key="i">{{ how }}</option>
                    </select>
                
                  </div>

                  <div class="mb-4">
                    <AuthTextInput element-class="auth-element hpx-50" label="Best number to reach you  (For customer support)" placeholder="090912345567" v-model="form.phone_number" acceptNumberOnly/>
                  </div>

                  <div class="">
                    <FormButton label="Save & Continue" class="h-min-50" @click.prevent="handleSubmission"/>
                  </div>

                </div>


            </div>
          </div>

      </div>
      


    </div>

  </div>
</div>


</template>

<script lang="ts" setup>
import {reactive,ref, type Ref} from 'vue'
import {useRouter} from 'vue-router'
import {CompanyDetailsForm} from '../types'
import {storeCompanyDetails} from "../services"
import * as AlertService from '@/services/alert-service'
import {HEAR_ABOUT_US} from '@/globals/const'


const router = useRouter()
let form:CompanyDetailsForm = reactive({
  name:"",
  phone_number:"",
  description:"",
  hear_about_us:"",
  avatar:''
})

const fileUpload = ref(null)
const previewCompanyImageURL:Ref<string | null> = ref(null)
const handleFileUpload = (evt:Event) =>{
  let files = (evt.target as HTMLInputElement)?.files
  if (!files) return;
  form.avatar = files[0]
  previewCompanyImageURL.value = URL.createObjectURL(files[0])
}



 const {
  // isLoading: storingCompanyIsLoading,
  // response: storingCompanyResponse,
  // error: storingCompanyError,
  isSuccessful: storingCompanyIsSuccessful,
  // hasError: storingCompanyHasError,
  execute: executeStoringCompany,
} = storeCompanyDetails(new FormData());

const handleSubmission = ()=>{
  let formData = new FormData();
  formData.append('name',form.name as string)
  formData.append('phone_number',form.phone_number as string)
  formData.append('description',form.description as string)
  formData.append('hear_about_us',form.hear_about_us as string)
  if(form.avatar){
    formData.append('avatar',form.avatar as File)
  }
  executeStoringCompany({ data: formData }).then((res:any)=>{
    if (storingCompanyIsSuccessful.value) {
      AlertService.toast('success','Success',res.message)
      router.push({name:"Subscription.Plans"})
    }
  })
}

</script>


<style lang="scss" scoped>
@import '../style.scss';
  
  select:required:invalid {
    color: #666;
    font-size: 16px;
  }
  option[value=""][disabled] {
    display: none;
  }
  



  .title{
    font-size: 30px;
    line-height: 35px;
    margin-top: 1rem !important;
  }
  .auth-instruction{
    font-size: 15px;
    line-height: 18px;
    margin-top: 1rem !important;
  }

  .authContainer{
    padding: 70px;
  }

  .auth-page{
    margin-top: 4vw;
  }
 
  @media (max-width: 500px){
  .title{
    font-size: 25px;
    line-height: 28px;
    margin-top: .8rem !important;
    text-align: center;
  }
  .auth-instruction{
    font-size: 11px;
    line-height: 15px;
    margin-top: .7rem !important;
    text-align: center;
  }
    .authContainer{
      padding: 10px;
    }

    .cta{
      .description{
        text-align: center;
      }
      &-btn{
        margin-left: auto;
        margin-right: auto;
      }
    }
    .company-photo{
      .img{
        margin-left: auto;
        margin-right: auto;
      }
    }
    .auth-page{
      margin-bottom: 4vw;
    }
  }
 
  @media (min-width: 600px) and (max-width: 900px){
    @media (max-height: 800px) {
      .authContainer{
        padding: 50px;
      }
 
    }

    .cta{
      .description{
        text-align: center;
      }
      &-btn{
        margin-left: auto;
        margin-right: auto;
      }
    }
    .auth-page{
      margin-bottom: 4vw;
    }
  }

 @media (min-width: 910px) and (max-width: 1100px){
      .authContainer{
        padding: 50px 25px;
      }
 }


  @media (min-width: 1024px) {
    .auth-page{
      .page-container{
        height: 100vh;
      }
    }
    .company-name{
      margin-bottom: 1.5rem;
    }

    .form-left{
      padding-right: 3rem;
    }
    .form-right{
      padding-left: 3rem;
      border-left: 1px solid #E6E6E6;
    }
  }

  @media (min-width: 1320px) {
    .authContainer{
      max-width: 1210px;
    }
  }
</style>