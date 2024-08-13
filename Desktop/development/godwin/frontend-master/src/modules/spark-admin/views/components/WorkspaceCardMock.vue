<template>
    <div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 mepx-22 wpx-335 ppx-30 hpx-179 mbpx-20 rounded-px-20 bg-white text-black">
        <div class="d-flex flex-column">
            <div class="cursor-pointer" @click="router.push({name:'Spark.Admin.Request', params:{ workspaceId :1}})">
                <div class="d-flex">
                    <UserAvatar 
                        class="my-auto"
                        size="38" 
                        :src="workspace.avatar"
                    />
                    <span class="my-auto text-blue-dk-1 gilroy-regular fs-25 lh-28 fw-400 ms-2" @click="emit('workspace:clicked', true)">{{ workspace.first_name}} {{ workspace.last_name }}</span>
                </div>
                <div class="d-flex mtpx-10">
                    <span class="my-auto gilroy-regular fs-13 lh-15 fw-400 me-1">To do</span>
                    <span class="my-auto text-blue gilroy-bold fs-13 lh-15 fw-400 me-1">{{ workspace.todo}}</span>
                    <span class="my-auto gilroy-regular fs-13 lh-15 fw-400 me-1">Ongoin</span>
                    <span class="my-auto text-blue gilroy-bold fs-13 lh-15 fw-400 me-1">{{ workspace.on_going }}</span>
                    <span class="my-auto gilroy-regular fs-13 lh-15 fw-400 me-1">Completed</span>
                    <span class="my-auto text-blue gilroy-bold fs-13 lh-15 fw-400">{{workspace.completed}}</span>
                </div>
                <div class="d-flex mtpx-10">
                    <span class="hpx-25 rounded-px-3 px-4 perfect-center gilroy-regular fs-8 lh-11 bg-blue text-white">Plan + Copywriting</span>
                </div>
            </div>
            <div class="d-flex justify-content-between mtpx-10">
                <span class="my-auto gilroy-regular fs-10 lh-12 fw-400 text-nowrap">Created  {{ dateFormatter(workspace?.created_at, 'do MMMM, yyyy') }} at {{ dateFormatter(workspace?.created_at, 'h:mm aaaa') }}</span>

                <MemberCount 
                    class="my-auto" 
                    :size="25" 
                    :users="workspace.company_users" 
                    addUser
                    :team="workspace.workspaceMembers"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { dateFormatter } from '@/services/helper-service'
    import { ref } from 'vue'
    import { useRouter } from 'vue-router'


    const router = useRouter()

    interface WorkspaceProps {
        workspace: Record<string, any>;
    }
    //eslint-disable-next-line
    const props = withDefaults(defineProps<WorkspaceProps>(), {})
    //eslint-disable-next-line
    const emit = defineEmits(['workspace:clicked'])
</script>