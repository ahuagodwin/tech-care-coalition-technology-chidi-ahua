<template>
    <div class="position-relative">
        <img src="@/assets/img/auth/auth-top-right.svg" class="topImage position-fixed top-0 end-0" />
        <img src="@/assets/img/auth/auth-bottom-left.svg" class="bottomImage position-fixed bottom-0 start-0" />



        <div class="watch-demo">
            <div class="container">
                <div class="row">
                    <div class="col-12 col-sm-12 col-md-6">
                        <div class="title gilroy-medium text-blue mb-3">
                            Using Spark is like having your own in-house design team but better.
                        </div>
                        <div class="description gilroy-regular text-blue-dk-1">
                            Spark gives you all the good stuff that come with having your own in-house designer and with the added benefits that come from working with a professional design agency. Say GOODBYE to hiring cost and HR dramas. Fixed monthly rate for all your design needs and you can cancel anytime.
                        </div>
                    </div>
                    <div class="col-12 col-sm-12 col-md-6">
                        <div class="container">
                            <div class="form row bg-secondary-lt-5 rounded-px-20">

                                <div class="col-12 col-sm-12 mb-3">
                                    <AuthTextInput 
                                        element-class="auth-element bg-transparent hpx-50 rounded-0" 
                                        placeholder="Name" 
                                        v-model="form.full_name"
                                        :error-msg="serverError.full_name?.[0] || v$.full_name.$errors[0]?.$message"
                                    />
                                </div>

                                <div class="col-12 col-sm-12 mb-3">
                                    <AuthTextInput 
                                        element-class="auth-element bg-transparent hpx-50 rounded-0" 
                                        placeholder="Email Address" 
                                        v-model="form.email"
                                        :error-msg="serverError.email?.[0] || v$.email.$errors[0]?.$message"
                                    />
                                </div>

                                <div class="col-12 col-sm-12 mb-3"> 
                                    <AuthTextInput 
                                        element-class="auth-element bg-transparent hpx-50 rounded-0" 
                                        placeholder="Phone number" 
                                        v-model="form.mobile_no"
                                        :error-msg="serverError.mobile_no?.[0] || v$.mobile_no.$errors[0]?.$message"
                                    />
                                </div>

                                <div class="col-12 col-sm-12 mb-3"> 
                                    <AuthTextInput 
                                        element-class="auth-element bg-transparent hpx-50 rounded-0" 
                                        placeholder="How did you hear about us" 
                                        v-model="form.hear_about_us"
                                        :error-msg="serverError.hear_about_us?.[0] || v$.hear_about_us.$errors[0]?.$message"
                                    />
                                </div>

                                <div class="col-12 col-sm-12 mb-3">
                                    <FormButton label="Watch now" class="hpx-40 rounded-0 w-100" @click="handleSubmission"/>
                                    <div class="fs-12 lh-14 gilroy-regular text-secondary-lt-4 mt-3 text-center">You'll be automatically be redirected</div>
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
    import { computed } from 'vue'
    import {validateRequestDemoForm} from '../validator'
    import { requestDemo } from '../services'
    import * as AlertService from "@/services/alert-service"
    import * as HelperService from "@/services/helper-service"

    let { form, v$ } = validateRequestDemoForm();

    const {
        isLoading: requestDemoIsLoading,
        error: requestDemoError,
        isSuccessful: requestDemoIsSuccessful,
        execute: executeRequestDemo,
    } = requestDemo(form.value);

    const handleSubmission = ()=>{
        v$.value.$validate();
        if(v$.value.$invalid) return;
        executeRequestDemo().then((res: any) => {
        if (requestDemoIsSuccessful.value) {
            AlertService.toast('success','Success',res.message)
        }
        })
    }

    const serverError = computed(() => {
        return HelperService.getObjectProperty(requestDemoError, "value.errors", {});
    });

</script>


<style lang="scss" scoped>

.topImage, .bottomImage{
    z-index: -1;
} 

    @media (max-width: 660px) {   
        .title {
            font-size: 20px;
            line-height: 23px;
            padding-left: 10px;
            padding-right: 10px;
            margin-bottom: 20px;
        }
        .description{
            font-size: 11px;
            line-height: 15px;
            padding-left: 10px;
            padding-right: 10px;
            margin-bottom: 50px;
        } 
        .watch-demo{
            padding-top: 30px;
            padding-bottom: 30px;
        }
    }

    @media (min-width: 610px) {   
        .title {
            font-size: 30px;
            line-height: 43px;
        }
        .description{
            font-size: 15px;
            line-height: 18px;
        } 
        .watch-demo{
            padding-top: 70px;
            padding-bottom: 70px;
        }
    }

    @media (min-width: 1024px) {  
        .title {
            font-size: 40px;
            line-height: 48px;
        }
        .description{
            font-size: 18px;
            line-height: 21px;
        }
        .watch-demo{
            padding-top: 100px;
            padding-bottom: 100px;
        }
    }

    @media (min-width: 1200px) {  
        .title {
            font-size: 45px;
            line-height: 53px;
        }
        .description{
            font-size: 20px;
            line-height: 23px;
        }
        .watch-demo{
            padding: 150px 150px;
        }
    }

</style>