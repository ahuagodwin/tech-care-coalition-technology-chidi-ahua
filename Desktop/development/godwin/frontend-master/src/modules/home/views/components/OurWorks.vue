<template>
    <div class="works d-flex flex-column animate__animated animate__fadeInUp six animate__slower">
        <div class="container">
            <div class="title mx-auto mb-5 text-center">Our works</div>
            
            <div class="row">
                <div class="col-12 position-relative px-0">
                    <img src="@/assets/img/home/our-works.svg" alt="" class="w-100 mx-auto img-fluid"/>
                    <router-link 
                        to="/works" 
                        class="cta position-absolute bottom-0 end-0 text-black text-decoration-none gilroy-medium bg-yellow rounded-px-10 perfect-center cursor-pointer text-nowrap"
                    >See more design samples
                    </router-link>
                </div>
            </div>

        </div>
    </div>
</template>


<style lang="scss" scoped>
    .works{
        margin-top: 100px;
    }
    .title{
        font-size: 60px;
        font-family: gilroy-medium;
    }

@media (max-width: 500px) {
    .title{
        font-size: 40px;
        font-family: gilroy-bold;
    }
    .row > * {
        padding-right: calc(var(--bs-gutter-x) * 0.5) !important;
        padding-left: calc(var(--bs-gutter-x) * 0.5) !important;
    }
    .cta{
        height: 35px;
        width: 34%;
        font-size: calc(.5rem + .3vw);
        line-height: .7rem;
        margin-right: .8rem;
    }
}
@media (min-width: 600px) {
    .cta{
        height: 50px;
        width: 36%;
        font-size: calc(.8rem + .3vw);
        line-height: 1rem;
    }
}
@media (min-width: 724px) {
    .cta{
        height: 70px;
        width: 36%;
        font-size: calc(1rem + .3vw);
        line-height: 1.2rem;
    }
}
@media (min-width: 1024px) {
    .title {
        font-size: calc(3.75rem + .3vw);
    }
    .cta{
        height: 83px;
        width: 36%;
        font-size: calc(1.2rem + .3vw);
        line-height: 1.5rem;
    }
}
@media (min-width: 1200px) {
    .works {
        padding-left: 150px;
        padding-right: 150px;
    }
    .cta{
        height: 85px;
        width: 36%;
        font-size: calc(1.2rem + .3vw);
        line-height: 1.5rem;
    }
}
@media (min-width: 1400px) {
    .cta{
        height: 85px;
        width:36%;
        font-size: calc(1.5rem + .3vw);
        line-height: 2rem;
    }
}
</style>