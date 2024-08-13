<template>
    <nav class="navbar navbar-expand-lg navbar-light hpx-70 bg-blue-lt-1 fixed-top">
        <div class="main container">
            <router-link to="/" class="text-decoration-none">
                <img src="@/assets/img/blue-logo.png" style="width: 100%; max-width: 150px; height: auto;" />
            </router-link>
            
          <button 
            class="navbar-toggler" 
            type="button" 
            data-bs-toggle="offcanvas" 
            data-bs-target="#offcanvasNavbar" 
            aria-controls="offcanvasNavbar" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
            @click="navSideModal = true"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse justify-content-end my-auto" id="navbarNav">
            <ul class="navbar-nav home-links">
              <li class="nav-item" v-for="(link, i) in links" :key="i">
                <router-link  
                    v-if="link.show"
                    :to="link.path" 
                    class="nav-link fs-10 lh-12 gilroy-bold me-4 cursor-pointer text-uppercase"
                    :class="link.current ? 'text-blue' : 'text-blue-dk-1'"
                >
                    {{ link.title }}
                </router-link>
              </li>
            </ul>
          </div>
        <div class="cart-demo d-flex my-auto">
            <div class="position-relative me-3 my-auto" :class="{ 'cursor-pointer': cartCount }" @click="router.push({ name: 'Subscription.Cart' })">
                <span class="cart-count perfect-center wpx-11 hpx-11 rounded gilroy-medium fs-8 lh-9 bg-yellow position-absolute" v-if="cartCount">{{ cartCount }}</span>
                <span class="material-icons fs-20 mt-1">shopping_cart</span>
            </div>
            <router-link to="/get-a-demo" class="demo-link my-auto bg-blue perfect-center rounded-px-10 wpx-92 hpx-32 text-white fs-10 lh-12 gilroy-bold cursor-pointer">GET A DEMO</router-link>
        </div>
        </div>

          <OffCanvas title="" @modal:closed="navSideModal = false" v-model="navSideModal" modalId="rightModal" canvasClass="wpx-350  bg-blue-dk-2">
            <template #header>
                <router-link to="/" class="text-decoration-none">
                    <img src="@/assets/img/white-logo.svg" style="width: 100%; max-width: 100px; height: auto;"  />
                </router-link>
                <span 
                    ref="closeBtn" 
                    @click.prevent="navSideModal = false" 
                    class="text-reset cursor-pointer" 
                    data-bs-dismiss="offcanvas" 
                    aria-label="Close" aria-hidden="true"><i class="material-icons fs-20 text-white">close</i>
                </span>
            </template>
            <div class="d-flex flex-column mt-4"  v-if="navSideModal">

                <span class="mb-4 cursor-pointer " v-for="(link, i) in links" :key="i">
                    <router-link  
                        v-if="link.show"
                        to="#" 
                        class="fs-20 lh-23 gilroy-regular text-decoration-none"
                        :class="link.current ? 'text-blue-lt-1' : 'text-white'"
                        @click.prevent="goToPath(link.path)"
                    >
                        {{ link.title }}
                    </router-link>
                </span>

            </div>
          </OffCanvas>

      </nav>
</template>


<script lang="ts" setup>
    import { computed, ref } from 'vue'
    import { useRoute, useRouter, RouterLink } from 'vue-router'
    import { getTransItemsCount } from '@/modules/client-subscription/helpers'

    const route = useRoute();
    const router = useRouter();
    //const cartCount = ref(1)
    const cartCount = ref(getTransItemsCount())

    const navSideModal = ref(false)

    const linksArr = computed(() => {
        return [
            { title: "Home", path: "/", current: false, show: navSideModal.value },
            { title: "Works", path: "/works", current: false, show: true },
            { title: "Pricing", path: "/pricing", current: false, show: true },
            { title: "Become an affiliate", path: "/affiliate", current: false, show: true },
            { title: "Login", path: "/login", current: false, show: true },
            { title: "Create an account", path: "/register", current: false, show: true },
            { title: "Get a demo", path: "/get-a-demo", current: false, show: navSideModal.value },
        ]
    })
    const links = computed(()=>{
        const modifiedLiks = linksArr.value.map((link)=>{
            link.current = false
            if(link.path == route.path){
                link.current = true
            }
            return link
        })
        return modifiedLiks
    })

    const goToPath = (link: string) => {
        window.location.href = link
    }
</script>


<style lang="scss" scoped>
    .home-links a, a.demo-link{
        text-decoration: none;
    }
    .cart-count{
        right: -5px !important;
    }

    .navbar-toggler{
        border:none
    }


    @media (max-width: 500px) { 
        .cart-demo{
            .demo-link{
                display: none;
            }
        }
        .navbar-toggler{
            margin-left: 0 !important;
        }
    }

    @media (max-width: 900px) { 
        .main.container{
            justify-content: flex-start;
        }
        .cart-demo{
            order: 1;
            margin-left: auto;
        }
        .navbar-toggler{
            order: 2;
            margin-left: 2rem;
        }
    }

    // Large devices (desktops, 992px and up)
    @media (min-width: 992px) { 
        .cart-demo{
            margin-left: 3rem !important;
        }
    }

    // X-Large devices (large desktops, 1200px and up)
    @media (min-width: 1200px) { 
        .navbar{
            padding-left: 150px;
            padding-right: 150px;
        }
    }
</style>