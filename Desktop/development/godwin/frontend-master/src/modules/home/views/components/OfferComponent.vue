<template>

    <div class="offer animate__animated animate__fadeInUp seven animate__slower">
        <div class="container">
            <div class="title fw-bold gilroy-medium mx-auto mb-3 text-center">What you get with every plan</div>

            <div class="row no-gutters clearfix z-1 position-relative">

                <div class="offer-card d-flex col-xxl-4 col-lg-6 col-sm-12 cardHover" v-for="(offer, i) in offers" :key="i">
                    <span class="offer-icon perfect-center bg-blue-lt-1 rounded-circle text-blue me-3 flex-shrink-0 iconScale">
                        <i class="material-icons-outlined fs-32 ">{{ offer.icon }}</i>
                    </span>
                    <div class="d-flex flex-column pt-1">
                        <span class="offer-title mb-2 text-wrap">{{ offer.title }}</span>
                        <span class="offer-description text-wrap">{{ offer.description }}</span>
                    </div>
                </div>

            </div>

        </div>
        
    </div>
</template>


<script lang="ts" setup>
    const offers = [
        {
            icon: "all_inclusive", 
            title: "Unlimited Design", 
            description: "Submit and queue up as many design projects as you want on our platform."
        },
        {
            icon: "credit_card", 
            title: "7 days Money-back", 
            description: "Get a full refund within 7 days if Spark isn't the perfect design service for you."
        },
        {
            icon: "folder_shared", 
            title: "Ownership of files", 
            description: "Have 100% ownership of all original source files created for your project."
        },
        {
            icon: "groups", 
            title: "Team collaboration", 
            description: "Get more done together. Invite your team colleagues and clients."
        },
        {
            icon: "support_agent", 
            title: "Human support", 
            description: "Our dedicated support team is always on standby, ready to assist."
        },
        {
            icon: "rocket_launch", 
            title: "Quick turnaround", 
            description: "Get your designs delivered on time"
        },
    ]
</script>


<style lang="scss" scoped>
    .offer{
        padding-top: 150px;
        padding-bottom: 150px;
    }
    .title{
        font-size: 60px;
        font-family: gilroy-medium;
    }

    .offer-title{
        font-size: 27px;
        font-family: gilroy-medium;
    }
    .offer-description{
        font-size: 20px;
        line-height: 23px;
        font-family: gilroy-regular;
    }

    @media (max-width: 500px) {
        .title{
            font-size: 40px;
            font-family: gilroy-bold;
        }
        .offer-card{
            background-color: white;
            box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
            padding: 1.5rem;
            width: 90vw;
            max-width: 380px;
            margin-right: auto;
            margin-left: auto;
            border-radius: var(--spa-size-10);
            margin-bottom: 1.5rem;
        }

        .offer-icon{
            width: 55px;
            height: 55px;
        }


        .offer-title{
            font-size: 20px;
            font-family: gilroy-medium;
        }
        .offer-description{
            font-size: 15px;
            line-height: 18px;
            font-family: gilroy-regular;
        }
    }




    @media (min-width: 600px) and (max-width: 900px) {
        .title{
            font-size: 40px;
            font-family: gilroy-bold;
        }
        .offer-card{
            background-color: white;
            box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
            padding: 1.5rem;
            width: 90vw;
            max-width: 450px;
            margin-right: auto;
            margin-left: auto;
            border-radius: var(--spa-size-10);
            margin-bottom: 1.5rem;
        }

        .offer-icon{
            width: 55px;
            height: 55px;
        }


        .offer-title{
            font-size: 30px;
            font-family: gilroy-medium;
        }
        .offer-description{
            font-size: 20px;
            line-height: 23px;
            font-family: gilroy-regular;
        }
    }


    @media (min-width: 1024px) {
        .offer-icon{
            width: 68px;
            height: 68px;
        }
        .offer-card{
            margin-bottom: 3rem;
            max-width: 380px;
        }

        // .offer {
        //     padding-top: 200px;
        //     padding-bottom: 200px;
        // }
    }
    
    @media (min-width: 1200px) {
        .offer {
            padding-left: 150px;
            padding-right: 150px;
        }
    }
</style>