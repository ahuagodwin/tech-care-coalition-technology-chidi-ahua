<template>
    <div class="d-flex flex-column px-4">
        <span class="gilroy-medium fs-25 lh-28 text-blue-dk-1 mb-2 mt-5">New Request</span>

        <div class="d-flex flex-wrap my-3">
            <WorkspaceCardMock :workspace="workspace" v-for="(workspace, i) in workspaces" :key="i"/>
        </div>


        <span class="gilroy-medium fs-25 lh-28 text-blue-dk-1 mb-2 mt-5">Other Request</span>

        <div class="d-flex flex-wrap my-3">
            <WorkspaceCardMock :workspace="workspace" v-for="(workspace, i) in workspaces" :key="i"/>
            <WorkspaceCardMock :workspace="workspace" v-for="(workspace, i) in workspaces" :key="i"/>
        </div>
    </div>
</template>



<script lang="ts" setup>
import WorkspaceCardMock from './components/WorkspaceCardMock.vue'

const company_users = [
    { id: 1, first_name: 'Jame', last_name: 'Johnson', avatar: tempUserImages.user1 },
    { id: 2, first_name: 'Waltz', last_name: 'Walemon', avatar: tempUserImages.user2 },
    { id: 3, first_name: 'Sarah', last_name: 'Song', avatar: tempUserImages.user3 },
    { id: 5, first_name: 'Titus', last_name: 'Thomas', avatar: tempUserImages.user5 },
    { id: 7, first_name: 'David', last_name: 'Dane', avatar: tempUserImages.user7 },
]

const workspaceMembers = [
    { id: 1, first_name: 'Jame', last_name: 'Johnson', avatar: tempUserImages.user1 },
    { id: 2, first_name: 'Waltz', last_name: 'Walemon', avatar: tempUserImages.user2 },
    { id: 3, first_name: 'Sarah', last_name: 'Song', avatar: tempUserImages.user3 },
    { id: 4, first_name: 'Borne', last_name: 'Banabas', avatar: tempUserImages.user4 },
    { id: 5, first_name: 'Titus', last_name: 'Thomas', avatar: tempUserImages.user5 },
    { id: 6, first_name: 'Carl', last_name: 'Carrison', avatar: tempUserImages.user6 },
    { id: 7, first_name: 'David', last_name: 'Dane', avatar: tempUserImages.user7 },
]

const workspaces = [
    {
        name: 'Workspace 1',
        avatar: tempUserImages.user1,
        todo: "300",
        on_going: "400",
        completed: "500",
        created_at: "Sun Jul 09 2023 15:43:06 GMT+0100",
        workspaceMembers: workspaceMembers,
        company_users: company_users
    },
    {
        name: 'Workspace 2',
        avatar: tempUserImages.user2,
        todo: "700",
        on_going: "800",
        completed: "900",
        created_at: "Sun Jul 09 2023 15:43:06 GMT+0100",
        workspaceMembers: workspaceMembers,
        company_users: company_users
    },
    {
        name: 'Workspace 3',
        avatar: tempUserImages.user3,
        todo: "500",
        on_going: "600",
        completed: "700",
        created_at: "Sun Jul 09 2023 15:43:06 GMT+0100",
        workspaceMembers: workspaceMembers,
        company_users: company_users
    },
    {
        name: 'Workspace 4',
        avatar: tempUserImages.user4,
        todo: "300",
        on_going: "400",
        completed: "700",
        created_at: "Sun Jul 09 2023 15:43:06 GMT+0100",
        workspaceMembers: workspaceMembers,
        company_users: company_users
    },
    {
        name: 'Workspace 5',
        avatar: tempUserImages.user5,
        todo: "100",
        on_going: "500",
        completed: "700",
        created_at: "Sun Jul 09 2023 15:43:06 GMT+0100",
        workspaceMembers: workspaceMembers,
        company_users: company_users
    }
]
</script>