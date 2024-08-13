<template>
    <div class="d-flex flex-column px-4">
        <div class="role-form-field d-flex flex-column">
            <span class="gilroy-regular fs-16 lh-18 fw-400">Role</span>
            <div class="">
                <AuthTextInput 
                    element-class="auth-element hpx-50 rounded-0" 
                    required 
                    placeholder="eg. Motion Designer" 
                    v-model="form.role_name"
                    :error-msg="serverError.role_name?.[0]"
                />
            </div>
        </div>
        <div class="d-flex flex-column mt-4 bg-white py-4 px-5">
            <div  class="role-section d-flex flex-column mb-3" v-for="(section, i) in permissionSections" :key="i">
                <span class="gilroy-medium fs-15 lh-18 fw-500">{{section.name}}s</span>
                <div class="abilities d-flex flex-column pt-2">
                    <div class="form-check" v-for="(permission, j) in section.permissions" :key="j">
                        <input class="form-check-input" type="checkbox" :value="permission.id" :id="permission.ability" v-model="form.permission_ids">
                        <label class="form-check-label gilroy-regular fs-14 ls-16 fw-400" :for="permission.ability">
                            {{ permission.name}}
                        </label>
                    </div>
                </div>
            </div>
        </div>
        <div class="d-flex mt-4">
            <FormButton label="Save" class="hpx-40 rounded-0 px-4 me-3" @click="submitRole"/>
            <FormButton label="Cancel" class="hpx-40 rounded-0 px-4" button-type="outline"  @click="router.push({ name: 'Spark.Admin.MyTeam' })"/>
        </div>
    </div>
</template>




<script setup lang="ts">
    import { ref, onMounted, computed } from 'vue'
    import { useRouter, useRoute } from 'vue-router'
    import {getObjectProperty, getSessionStorageItem} from '@/services/helper-service'
    import * as AlertService from '@/services/alert-service'
    import { getPermissions, createRole, updateRole } from '../services'
    
    const route = useRoute()
    const router = useRouter()

    

    const pageIsForUpdatingRole = computed(()=>{
        return route.name == 'Spark.Admin.UpdateRole'
    })

    const form = ref({
        role_name:'',
        permission_ids:[]
    })

    const permissionSections = ref([] as any)
    const editableRole = ref({} as any)

    const {
        isLoading: getPermissionsIsLoading,
        execute: executeGetPermissions
    } = getPermissions()

    onMounted(()=>{
        executeGetPermissions().then((res) => {
            permissionSections.value = res
        })
        if (pageIsForUpdatingRole.value) {
            editableRole.value = getSessionStorageItem('@EDITABLE_ROLE')
            form.value.role_name = editableRole.value.name
            form.value.permission_ids = editableRole.value.permissions.map((p:any)=> p.id)
        }
    })

    const {
        isLoading: addRoleIsLoading,
        hasError: addRoleHasError,
        isSuccessful: addRoleIsSuccessful,
        execute: executeAddRole
    } = pageIsForUpdatingRole.value ? updateRole () : createRole()


const submitRole = () => {
        const roleData = { data: form.value }
        if (pageIsForUpdatingRole.value) {
            (roleData as any).url = `/api/admin/roles/${editableRole.value.id}`
        }
        executeAddRole(roleData).then((res: any) => {
            if (addRoleIsSuccessful.value) {
                AlertService.toast('success', 'Success', res.message)
                if (pageIsForUpdatingRole.value) {
                    sessionStorage.removeItem('@EDITABLE_ROLE')
                }
                router.push({ name: 'Spark.Admin.MyTeam' })
            }
        })
    }

    const serverError = computed(() => {
        return getObjectProperty(addRoleHasError, "value.errors", {});
    });
</script>