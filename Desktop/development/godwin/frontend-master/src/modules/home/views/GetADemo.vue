<template>
    <div>
        <HeroHead>
            <div class="demo-page">
                <div class="container">
                    <div class="row">

                        <div class="col-lg-12 pt-5 pt-lg-0 d-flex flex-column justify-content-center">
                            <div class="title fw-bold gilroy-medium mb-3 text-blue-dk-1 text-uppercase text-center">How would you like to explore Spark?</div>
                        </div>

                    </div>
                </div>
            </div>
        </HeroHead>

        <div class="demo-page boxes">
            <div class="container">
                <div class="row g-4">
                    <div class="col-12 col-sm-12 col-md-6">
                        <div class="d-flex flex-column pxpx-50 pypx-65 bg-white w-100 h-100 rounded-px-25 me-5">
                            <span class="fs-13 lh-16 gilroy-regular mb-2">View it yourself with a</span>
                            <span class="fs-20 lh-23 gilroy-medium mb-2">Video Demo</span>
                            <span class="fs-13 lh-16 gilroy-regular mb-5">Checkout out how Spark works on your own with our 5-minute demo video.</span>
                            <router-link 
                                to="/watch-demo-form" 
                                class="perfect-center text-white text-decoration-none fs-15 lh-19 bg-blue gilroy-bold text-white wpx-200 hpx-42 px-3 rounded-px-10"
                            >Watch a demo
                            </router-link>
                        </div>
                    </div>
                    <div class="col-12 col-sm-12 col-md-6">
                        <div class="d-flex flex-column pxpx-50 pypx-65 bg-blue w-100 h-100 rounded-px-25 text-white">
                            <span class="fs-13 lh-16 gilroy-regular mb-2">Have some talk with you through a</span>
                            <span class="fs-20 lh-23 gilroy-medium mb-2">Personalized tour</span>
                            <span class="fs-13 lh-16 gilroy-regular mb-5">We'll show you around Spark app, and answer any questions you may have</span>
                            <FormButton label="Book a call" variant="yellow" class="wpx-200 hpx-42 px-3 rounded-px-10" @click="router.push({ name: 'Home.Booking' })"/>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <BrandComponent />
        <ReadyDemo />
    </div>
</template>

<script lang="ts" setup>
    import BrandComponent from './components/BrandComponent.vue'
    import ReadyDemo from './components/ReadyDemo.vue'
    import { useRouter } from 'vue-router';

    const router = useRouter()
    
</script>

<style lang="scss" scoped>
.title {
    font-size: calc(2rem + .3vw);
}

@media (min-width: 750px) {
    .boxes {
        margin-top: -100px;
    }
}

@media (min-width: 1024px) {
    .boxes {
        margin-top: -150px;
    }
    .title {
        font-size: calc(3.75rem + .3vw);
    }
}



@media (max-width: 1024px) {
    .demo-page {
        padding-top: 60px;
        padding-bottom: 90px;
    }
}

@media (max-width: 500px) {

    .title{
        text-align: center;
    }

    .demo-page {
        padding-top: 30px;
        padding-bottom: 90px;
    }
}

@media (min-width: 1200px) {
    .demo-page {
        padding: 100px 150px
    }
}
</style>