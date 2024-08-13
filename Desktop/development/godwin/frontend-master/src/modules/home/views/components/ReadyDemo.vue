<template>
    <div class="container-fluid px-0">
        <div class="demo-ready bg-blue mtpx-100">
            <div class="container">
                <div class="row">
                    <div class="block d-flex flex-column">
                        <div class="title gilroy-medium text-white mt-4">Ready to try Spark?</div>
                        <div class="description gilroy-regular text-white my-3">Sign up in 2 minutes! Cancel anytime!</div>
                        <router-link 
                            to="/register" 
                            class="text-black text-decoration-none fs-15 lh-18 gilroy-medium bg-yellow rounded-px-5 perfect-center w-fit-content px-5 py-2 hpx-46 cursor-pointer"
                        >Get started
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>



<style lang="scss" scoped>

@media (max-width: 500px) {
    .block {
        padding-top: 50px;
        padding-bottom: 50px;
    }
    .title {
        font-size: 30px;
        line-height: 45px;
    }
    .description{
        font-size: 15px;
        line-height: 18px;
    }
}
@media (min-width: 600px) {
    .block {
        padding-top: 100px;
        padding-bottom: 100px;
    }
    .title {
        font-size: 45px;
        line-height: 53px;
    }
    .description{
        font-size: 20px;
        line-height: 23px;
    }
}
@media (min-width: 1200px) {
    .demo-ready {
        padding-left: 150px;
        padding-right: 150px;
    }
}
</style>