
<template>
  
      <div class="auth-page container">
        <div class="row d-flex align-item-center">
          <div class="authContainer col-sm-12  col-lg-8 col-xl-7 bg-white my-auto mx-auto">
              
            <div class="d-flex flex-column">
                <span class="title text-black">Complete Your Profile!</span>
                <span class="auth-instruction">Please confirm your email address</span>

                <hr class="mypx-20 authDivider"/>


                <div class="mb-3">

                  <AuthTextInput 
                    element-class="auth-element hpx-50"
                    maxlength="8" 
                    :showCheckIcon="form.code.length == 8" 
                    required 
                    label="Enter OTP code sent to your email" 
                    v-model="form.code" acceptNumberOnly
                    :error-msg="serverError.code?.[0] || v$.code.$errors[0]?.$message"
                  />
                  
                </div>
              
                <FormButton :label='verificationIsLoading ? "loading" : "Next" ' class="mt-5 h-min-50" @click="handleSubmission"/>
      

                <div class="d-inline-block mt-4 fs-14 lh-18 fw-300 justify-content-center">
                  <span class="otpText gilroy-regular my-auto me-2">Didn't get OTP?</span>
                  <a href="#"><span class="my-auto text-blue" @click="executeResendOTP">{{resendOTPIsLoading ? "sending..." : "Resend"}}</span></a>
                </div>

              </div>


          </div>
        </div>
      </div>

</template>

<script lang="ts" setup>
import {computed} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {validateVerificationForm} from '../validator'
import {verifyEmail,resendOTP} from '../services'
import * as HelperService from '@/services/helper-service'
import * as AlertService from '@/services/alert-service'

const route = useRoute()

let affiliate = route.params.role;

let { form, v$ } = validateVerificationForm();

// Ensuring `affiliate` is a string
if (Array.isArray(affiliate)) {
  affiliate = affiliate[0];
}
// form.usertype = affiliate || "client";
form.usertype = (affiliate ? affiliate : "client");

 const {
  isLoading: verificationIsLoading,
  error: verificationError,
  isSuccessful: verificationIsSuccessful,
  execute: executeVerification,
} = verifyEmail(form);

 const {
  isLoading: resendOTPIsLoading,
  execute: executeResendOTP,
} = resendOTP();

const router = useRouter()

 const handleSubmission = ()=>{
    v$.value.$validate();
    if(v$.value.$invalid) return;
    executeVerification().then((res: any) => {
      if (verificationIsSuccessful.value) {
        AlertService.toast('success','Success',res.message)
        if (form.usertype === 'affiliate') {
        router.push({ name: `Auth.Login` });
      } else {
        router.push({name:"Auth.Company.Profile"})
      }
      }
    })
 }
const serverError = computed(() => {
  return HelperService.getObjectProperty(verificationError, "value.errors", {});
});


</script>


<style lang="scss" scoped>
@import '../style.scss';
  .otpText{
    font-style: normal;
    color:#8692A6
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
    padding: 150px 70px;
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
      padding: 60px 10px;
      max-width: 330px;
    }
  }
 
  @media (min-width: 600px) and (max-width: 900px){
    @media (max-height: 800px) {
      .authContainer{
        padding: 100px 50px;
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