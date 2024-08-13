<template>
    <nav class="navbar navbar-expand-xl navbar-light bg-blue-lt-1 fixed-top">
        <div class="main container-fluid px-0">
            <div class="spa-row w-100 h-100">
                <div class="col-2 col-sm-2 my-auto">
                    <span role="button" class="navbar-toggler-icon cursor-pointer" @click="navSideModal = true"></span>
                </div>
                <div class="col-6 col-sm-6 my-auto d-flex justify-content-center">
                    <router-link to="/" class="text-decoration-none">
                        <img src="@/assets/img/blue-logo.svg" class="img-fluid" style="width: 150px;" />
                    </router-link>
                </div>
                <div class="col-4 col-sm-4 my-auto d-flex justify-content-end">
                    <NotificationDropdown 
                        class="my-auto"
                        :notifications="notifications"
                    />
                    <div class="d-flex ms-3 my-auto cursor-pointer" @click="rightModal = true">
                        <UserAvatar 
                            class="my-auto"
                            size="30" 
                            :src="store.state.user.avatar"
                        />
                        <span class="material-icons text-black ms-2 my-auto">arrow_drop_down</span>
                    </div>
                </div>
            </div>

        </div>

          <OffCanvas position="left" title="" @modal:closed="navSideModal = false" v-model="navSideModal" modalId="navSideModal" canvasClass="wpx-300 ps-4 border-blue-lt-1">
            <template #header>
                <router-link to="/" class="text-decoration-none">
                    <img src="@/assets/img/blue-logo.svg" style="width: 100%; max-width: 100px; height: auto;"  />
                </router-link>
                <span 
                    ref="closeBtn" 
                    @click.prevent="navSideModal = false" 
                    class="text-reset cursor-pointer" 
                    data-bs-dismiss="offcanvas" 
                    aria-label="Close" aria-hidden="true"><i class="material-icons fs-20 text-blue">close</i>
                </span>
            </template>
            <div class="d-flex flex-column"  v-if="navSideModal">

                <div class="mtpx-40">
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
          </OffCanvas>



        <OffCanvas title="" @modal:closed="rightModal = false" v-model="rightModal" modalId="rightModal" canvasClass="wpx-350">
            <SidebarWorkSpace :workspaces="workspaces" :mainWorkspace="mainWorkspace" v-if="sidebarShow == 'workspace'" @show:profile="sidebarShow = 'profile'"/>
            <SidebarUserProfile :profile="profile"  v-if="sidebarShow == 'profile'" @show:workspace="sidebarShow = 'workspace'"/>
        </OffCanvas>

      </nav>
</template>


<script lang="ts" setup>
    import { computed, ref } from 'vue'
    import { useRoute, useRouter } from 'vue-router'
    import { useStore } from 'vuex'
    import { useNavigation } from '../composables/useNavigation'
    import OrderInfo from './OrderInfo.vue';
    import NotificationDropdown from './NotificationDropdown.vue';

    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const { links, isActive, goTo } = useNavigation()

    const rightModal = ref(false)
    const sidebarShow = ref('workspace')
    const navSideModal = ref(false)

    interface ITopBar {
        notifications: Record<string, any>[];
        workspaces: any[];
        mainWorkspace: Record<string, any>;
        profile: Record<string, any>
    }

    //eslint-disable-next-line
    const props = withDefaults(defineProps<ITopBar>(), {
        
    })

    //eslint-disable-next-line
    const emit = defineEmits(['mark:all:read'])
    

    const goToPath = (link: string) => {
        window.location.href = link
    }
</script>


<style lang="scss" scoped>

    .navbar-toggler{
        border:none
    }

    .nav-link {

        &.active,
        &:hover {
            .text-name {
                color: var(--spa-color-blue) !important;
                font-family: 'Gilroy-Bold';
            }
        }
    }

    .navbar{
        height: 70px;
        max-height: 70px;
        padding-right: 3rem !important;
        padding-left: 3rem !important;
    }


    @media (max-width: 500px) {
        .navbar{
            padding-right: .7rem !important;
            padding-left: .7rem !important;
        }
    }

    @media (max-width: 900px) { 
    }

    // X-Large devices (large desktops, 1200px and up)
    @media (min-width: 1200px) { 
        .navbar{
            padding-left: 150px;
            padding-right: 150px;
        }
    }
</style>