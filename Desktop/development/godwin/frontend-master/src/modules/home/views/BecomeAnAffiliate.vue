<template>
    <div class="affiliate bg-blue-dk-3">

        <div class="intro mx-0">
                <div class="position-relative">
                    <img src="@/assets/img/home/affiliate/coin-1.svg" alt="" class="intro-image position-absolute start-0"/>
                    <div class="row justify-content-center">
                        <div class="left col-lg-6 order-1 order-lg-1 d-flex">
                            <div class="content wpx-505">
                                <div class="title text-white text-wrap mb-3 position-relative z-1">Share Spark & Earn - up to N50,000 monthly!</div>
                                <div class="details text-white text-wrap lead-text">Earn N5,000 per month on each client's monthly subscription fee you refer to Spark. As long as they stay subscribed, you will continue to earn</div>
                                <div class="links d-flex mt-3">
                                    <router-link
                                        to="/register/affiliate" 
                                        class="perfect-center text-decoration-none fs-15 lh-19 gilroy-medium text-white bg-blue hpx-46 px-4 me-3 rounded-px-8 position-relative z-1"
                                    >Apply now
                                    </router-link>
                                    <router-link
                                        to="/login" 
                                        class="perfect-center text-decoration-none fs-15 lh-19 gilroy-medium text-black bg-yellow hpx-46 px-4 me-3 rounded-px-8 position-relative z-1"
                                    >Affiliate login
                                    </router-link>
                                </div>
                            </div>
                        </div>
                        <div class="right col-lg-6 order-2 order-lg-2 pe-0 d-flex">
                            <img src="@/assets/img/home/affiliate/affiliate-1.svg"  class="img-fluid" alt=""/>
                        </div>
                    </div>
            </div>
        </div>

        <div class="extra container-fluid position-relative d-flex flex-column align-items-center">
            <img src="@/assets/img/home/affiliate/coin-2.svg" alt="" class="position-absolute end-0 bottom-0 pbpx-100 z-n1"/>

            <div class="title mx-auto mt-5 text-center text-white">Extra Income for Everyone</div>

                <div class="row g-5 justify-content-center position-relative z-1">

                    <div class="item col-lg-4 col-md-6 col-sm-12 mb-4 d-flex justify-content-center" v-for="(how, i) in howItWorks" :key="i">
                        <div class="card d-flex flex-column bg-white rounded-px-30 hpx-440 px-4 py-4">
                            <span class="wpx-118 hpx-118 perfect-center rounded-circle bg-blue-lt-1 text-blue-dk-1 mx-auto mb-3">
                                <i class="material-icons fs-60">{{ how.icon }}</i>
                            </span>
                            <div class="d-flex justify-content-center mt-5">
                                <div class="item-title text-blue-dk-1 text-center">{{ how.title }}</div>
                            </div>
                            <div class="item-description text-blue-dk-1 mt-3 text-center">{{ how.description }}</div>
                        </div>
                    </div>

                </div>
        </div>


        <div class="earning container-fluid mx-0 position-relative d-flex justify-content-center">
            <img src="@/assets/img/home/affiliate/coin-3.svg" alt="" class="position-absolute start-0 bottom-0 mb-5"/>
            <div class="row">
            <div class="left col-lg-6 order-1 order-lg-1 d-flex flex-column text-white">
                <div class="title mx-auto my-5 text-white">Earning with Spark affiliate is super easy</div>
                
                <div class="d-flex mb-2">
                    <span class="earn-num gilroy-bold fs-90 lh-105 text-blue-lt-7 my-auto">1</span>
                    <div class="d-flex flex-column my-auto">
                        <span class="item-title mb-2">Become an Affiliate</span>
                        <span  class="item-description">Fill out the Spark Affiliate application form.</span>
                    </div>
                </div>
            
                <div class="d-flex mb-2">
                    <span class="earn-num gilroy-bold fs-90 lh-105 text-blue-lt-7 my-auto">2</span>
                    <div class="d-flex flex-column my-auto">
                        <span class="item-title mb-2">Promote Spark</span>
                        <span class="item-description">Use your unique referral link to promote Spark.</span>
                    </div>
                </div>
            
                <div class="d-flex mb-2">
                    <span class="earn-num gilroy-bold fs-90 lh-105 text-blue-lt-7 my-auto">3</span>
                    <div class="d-flex flex-column my-auto">
                        <span class="item-title mb-2">Earn Cool Cash</span>
                        <span class="item-description">For each referral, earn N5,000 from their monthly fee, for as long as they're a customer.</span>
                    </div>
                </div>

                <router-link
                    to="/register" 
                    class="cta perfect-center text-decoration-none gilroy-medium text-black bg-yellow px-4 me-3 rounded-px-8 ms-5"
                >Become a Atecker affiliate
                </router-link>
            </div>
            
            <div class="right col-lg-6 order-2 order-lg-2 d-flex justify-content-center">
                <img src="@/assets/img/home/affiliate/affiliate-2.svg"  class="mt-4 img-fluid" alt=""/>
            </div>
            </div>
        </div>



        <div class="faq container-fluid d-flex justify-content-center">

                <div class="row mt-5">


                    <div class="title mx-auto my-5 text-center text-white">FAQ</div>

                     <div class="bg-card bg-blue-lt-8 d-flex flex-column mb-2 cursor-pointer" @click="toggleCurrent(1)">
                        <span class="item-title">I just applied, but I haven’t heard back from anyone, why? <ChevronDown />  </span>
                        <span class="item-description gilroy-regular text-purple-dk-1 mt-2" v-if="currectFaq == 1">Well, most likely, we’ve already sent you a few emails back to you.</span>
                    </div>

                    <div class="bg-card bg-blue-lt-8 d-flex flex-column mb-2 cursor-pointer" @click="toggleCurrent(2)">
                        <span class="item-title">Where can I get my referral link?</span>
                        <span class="item-description gilroy-regular text-purple-dk-1 mt-2" v-if="currectFaq == 2">Once your registration is successful, log in to your dashboard here: https://affiliate.spark.com/login</span>
                    </div>

                    <div class="bg-card bg-blue-lt-8 d-flex flex-column mb-2 cursor-pointer" @click="toggleCurrent(3)">
                        <span class="item-title">What’s your commission structure?</span>
                        <span class="item-description gilroy-regular text-purple-dk-1 mt-2"  v-if="currectFaq == 3">You would receive N5,000 on every referral. As long as your referral remains a customer for that month, you will receive commission and continue to receive a commission for as long as they are a customer of Spark’s.</span>
                    </div>

                    <div class="bg-card bg-blue-lt-8 d-flex flex-column mb-2 cursor-pointer" @click="toggleCurrent(4)">
                        <span class="item-title">What do I need to become an affiliate with Spark?</span>
                        <span class="item-description gilroy-regular text-purple-dk-1 mt-2"  v-if="currectFaq == 4">No requirements at all other than a bank account. Whether you run a publication, a YouTube channel, or need a side hustle, as long as you believe Spark is the right fit for your audience, we in turn are the right partner for you!</span>
                    </div>

                    <div class="bg-card bg-blue-lt-8 d-flex flex-column mb-2 cursor-pointer" @click="toggleCurrent(5)">
                        <span class="item-title">Is there an earning cap?</span>
                        <span class="item-description gilroy-regular text-purple-dk-1 mt-2"  v-if="currectFaq == 5">Not at all. We have partners who make as little as N5,000 a month to as high as N500,000 a month. This ultimately depends on the reliability of your network and the community you’ve created within your brand. If you know a person, entity, community, or brand that you think we should collaborate with, send an email to hello@spark.com to introduce us!</span>
                    </div>

                    <div class="bg-card bg-blue-lt-8 d-flex flex-column mb-2 cursor-pointer" @click="toggleCurrent(6)">
                        <span class="item-title">If I refer customers to you, do I get something?</span>
                        <span class="item-description gilroy-regular text-purple-dk-1 mt-2"  v-if="currectFaq == 6">If you’re an existing customer and want to refer your friends to us, your friend will get a discount and you will receive a percentage of their recurring payment. Send us enough referrals, and you can get our service for FREE. Not to mention, you can also make a little bit of cash on the side.</span>
                    </div>

                    <div class="bg-card bg-blue-lt-8 d-flex flex-column mb-2 cursor-pointer" @click="toggleCurrent(7)">
                        <span class="item-title">How will I know when someone signs up using my link?</span>
                        <span class="item-description gilroy-regular text-purple-dk-1 mt-2"  v-if="currectFaq == 7">Easy! The minute someone pays for our any of our services using your link, you will receive an email congratulating you on a successful affiliate subscriber!</span>
                    </div>

                    <div class="bg-card bg-blue-lt-8 d-flex flex-column mb-2 cursor-pointer" @click="toggleCurrent(8)">
                        <span class="item-title">How do I share my referral link?</span>
                        <span class="item-description gilroy-regular text-purple-dk-1 mt-2"  v-if="currectFaq == 8">Within your dashboard, there is a link. Copy that link. You can then send the link or add that link to any online asset that you may own.</span>
                    </div>

                    <div class="bg-card bg-blue-lt-8 d-flex flex-column mb-2 cursor-pointer" @click="toggleCurrent(9)">
                        <span class="item-title">How do I receive my commission?</span>
                        <span class="item-description gilroy-regular text-purple-dk-1 mt-2"  v-if="currectFaq == 9">All affiliates and partners are paid once a month via an approved method of receiving payments. You can set your preferred method of commission delivery directly in your affiliate portal here: https://affiliate.spark.com/login</span>
                    </div>

                </div>
        </div>



    </div>
</template>


<script lang="ts" setup>
    import { ref, type Ref } from 'vue'
    import { ChevronDown } from "lucide";

    const currectFaq: Ref<null|number> = ref(null);
    const toggleCurrent = (curr:number) => {
        currectFaq.value = currectFaq.value == curr ? null : curr
    }

    const howItWorks = [
        {
            icon: "money", 
            title: "Salary for life", 
            description: "Get paid monthly for referring your friends to Spark"
        },
        {
            icon: "request_quote", 
            title: "Easy Payouts", 
            description: "Receive automated monthly payments of your referral earnings into your bank account"
        },
        {
            icon: "all_inclusive", 
            title: "Unlimited earning", 
            description: "There is no earning limit. The more people you recommend to Spark, the more money you'll earn"
        },
    ]
</script>


<style lang="scss" scoped>

    .intro{
        &-image{
            top:0;
            left:-10px!important;
            margin-top: 100px;
        }
        .left{
            padding-top:100px;
            .content{
                max-width: 505.5px;
                .title{
                    font-size: 60px;
                    line-height: 61px;
                    font-family: gilroy-medium;
                }
                .details{
                    font-size: 20px;
                    font-family: gilroy-regular;
                }
            }
        }
        .right{
            img{
                max-width: 710px;
            }
        }
    }

    .extra{
        .title{
            font-size: 60px;
            line-height: 61px;
            font-family: gilroy-medium;
        }
        .item{
            &-title{
                font-size: 30px;
                font-family: gilroy-medium;
            }
            &-description{
                font-size: 20px;
                font-family: gilroy-regular;
            }
            .card{
                max-width: 300px;
            }
        }
    }

    .earning{
        .left{
            max-width: 550px;
            .title{
                font-size: 50px;
                line-height: 51px;
                font-family: gilroy-bold;
            }

            .item{
                &-title{
                    font-size: 30px;
                    font-family: gilroy-medium;
                }
                &-description{
                    font-size: 20px;
                    font-family: gilroy-regular;
                }
            }
        }
        .earn-num{
            opacity: 0.15;
        }
        .cta{
            width: 374px;
            height: 70px;
            font-size: 15px;
            line-height: 19px;
        }
    }
    .faq{
        .title{
            font-size: 60px;
            line-height: 61px;
            font-family: gilroy-medium;
        }
        .bg-card{
            .item{
                &-title{
                    font-size: 30px;
                    font-family: gilroy-regular;
                }
                &-description{
                    font-size: 20px;
                    font-family: gilroy-regular;
                }
            }
        }
    }


    @media (max-width: 500px) { 
         .intro{
            &-image{
                top:0;
                left:-10px!important;
                margin-top: 50px;
            }
            .left{
                padding-left: 25px;
                padding-right: 25px;
                .content{
                    .title{
                        text-align: center;
                        font-size: 45px;
                        font-family: gilroy-bold;
                        line-height: 51px;
                    }
                    .details{
                        text-align: center;
                    }
                }
            }
            .right{
                img{
                    margin-top: 3rem;
                    max-width: 425px;
                }
            }
            .links{
                justify-content: center;
                &>*{
                    width: 50%;
                }
            }
        }

        .extra{
            .title{
                margin-bottom: 3rem;
            }
        }
        


        .earning{
            padding-left: 25px;
            padding-right: 25px;
            .cta{
                margin-top: 50px;
                width: 274px;
                height: 50px;
                font-size: 15px;
                line-height: 19px;
            }
            .right{
                margin-top: 3rem;
            }
            .left{
                .title{
                    text-align: center;
                    font-size: 47px;
                    line-height: 48px;
                }
            }
        }


        .faq{
            padding-left: 25px;
            padding-right: 25px;
            .title{
                font-size: 60px;
                line-height: 61px;
                font-family: gilroy-medium;
            }
            .bg-card{
                padding: .8rem;
                .item{
                    &-title{
                        font-size: 15px;
                        line-height: 16px;
                        font-family: gilroy-regular;
                    }
                    &-description{
                        font-size: 12px;
                        line-height: 13px;
                        font-family: gilroy-regular;
                    }
                }
            }
        }
    }

    @media (min-width: 600px) and (max-width: 900px) {  
         .intro{
            padding-top: 50px;
            &-image{
                top:0;
                left:-10px!important;
                margin-top: 50px;
            }
            .left{
                padding-left: 25px;
                padding-right: 25px;
                justify-content: center;
                .content{
                    .title{
                        text-align: center;
                    }
                    .details{
                        text-align: center;
                    }
                }
            }
            .right{
                justify-content: end;
                img{
                    margin-top: 3rem;
                    max-width: 615px;
                }
                @media (min-width: 750px) {
                    img{
                        margin-top: 3rem;
                        max-width: 750px;
                    }
                }
            }
            .links{
                justify-content: center;
                &>*{
                    width: 50%;
                }
            }
        }


        .extra{
            .title{
                margin-bottom: 3rem;
            }
            .row{
                justify-content: center;
            }
        }

        .earning{
            .row{
                justify-content: center;
                .title{
                    text-align: center;
                }
            }
            .right{
                margin-top: 3rem;
            }
        }

        .faq{
            padding-left: 40px;
            padding-right: 40px;
            .bg-card{
                padding: 1rem;
            }
        }
    }

    @media (min-width: 1024px) {  
       .intro {
            padding-top: 70px;
            .left{
                padding-left: 100px;
            }
        }

        .extra, .earning, .faq {
            .row{
                padding: 40px 40px;
            }
        }
        .faq{
            .bg-card{
                padding: 1.5rem;
            }
        }
    }
    @media (min-width: 1200px) {  
        .intro {
            padding-top: 70px;
            .left{
                padding-left: 150px;
            }
        }
        .extra{
            padding-left: 150px;
            padding-right: 150px;
            .row{
                padding-top: 70px;
                padding-bottom: 70px;
                max-width: 1140px;
            }
        }
        .earning{
            padding-left: 150px;
            padding-right: 150px;
            .row{
                padding-top: 70px;
                padding-bottom: 70px;
                max-width: 1140px;
            }
        }
        .faq{
            padding-left: 150px;
            padding-right: 150px;
            .row{
                padding-top: 70px;
                padding-bottom: 70px;
                max-width: 1140px;
            }
        }
    }
    @media (min-width: 1400px) {  
        .intro{
            padding-top: 70px;
            .row{
                .left{
                    padding-left: 170px;
                    justify-content: end;
                }
            }
        }
    }
</style>