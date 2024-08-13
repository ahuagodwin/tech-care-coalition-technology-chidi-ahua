<template>

    <div class="how bg-blue-dk-1 animate__animated animate__fadeInUp eight animate__slower">
        <div class="container">
            <div class="title mx-auto mb-5 text-center text-white">Here is how it works</div>

            <div class="row justify-content-center">

                <div class="col-lg-4 col-md-6 cardHover" v-for="(how, i) in howItWorks" :key="i">

                <div class="how-card d-flex flex-column bg-white rounded-px-30 hpx-385 mb-4 mx-auto">
                        <span class="wpx-100 hpx-100 perfect-center rounded-circle bg-blue-lt-1 text-blue-dk-1 mx-auto iconScale">
                            <i class="material-icons fs-60">{{ how.icon }}</i>
                        </span>
                        <div class="d-flex mt-5">
                            <span class="how-id text-blue-dk-1 me-3 mb-auto">{{ i + 1 }}.</span>
                            <span class="how-title text-blue-dk-1 mb-auto">{{ how.title }}</span>
                        </div>
                        <div class="how-description text-blue-dk-1 mt-3">{{ how.description }}</div>
                    </div>

                </div>

            </div>

        </div>

    </div>

</template>


<script lang="ts" setup>
    import ChatNDemo from './ChatNDemo.vue'
    const howItWorks = [
        {
            icon: "edit_note", 
            title: "Make your request", 
            description: "Send in a brief detailing your design need to instantly get matched to a designer."
        },
        {
            icon: "auto_fix_high", 
            title: "We go do our magic", 
            description: "Your designer get to work right away"
        },
        {
            icon: "schedule_send", 
            title: "You receive your design", 
            description: "Your designer delivers your design within the agreed-upon turnaround time and will review with you till it's perfect for you."
        },
    ]
</script>


<style lang="scss" scoped>

.how{
    padding-top: 150px;
    padding-bottom: 150px;
    &-card{
        max-width: 356px;
        padding: 2rem 3.5rem;
    }
    &-id{
        font-size: 60px;
        line-height: 60px;
        font-family: gilroy-bold;
    }
    &-title{
        font-size: 30px;
        line-height: 31px;
        font-family: gilroy-regular;
    }
    &-description{
        font-size: 18px;
        line-height: 20px;
        font-family: gilroy-regular;
    }
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

    .how{
        &-card{
            padding: 2rem 3rem;
        }
    }
}


@media (min-width: 600px) and (max-width: 900px){
       .how{
            &-card{
                padding: 2rem 3rem;
            }
        }
}
@media (min-width: 992px) and (max-width: 1200px){
       .how{
            &-card{
                padding: 2rem 1.5rem;
            }
        }
}

@media (min-width: 1200px) {
    .how {
        padding-left: 150px;
        padding-right: 150px;
    }
}
</style>