<template>
    <div class="d-flex flex-column px-4">
        <span class="gilroy-medium fs-25 lh-28 text-blue-dk-1 mb-2 mt-5">New Request</span>

        <div class="d-flex flex-wrap my-3">
            <WorkspaceCard :workspace="workspace" v-for="(workspace, i) in recent_workspaces" :key="i"/>
        </div>


        <span class="gilroy-medium fs-25 lh-28 text-blue-dk-1 mb-2 mt-5">Other Request</span>

        <div class="d-flex flex-wrap my-3">
            <WorkspaceCard :workspace="workspace" v-for="(workspace, i) in other_workspaces" :key="i"/>
            <WorkspaceCard :workspace="workspace" v-for="(workspace, i) in other_workspaces" :key="i"/>
        </div>
    </div>
</template>



<script lang="ts" setup>
import { ref } from 'vue'
import WorkspaceCard from './components/WorkspaceCard.vue'
import { getWorkspaces } from '../services'

const recent_workspaces = ref({} as any)
const other_workspaces = ref({} as any)

const {
    isLoading: workspaceIsLoading,
    execute: executeGetWorkspace
} = getWorkspaces()

executeGetWorkspace().then((res: any) => {
    recent_workspaces.value = res.new_projects.map((workspace: any) => {
        let users = workspace.company_users.map((user: any) => user.user)
        workspace.company_users = users
        return workspace
    })
    other_workspaces.value = res.others.map((workspace: any) => {
        let users = workspace.company_users.map((user: any) => user.user)
        workspace.company_users = users
        return workspace
    })

})
</script>