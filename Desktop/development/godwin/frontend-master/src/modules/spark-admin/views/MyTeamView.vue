<template>
    <div class="d-flex flex-column px-4">

        <div class="d-flex flex-column pe-5">
            <span class="gilroy-regular fs-30 lh-33 fw-400 text-blue-dk-1 mb-2 my-auto">Roles & permissions</span>
            <div class="d-flex flex-column">
                <div class="pxpx-30 pypx-20 align-items-center bg-white d-flex justify-content-between mb-2" v-for="(role, i) in roles" :key="i">
                    <span class="gilroy-regular fs-15 lh-18 fw-400 ">{{role.name}}</span>
                    <div class="d-flex">
                        <i class="material-icons-outlined cursor-pointer" @click="updateRole(role)">edit</i>
                        <i class="material-icons-outlined cursor-pointer ms-3 d-none" @click="removeRole(role)">delete</i>
                    </div>
                </div>
            </div>
            <div class="d-flex justify-content-end">
                <span class="text-blue fs-15 lh-18 gilroy-regular fw-400 cursor-pointer" @click="router.push({name: 'Spark.Admin.CreateRole'})">Add new role</span>
            </div>
        </div>

        <div class="d-flex justify-content-between mt-5 pe-5 flex-wrap">
            <span class="gilroy-regular fs-30 lh-33 fw-400 text-blue-dk-1 mb-2 my-auto">Team members</span>
            <FormButton label="Invite team member" class="hpx-39 mb-2 my-auto" @click="showNewMemberModal = true"/>
        </div>

        <div class="d-flex flex-wrap mt-3 mb-3">

                <div class="d-flex col-lg-4 col-md-6 col-sm-6 col-xs-12 mepx-22 wpx-335 pxpx-25 hpx-160 mbpx-20 rounded-px-20 bg-white text-black" v-for="(user, i)  in teams" :key="i">
                    <div class="d-flex my-auto">
                        <UserAvatar 
                            class="my-auto"
                            size="100"
                            :radius="10"
                            radiusUnit="px"
                            :src="user.avatar"
                        />
                        <div class="d-flex flex-column my-auto ms-3">
                            <span class="gilroy-medium fs-18 lh-20 text-blue-dk-1 mb-1">{{user.first_name}} {{user.last_name}}</span>
                            <span class="gilroy-medium fs-10 lh-12 text-secondary-lt-4 mb-3"><span class="text-blue">22</span> workspaces | Backend Developer</span>
                            <div class="d-flex justify-content-between">
                                <FormButton label="Remove" class="perfect-center fs-10 fw-500 text-nowrap bg-blue-lt-13 px-1 hpx-25" customized @click="removeTeamMember(user)"/>
                                <FormButton label="Change Role" class="perfect-center fs-10 fw-500 text-nowrap bg-blue-lt-13 px-1 hpx-25" customized @click="openChangeRolesModal(user)"/>
                            </div>
                        </div>
                    </div>
                </div>
            
                <!-- <div class="d-flex col-lg-4 col-md-6 col-sm-6 col-xs-12 mepx-22 wpx-335 pxpx-25 hpx-160 mbpx-20 rounded-px-20 bg-white text-black" v-for="n in 5" :key="n">
                    <div class="d-flex my-auto">
                        <UserAvatar 
                            class="my-auto"
                            size="100"
                            :radius="10"
                            radiusUnit="px"
                            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80"
                        />
                        <div class="d-flex flex-column my-auto ms-3">
                            <span class="gilroy-medium fs-18 lh-20 text-blue-dk-1 mb-1">Omiwale Rasheed</span>
                            <span class="gilroy-medium fs-10 lh-12 text-secondary-lt-4 mb-3"><span class="text-blue">22</span> workspaces | Backend Developer</span>
                            <div class="d-flex justify-content-between">
                                <FormButton label="Remove" class="perfect-center fs-10 fw-500 text-nowrap bg-blue-lt-13 px-1 hpx-25" customized @click="removeTeamMember(n)"/>
                                <FormButton label="Change Role" class="perfect-center fs-10 fw-500 text-nowrap bg-blue-lt-13 px-1 hpx-25" customized @click="openChangeRolesModal({})"/>
                            </div>
                        </div>
                    </div>
                </div> -->

        </div>

        <ModalBox 
            class="h-100" 
            v-model="showNewMemberModal"
            :staticBackDrop="true"
            :addHeader="true"
            modal-custom-class="workspace-new-member" modalSize="modal-lg" modalWidth="728px"
            modalContentClass="rounded-0"
            @modal:closed="showNewMemberModal = false" :modalId="`modal-view-${Date.now()}`"
          >
          <template #default>
            <div class="d-flex flex-column pxpx-35  pb-4">
                <span class="gilroy-medium fs-25 lh-29 text-black mb-1">Add people to your team</span>
                <span class="gilroy-regular fs-15 lh-18 text-secondary-lt-4 mb-3">Invite additional team members to create an account and make requests</span>
                <div class="d-flex mb-5">
                    <AuthTextInput 
                        wrapper-class="mx-2 w-50" 
                        element-class="auth-element hpx-50 bg-blue-lt-1 rounded-0 border-blue-lt-1" 
                        placeholder="Email" 
                        v-model="form.email"
                        :error-msg="serverError?.email?.[0] || v$.email.$errors[0]?.$message"
                    />
                    <div class="d-flex flex-column w-50">
                        <select v-model="form.role" class="form-select form-select-lg auth-element rounded-0 border-blue-lt-1 ms-2" required>
                            <option value="" disabled selected>Please select role</option>
                            <option :value="role.name" v-for="(role, i) in roles" :key="i">{{ role.name }}</option>
                        </select>
                        <ErrorMessage :msg="serverError?.role?.[0] || v$.role.$errors[0]?.$message"  v-if="serverError?.role?.[0] || v$.role.$errors[0]?.$message"/>
                    </div>

                </div>
                <div class="d-flex">
                    <FormButton label="Send Invite" class="perfect-center h-min-50 wpx-168 me-3" @click="inviteTeamMember"/>
                    <FormButton label="Cancel" class="perfect-center h-min-50 wpx-168" buttonType='outline' @click="showNewMemberModal = false"/>
                </div>
            </div>
          </template>
          </ModalBox>






            <ModalBox 
                class="h-100" 
                v-model="showChangeRolesModal"
                :staticBackDrop="true"
                :addHeader="true"
                modal-custom-class="workspace-new-member" modalSize="modal-lg" modalWidth="600px"
                modalContentClass="rounded-0"
                @modal:closed="showChangeRolesModal = false" :modalId="`modal-view-${Date.now()}`"
              >
              <template #default>
                <div class="d-flex flex-column pxpx-35  pb-4">
                    <span class="gilroy-regular fs-15 lh-18 text-secondary-lt-4 mb-1" v-required>Team member</span>
                    <div class="d-flex flex-column">
                        <span class="auth-element pypx-10 pxpx-15">
                            Omiwale Rasheed
                        </span>
                        <!-- <AuthTextInput 
                            element-class="auth-element hpx-45" 
                            placeholder="Email" 
                            :modelValue="'Omiwale Rasheed'"
                            readonly
                        /> -->
                        <div class="d-flex flex-wrap mt-3">
                            <span 
                                v-for="(role, i) in roles" :key="i"
                                class="cursor-pointer pypx-10 pxpx-16 rounded-px-5 fs-12 fw-400 lh-15 gilroy-regular me-2 mb-2"
                                :class="{'border border-black': !roleForm.roles?.includes(role.id), 'bg-blue text-white': roleForm.roles?.includes(role.id)}"
                                @click="modifyUserRoles(role.id)"
                            >{{role.name}}
                            </span>
                        </div>
                    </div>
                    <div class="d-flex mt-3">
                        <FormButton label="Save" class="perfect-center h-min-50 wpx-168 me-3 rounded-0" @click="submitChangeUserRoles"/>
                        <FormButton label="Cancel" class="perfect-center h-min-50 wpx-168 rounded-0" buttonType='outline' @click="showChangeRolesModal = false"/>
                    </div>
                </div>
              </template>
              </ModalBox>
    </div>
</template>



<script setup lang="ts">
import { Ref, ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import * as HelperService from '@/services/helper-service'
import * as AlertService from '@/services/alert-service'
import { validateInviteUserForm } from '../validator'
import { getRoles, deleteRole, getTeams, getUserRoles, inviteAdmin, changeUserRoles, removeUser } from '../services'
import { deleteData } from '@/globals/helpers'

const router = useRouter()

const roles = ref([] as any)
const teams = ref([] as any)

const {
    isLoading: getRolesIsLoading,
    execute: executeGetRoles
} = getRoles()

const {
    isLoading: getTeamsIsLoading,
    execute: executeGetTeams
} = getTeams()

onMounted(() => {
    sessionStorage.removeItem('@EDITABLE_ROLE')
    executeGetRoles().then((res) => {
        roles.value = res
    })
    executeGetTeams().then((res: any) => {
        teams.value = res
    })
})

const updateRole = (role: any) => {
    HelperService.setSessionStorageItem('@EDITABLE_ROLE', role)
    router.push({ name: 'Spark.Admin.UpdateRole' })
}

const removeRole = (role: any) => {
    deleteData('Delete Role?', "Are you sure you want to delete this? You can't access this role once your delete it", () => {
        const {
            isLoading: deletingRoleIsLoading,
            isSuccessful: deletingRoleIsSuccessful,
            execute: executeDeletingRole
        } = deleteRole(role.id)
        executeDeletingRole().then((res: any) => {
            if (deletingRoleIsSuccessful.value) {
                let index = roles.value.findIndex((r: any) => r.id == role.id)
                roles.value.splice(index, 1)
                AlertService.toast('success', 'Success', res.message)
            }
        })
    })
}



let { form, v$ } = validateInviteUserForm();
const showNewMemberModal = ref(false)
const showChangeRolesModal = ref(false)
const {
    isLoading: inviteAdminIsLoading,
    hasError: inviteAdminHasError,
    isSuccessful: inviteAdminIsSuccessful,
    execute: executeInviteAdmin
} = inviteAdmin()


const inviteTeamMember = () => {
    executeInviteAdmin({ data: form.value }).then((res:any) => {
        if (inviteAdminIsSuccessful.value) {
            AlertService.toast('success', 'Success', res.message)
            showNewMemberModal.value = false
        }
    })
}

const serverError = computed(() => {
    return HelperService.getObjectProperty(inviteAdminHasError, "value.errors", {});
});



const removeTeamMember = (user: any) => {
    deleteData('Delete User?', "Are you sure you want to delete this? You can't access this user after deletion", () => {
        const {
            isLoading: deletingUserIsLoading,
            isSuccessful: deletingUserIsSuccessful,
            execute: executeDeletingUser
        } = removeUser(user.id)
        executeDeletingUser().then((res: any) => {
            if (deletingUserIsSuccessful.value) {
                let index = teams.value.users.findIndex((t: any) => t.id == user.id)
                teams.value.users.splice(index, 1)
                AlertService.toast('success', 'Success', res.message)
            }
        })
    })
}

const roleForm: any = ref({})

const openChangeRolesModal = (user:any) =>{
    roleForm.value.user_id = user.id
    roleForm.value.roles = user.roles.map((role:any)=>role.id)
    // roleForm.value.user_id = 1
    // roleForm.value.roles = [1,3]
    showChangeRolesModal.value=true
}

const modifyUserRoles = (roleId:number) =>{
    if(roleForm.value.roles.includes(roleId)){
        roleForm.value.roles = roleForm.value.roles.filter((id: any)=> id != roleId)
    }else{
        roleForm.value.roles.push(roleId)
    }
}

const {
    isLoading: changeUserRolesIsLoading,
    hasError: changeUserRolesHasError,
    isSuccessful: changeUserRolesIsSuccessful,
    execute: executeChangeUserRoles
} = changeUserRoles()


const submitChangeUserRoles = () => {
    executeChangeUserRoles({ data: roleForm.value }).then((res:any) => {
        if (changeUserRolesIsSuccessful.value) {
            AlertService.toast('success', 'Success', res.message)
            showChangeRolesModal.value=false
        }
    })
}

</script>
