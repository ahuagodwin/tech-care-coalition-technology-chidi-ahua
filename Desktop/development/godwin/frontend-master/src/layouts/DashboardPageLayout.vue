<template>

    <MainContainer class="" v-if="route?.meta?.print">
        <router-view class="w-100 routerView" v-slot="{ Component }">
            <component :is="Component" :dashboardData="dashboardData" />
        </router-view>
    </MainContainer>

    <MainContainer class="" v-else>
        <img src="../assets/img/auth/auth-top-right.svg" class="topImage" v-if="!route?.meta?.hideTopImage"/>
        <div class="d-flex">
            <DashboardSideMenuBar  v-if="!route?.meta?.hideSidebar" class="side-menu-bar"/>
            <DashboardMobileTopBar 
                class="mobile-nav"
                :notifications="notifications"
                :workspaces="workspaces"
                :mainWorkspace="mainWorkspace"
                :profile="userProfile"
                @mark:all:read="markAllAsRead()"
            />
            <div class="content container-fluid d-flex flex-column p-0">
                <DashboardTopMenuBar
                   v-if="!route?.meta?.hideTopbar"
                    class="top-menu-bar"
                   :notifications="notifications"
                   :workspaces="workspaces"
                   :mainWorkspace="mainWorkspace"
                   :profile="userProfile"
                   @mark:all:read="markAllAsRead()"
                />

                <router-view class="container-fluid py-5 routerView" v-slot="{ Component }">
                    <component :is="Component" :dashboardData="dashboardData" />
                </router-view>
            </div>
        </div>
        <img src="../assets/img/auth/auth-bottom-left.svg" class="bottomImage img-fluid" v-if="!route?.meta?.hideBottomImage"/>

    </MainContainer>
</template>



<script lang="ts" setup>
    import { ref, onMounted } from 'vue'
    import { useStore } from 'vuex'
    import MainContainer from './MainContainer.vue';
    import {useRoute} from 'vue-router'
    import DashboardSideMenuBar from './components/DashboardSideMenuBar.vue';
    import DashboardTopMenuBar from './components/DashboardTopMenuBar.vue';
    import DashboardMobileTopBar from './components/DashboardMobileTopBar.vue';
    import {getDashboardData, getUserProfile, getAllNotification } from './service'
    import AuthService from '@/services/auth-service'
    import {
        differenceInSeconds,
        differenceInMinutes,
        differenceInHours,
        differenceInDays,
        differenceInMonths,
        differenceInYears
    } from 'date-fns';
    import { getBroadcastMessage } from '@/globals/pusher'


    let notifications = ref([
        {project:'Project 1', status: 'ongoing', time:'5 minutes', read:false, type:"status"},
        {project:'Project 2', status: 'ongoing', time:'5 minutes', read:false, type:"status"},
        {project:'Project 3', status: 'ongoing', time:'5 minutes', read:false, type:"status"},
        {project:'Project 4', status: 'ongoing', time:'5 minutes', read:true, type:"status"},
        {project:'Project 5', status: 'ongoing', time:'5 minutes', read:true, type:"status"},
        {project:'Project 6', status: 'ongoing', time:'5 minutes', read:true, type:"status"},
        {project:'Project 7', status: 'ongoing', time:'5 minutes', read:true, type:"status"},
        {project:'Project 8', status: 'ongoing', time:'5 minutes', read:true, type:"status"},
        {project:'Project 9', status: 'ongoing', time:'5 minutes', read:true, type:"status"},
        {user:"User 9" ,project:'Project 9', time:'5 minutes', read:false, comment:'This is the comment from the user', type:"comment"},
        {user:"User 9" ,project:'Project 9', filename:'file1.jpg', time:'5 minutes', read:true, type:"attachment"},
    ])
    

    const markAllAsRead = () => {
        const items = notifications.value.map(item=>{
            item.read = true
            return item
        })
        notifications.value = items
    }


    const route = useRoute()
    const store = useStore()
    const dashboardData = ref({} as any)
    const userProfile = ref({} as any)
    const mainWorkspace = ref({} as any)
    const workspaces = ref([] as any)
    
    const {
        //isLoading: dashboardDataIsLoading,
        execute: executeGetDashboardData,
    } = getDashboardData();

    const {
        //isLoading: userProfileIsLoading,
        execute: executeGetUserProfile,
    } = getUserProfile();

    const {
        //isLoading: getNotificationIsLoading,
        execute: executeGetNotification,
    } = getAllNotification();

    
    userProfile.value = AuthService.getLoggedInUser()
    executeGetDashboardData().then((res:any)=>{
        dashboardData.value = res?.data
        userProfile.value.company_role = res?.data?.personal?.company_role
        mainWorkspace.value = res?.data?.personal?.workspace
        //mainWorkspace.value.owner = res.data?.owner[0]
        workspaces.value = res?.data?.personal?.other_workspace
    })

    onMounted(() => {
        // executeGetUserProfile().then((res: any) => {
        //     store.commit('storeUser', res)
        // })
        Promise.all([executeGetUserProfile(), executeGetNotification()]).then((res: any[]) => {
            console.log('dashboard', res)
            store.commit('storeUser', res[0])
            
            //TODO: use this when all is done correctly
            notifications.value = res[1].map((notification: any) => {
                return filterNotification(notification)
            })
        })
    })
    
    getBroadcastMessage(`notification${userProfile.value?.user_identification}`, 'notification-sent', async (res: any) => {
        //console.log('noti', res);
        const notification = filterNotification(res.notification)
        notifications.value.push(notification)
        window.setTimeout(() => {
            playStackNotificationSound()
        },100)
    })


    const filterNotification = (notification: any) =>{
        return Object.assign({}, notification, {
            'project': notification.project?.title,
            'status': notification.project?.status,
            'time': getNotificationTime(notification.created_at),
            'read': notification.read != 'false',
            'comment': notification.message?.message,
            'filename': notification.message?.attachment?.map((upload: any)=>upload.title).join(", "),
            'user': `${notification.commenter?.first_name} ${notification.commenter?.last_name}`,
        })
    }


    const getNotificationTime = (date: Date) => {
        let number = differenceInYears(new Date(), new Date(date))
        if (number >= 1) {
            return `${number} year(s)`
        }
        
        number = differenceInMonths(new Date(), new Date(date))
        if (number >= 1) {
            return `${number} month(s)`
        }
        
        number = differenceInDays(new Date(), new Date(date))
        if (number >= 1) {
            return `${number} day(s)`
        }
        
        number = differenceInHours(new Date(), new Date(date))
        if (number >= 1) {
            return `${number} hour(s)`
        }
        
        number = differenceInMinutes(new Date(), new Date(date))
        if (number >= 1) {
            return `${number} minute(s)`
        }
        
        number = differenceInSeconds(new Date(), new Date(date))
        if (number >= 5) {
            return `${number} second(s)`
        }
        return `now`
    }
    
</script>

<style lang="scss" scoped>
    body{
        background: linear-gradient(0deg, #F7F7FB, #F7F7FB), #F4F4F4!important;
    }
    .content{
        width: 100vw;
        height: calc(100vh - 70px);
    }
    .routerView{
        min-height: 100%;
        padding-left: 3rem;
        padding-right: 3rem;
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
    .routerView{
        padding-right: .7rem !important;
        padding-left: .7rem !important;
    }
}


@media (max-width: 1023px) {
    .content{
        margin-top: 70px;
    }
    .side-menu-bar, .top-menu-bar{
        display: none;
    }
}

@media (min-width: 1024px) {
    .mobile-nav{
        display: none;
    }

    .content{
        width: calc(100vw - 260px);
        height: 100vh;
    }
    .routerView{
        min-height: calc(100% - 108px);
    }
}

@media (min-width: 1200px) {
    .routerView{
        max-width: 1180px;
    }
}

</style>