<template>
    <div class="d-flex flex-column px-4">
        <span class="gilroy-medium fs-25 lh-28 text-blue-dk-1">Overview</span>

        <div class="d-flex flex-wrap my-4">

                <div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 mepx-22 wpx-335 ppx-40 hpx-150 mbpx-20 rounded-px-20 bg-white text-black cardShadow">

                        <div class="d-flex justify-content-between">
                            <div class="d-flex flex-column">
                                <span class="gilroy-medium fs-12 lh-14 text-secondary-lt-4">To do</span>
                                <span class="gilroy-medium fs-25 lh-29 text-blue mt-4 text-center">3000 </span>
                            </div>
                            <div class="d-flex flex-column">
                                <span class="gilroy-medium fs-12 lh-14 text-secondary-lt-4">Ongoing</span>
                                <span class="gilroy-medium fs-25 lh-29 text-blue mt-4 text-center">300</span>
                            </div>
                            <div class="d-flex flex-column">
                                <span class="gilroy-medium fs-12 lh-14 text-secondary-lt-4">Completed</span>
                                <span class="gilroy-medium fs-25 lh-29 text-blue mt-4 text-center">100</span>
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
                            <span class="text-blue gilroy-regular fs-30 lh-35 fw-400 mt-1">300</span>
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
                            <span class="text-blue gilroy-regular fs-30 lh-35 fw-400 mt-1">300</span>
                        </div>
                    </div>

                </div>

            </div>

            <span class="gilroy-medium fs-25 lh-28 text-blue-dk-1 mb-2 mt-5">Recent projects</span>

            <div class="d-flex flex-wrap my-3">
                <WorkspaceCardMock :workspace="workspace" v-for="(workspace, i) in workspaces" :key="i"/>
                <WorkspaceCardMock :workspace="workspace" v-for="(workspace, i) in workspaces" :key="i"/>
            </div>

    </div>
</template>



<script lang="ts" setup>
    import WorkspaceCardMock from './components/WorkspaceCardMock.vue'
    
    const projectDetails = {
    title: 'Ebook design for June',
    created_at: '30th of July, 2022  9:45am',
    created_by: 'Walexdgreat',
    designer: 'Amusat Olawale',
    status: 'Ongoing',
    brand: 'Spark',
    dimensions: '1228 by 200, 200 by 200',
    references: 'www.domain1.com, www.domain2.com',
    deliverables: ['Jpg', 'Png', 'Adobe'],
    colors: ['#235eb7', '#2d3c53'],
    users: [
        { id: 1, name: 'Jame Johnson', avatar: tempUserImages.user1 },
        { id: 2, name: 'Waltz Walemon', avatar: tempUserImages.user2 },
        { id: 3, name: 'Waltz Walemon', avatar: tempUserImages.user3 },
        { id: 5, name: 'Titus Thomas', avatar: tempUserImages.user5 },
        { id: 7, name: 'David Dane', avatar: tempUserImages.user7 },
    ],
    attachments: [
        { title: 'Design File', file: 'path/to/design.png', created_at: '12, June, 2022 at 08:28pm' },
        { title: 'Design File', file: 'path/to/design.jpg', created_at: '12, June, 2022 at 08:28pm' },
        { title: 'Design File', file: 'path/to/design.mov', created_at: '12, June, 2022 at 08:28pm' },
        { title: 'Design File', file: 'path/to/design.pdf', created_at: '12, June, 2022 at 08:28pm' },
        { title: 'Design File', file: 'path/to/design.mp4', created_at: '12, June, 2022 at 08:28pm' },
        { title: 'Design File', file: 'path/to/design.mp3', created_at: '12, June, 2022 at 08:28pm' },
        { title: 'Design File', file: 'path/to/design.psd', created_at: '12, June, 2022 at 08:28pm' },
    ]
}

const workspaceMembers = [
    { id: 1, name: 'Jame Johnson', avatar: tempUserImages.user1 },
    { id: 2, name: 'Waltz Walemon', avatar: tempUserImages.user2 },
    { id: 3, name: 'Sarah Song', avatar: tempUserImages.user3 },
    { id: 4, name: 'Borne Banabas', avatar: tempUserImages.user4 },
    { id: 5, name: 'Titus Thomas', avatar: tempUserImages.user5 },
    { id: 6, name: 'Carl Carrison', avatar: tempUserImages.user6 },
    { id: 7, name: 'David Dane', avatar: tempUserImages.user7 },
]

const workspaces = [
    {
        name: 'Workspace 1',
        image: tempUserImages.user1,
        todo: "300",
        ongoing: "400",
        completed: "500",
        created_at: "Sun Jul 09 2023 15:43:06 GMT+0100",
        workspaceMembers: workspaceMembers,
        project: projectDetails
    },
    {
        name: 'Workspace 2',
        image: tempUserImages.user2,
        todo: "700",
        ongoing: "800",
        completed: "900",
        created_at: "Sun Jul 09 2023 15:43:06 GMT+0100",
        workspaceMembers: workspaceMembers,
        project: projectDetails
    },
    {
        name: 'Workspace 3',
        image: tempUserImages.user3,
        todo: "500",
        ongoing: "600",
        completed: "700",
        created_at: "Sun Jul 09 2023 15:43:06 GMT+0100",
        workspaceMembers: workspaceMembers,
        project: projectDetails
    },
    {
        name: 'Workspace 4',
        image: tempUserImages.user4,
        todo: "300",
        ongoing: "400",
        completed: "700",
        created_at: "Sun Jul 09 2023 15:43:06 GMT+0100",
        workspaceMembers: workspaceMembers,
        project: projectDetails
    }
]
</script>