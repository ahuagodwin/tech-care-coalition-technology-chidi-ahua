<template>
    <div class="brand bg-secondary-lt-5 mt-5 animate__animated animate__fadeInUp animate__delay-3s animate__slower ">
        <div class="container">
            <div class="title mx-auto mb-3 text-center">Brands That Trust Our Work</div>

            <div class="row no-gutters clearfix z-1 position-relative">

              <div class="col-lg-3 col-md-4 col-sm-6 my-auto mx-auto" v-for="(brand, i) in brands" :key="i">
                <div class="brand-logo">
                  <img :src="brand.fade" class="img-fluid" alt="" @mouseover="mouseover($event, brand)" @mouseout="mouseout($event, brand)">
                </div>
              </div>

            </div>

        </div>

    </div>
</template>

<script setup lang="ts">
import 'animate.css';

    const brands = [
        {fade: require("@/assets/img/home/brands/googlepay-fade.svg"), hover: require("@/assets/img/home/brands/googlepay-hover.svg")},
        {fade: require("@/assets/img/home/brands/orange-fade.svg"), hover: require("@/assets/img/home/brands/orange-hover.svg")},
        {fade: require("@/assets/img/home/brands/amani-fade.svg"), hover: require("@/assets/img/home/brands/amani-hover.svg")},
        {fade: require("@/assets/img/home/brands/r-fade.svg"), hover: require("@/assets/img/home/brands/r-hover.svg")},
        {fade: require("@/assets/img/home/brands/buildbay-fade.svg"), hover: require("@/assets/img/home/brands/buildbay-hover.svg")},
        {fade: require("@/assets/img/home/brands/bfree-fade.svg"), hover: require("@/assets/img/home/brands/bfree-hover.svg")},
        {fade: require("@/assets/img/home/brands/e-fade.svg"), hover: require("@/assets/img/home/brands/e-hover.svg")},
        {fade: require("@/assets/img/home/brands/you-fade.svg"), hover: require("@/assets/img/home/brands/you-hover.svg")},
    ]

    const mouseover = (evt: Event, brand:any) => {
        const el = evt.target as HTMLImageElement;
        el.setAttribute('src', brand.hover);
    }
    const mouseout = (evt: Event, brand:any) => {
        const el = evt.target as HTMLImageElement;
        el.setAttribute('src', brand.fade);
    }

</script>

<style lang="scss" scoped>
    .title{
        font-size: 60px;
        font-family: gilroy-medium;
    }
    .brand-logo {
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        // height: 120px;
        padding: 40px;
        cursor: pointer;
    }



    @media (max-width: 500px) {
        .title{
            font-size: 30px;
            font-family: gilroy-bold;
        }
    }

    @media (min-width: 1200px) {
        .brand {
            padding: 70px 150px
        }
    }
</style>