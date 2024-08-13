<template>
    <div class="intro">
        <div class="container">
          <div class="row">
            <div class="left col-lg-6 pt-5 pt-lg-0 order-1 order-lg-1 d-flex flex-column justify-content-center">
                
                <div class="title text-blue-dk-1 text-wrap mb-1">Your Unlimited Design Team</div>
                <div class="details gilroy-regular text-blue-dk-1 text-wrap fs-24 lh-36">Get access to unlimited design services for your business at a flat rate without having to hire your own designer</div>
                <div class="links d-flex mt-3">
                    <router-link 
                        to="/register" 
                        class="perfect-center text-decoration-none fs-15 lh-19 bg-blue gilroy-bold text-white px-4 hpx-44 rounded-px-5 me-3 position-relative z-1"
                    >SIGN UP
                    </router-link>
                    <router-link 
                        to="/get-a-demo"
                        class="perfect-center text-decoration-none fs-15 lh-19 bg-white border border-blue gilroy-bold text-blue px-4 hpx-44 rounded-px-5 position-relative z-1"
                    >SEE HOW IT WORKS
                    </router-link>
                </div>
            </div>
            <div class="right col-lg-6 order-2 order-lg-2 text-center">
              <img src="@/assets/img/home/intro.svg"  class="img-fluid" alt=""/>
            </div>
          </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .title{
        font-size: 48px;
        font-family: gilroy-medium;
    }
    .details{
        font-size: 24px;
        line-height: 36px;
        font-family: gilroy-regular;
    }

    @media (max-width: 500px) {
        .title{
            font-size: 50px;
            font-family: gilroy-bold;
        }

        .details{
            font-size: 20px;
            line-height: normal;
        }
    }

    // Large devices (desktops, 992px and down)
    @media (max-width: 992px) { 
        .title, .details{
            text-align: center;
        }
        .links{
            justify-content: center;
        }
    }

    // X-Large devices (large desktops, 1200px and up)
    @media (min-width: 1200px) {  
        .intro{
            padding: 70px 150px
        }
    }
    @media (min-width: 1400px) {  
        .title{
            max-width: 70%;
        }        .left{
            max-width: 570px;
        }
    }
</style>