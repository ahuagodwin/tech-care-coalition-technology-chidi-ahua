
<template>

  <div class="auth-page container">
    <div class="row d-flex align-item-center">
      <div class="authContainer col-sm-12  col-lg-8 col-xl-7 bg-white my-auto mx-auto">
        
        <div class="d-flex flex-column">
            <span class="title text-black">Reset Password</span>
            <span class="auth-instruction">Enter your new Password</span>

            <hr class="mypx-20 authDivider"/>


            <div class="mb-3">
              <AuthPassword element-class="auth-element hpx-50" required label="Password" v-model="form.password" togglePassword :error-msg="serverError.password?.[0] || v$.password.$errors[0]?.$message"/> 
            
            </div>
            <div class="mb-2">
              <AuthPassword element-class="auth-element hpx-50" required label="Confirm Password" v-model="form.password_confirmation" togglePassword :error-msg="serverError.password_confirmation?.[0] || v$.password_confirmation.$errors[0]?.$message"/> 
            </div>
            

              <FormButton label="Reset Password" class="mt-3 h-min-50" @click="handleSubmission"/>

              <div class="d-inline-block mt-5 ps-4 ms-2">
                <span class="autLinkText gilroy-regular me-2 my-auto">Remember your password?</span>
                <a href="/login"><span class="my-auto text-blue fs-15 lh-19 fw-bold">Login in</span></a>
              </div>

          </div>


      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {computed} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {validateResetPasswordForm} from '../validator'
import {resetPassword} from '../services'
import * as HelperService from '@/services/helper-service'
import * as AlertService from '@/services/alert-service'


const route = useRoute()
const router = useRouter()

let { form, v$ } = validateResetPasswordForm();

form.email = (route.params.email || route.query?.email)  as string;
form.token = route.params.token as string;

const {
  //isLoading: resetPasswordIsLoading,
  error: resetPasswordError,
  isSuccessful: resetPasswordIsSuccessful,
  execute: executeResetPassword,
} = resetPassword(form);

 const handleSubmission = ()=>{
    v$.value.$validate();
    if(v$.value.$invalid) return;
    executeResetPassword().then((res: any) => {
      if (resetPasswordIsSuccessful.value) {
        AlertService.toast('success','Success',res.message)
        router.push({name:"Auth.Login"})
      }
    })
 }
const serverError = computed(() => {
  return HelperService.getObjectProperty(resetPasswordError, "value.errors", {});
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
    padding: 100px 70px;
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
      padding: 50px 10px;
      max-width: 330px;
    }
  }
 
  @media (min-width: 600px) and (max-width: 900px){
    @media (max-height: 800px) {
      .authContainer{
        padding: 80px 50px;
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