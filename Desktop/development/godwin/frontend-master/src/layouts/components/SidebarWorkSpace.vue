<template>
    <div class="workspaces d-flex flex-column px-3">
                <div class="creator d-flex flex-column hpx-276 rounded-px-24 py-5 pxpx-35 text-white">
                    <div class="mb-5 d-flex flex-column">
                        <span class="gilroy-regular fs-13 lh-15 mb-1">Current workspace</span>
                        <span class="gilroy-bold fs-23 lh-29 text-wrap">{{mainWorkspace?.name}}</span>
                    </div>
                    <div class="d-flex flex-column mt-auto">
                        <span class="gilroy-regular fs-13 lh-15 mb-2">Created by:</span>

                        <div class="d-flex">
                            <UserAvatar 
                                class="my-auto"
                                size="40" 
                                :src="mainWorkspace?.owner?.avatar"
                            />
                            <span class="gilroy-medium my-auto ms-3">{{mainWorkspace?.owner?.first_name}} {{mainWorkspace?.owner?.last_name}}</span>
                        </div>

                    </div>
                </div>
                <span class="mtpx-60 tet-blue-dk-1 fs-15 lh-18 gilroy-medium">Other Workspaces</span>
                <div class="d-flex flex-column mt-3">
                    
                    <div class="d-flex justify-content-between hpx-55 px-3 align-items-center bg-blue-lt-1 text-blue-dk-1 mb-2" v-for="(workspace,i) in workspaces" :key="i">
                        <div class="d-flex my-auto">
                            <UserAvatar 
                                    class="my-auto me-3"
                                    size="35" 
                                    :src="workspace?.avatar"
                                />
                            <div class="d-flex flex-column my-auto">
                                <span class="gilroy-regular fs-12 lh-12">{{workspace.name}}</span>
                                <span class="gilroy-regular fs-8 lh-8 mt-1">{{workspace.staffs_strength}} members</span>
                            </div>
                        </div>
                        <span class="material-icons my-auto cursor-pointer" @click="setWorkSpace(workspace.id)">arrow_right_alt</span>
                    </div>

                </div>
                <FormButton label="Add account" class="mt-4 mb-5 h-min-50" @click="router.push({name:'Auth.Login.ChooseAccount'})"/>
                
                <div class="d-flex form-check form-switch mt-4">
                    <input class="form-check-input my-auto" type="checkbox" role="switch" id="flexSwitchCheckDefault" :checked="update_notification=='yes'" @change="setNotificationForUpdates">
                    <label class="form-check-label gilroy-regular fs-13 lh-15 text-blue-dk-2 my-auto ms-3" for="flexSwitchCheckDefault">Notify on updates and activities</label>
                </div>
                <hr class="bg-blue-lt-1 mb-5"/>
                <div class="d-flex">
                    <UserAvatar 
                        class="my-auto"
                        size="62" 
                        fullName="" 
                        :src="store.state.user.avatar"
                    />
                    <div class="my-auto d-flex flex-column ms-3">
                        <span class="gilroy-medium fs-23 lh-17 text-blue-dk-1 mb-3 text-nowrap">{{ store.state.user.first_name}} {{ store.state.user.last_name}}</span>
                        <FormButton label="View profile" class="hpx-29" variant="yellow" @click="emit('show:profile',true)"/>
                    </div>
                </div>
            </div>
</template>



<script lang="ts" setup>
import {computed} from 'vue'
import {useRouter} from 'vue-router'
import { useStore } from 'vuex'
import { setUpdateNotification, setCurrentWorkspace } from '../service'
import * as AlertService from '@/services/alert-service'

const router = useRouter()
const store = useStore()

interface WorkspaceProps {
    workspaces:any[]
    mainWorkspace:Record<string,any>
}
//eslint-disable-next-line
const workspaceProps = defineProps<WorkspaceProps>()

//eslint-disable-next-line
const emit = defineEmits(['show:profile'])

const mainWorkspace = computed(()=>{
    return workspaceProps.mainWorkspace
})
const workspaces = computed(()=>{
    return workspaceProps.workspaces
})

const update_notification = computed(() => {
    return store.state.user.notification
})

const {
    // isLoading: setUpdateNotificationIsLoading,
    // error: setUpdateNotificationError,
    isSuccessful: setUpdateNotificationIsSuccessful,
    execute: executeSetUpdateNotification,
} = setUpdateNotification({ notification: 'yes' });

const setNotificationForUpdates = (notificationEvt: Event) => {
    const notification = (notificationEvt.target as HTMLInputElement)?.checked ? 'yes' : 'no'
    executeSetUpdateNotification({ data: { notification: notification } }).then((res: any) => {
        if (setUpdateNotificationIsSuccessful.value) {
            store.commit('storeUser', { notification: notification })
            AlertService.toast('success', 'Success', res.message)
        }
    })
}

const setWorkSpace = (workspaceId: number|string) => {
    const {
        isSuccessful: setWorkspaceIsSuccessful,
        execute: executeSetWorkspace,
    } = setCurrentWorkspace(workspaceId as number);

    executeSetWorkspace().then((res: any) => {
        if (setWorkspaceIsSuccessful.value) {
            AlertService.toast('success', 'Success', res.message)
        }
    })
}

</script>

<style lang="scss" scoped>
    .workspaces{
        .creator{
            background-image: url(@/assets/img/clients/sidebarImg.svg);
            background-size: cover;
            background-repeat: no-repeat;
        }
        .form-switch .form-check-input{
            width:50px;
            height:20px;
            &:focus{
                box-shadow:none!important;
                border-color: rgba(0, 0, 0, 0.25);
                background-image: url('data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%27-4 -4 8 8%27%3e%3ccircle r=%273%27 fill=%27rgba%280, 0, 0, 0.25%29%27/%3e%3c/svg%3e');
            }
            &:checked {
                background-color: var(--spa-color-blue-lt-1);
                border-color:  var(--spa-color-blue-lt-1);
                background-image:url('data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27  viewBox=%27-4 -4 8 8%27%3e%3ccircle r=%273%27 fill=%27%231227E2%27/%3e%3c/svg%3e') 
            }
        }
    }
</style>