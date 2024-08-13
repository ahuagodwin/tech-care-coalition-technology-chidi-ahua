
<template>
    <div class="auth-page container">
      
      <div class="row d-flex align-item-center">
        <div class="authContainer col-sm-12  col-lg-8 col-xl-7 bg-white my-auto mx-auto">
        
            <div class="d-flex flex-column" v-if="showUserAccounts">
              <span class="title gilroy-medium text-black mb-5">Choose or Add another account</span>

              <div class="d-flex flex-column" v-for="(user, i) in userAccounts" :key="i">
                <hr class="mypx-20 bg-yellow-lt-1" v-if="i"/>
                <div class="d-flex cursor-pointer" @click="selectUserAccount(user)">
                  <UserAvatar 
                    class="my-auto"
                    size="104" 
                    :src="user.avatar"
                  />
                  <div class="d-flex flex-column my-auto ms-3">
                    <span class="gilroy-medium fs-20 lh-23 text-blue-dk-1 text-wrap">{{ user.firstName }} {{ user.lastName }}</span>
                    <span class="gilroy-regular fs-16 lh-19 text-blue-lt-2 mt-2 text-wrap">{{ user.email }}</span>
                  </div>
                </div>
              </div>
              <FormButton label="Login to another account" class="mt-4 h-min-50" @click="showLoginForm = true"/>
          

            </div>
          
            <div class="d-flex flex-column" v-else>
              <span class="title text-black">Welcome back 👋🏾</span>
              <span class="auth-instruction">Enter your email and password</span>

              <hr class="mypx-20 authDivider"/>


              <div class="mb-3">
                <AuthTextInput element-class="auth-element hpx-50" required label="Email address" type="email" v-model="form.email" :error-msg="serverError.email?.[0] || v$.email.$errors[0]?.$message"/>
              </div>

              <div class="mb-2">
                <AuthPassword element-class="auth-element hpx-50" required label="Password" v-model="form.password" togglePassword :error-msg="serverError.password?.[0] || v$.password.$errors[0]?.$message"/> 
              </div>

              <a href="/forgot-password"><span class="d-flex justify-content-end text-blue fs-16 lh-19">Forgot password?</span></a>
              <FormButton label="Login" class="mt-4 h-min-50" @click="handleSubmission"/>
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
import {computed,ref, onMounted} from 'vue'
import {useRouter, useRoute} from 'vue-router'
import {login} from '../services'
import {validateLoginForm} from '../validator'
import * as HelperService from '@/services/helper-service'
import * as AlertService from '@/services/alert-service'
import AuthService from '@/services/auth-service'
import {setCurrentUserAccount} from '../helpers'



//User accounts
const showLoginForm = ref(true)
const userAccounts = AuthService.getUserAccounts() || []

const selectUserAccount = (user:any) =>{
  setCurrentUserAccount(user)
  const userRoles = user?.roles || []
  redirectToDashboard(userRoles)
}


// Login
let { form, v$ } = validateLoginForm();
const route = useRoute()
const router = useRouter()

const {
  // isLoading: loginIsLoading,
  error: loginError,
  isSuccessful: loginIsSuccessful,
  execute: executeLogin,
} = login(form);

const handleSubmission = ()=>{
    v$.value.$validate();
    if(v$.value.$invalid) return;
    executeLogin().then((res: any) => {
      if (loginIsSuccessful.value) {
        AlertService.toast('success', 'Success', res.message)
        const userRoles = res?.data?.roles || []
        redirectToDashboard(userRoles)
      }
    })
 }

const serverError = computed(() => {
  return HelperService.getObjectProperty(loginError, "value.errors", {});
});

const redirectToDashboard = (userRoles: any[]) => {
  if (userRoles.includes('client')) { 
    router.push({ name: "Clients.Dashboard" })
  }
  if (userRoles.includes('affiliate')) { 
    router.push({ name: "Affiliate.Dashboard" })
  }
  if (userRoles.includes('admin')) { 
    router.push({ name: "Spark.Admin.Overview" })
  }
}


const isChoosingAccountRoute = computed(() => route.name == 'Auth.Login.ChooseAccount')
const showUserAccounts = computed(() => {
  return isChoosingAccountRoute.value 
    && userAccounts.length
    && !showLoginForm.value
})

onMounted(() => {
  if (isChoosingAccountRoute.value) {
    showLoginForm.value = false
  }
})
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