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
            <FormButton label="New project" class="hpx-39 mb-2 my-auto wpx-140" @click="router.push({name:'Clients.Create.Project'})" v-can="'create_request'"/>
        </div>
    </div>
    <img src="@/assets/img/auth/auth-top-right.svg" class="topImage"/>

    <div class="content mt-4 py-3">
        
        
        <Draggable v-model="filteredProjects" v-if="filteredProjects.length" :key="Math.floor(Math.random()*100)">
            <template v-slot:item="{item}">

                <div class="ppx-25 hpx-178 mbpx-20 rounded-px-20 bg-white text-black">
                    <div class="d-flex justify-content-between">
                        <div class="d-flex flex-column mb-auto cursor-pointer" @click="setProjectDetails(item)">
                            <span class="gilroy-medium fs-20 lh-23 text-blue-dk-1">{{item.title}}</span>
                            <span class="gilroy-regular fs-13 lh-15 text-blue-dk-1">{{ item.created_at }}</span>
                        </div>
                        
                  <div class="d-flex">
                    <span
                      class="col-1 mb-auto bg-blue-lt-1 text-blue wpx-132 hpx-31 fs-15 lh-18 rounded-px-3 perfect-center cursor-pointer"
                      @click="duplicateProject(item)"
                      >Duplicate
                    </span>
                    <span
                        v-if="currentTab=='todo'"
                        class="col-1 mb-auto bg-danger text-white wpx-132 hpx-31 fs-15 lh-18 rounded-px-3 perfect-center cursor-pointer ms-3"
                        @click="deleteProjectRequest(item)"
                        >Delete
                    </span>
                  </div>
                    </div>
                    <div class="d-flex mtpx-35">
                        <div class="my-auto me-3">{{ item.status_in_percent }}%</div>
                        <div class="my-auto w-50">
                            <LineProgress :percentage='item.status_in_percent' :showPercentage="false" />
                        </div>

                        <div class="perfect-center bg-blue-lt-1 text-blue-dk-1 w-fit-content hpx-30 fs-15 lh-18 rounded-px-3 px-1 my-auto ms-4">
                            <i class="material-icons me-1 fs-15 lh-18">attach_file</i>
                            <span>{{ item.attachments.length }}</span>
                        </div>
                        <div class="my-auto ms-auto">
                            <MemberCount class="my-auto" :size="40" :users="item.users" componentWidth='wpx-130'/>
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
                <ProjectDetails
                    :projectDetails="project"
                    :workspaceMembers="(workspaceTeamData[0] as Record<string, any>)?.users"
                    @close:project:details="showProjectDetailsModal=false"
                />
            </template>
        </ModalBox>
    </div>

</div>
</template>


<script lang="ts" setup>
    import { getProjectRequests, getWorkspaceTeam, deleteProject } from '../services'
    import { deleteData } from '@/globals/helpers'
    import {type Ref, ref,reactive, onMounted,computed} from 'vue'
    import { dateFormatter, setSessionStorageItem } from '@/services/helper-service'
    import * as AlertService from '@/services/alert-service'
    import {useRouter} from 'vue-router'
    import Draggable from "vue3-draggable";
    import ProjectDetails from './components/ProjectDetails.vue'

    const router = useRouter()
    const project: Ref<Record<string, any>> = ref({})
    const projects = ref([])
    const workspaceTeamData = ref([])

    const showProjectDetailsModal = ref(false)
    const currentTab = ref('all_request')
    const dimensionTabs = reactive([
        {title:'All request',tag:'all_request'},
        {title:'To do',tag:'todo'},
        {title:'Ongoing',tag:'on_going'},
        {title:'In review',tag:'in_review'},
        {title:'Approved',tag:'approved'},
    ])

    const setProjectDetails = (projectDetails: any) => {
        project.value = projectDetails
        showProjectDetailsModal.value = true
    }

    const duplicateProject = (projectDetails: any) => {
        setSessionStorageItem('@projectToDuplicate',projectDetails)
        router.push({name:'Clients.Duplicate.Project'})
    }


    const {
        //isLoading: teamDataIsLoading,
        execute: executeGetTeamData,
    } = getWorkspaceTeam();

    const {
        //isLoading: projectRequestIsLoading,
        execute: executeGetProjectRequests,
    } = getProjectRequests();

    onMounted(() => {
        executeGetTeamData().then((res: any) => {
            workspaceTeamData.value = res.data
        })
        executeGetProjectRequests().then((res: any) => {
            projects.value = res.map((p: any) => {
                let project: Record<string, any> = {}
                project = Object.assign({}, project, {
                    title: p.title,
                    description: p.description,
                    id: p.id,
                    designer: p.designer,
                    status: p.status,
                    deliverables: p.deliverables,
                    colors: p.colors,
                    uploaded_files: p.uploaded_files,
                    brand: p.brand,
                    pm: p.pm,
                    created_by: p.created_by,

                    status_in_percent: statusInPercent(p.status),
                    //dimensions: JSON.parse(p.dimension),
                    dimensions: p.dimension,
                    references: Array.isArray(p.example_links) && !p.example_links[0] ? null : p.example_links,
                    attachments: p.example_uploads || [],
                    users: p.project_user,
                    created_at: `${dateFormatter(p?.created_at, 'do MMMM, yyyy')} at ${dateFormatter(p?.created_at, 'h:mm aaaa')}`,
                })
                return project
            })
        })
    })

    const statusInPercent = (status: string) => {
        return {
            'todo': 25,
            'on_going': 50,
            'in_review': 75,
            'approved': 100,
        }[status]
    }

    const filteredProjects = computed(() => {
        if (currentTab.value == 'all_request') {
                return projects.value
        } else {
            return projects.value.filter((p:any)=>p.status == currentTab.value)
        }
    })

    const deleteProjectRequest = (project: any) => {
        if (project.status == 'todo') {
            deleteData('Delete Project?', "Are you sure you want to delete this? You can't access this project once your delete it", () => {
                const {
                    //isLoading: deletingProjectIsLoading,
                    isSuccessful: deletingProjectIsSuccessful,
                    execute: executeDeleteProject,
                } = deleteProject(project.id);

                executeDeleteProject().then((res: any) => {
                    if (deletingProjectIsSuccessful.value) {
                        let projectIndex = projects.value.findIndex((p: any) => p.id == project.id)
                        projects.value.splice(projectIndex, 1)
                        AlertService.toast('success', 'Success', res.message)
                    }
                })
            })
        }
    }
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