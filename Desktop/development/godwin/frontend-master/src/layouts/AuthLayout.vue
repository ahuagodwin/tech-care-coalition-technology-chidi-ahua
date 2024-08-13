<template>
    <MainContainer class="auth-layout overflow-hidden container-fluid px-0 bg-secondary-lt-5">
        <img src="../assets/img/auth/auth-top-right.svg" class="topImage img-fluid" v-if="!route?.meta?.hideTopImage"/>
        
        <div class="container-fluid">

            <div class="row">
                <div class="logo d-flex flex-column" v-if="!route?.meta?.hideLogo">
                    <router-link to="/" class="text-decoration-none">
                        <img src="@/assets/img/blue-logo.svg" class="logo-img img-fluid" />
                    </router-link>
                </div>
                
                <div class="form d-flex flex-column col-sm-12 px-0">
                    <router-view class="routerView" v-slot="{ Component }">
                        <component :is="Component" />
                    </router-view>
                </div>
            </div>


           </div>
        <img src="../assets/img/auth/auth-bottom-left.svg" class="bottomImage img-fluid" v-if="!route?.meta?.hideBottomImage"/>
    </MainContainer>
</template>



<script lang="ts" setup>
    import MainContainer from './MainContainer.vue';
    import {useRoute} from 'vue-router'

    const route = useRoute()
</script>


<style lang="scss">
    body{
        background: linear-gradient(0deg, #F7F7FB, #F7F7FB), #F4F4F4!important;
    }
</style>

<style lang="scss" scoped>

  .auth-layout{
    min-height:100vh;
  }
.topImage{
    position: fixed;
    top: 0px;
    right: 0px;
    z-index: -1000;
}
.bottomImage{
    position: fixed;
    bottom: 0px;
    left: 0px;
    z-index: -1000;
}

@media (max-width: 500px) {
    .logo{
        padding: 15px 0 10px;
        align-items: center;
        .logo-img{
            width: 100%; 
        max-width: 200px
        }
    }
    .g-5{
        --bs-gutter-y: .8rem;
    }
}

@media (min-width: 600px) and (max-width: 900px){
    .logo{
        padding: 40px 0 30px;
        align-items: center;
        .logo-img{
            
            width: 100%; 
        max-width: 200px
        }
    }
    .form{
        align-items: center;
    }
    @media (max-height: 800px) {
        .logo{
            padding: 20px 0 10px;
        }
        .g-5{
            --bs-gutter-y: 1rem;
        }
    }
}

@media (min-width: 1024px) {
    .logo{
        position:absolute;
    }
    .logo-img{
        margin-top: 4vw;
        padding-left: 5vw;
        width: 100%; 
        max-width: 200px
    }
}

</style>