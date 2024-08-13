<template>
<div class="d-flex flex-column px-4">

    <div class="workspace-bg rounded-px-20 d-flex justify-content-between mt-5 px-5 flex-wrap">
        <div class="d-flex my-auto">
            <UserAvatar 
                class="my-auto"
                size="100" 
                :src="teamData?.avatar"
            />
            <div class="d-flex flex-column my-auto ms-3">
                <div class="d-flex">
                    <span class="gilroy-medium fs-30 lh-35 text-white mb-2 my-auto">{{ teamData?.name || 'No Workspace Name' }}</span>
                    <i class="material-icons-outlined my-auto ms-3 text-white fs-18 cursor-pointer" @click="openEditWorkspaceModal = true">edit</i>
                </div>
                <span class="gilroy-regular fs-20 lh-23 text-white">My workspace</span>
            </div>
        </div>
        <span 
            @click="showNewMemberModal = true"
            class="cursor-pointer my-auto d-flex justify-content-center align-items-center wpx-246 hpx-42 bg-blue-lt-1 text-blue-dk-1 gilroy-regular fs-20 lh-23 rounded-px-10"
        >
            Invite team member
        </span>
    </div>

    <div class="d-flex flex-wrap mt-5 mb-3">

        <div class="d-flex col-lg-4 col-md-6 col-sm-6 col-xs-12 mepx-22 wpx-335 pxpx-25 hpx-160 mbpx-20 rounded-px-20 bg-white text-black" v-for="(user,i) in teamData?.users" :key="i">
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
                    <span class="gilroy-medium fs-10 lh-12 text-secondary-lt-4 mb-3">{{user.user_type}}</span>
                    <FormButton label="Delete" class="perfect-center hpx-25" variant='light' @click="deleteWorkspaceStaff(user)"/>
                </div>
            </div>
        </div>

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
            <div class="mb-3 d-flex mb-5">
                <AuthTextInput 
                    wrapper-class="me-2" 
                    element-class="auth-element hpx-50 bg-blue-lt-1 rounded-0 border-blue-lt-1" 
                    placeholder="Name" 
                    v-model="form.name"
                    :error-msg="serverError?.name?.[0]"
                />
                <AuthTextInput 
                    wrapper-class="mx-2" 
                    element-class="auth-element hpx-50 bg-blue-lt-1 rounded-0 border-blue-lt-1" 
                    placeholder="Email" 
                    v-model="form.email"
                    :error-msg="serverError?.email?.[0]"
                />
                <AuthTextInput 
                    wrapper-class="ms-2" 
                    element-class="auth-element hpx-50 bg-blue-lt-1 rounded-0 border-blue-lt-1" 
                    placeholder="Role" 
                    v-model="form.role"
                    :error-msg="serverError?.role?.[0]"
                />
            </div>
            <div class="d-flex">
                <FormButton label="Send Invite" class="perfect-center h-min-50 wpx-168 me-3" @click="submit"/>
                <FormButton label="Cancel" class="perfect-center h-min-50 wpx-168" buttonType='outline' @click="showNewMemberModal = false"/>
            </div>
        </div>
      </template>
      </ModalBox>


       <ModalBox 
            class="h-100" 
            v-model="openEditWorkspaceModal" 
            :staticBackDrop="true"
            modalContentClass="rounded-0"
            modal-custom-class="category-class" modalSize="modal-lg" modalWidth="390px"
            @modal:closed="openEditWorkspaceModal = false" :modalId="`modal-oti-${Date.now()}`"
        >
            <template #default>
                <div class="position-relative">
                    <i class="material-icons-outlined fs-20 lh-20 text-blue-dk-2 fw-bold position-absolute end-0 cursor-pointer" @click="openEditWorkspaceModal = false">close</i>

                    <div class="d-flex flex-column">
                        <span class="gilroy-regular fs-25 lh-28 fw-500">Change workspace name</span>
                        <span class="gilroy-regular fs-15 lh-18 fw-400 text-secondary-lt-4 mt-2">Enter your preferred name and save to update</span>
                    </div>
                    <div class="d-flex flex-column py-3">
                        <AuthTextInput 
                            element-class="auth-element hpx-50 rounded-0"
                            placeholder="Category Name" 
                            v-model="workspaceName"
                        />
                        <div class="d-flex mt-3">
                            <FormButton label="Cancel" class="w-50 hpx-40 rounded-0" buttonType="outline"/>
                            <FormButton label="Save Category" class="w-50 hpx-40 rounded-0 ms-4"/>
                        </div>
                    </div>
                </div>
            </template>
        </ModalBox>

</div>
</template>


<script lang="ts" setup>
    import {getWorkspaceTeam,addWorkspaceMember,deleteWorkspaceMember} from '../services'
    import {ref,reactive, onMounted,computed} from 'vue'
    import {validateNewWorkspaceMember} from '../validator'
    import * as HelperService from '@/services/helper-service'
    import * as AlertService from '@/services/alert-service'


    const workspaceTeamData = ref({} as any)
    const showNewMemberModal = ref(false)
    const openEditWorkspaceModal = ref(false)
    const workspaceName = ref('')

    let { form, v$ } = validateNewWorkspaceMember();



    const {
        isLoading: teamDataIsLoading,
        execute: executeGetTeamData,
    } = getWorkspaceTeam();

    const {
        isLoading: savingWorkspaceMemberIsLoading,
        error: savingWorkspaceMemberError,
        isSuccessful: savingWorkspaceMemberIsSuccessful,
        execute: executeSaveWorkspaceMember,
    } = addWorkspaceMember(form.value);



    onMounted(()=>{
        executeGetTeamData({params:{company_id: 1}}).then((res:any)=>{
            workspaceTeamData.value = res.data
        })
    })

    const teamData = computed(()=>{
        return workspaceTeamData.value
    })


    const submit = () =>{
        v$.value.$validate();
        if(v$.value.$invalid) return;
        executeSaveWorkspaceMember({data:form.value}).then((res: any) => {
            if (savingWorkspaceMemberIsSuccessful.value) {
                AlertService.toast('success','Success',res.message)
            }
        })
    }


    const deleteWorkspaceStaff = (staff:any)=>{
        AlertService.fire({
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
        customClass: {
          confirmButton: 'btn hpx-40 wpx-140 rounded-0 d-flex justify-content-center align-items-center bg-blue border border-0',
          cancelButton: 'btn hpx-40 wpx-140 rounded-0 d-flex justify-content-center align-items-center bg-white border-blue text-blue border',
          popup:'wpx-350 rounded-0',
          htmlContainer:'mx-1 text-start',
        },
        showCancelButton:true,
        reverseButtons:true,
        allowOutsideClick:false,
        html:`<div class="d-flex flex-column">
            <div class='px-4 gilroy-bold text-secondary-dk-1 fs-18 lh-23 fw-700'>Delete brand?</div>
            <div class="message fs-14 lh-18 fw-400 mx-auto mt-3 px-4 gilroy-regular" style="color:#757575;">
              Are you sure you want to delete this? You can't access this brand once your delete it
            </div>
          </div>`
      }).then((res)=>{
        if(res.isConfirmed){
            const {
                isLoading: deletingWorkspaceMemberIsLoading,
                isSuccessful: deletingWorkspaceMemberIsSuccessful,
                execute: executeDeleteWorkspaceMember,
            } = deleteWorkspaceMember(staff.id);

            executeDeleteWorkspaceMember().then((res:any)=>{
                if (deletingWorkspaceMemberIsSuccessful.value) {
                    AlertService.toast('success','Success',res.message)
                }
            })
        }
      })
    }


    const serverError = computed(() => {
        return HelperService.getObjectProperty(savingWorkspaceMemberError, "value.errors", {});
    });
</script>


<style>
    .workspace-bg{
        background-image: url(@/assets/img/clients/workspacebg.svg);
        background-repeat: no-repeat;
        background-size:cover;
        min-height: 160px;
    }
</style>