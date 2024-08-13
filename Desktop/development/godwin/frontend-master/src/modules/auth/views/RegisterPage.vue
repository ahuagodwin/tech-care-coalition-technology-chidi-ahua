
<template>
  <div class="auth-page container">
      
        <div class="row d-flex align-item-center">

            <div class="authContainer col-sm-12  col-lg-8 col-xl-7 bg-white my-auto mx-auto">

                <div class="d-flex flex-column">
                  <span class="title text-black">Create an account</span>
                  <span class="auth-instruction">Kindly input your details</span>

                  <hr class="mypx-15 authDivider"/>


                  <div class="d-flex mb-2">
                    <div class="col-6 pe-1">
                      <AuthTextInput 
                        element-class="auth-element hpx-45"
                        required label="Your first name" 
                        v-model="form.first_name" 
                        :error-msg="serverError.first_name?.[0] || v$.first_name.$errors[0]?.$message"
                      />
                    </div>
                    <div class="col-6 ps-1">
                      <AuthTextInput element-class="auth-element hpx-45" required label="Your last name" v-model="form.last_name" :error-msg="serverError.last_name?.[0] || v$.last_name.$errors[0]?.$message" />
                    </div>

                  </div>

                  <div class="mb-2">
                    <AuthTextInput element-class="auth-element hpx-45" required label="Email address" type='email' v-model="form.email" :error-msg="serverError.email?.[0] || v$.email.$errors[0]?.$message"/>
                  </div>

                  <div class="mb-2">
                    <AuthPassword element-class="auth-element hpx-45" required label="Password" v-model="form.password" togglePassword :error-msg="serverError.password?.[0] || v$.password.$errors[0]?.$message"/> 
                  </div>

                  <div class="d-inline-block fs-11 lh-13 text-blue-lt-2 gilroy-medium my-2">
                    By clicking “Next”, you agree to Spark's <router-link to="/terms-of-service" class="mx-1 text-blue fs-11 lh-13">Terms of service</router-link> and <router-link to="/privacy-policy" class="ms-1 text-blue fs-11 lh-13">Privacy policy.</router-link>
                  </div>

                  <FormButton :label='registrationIsLoading ? "loading" : "Next"' class="mt-3 h-min-50"  @click="handleSubmission"/>
                  <AuthSocialLogin/>

                  <div class="d-inline-block mt-4 ps-4 ms-2">
                    <span class="autLinkText gilroy-regular me-2 my-auto">Already have an account?</span>
                    <a href="/login"><span class="my-auto text-blue fs-15 lh-19 fw-bold">Sign in</span></a>
                  </div>

              </div>

            </div>

          </div>

  </div>
  
</template>

<script lang="ts" setup>
import {computed } from 'vue'
import {useRouter, useRoute } from 'vue-router'
import {validateRegistrationForm} from '../validator'
import {register} from '../services'
import * as HelperService from '@/services/helper-service'
import * as AlertService from '@/services/alert-service'

 const router = useRouter()
 const route = useRoute()

let affiliate = route.params.role;

let { form, v$ } = validateRegistrationForm();

// Ensuring `affiliate` is a string
if (Array.isArray(affiliate)) {
  affiliate = affiliate[0];
}

// form.usertype = affiliate || "client";
form.usertype = (affiliate ? affiliate : "client");

 const {
  isLoading: registrationIsLoading,
  // response: registrationResponse,
  error: registrationError,
  isSuccessful: registrationIsSuccessful,
  // hasError: registrationHasError,
  execute: executeRegistration,
} = register(form);

 const handleSubmission = ()=>{
    v$.value.$validate();
    if(v$.value.$invalid) return;
    executeRegistration().then((res: any) => {
      if (registrationIsSuccessful.value) {
        AlertService.toast('success','Success',res.message)
        // router.push({path:`/email-verification/${affiliate}`})
        if (form.usertype === 'affiliate') {
        router.push({ path: `/email-verification/${affiliate}` });
      } else {
        router.push({ name: "Auth.Email.Verification" });
      }
      }
    })
 }
const serverError = computed(() => {
  return HelperService.getObjectProperty(registrationError, "value.errors", {});
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
    padding: 50px;
    max-width: 520px;
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
        padding: 30px;
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