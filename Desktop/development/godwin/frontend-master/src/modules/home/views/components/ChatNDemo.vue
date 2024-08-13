<template>
    <div class="container-fluid animate__animated animate__fadeInUp ten animate__slower">
        <div class="row">

            <div class="item-left d-flex col-12 col-lg-6 pypx-100 bg-blue">
                <div class="content d-flex flex-column my-auto  cardHover">
                    <i class="material-icons-outlined text-white fs-100 iconScale">forum</i>
                    <div class="fs-45 lh-53 gilroy-medium text-white mt-4">Request a callback</div>
                    <div class="fs-20 lh-23 gilroy-regular text-white mt-3">Do you have any questions about how we can help your business grow?</div>
                    <span class="cta fs-15 lh-18 gilroy-medium bg-yellow rounded-px-5 perfect-center py-3 px-3 wpx-229 hpx-46 cursor-pointer" @click="callModal = true">Drop a message</span>
                </div>
            </div>
            <div class="item-right d-flex col-12 col-lg-6 pypx-100 bg-blue-lt-1 ">
                <div class="content d-flex flex-column my-auto cardHover">
                    <i class="material-icons-outlined text-blue-dk-2 fs-100 iconScale">smart_display</i>
                    <div class="fs-45 lh-53 gilroy-medium text-blue mt-4">Wanna know more?</div>
                    <div class="fs-20 lh-23 gilroy-regular text-blue-dk-2 mt-3">Get a walkthrough of how Spark works</div>
                    <router-link 
                        to="/get-a-demo" 
                        class="cta text-white text-decoration-none fs-15 lh-18 gilroy-medium bg-blue-dk-2 text-white rounded-px-5 perfect-center py-3 px-3 wpx-229 hpx-46 cursor-pointer"
                    >Request demo
                    </router-link>
                </div>
            </div>
        </div>


        <BookACall :openCallModal="callModal" @modal:closed="callModal = false"/>
    </div>
</template>


<script lang="ts" setup>
    import { ref } from 'vue'
    import BookACall from '@/layouts/components/BookACall.vue'

    const callModal = ref(false);

</script>



<style lang="scss" scoped>

.content{
    max-width: 558px;
}

.item-left{
    .cta {
        margin-top: 1.5rem;
    }
}
.item-right{
    .cta {
        margin-top: 2rem;
    }
}

@media (max-width:900px) {
    .item-left, .item-right{
        padding-left: 2em;
    }
}

@media (min-width: 1024px) {
    .item-right{
        padding-left: 5em;
    }
}

@media (min-width: 1200px) {
    .item {
        &-left{
            padding-left: 150px;
        }
        &-right{
            padding-right: 150px;
        }
    }
}

@media (min-width: 1400px) {
    .item-left{
        justify-content: end;
    }
}
</style>