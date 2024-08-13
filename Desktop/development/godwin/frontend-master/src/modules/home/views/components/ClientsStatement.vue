<template>
    <div class="client-statement my-5 animate__animated animate__fadeInUp animate__delay-4s animate__slower">
        <div class="container">
            <div class="title mx-auto mb-3 text-center">What Our Clients Say About Us</div>

            <div class="d-flex flex-column py-4 my-5 position-relative">
        <div class="ps-sm-4 position-relative">
            <div class="position-relative z-1">
            <Carousel :wrap-around="true" :breakpoints="breakpoints" :autoplay="5000">
            
                <Slide v-for="slide in slides" :key="slide.id">
                        <div class="carousel__item w-100">
                        
                            <div class="me-3 bg-blue-lt-9 rounded-px-20 p-5">

                                <div class="d-flex flex-column">
                                    <div class="d-flex justify-content-between mb-4">
                                        <div class="d-flex mb-auto">
                                            <UserAvatar 
                                                class="my-auto"
                                                size="47" 
                                                :src="slide?.user?.avatar"
                                            />
                                            <div class="d-flex flex-column ms-3">
                                                <span class="gilroy-medium fs-20 lh-23 mb-2">{{ slide?.name }}</span>
                                                <span class="gilroy-regular fs-13 lh-15 text-start">{{ slide?.position }}</span>
                                            </div>
                                        </div>
                                        <i class="material-icons-outlined mb-auto">format_quote</i>
                                    </div>
                                    <div class="gilroy-medium fs-20 lh-23 text-start mt-3 hpx-100 overflow-scroll">
                                        {{ slide?.comment }}
                                    </div>
                                </div>

                            </div>

                        </div>
                    </Slide>
                <template #addons>
                    <!-- <Navigation /> -->
                    <Pagination />
                </template>
            </Carousel>
            </div>
            <img src="@/assets/img/home/our-clients.svg" alt="" class="our-client position-absolute"/>
        </div>
        </div>

        </div>
    </div>
</template>


<script lang="ts" setup>
    import 'vue3-carousel/dist/carousel.css'
    import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

    interface SlideProp {
        id:number;
        name:string;
        position:string;
        comment:string;
        user?:any;
    }
    //eslint-disable-next-line
    const props = defineProps<{slides: SlideProp[]}>()

    // const slidess: SlideProp = [
    //     {id: 1, name: "Adeola Oladele", position: "Permanent Secretary", comment: "This is my comments This is my comments This is my comments This is my comments This is my comments This is my comments This is my comments"},
    //     {id: 1, name: "Adeola Oladele", position: "Permanent Secretary", comment: "This is my comments This is my comments This is my comments This is my comments This is my comments This is my comments This is my comments"},
    //     {id: 1, name: "Adeola Oladele", position: "Permanent Secretary", comment: "This is my comments This is my comments This is my comments This is my comments This is my comments This is my comments This is my comments"},
    //     {id: 1, name: "Adeola Oladele", position: "Permanent Secretary", comment: "This is my comments This is my comments This is my comments This is my comments This is my comments This is my comments This is my comments"},
    //     {id: 1, name: "Adeola Oladele", position: "Permanent Secretary", comment: "This is my comments This is my comments This is my comments This is my comments This is my comments This is my comments This is my comments"},
    //     {id: 1, name: "Adeola Oladele", position: "Permanent Secretary", comment: "This is my comments This is my comments This is my comments This is my comments This is my comments This is my comments This is my comments"},
    //     {id: 1, name: "Adeola Oladele", position: "Permanent Secretary", comment: "This is my comments This is my comments This is my comments This is my comments This is my comments This is my comments This is my comments"},
    // ];

    const breakpoints = {
        // 700px and up
        700: {
            itemsToShow: 2,
            snapAlign: 'center',
        },
        // 1024 and up
        1024: {
            itemsToShow: 2,
            snapAlign: 'start',
        },
    }
</script>


<style lang="scss" scoped>
    .our-client{
        top: -100px;
    }
    ::v-deep(.carousel__pagination-button){
        &:after{
            margin-top: 3rem;
            width: 12px;
            height: 12px;
            border: 2px solid #1227E2;
            border-radius: 50%;
            background:transparent;
        }
        &.carousel__pagination-button--active{
            &:after{
                background:#1227E2;
            }
        }
    }

    .title{
        font-size: 60px;
        font-family: gilroy-medium;
    }

    @media (max-width: 500px) {
        .title{
            font-size: 30px;
            font-family: gilroy-bold;
        }
    }

    @media (min-width: 1200px) {
        .client-statement {
            padding: 70px 150px
        }
    }
</style>