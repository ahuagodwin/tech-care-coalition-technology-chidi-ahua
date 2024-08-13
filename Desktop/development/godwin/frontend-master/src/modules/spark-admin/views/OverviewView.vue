<template>
    <div class="d-flex flex-column px-4">
        <span class="gilroy-medium fs-25 lh-28 text-blue-dk-1">Overview</span>

        <div class="d-flex flex-wrap my-4">

                <div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 mepx-22 wpx-335 ppx-40 hpx-150 mbpx-20 rounded-px-20 bg-white text-black cardShadow">

                        <div class="d-flex justify-content-between">
                            <div class="d-flex flex-column">
                                <span class="gilroy-medium fs-12 lh-14 text-secondary-lt-4">To do</span>
                                <span class="gilroy-medium fs-25 lh-29 text-blue mt-4 text-center">{{ overview.todo}} </span>
                            </div>
                            <div class="d-flex flex-column">
                                <span class="gilroy-medium fs-12 lh-14 text-secondary-lt-4">Ongoing</span>
                                <span class="gilroy-medium fs-25 lh-29 text-blue mt-4 text-center">{{overview.on_going}}</span>
                            </div>
                            <div class="d-flex flex-column">
                                <span class="gilroy-medium fs-12 lh-14 text-secondary-lt-4">Completed</span>
                                <span class="gilroy-medium fs-25 lh-29 text-blue mt-4 text-center">{{ overview.approved}}</span>
                            </div>
                        </div>

                    </div>

                <div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 mepx-22 wpx-335 ppx-40 hpx-150 mbpx-20 rounded-px-20 bg-white text-black cardShadow">

                    <div class="d-flex">
                        <span class="bg-blue-lt-1 wpx-73 hpx-73 perfect-center rounded-circle my-auto">
                            <i class="material-icons-outlined fs-32 lh-32 text-blue">groups</i>
                        </span>
                        <div class="d-flex flex-column my-auto ms-2">
                            <span class="text-blue-dk-2 gilroy-regular fs-15 lh-18 fw-400">Total Workspace</span>
                            <span class="text-blue gilroy-regular fs-30 lh-35 fw-400 mt-1">{{ overview.total_workspace }}</span>
                        </div>
                    </div>

                </div>

                <div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 mepx-22 wpx-335 ppx-40 hpx-150 mbpx-20 rounded-px-20 bg-white text-black cardShadow">

                    <div class="d-flex">
                        <span class="bg-blue-lt-1 wpx-73 hpx-73 perfect-center rounded-circle my-auto">
                            <i class="material-icons-outlined fs-32 lh-32 text-blue">groups</i>
                        </span>
                        <div class="d-flex flex-column my-auto ms-2">
                            <span class="text-blue-dk-2 gilroy-regular fs-15 lh-18 fw-400">Total Board</span>
                            <span class="text-blue gilroy-regular fs-30 lh-35 fw-400 mt-1">{{ overview.total_board || 0 }}</span>
                        </div>
                    </div>

                </div>

            </div>

            <span class="gilroy-medium fs-25 lh-28 text-blue-dk-1 mb-2 mt-5">Recent projects</span>

            <div class="d-flex flex-wrap my-3">
                <WorkspaceCard :workspace="workspace" v-for="(workspace, i) in overview.new_projects" :key="i"/>
                <!-- <WorkspaceCard :workspace="workspace" v-for="(workspace, i) in workspaces" :key="i"/> -->
            </div>

    </div>
</template>



<script lang="ts" setup>
import { ref } from 'vue'
    import WorkspaceCard from './components/WorkspaceCard.vue'
    import { getOverview } from '../services'
    
    const overview = ref({} as any)

    const {
        isLoading: overviewIsLoading,
        execute: executeGetOverview
    } = getOverview()

    executeGetOverview().then((res: any) => {
        
        overview.value = Object.assign({}, res, {
            new_projects: res.new_projects.map((workspace: any) => {
                let users = workspace.company_users.map((user: any) => user.user)
                workspace.company_users = users
                return workspace
            })
        })
    })
</script>