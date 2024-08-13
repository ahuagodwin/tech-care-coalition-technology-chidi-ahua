<template>
<div class="d-flex flex-column px-4">
    <div class="header d-flex justify-content-between">
        <div class="d-flex flex-wrap">
            <span 
                v-for="(tab,i) in dimensionTabs"
                :key="i"
                class="cursor-pointer fs-15 ls-18 me-5 mtpx-10"
                :class="[{'active border-bottom border-blue border-2':tab.tag==currentTab}]"
                @click="currentTab=tab.tag"
            >{{tab.title}}
            </span>
        </div>
       <div class="flex-grow-1 ms-3 text-end">
            <FormButton label="New project" class="hpx-39 mb-2 my-auto wpx-140" @click="router.push({name:'Clients.Create.Project'})"/>
        </div>
    </div>
    <img src="@/assets/img/auth/auth-top-right.svg" class="topImage"/>

    <div class="content mt-4 py-3">
        
        
        <Draggable v-model="items">
            <template v-slot:item="{item}">

                <div class="ppx-25 hpx-178 mbpx-20 rounded-px-20 bg-white text-black">
                    <div class="d-flex justify-content-between">
                        <div class="d-flex flex-column mb-auto">
                            <span class="gilroy-medium fs-30 lh-35 text-blue-dk-1">Ebook design {{item}}</span>
                            <span class="gilroy-regular fs-15 lh-18 text-blue-dk-1">Created  20th july, 2020 at 1:33pm</span>
                        </div>
                        <span 
                            class="col-1 mb-auto bg-blue-lt-1 text-blue wpx-132 hpx-31 fs-15 lh-18 rounded-px-3 perfect-center cursor-pointer" 
                            @click="showProjectDetailsModal=true">Duplicate</span>
                    </div>
                    <div class="d-flex mtpx-35">
                        <div class="my-auto me-3">26%</div>
                        <div class="my-auto w-50">
                            <LineProgress :percentage='26' :showPercentage="false" />
                        </div>

                        <div class="perfect-center bg-blue-lt-1 text-blue-dk-1 w-fit-content hpx-30 fs-15 lh-18 rounded-px-3 px-1 my-auto ms-4">
                            <i class="material-icons me-1 fs-15 lh-18">attach_file</i>
                            <span>11</span>
                        </div>
                        <div class="my-auto ms-auto">
                            <MemberCount class="my-auto" :size="40" :users="projectDetails.users" componentWidth='wpx-130'/>
                        </div>
                    </div>
                </div>

            </template>
        </Draggable>        

        <ModalBox 
            class="h-100" 
            v-model="showProjectDetailsModal" 
            :staticBackDrop="true"
            modal-custom-class="request-page-class" modalSize="modal-lg" modalWidth="1100px"
            @modal:closed="showProjectDetailsModal=false" :modalId="`modal-chat-${Date.now()}`"
        >
            <template #default>
                <ProjectDetailsMock 
                    :projectDetails="projectDetails"
                    :workspaceMembers="workspaceMembers"
                    @close:project:details="showProjectDetailsModal=false"
                />
            </template>
        </ModalBox>
    </div>

</div>
</template>


<script lang="ts" setup>
    import {ref,reactive, onMounted,computed} from 'vue'
    import {validateNewWorkspaceMember} from '../validator'
    import * as HelperService from '@/services/helper-service'
    import * as AlertService from '@/services/alert-service'
    import {useRouter} from 'vue-router'
    import Draggable from "vue3-draggable";
    import ProjectDetailsMock from './components/ProjectDetailsMock.vue'

    const router = useRouter()

    const showProjectDetailsModal = ref(false)
    const currentTab = ref('all_request')
    const dimensionTabs = reactive([
        {title:'All request',tag:'all_request'},
        {title:'To do',tag:'to_do'},
        {title:'Ongoing',tag:'ongoing'},
        {title:'In review',tag:'in_review'},
        {title:'Approved',tag:'approved'},
    ])

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
        colors: ['#235eb7','#2d3c53'],
        users: [
            {id:1, name: 'Jame Johnson', avatar: tempUserImages.user1 },
            {id:2, name: 'Waltz Walemon', avatar: tempUserImages.user2 },
            {id:3, name: 'Waltz Walemon', avatar: tempUserImages.user3},
            {id:5, name: 'Titus Thomas', avatar: tempUserImages.user5 },
            {id:7, name: 'David Dane', avatar: tempUserImages.user7 },
        ],
        attachments: [
            {title: 'Design File', file: 'path/to/design.png', created_at: '12, June, 2022 at 08:28pm'},
            {title: 'Design File', file: 'path/to/design.jpg', created_at: '12, June, 2022 at 08:28pm'},
            {title: 'Design File', file: 'path/to/design.mov', created_at: '12, June, 2022 at 08:28pm'},
            {title: 'Design File', file: 'path/to/design.pdf', created_at: '12, June, 2022 at 08:28pm'},
            {title: 'Design File', file: 'path/to/design.mp4', created_at: '12, June, 2022 at 08:28pm'},
            {title: 'Design File', file: 'path/to/design.mp3', created_at: '12, June, 2022 at 08:28pm'},
            {title: 'Design File', file: 'path/to/design.psd', created_at: '12, June, 2022 at 08:28pm'},
        ]
    }

    const workspaceMembers = [
        {id:1, name: 'Jame Johnson', avatar: tempUserImages.user1 },
        {id:2, name: 'Waltz Walemon', avatar: tempUserImages.user2 },
        {id:3, name: 'Sarah Song', avatar: tempUserImages.user3 },
        {id:4, name: 'Borne Banabas', avatar: tempUserImages.user4 },
        {id:5, name: 'Titus Thomas', avatar: tempUserImages.user5 },
        {id:6, name: 'Carl Carrison', avatar: tempUserImages.user6 },
        {id:7, name: 'David Dane', avatar: tempUserImages.user7 },
    ]

    const items = ref([1,2,3,4,5])
</script>


<style lang="scss" scoped>
    ::v-deep(.request-page-class){
        @media (min-width: 992px){
            .modal-lg, .modal-xl {
                --bs-modal-width: 1500px!important;
            }
        }
        .modal-body{
            padding:0;
        }
    }
    .header{
        span{
            font-family:Gilroy-Regular;
            &.active{
                font-family:Gilroy-Bold;
            }
        }
    }
    .content{
        height:600px;
        overflow-y: scroll;
    }

        
    .topImage{
        position: absolute;
        top: 190px;
        right: 0px;
        z-index: -1000;
    }
</style>