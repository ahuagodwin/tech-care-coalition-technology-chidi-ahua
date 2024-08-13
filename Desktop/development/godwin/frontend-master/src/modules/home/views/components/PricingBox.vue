<template>
    <div class="container py-5 mb-5">
        <div class="pricing-box d-flex flex-column bg-blue rounded-px-20 mx-auto pypx-50 justify-content-center">
            <div class="bg-yellow-lt-3 text-blue-lt-5 gilroy-regular rounded-px-30 w-fit-content mx-auto fs-15 lh-18 py-2 px-3">Add-on plans</div>
            <p class="text-white gilroy-regular text-center w-80 mx-auto  mt-3 fs-16 lh-18 ">
                Our add-on plans are other services you can stack up with your design plan to help your business grow faster.
            </p>

            <div class="container">
                <div class="row">
                    <div class="col-sm-6 left d-flex flex-column border-white">
                        <span class="text-white gilroy-regular fs-16 lh-18 mt-3">
                            Starting from
                        </span>
                        <span class="text-white gilroy-bold fs-25 lh-28 mt-1">
                            N99,999
                        </span>
                        <span class="text-white gilroy-regular fs-16 lh-18 mt-1">
                            Per month, billed monthly
                        </span>
                        <FormButton label="Get Started" class="hpx-40 border-0 rounded-px-5 mt-4 w-fit-content" variant="yellow" @click="router.push({ name: 'Auth.Register' })"/>
                    </div>
                    <div class="col-sm-6 right d-flex">
                        <div class="d-flex flex-column">
                            <span class="text-white gilroy-bold fs-17 lh-18 mt-sm-3 fw-700">
                                Add-on services include:
                            </span>
                            <div class="d-flex flex-column mt-3">
                                <div class="d-flex mb-3" v-for="(service, i) in addonServices" :key="i">
                                    <span class="material-icons my-auto border rounded-circle border-white wpx-15 hpx-15 text-white fs-9 lh-13 text-center me-1">check</span>
                                    <span class="text-white gilroy-regular fs-15 lh-18 mt-0">{{ service.title }}</span>
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
    import { useRouter } from 'vue-router';

    const router = useRouter()
    
    const addonServices = [
        {title: "Copyright"},
        {title: "U/UX Designs"},
        {title: "Digital Marketing"},

        {title: "Software Development"},
        {title: "Custom Illustrations etc."},
    ]
</script>

<style lang="scss" scoped>
    .pricing-box{
        max-width: 900px;
        box-shadow: 17px 17px 200px 0px rgba(64, 69, 79, 0.06);
    }

    @media (max-width: 500px) {
        .pricing-box{
            padding-left: 25px;
            padding-right: 25px;
        }
        .left{
            border-bottom: var(--bs-border-width) var(--bs-border-style) var(--bs-border-color) !important;
            align-items: center;
            padding-bottom: 15px;
            margin-bottom: 15px;
        }
        .right > div{
            margin-left: auto;
            margin-right: auto;
        }
    }

    @media (min-width: 600px) {
        .pricing-box{
            padding-left: 25px;
            padding-right: 25px;
        }
        .left{
            border-right: var(--bs-border-width) var(--bs-border-style) var(--bs-border-color) !important;
        }
        .right > div{
            margin-left: auto;
        }
    }
    @media (min-width: 800px) {
        .pricing-box{
            padding-left: 100px;
            padding-right: 100px;
        }
    }
</style>