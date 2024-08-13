<template>
    <div class="sidebar wpx-260 border-end border-blue-lt-1 ppx-30">
        <div class="logo" v-if="!route?.meta?.hideLogo">
            <img src="@/assets/img/blue-logo.svg" class="logo-img img-fluid" style="width: 100%; max-width: 150px" />
        </div>
        <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>


        <div class="mtpx-70">
            <ul class="navbar-nav">
                <li class="nav-item my-1" v-for="(link, i) in links" :key="i">
                    <a class="nav-link d-flex" :class="[isActive(link.location)]" href="#" @click.stop="goTo(link)">
                        <div class="d-flex my-auto flex-grow-1">
                            <span class="d-flex my-auto justify-content-center wpx-26 hpx-27 rounded-circle bg-blue-lt-1">
                                <i class="material-icons-outlined my-auto text-blue fs-15">{{ link.icon }}</i>
                            </span>
                            <span
                                class="text-name my-auto fs-14 lh-15 gilroy-medium text-blue-dk-1 ms-2 text-uppercase">{{ link.name
                                }}</span>
                        </div>
                    </a>
                </li>
            </ul>
        </div>
        <OrderInfo />
    </div>
</template>


<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { useNavigation } from '../composables/useNavigation'
import OrderInfo from './OrderInfo.vue';

    const route = useRoute();

    const { links, isActive, goTo } = useNavigation()

</script>

<style lang="scss" scoped>
.sidebar {
    max-width: 260px;
    min-height: 100vh;

    .nav-link {

        &.active,
        &:hover {
            .text-name {
                color: var(--spa-color-blue) !important;
                font-family: 'Gilroy-Bold';
            }
        }
    }
}
</style>