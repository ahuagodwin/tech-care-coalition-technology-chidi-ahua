
<template>
      <div class="auth-page container">
      
        <div class="row d-flex align-item-center">
          <div class="authContainer col-sm-12  col-lg-8 col-xl-7 bg-white my-auto mx-auto">

                <div class="d-flex flex-column">
                <span class="title text-black">Forgot Password?</span>
                <span class="auth-instruction">Please enter your  email address. You will receive a link to create a new password via email.</span>

                <hr class="mypx-20 authDivider"/>


                <div class="mb-3">
                  <AuthTextInput element-class="auth-element hpx-50" required label="Email address" type="email" v-model="form.email" :error-msg="serverError.email?.[0] || v$.email.$errors[0]?.$message"/>
                </div>
              
                <FormButton label="Reset Password" class="my-4 h-min-50" @click.prevent="handleSubmission"/>
                <FormButton label="Go back to login" class="mt-4 h-min-50" buttonType='outline' @click="goBackToLogin"/>

                <AuthSocialLogin/>

                <div class="d-inline-block mt-4 ps-4 ms-2">
                  <span class="autLinkText gilroy-regular me-2 my-auto">Don't have an account?</span>
                  <a href="/register"><span class="my-auto text-blue fs-15 lh-19 fw-bold">Sign Up</span></a>
                </div>

              </div>

            </div>

        </div>

      </div>
      
</template>

<script lang="ts" setup>
import {computed} from 'vue'
import {useRouter} from 'vue-router'
import {forgotPasswordForm} from '../validator'
import {requestForPasswordReset} from '../services'
import * as HelperService from '@/services/helper-service'
import * as AlertService from '@/services/alert-service'


let { form, v$ } = forgotPasswordForm();
const router = useRouter()


const {
  // isLoading: requestForPasswordResetIsLoading,
  error: requestForPasswordResetError,
  isSuccessful: requestForPasswordResetIsSuccessful,
  execute: executeRequestForPasswordReset,
} = requestForPasswordReset(form);

const handleSubmission = ()=>{
  v$.value.$validate();
  if(v$.value.$invalid) return;
  executeRequestForPasswordReset().then(() => {
    if (requestForPasswordResetIsSuccessful.value) {
      AlertService.fire({
        confirmButtonText: 'Go back to login',
        customClass: {
          confirmButton: 'btn bg-blue border border-0',
        },
        allowOutsideClick:false,
        html:`<div class="d-flex flex-column">
            <div class="icon d-flex wpx-112 hpx-112 border border-black rounded-circle mx-auto mt-4">
              <span class="material-icons fw-100 text-black my-auto mx-auto fs-55">
                check
              </span>
            </div>
            <div class="message fs-18 lh-21 mx-auto mt-3 px-4 gilroy-regular text-color-red-dk-2">
              A password reset email has been sent to your email address. Please wait at least 10 minutes before attempting another reset.
            </div>
          </div>`
      }).then(()=>{
        goBackToLogin()
      })
    }
  })
 }

 const goBackToLogin = ()=>router.push({name:"Auth.Login"})

const serverError = computed(() => {
  return HelperService.getObjectProperty(requestForPasswordResetError, "value.errors", {});
});

</script>


<style lang="scss" scoped>
@import '../style.scss';


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
    max-width: 520px;
  }

  .auth-page{
    padding-right: calc(var(--bs-gutter-x) * 0.5);
    padding-left: calc(var(--bs-gutter-x) * 0.5);
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
      padding: 20px;
      max-width: 330px;
    }
  }
 
  @media (min-width: 600px) and (max-width: 900px){
    @media (max-height: 800px) {
      .authContainer{
        padding: 50px;
      }
 
    }
  }


  @media (min-width: 1024px) {
    .auth-page{
      .row{
        height: 100vh;
      }
    }
  }
</style>