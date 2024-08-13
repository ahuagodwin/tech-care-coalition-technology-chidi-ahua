<template>
    <div>
        <HeroHead>
            <div class="work-page">
                <div class="container">
                    <div class="row">

                        <div class="col-lg-12 pt-5 pt-lg-0 d-flex flex-column justify-content-center">
                            <div class="title fw-bold gilroy-medium mb-3 text-blue-dk-1 text-uppercase">Works</div>
                            <div class="details gilroy-regular lead-text text-blue-dk-1">We design for a wide range of clients. If you can imagine it, we can design it</div>
                        </div>

                    </div>
                </div>
            </div>
        </HeroHead>
        <OurWorkImages :portfolio="portfolio" />
        <!-- <OurWorkImagesMock  class="pypx-70 pxpx-150"/> -->
        <BrandComponent />
        <ReadyDemo />
    </div>
</template>


<script lang="ts" setup>
    import OurWorkImages from './components/OurWorkImages.vue'
    import OurWorkImagesMock from './components/OurWorkImagesMock.vue'
    import BrandComponent from './components/BrandComponent.vue'
    import ReadyDemo from './components/ReadyDemo.vue'
    import {getPortfolio} from '../services'
    import {ref, onMounted} from 'vue'
    import useGlobals from "@/globals/composables"

    const {apiBaseUrl} = useGlobals()

    const portfolio = ref({} as any)

    const {
        isLoading: portfolioDataIsLoading,
        execute: executeGetPortfolioData,
    } = getPortfolio();

    onMounted(()=>{
        executeGetPortfolioData().then((res:any)=>{
            let categories = res.data.map((res:any)=>{
                const tag = res.name.toLowerCase().replaceAll(' ', '-')
                return {id: res.id, name:res.name, tag:tag}
            })
            let images:any[] = []
            res.data.forEach((res:any)=>{
                const tag = res.name.toLowerCase().replaceAll(' ', '-')
                res.portfolio.forEach((res2:any)=>{
                    //images.push({id: res2.id, file:apiBaseUrl.value+res2.location, category: tag})
                    images.push({
                        id: res2.id, 
                        file: apiBaseUrl.value + `${res2.type == 'video' ? res2.thumbnail : res2.location}`, 
                        video: res2.type == 'video' ? res2.location : null, 
                        category: tag 
                    })
                })
            })
            categories.unshift({name: 'All', tag:'all'})
            portfolio.value = {categories, images}
        })
    })
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
    .work-page {
        padding-top: 60px;
        padding-bottom: 90px;
    }
}

@media (max-width: 500px) {

    .title,
    .details {
        text-align: center;
    }

    .work-page {
        padding-top: 30px;
        padding-bottom: 90px;
    }
}

@media (min-width: 1200px) {
    .work-page {
        padding: 100px 150px
    }
}
</style>