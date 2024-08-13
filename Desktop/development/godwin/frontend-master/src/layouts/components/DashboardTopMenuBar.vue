<template>
    <div class="topbar py-4 px-5">
        <div class="d-flex flex-wrap justify-content-between" v-if="['spark-admin', 'client'].includes(route.meta.menuItemsToShow as string)">
        
            <div class="col-md-6 col-sm-12 col-xs-12 my-auto">
                <div class="search-container input-group">
                    <input type="text" class="search form-control rounded-px-5 bg-white border-0" placeholder="Search recent works" aria-describedby="searchGroupAddon"/>
                    <div class="input-group-text searchBtn border border-blue cursor-pointer" id="searchGroupAddon">
                        <i class="material-icons">search</i>
                    </div>
                </div>
            </div>

            <div class="d-flex col-md-6 col-sm-12 col-xs-12 my-auto justify-content-end">
                <NotificationDropdown 
                    class="my-auto"
                    :notifications="notifications"
                />
                <div class="d-flex ms-4 my-auto">
                    <UserAvatar 
                        class="my-auto"
                        size="60" 
                        :src="store.state.user.avatar"
                    />
                    <div class="d-flex my-auto ms-3 cursor-pointer" @click="sidebarModal = true">
                        <div class="d-flex my-auto fs-20 lh-26 text-black">
                            <span class="gilroy-regular my-auto">Hello</span>
                            <span class="gilroy-medium my-auto ms-1">{{ store.state.user.first_name }}</span>
                        </div>
                        <span class="material-icons text-black ms-3 my-auto">arrow_drop_down</span>
                    </div>
                </div>
            </div>

        </div>
        <div class="d-flex my-auto mb-5"  v-if="route.meta.menuItemsToShow == 'affiliate'">
            <div class="d-flex my-auto justify-content-end w-100">
                <div class="d-flex my-auto fs-20 lh-26 text-black">
                    <span class="gilroy-regular my-auto">Hello</span>
                    <span class="gilroy-medium my-auto ms-1">{{ store.state.user.first_name }}</span>
                </div>
                <div class="d-flex ms-3 my-auto">
                    <UserAvatar 
                        class="my-auto"
                        size="60" 
                        :src="store.state.user.avatar"
                    />
                </div>
            </div>
        </div>

        <OffCanvas title="" @modal:closed="sidebarModal = false" v-model="sidebarModal" modalId="rightModal" canvasClass="wpx-350">
            <SidebarWorkSpace :workspaces="workspaces" :mainWorkspace="mainWorkspace" v-if="sidebarShow == 'workspace'" @show:profile="sidebarShow = 'profile'"/>
            <SidebarUserProfile :profile="profile"  v-if="sidebarShow == 'profile'" @show:workspace="sidebarShow = 'workspace'"/>
        </OffCanvas>
    </div>
</template>


<script lang="ts" setup>
    import { ref, computed, Ref } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import AuthService from '@/services/auth-service'
    import { useStore } from 'vuex'
    import SidebarWorkSpace from './SidebarWorkSpace.vue';
    import SidebarUserProfile from './SidebarUserProfile.vue';
    //import NotificationDetails from './NotificationDetails.vue';
    import NotificationDropdown from './NotificationDropdown.vue';

    const route = useRoute();
    const router = useRouter();
    const store = useStore()
    const sidebarModal = ref(false)
    const sidebarShow = ref('workspace')

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

    
</script>


<style lang="scss" scoped>
    .topbar{
        height: 108px;
        max-height: 108px;
        .search{
            &:focus, &:hover{
                border: 1px solid var(--spa-color-blue)!important;
                box-shadow: 0px 4px 10px 3px rgba(0, 0, 0, 0.11)!important;
            }
        }
        .searchBtn{
            background: var(--spa-color-blue-lt-1)!important;
            border: 1px solid var(--spa-color-blue)!important;
            border-radius: 5px!important;
            margin-left: auto!important;
        }
        @media (max-width: 1150px) {
            .search-container{
                width:250px;
            }
        }
    }

</style>