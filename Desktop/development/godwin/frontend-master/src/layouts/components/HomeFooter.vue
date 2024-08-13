<template>

    <footer class="spa-footer container-fluid py-4 py-md-3 py-sm-1 pt-3 bg-blue-dk-1 position-relative">
      <div class="container py-4 py-md-5 text-white">
        <div class="curved-bg position-absolute bottom-0 start-0 w-100 z-1"></div>
        <div class="row z-1 position-relative">
          <div class="col-lg-5 mb-5">
            <div class="d-flex mb-2">
                <span class="my-auto wpx-31 hpx-31 perfect-center rounded-px-8 bg-white me-2">
                    <img src="@/assets/img/home/spark.svg" alt=""/>
                </span>
                <router-link to="/" class="my-auto">
                    <img src="@/assets/img/white-logo.svg" style="width: 100%; max-width: 70px; height: auto;"  />
                </router-link>
            </div>
            <div class="fs-16 lh-19 gilroy-regular mb-5 my-auto">+234 815 3071 028</div>

            <div class="getApp position-relative">
                <div class="gilroy-regular fs-16 lh-19 mt-2 mbpx-10">Get Spark for mobile and desktop</div>
                <div class="d-flex flex-wrap wpx-350">
                    <img src="@/assets/img/home/google-play.svg" alt="" class="wpx-121 hpx-36 me-2 mb-1"/>
                    <img src="@/assets/img/home/apple-store.svg" alt="" class="wpx-121 hpx-36 me-2 mb-1"/>
                    <img src="@/assets/img/home/windows.svg" alt="" class="wpx-121 hpx-36 me-2 mb-1"/>
                    <img src="@/assets/img/home/mac.svg" alt="" class="wpx-121 hpx-36 me-2 mb-1"/>
                </div>
            </div>
          </div>
          <div class="col-xs-12 col-sm-4 col-md-4 col-lg-2 offset-lg-1 mb-3">
            <div class="gilroy-bold fs-25 lh-29 mb-2">Company</div>
            <ul class="list-unstyled">
              <li class="mb-1"><router-link to="#" class="fs-15 lh-19 gilroy-regular">About</router-link></li>
              <li class="mb-1"><router-link to="#" class="fs-15 lh-19 gilroy-regular">Career</router-link></li>
              <li class="mb-1"><router-link to="#" class="fs-15 lh-19 gilroy-regular" @click.prevent="callModal = true">Book a call</router-link></li>
              <li class="mb-1"><router-link to="#" class="fs-15 lh-19 gilroy-regular">Become an affiliate</router-link></li>
            </ul>
          </div>
          <div class="col-xs-12 col-sm-4 col-md-4 col-lg-2 mb-3">
            <div class="gilroy-bold fs-25 lh-29 mb-2">Services</div>
            <ul class="list-unstyled">
              <li class="mb-1"><router-link to="/works" class="fs-15 lh-19 gilroy-regular">Our works</router-link></li>
              <li class="mb-1"><router-link to="/pricing" class="fs-15 lh-19 gilroy-regular">Pricing</router-link></li>
              <li class="mb-1"><router-link to="#" class="fs-15 lh-19 gilroy-regular">Blog</router-link></li>
              <li class="mb-1"><router-link to="#" class="fs-15 lh-19 gilroy-regular">Faq</router-link></li>
            </ul>
          </div>
          <div class="col-xs-12 col-sm-4 col-md-4 col-lg-2 mb-3">
            <div class="gilroy-bold fs-25 lh-29 mb-2">Legal</div>
            <ul class="list-unstyled">
              <li class="mb-1"><router-link to="/terms-of-service" class="fs-15 lh-19 gilroy-regular">Terms of service</router-link></li>
              <li class="mb-1"><router-link to="/privacy-policy" class="fs-15 lh-19 gilroy-regular">Privacy policy</router-link></li>
            </ul>

            <div class="d-flex my-auto mt-4">
                <div class="my-auto me-2 cursor-pointer wpx-35 hpx-35 d-flex border-white justify-content-center align-items-center">
                    <img src="@/assets/img/home-icons/facebook.svg" alt=""/>
                </div>
                <div class="my-auto me-2 cursor-pointer wpx-35 hpx-35 d-flex border-white justify-content-center align-items-center">
                    <img src="@/assets/img/home-icons/instagram.svg" alt=""/>
                </div>
                <div class="my-auto me-2 cursor-pointer wpx-35 hpx-35 d-flex border-white justify-content-center align-items-center">
                    <img src="@/assets/img/home-icons/twitter.svg" alt=""/>
                </div>
                <div class="my-auto me-2 cursor-pointer wpx-35 hpx-35 d-flex border-white justify-content-center align-items-center">
                    <img src="@/assets/img/home-icons/linkedin.svg" alt=""/>
                </div>
            </div>
          </div>
        </div>
      </div>

        <BookACall :openCallModal="callModal" @modal:closed="callModal = false"/>
    </footer>

    <footer class="spa-footer container-fluid bg-red-dk-1 hpx-80 d-flex align-items-center">
        <div class="copyright fs-18 lh-20 gilroy-regular text-white">©2022 Spark Creative Studio Limited.  All rights reserved</div>
    </footer>
</template>


<script lang="ts" setup>
    import { ref } from 'vue'
    import BookACall from './BookACall.vue'

    const callModal = ref(false);

</script>


<style lang="scss" scoped>
    .curved-bg{
        background-image: url(@/assets/img/home/footer-curved.svg);
        background-repeat: no-repeat;
        background-size: contain;
    }
    .spa-footer{
        a{
            color: var(--spa-white);
            text-decoration: none;
        }
    }

    @media (max-width: 576px) { 
        .curved-bg{
            height: 90px;
        }
     }

     
    @media (min-width: 576px) and (max-width: 768px) { 
        .curved-bg{
            height: 150px;
        }
    }

    @media (min-width: 769px) and (max-width: 1024px) { 
        .curved-bg{
            height: 200px;
        }
    }


    @media (max-width: 800px) { 
        .spa-footer:has(> .copyright){
            justify-content: center;
        }
        .copyright{
            text-align: center;
        }
    }

    @media (min-width: 1200px) { 
        .curved-bg{
            height: 220px;
        }

        .spa-footer{
            padding-left: 150px;
            padding-right: 150px;
        }
     }

</style>