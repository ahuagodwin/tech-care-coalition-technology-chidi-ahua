<template>
    <div class="notifications d-flex position-relative" :class="{'active': showNotificationDropdown}">
    
        <i class="material-icons my-auto cursor-pointer noti-icon" @click="showNotificationDropdown = !showNotificationDropdown">notifications_none</i>

        <span class="dot wpx-6 hpx-6 rounded-circle position-absolute" v-if="newNotification"></span>

        <span class="gilroy-regular fs-15 lh-18 text-blue-dk-2 my-auto" v-if="newNotification">{{ newNotification }}</span>


    <div ref="notificationDropdown" class="notification-dropdown py-4">
        <div class="d-flex flex-column">
            <div class="mx-5 d-flex border-bottom pb-3 mb-3">
                <span class="gilroy-medium fs-20 lh-23 mx-auto">Notifications</span>
                <span class="material-icons cursor-pointer" @click="showNotificationDropdown=false">clear</span>
            </div>
            <div class="mx-4 px-3 d-flex justify-content-between mb-3">
                <span class="gilroy-medium fs-10 lh-12 text-secondary-lt-4 cursor-pointer text-decoration-underline" @click="filtered = !filtered">
                    {{ filtered ? 'View all' : 'Filter by unread'}}
                </span>
                <span class="gilroy-medium fs-10 lh-12 text-secondary-lt-4 cursor-pointer text-decoration-underline" @click="emit('mark:all:as-read',true)">
                    {{notificationUnread.length ? 'Mark all as read' : ''}}
                </span>
            </div>
            <div class="notification-items d-flex flex-column hpx-235" v-if="notificationList.length">

                <div class="d-flex flex-column px-3 mb-1" 
                    v-for="(notification, i) in notificationList" :key="i"
                    :class="{'bg-blue-lt-1': !notification.read,'border-bottom border-blue-lt-1': notification.read}"
                >
                    <div class="d-flex notification-item">
                        <div class="px-1 my-auto text-nowrap">
                            <span class="perfect-center wpx-12 hpx-12" :class="{ 'rounded-circle bg-yellow': !notification.read }">&nbsp;</span>
                        </div>
                        <div class="my-auto fs-10 lh-12 text-blue-dk-1 d-flex flex-wrap flex-grow-1 ps-3">
                            <span class="gilroy-regular fs-10 lh-12" v-if="notification.type == 'status'"><b>{{ notification.project }}</b> has been moved to <b>{{ notification.status }}</b></span>
                            <span class="gilroy-regular fs-10 lh-12" v-if="notification.type == 'attachment'"><b>{{ notification.user }}</b> added attachment(s) named <b>{{ notification.filename }}</b> on <b>{{ notification.project }}</b></span>
                            <span class="gilroy-regular fs-10 lh-12" v-if="notification.type == 'comment'"><b>{{ notification.user }}</b> has made a comment on <b>{{ notification.project }}</b></span>
                        </div>
                        <span class="px-3 text-nowrap my-auto gilroy-regular fs-10 lh-12">{{ notification.time }}</span>
                    </div>
                    <div 
                        v-if="notification.type == 'comment'" 
                        class="bg-white text-blue-dk-1 fs-10 lh-12 fw-400 w-80 mspx-40 ppx-10 mb-2 rounded-px-5"
                        :class="{ 'bg-blue-lt-1': notification.read, 'bg-white border-bottom border-blue-lt-1': !notification.read}"
                    >
                        {{ notification.comment }}
                    </div>
                </div>

            </div>
            <div class="notification-items d-flex flex-column hpx-235" v-else>

                <img src="@/assets/img/notifications.svg" class="wpx-180 hpx-145 mspx-70"/>
                <span class="gilroy-medium fs-20 lh-23 mx-auto mt-3">No unread notifications</span>
                <span class="gilroy-regular fs-12 lh-14 mx-auto">Click <strong class="cursor-pointer" @click="filtered=false">View all</strong> to view all of your notifications</span>

            </div>

            <div class="mt-4 px-4 border-bottom border-blue-lt-1">
                <div class="gilroy-medium fs-12 lh-14 text-blue-dk-1 cursor-pointer pb-2" @click="openFrequencies=true">Change email notification frequency</div>
            </div>
            <div v-if="openFrequencies">
                <div class="d-flex border-bottom bg-blue-lt-1 hpx-45 pe-3">
                    <span class="gilroy-medium fs-15 lh-18 mx-auto my-auto">Send me emails notifications...</span>
                    <span class="material-icons cursor-pointer my-auto fs-20" @click="openFrequencies=false">clear</span>
                </div>
                <div class="d-flex justify-content-between cursor-pointer border-bottom border-blue-lt-1 hpx-45 px-4" v-for="(frequency, i) in frequencies" :key="i" @click="setFrequency(frequency.tag)">
                    <div class="d-flex flex-column justify-content-center my-auto">
                        <span class="gilroy-bold fs-12 lh-14">{{frequency.title}}</span>
                        <span class="gilroy-regular fs-10 lh-12">{{frequency.description}}</span>
                    </div>
                    <span class="material-icons my-auto fs-15 fw-700" v-if="email_notification ==frequency.tag">check</span>
                </div>
            </div>
            <div class="px-4 mt-2" v-if="!openFrequencies">
                <div class="gilroy-medium fs-12 lh-14 text-blue-dk-1 cursor-pointer pb-2" v-if="desktop_notification =='yes'" @click="setDesktopNotificationTo('no')">Disallow desktop notification</div>
                <div class="gilroy-medium fs-12 lh-14 text-blue-dk-1 cursor-pointer pb-2" v-else @click="setDesktopNotificationTo('yes')">Allow desktop notification</div>
            </div>

        </div>
    </div>
    </div>
</template>


<script lang="ts" setup>
    import { type Ref, ref, computed } from 'vue'
    import { useStore } from 'vuex'
    import { NOTIFICATION_FREQUENCIES } from '@/globals/const'
    import {setDesktopNotification, setEmailFrequency } from '../service'
    import * as AlertService from '@/services/alert-service'
    import useGlobals from '@/globals/composables'

    interface NotificationsProps {
        notifications: Record<string, any>
    }
    const store = useStore()
    // eslint-disable-next-line
    const emit = defineEmits(['modal:closed','mark:all:as-read'])
    // eslint-disable-next-line
    const props = defineProps<NotificationsProps>()

    const showNotificationDropdown = ref(false)
    const filtered = ref(true)
    const openFrequencies = ref(false)
    const frequencies = NOTIFICATION_FREQUENCIES

    
    const newNotification = computed(() => props.notifications.filter((item: any) => !item.read)?.length)


const notificationUnread = computed(() => props.notifications.filter((item: any) => !item.read))
const notificationList = computed(()=>{
    if (!filtered.value) {
        const notifications = props.notifications
        return notifications.sort((a:any, b:any)=> Number(a.read) - Number(b.read))
    }else{
        return notificationUnread.value
    }
})

const {
    // isLoading: setDesktopNotificationIsLoading,
    // error: setDesktopNotificationError,
    isSuccessful: setDesktopNotificationIsSuccessful,
    execute: executeSetDesktopNotification,
} = setDesktopNotification({ desktop_notification: 'yes'});
const {
    // isLoading: setEmailFrequencyIsLoading,
    // error: setEmailFrequencyError,
    isSuccessful: setEmailFrequencyIsSuccessful,
    execute: executeSetEmailFrequency,
} = setEmailFrequency({ email_notification: 'instantly'});

const setFrequency = (frequency: string) => {
    executeSetEmailFrequency({ data: { email_notification: frequency } }).then((res: any) => {
         if (setEmailFrequencyIsSuccessful.value) {
            store.commit('storeUser', { email_notification: frequency })
            AlertService.toast('success', 'Success', res.message)
        }
    })
}
const setDesktopNotificationTo = (allow: string) => {
    executeSetDesktopNotification({ data: { desktop_notification: allow } }).then((res: any) => {
        if (setDesktopNotificationIsSuccessful.value) {
            store.commit('storeUser', { desktop_notification: allow })
            AlertService.toast('success', 'Success', res.message)
        }
    })
}

const desktop_notification = computed(() => {
    return store.state.user.desktop_notification
})
const email_notification = computed(() => {
    return store.state.user.email_notification
})


</script>

<style lang="scss" scoped>
    .dot{
        background: linear-gradient(180deg, rgba(255, 0, 0, 0.8) 0%, rgba(215, 4, 4, 0.8) 52.08%, rgba(255, 0, 0, 0.8) 100%);
        top: 6px;
        left: 13px;
    }
    .notification-items{
        overflow-y: scroll;
        .notification-item{
            min-height: 35px;
        }
    }

    .notification-dropdown{
        position: absolute;
        top: 40px;
        right: 0px;
        user-select: none;
        background: #fff;
        border: 1px solid #c7d8e2;
        width: 350px;
        height: auto;
        display: none;
        border-radius: 3px;
        box-shadow: 10px 10px 35px rgba(0,0,0,0.125),
                    -10px -10px 35px rgba(0,0,0,0.125);
    }
    .notification-dropdown:before{
        content: "";
        position: absolute;
        top: -20px;
        right: 10px;
        border: 10px solid;
        border-color: transparent transparent #fff transparent;
    }

    .notifications.active .notification-dropdown{
        display: flex;
        flex-direction: column;
    }

    @media (max-width: 500px) {
        .notification-dropdown{
            width: 300px;
        }
    }
</style>