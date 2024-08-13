<template>
    <div>
        <HeroHead>
            <div class="demo-page">
                <div class="container">
                    <div class="row">

                        <div class="col-lg-12 pt-5 pt-lg-0 d-flex flex-column justify-content-center">
                            <div class="title fw-bold gilroy-medium mb-3 text-blue-dk-1 text-uppercase text-center">How
                                would you like to explore Spark?</div>
                        </div>

                    </div>
                </div>
            </div>
        </HeroHead>

        <div class="tidal my-3">
            <div class="tidycal-embed" data-path="spark/demo"></div>
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

@media (min-width: 1024px) {

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

    .title,
    .details {
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
}</style>