<template>
    <div class="row">
                    <div class="col-8 col-md-8 col-sm-6 p-0">
                        <div class="d-flex flex-column h-100">
                            <div class="d-flex flex-column px-5 py-3">
                                <span class="gilroy-medium fs-30 lh-35 text-blue-dk-1 mb-3">{{projectDetails.title}}</span>
                                <span class="gilroy-regular fs-15 lh-18 text-blue-dk-1 mb-3">Submitted {{projectDetails.created_at}}  via App  by {{ getFullName(projectDetails.created_by) || 'N/A'}}</span>
                                <div class="d-flex">
                                    <MemberCount 
                                        v-if="projectDetails.users"
                                        class="my-auto" 
                                        :size="40" 
                                        :users="projectDetails.users" 
                                        componentWidth='wpx-130'
                                        addUser
                                        :team="projectTeam"
                                        @selected:user:ids="getCheckedValue"
                                    />
                                    <div class="gilroy-regular fs-18 lh-21 my-auto ms-5"><span class="gilroy-medium">Designer: </span> {{getFullName(projectDetails.designer) || 'N/A'}} </div>
                                    <div class="d-flex gilroy-medium fs-18 lh-21 my-auto ms-5">
                                        <span class="my-auto me-3">Status:</span>
                                        <span class="my-auto text-white bg-blue rounded-px-4 hpx-25 px-3 perfect-center fs-12 lh-15">{{projectDetails.status}}</span>
                                    </div>
                                </div>
                            </div>
                            
                            <ChatArea 
                                v-if="projectDetails?.id" 
                                :chats="chats" 
                                :project-id="projectDetails?.id"
                                ref="chatArea"
                            />
                            
                            
                            <!-- <div class="chat-area d-flex flex-column mt-auto px-5 py-3">
                                <div class="chat-messages hpx-450 overflow-auto mb-2">
                                    
                                    <div class="d-flex mb-4" v-for="(chat, i) in chats" :key="i">
                                        <UserAvatar 
                                            class="mb-auto"
                                            :class="{'order-2': !chat.is_from_client}"
                                            size="30" 
                                            :src="chat.user.avatar"
                                        />
                                        <div class="my-auto d-flex flex-column" :class="!chat.is_from_client ? ' me-3 order-1 align-items-end' : 'ms-3'">
                                            <div class="d-flex mb-2">
                                                <span class="my-auto gilroy-medium fs-15 lh-18 me-2">{{chat.user.first_name}} {{chat.user.last_name}}</span>
                                                <span class="my-auto text-white bg-blue rounded-px-4 hpx-17 px-3 perfect-center gilroy-regular fs-10 lh-12" v-if="chat.is_from_author">Author</span>
                                            </div>
                                            <div class="chat-message d-flex flex-column rounded-px-10 w-60 p-2 mb-1">
                                                <span class="gilroy-regular fs-12 lh-20">
                                                    {{chat.message}}
                                                </span> 
                                                <div class="d-flex mt-2 cursor-pointer" v-for="(file, i) in chat.files" :key="i">
                                                    <img :src="require(`@/assets/img/file-formats/${file?.split('.')?.pop() || 'png'}.svg`)" class="me-1 my-auto wpx-13"/>
                                                    <span class="text-blue gilroy-medium fs-10 lh-12 my-auto">{{ file }}</span>
                                                </div>
                                            </div>
                                            <span class="time gilroy-regular fs-10 lh-12 text-blue-dk-1">{{chat.created_at}}</span>
                                        </div>
                                    </div>

                                </div>

                               <div class="chat-input d-flex align-items-center mt-auto rounded-px-10 px-3 hpx-55">
                                    <UserAvatar 
                                        class="my-auto"
                                        size="30" 
                                        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80"
                                    />
                                    <div class="my-auto d-flex wpx-470">
                                        <AuthTextInput 
                                            v-model="newMessage"
                                            class="ms-3 w-100 my-auto"
                                            element-class="auth-element rounded-0" 
                                            placeholder="Type your message here"
                                        />
                                    </div>
                                    <div class="my-auto d-flex ms-auto">
                                        <span class="material-icons cursor-pointer text-blue fs-30 my-auto me-2">send</span>
                                        <span class="material-icons cursor-pointer text-blue fs-25 fw-700 my-auto me-2">attach_file</span>
                                        <span class="material-icons cursor-pointer text-blue fs-30 my-auto d-none">mic</span>
                                    </div>
                               </div>

                            </div> -->





                        </div>
                    </div>
                    <div class="col-4 col-md-4 col-sm-6">
                        <div class="d-flex flex-column ps-2 pe-4">

                        <div class="d-flex flex-column pb-3 border-bottom border-2 pt-3">
                            <div class="d-flex gilroy-medium fs-18 lh-21 mb-2">
                                <span class="mb-auto me-2 col-5">Brand:</span>
                                <span class="mb-auto text-blue">{{projectDetails.brand?.name || 'N/A'}}</span>
                                <span class="material-icons position-absolute cursor-pointer end-0 top-0 mt-3 me-3" @click="emit('close:project:details', true)">close</span>
                            </div>

                            <div class="d-flex mb-2">
                                <span class="mb-auto gilroy-medium me-2 col-5 fs-18 lh-21">Dimensions:</span>
                                <span class="mb-auto gilroy-regular text-wrap fs-16 lh-21">{{ projectDimensions }}</span>
                            </div>

                            <div class="d-flex mb-2">
                                <span class="mb-auto gilroy-medium me-2 col-5 fs-18 lh-21">Reference Link:</span>
                                <span class="mb-auto gilroy-regular text-wrap fs-16 lh-21">{{ projectReferences }}</span>
                            </div>

                            <div class="d-flex fs-18 lh-21 mb-2">
                                <span class="mb-auto gilroy-medium me-2 col-5">Deliverables:</span>
                                <div class="mb-auto d-flex flex-wrap" v-if="projectDetails.deliverables?.length">
                                    <span class="perfect-center bg-blue-lt-3 fs-7 lh-8 rounded-px-3 px-2 hpx-18 me-1 mb-2" v-for="(deliverable, i) in projectDetails.deliverables" :key="i">{{deliverable}}</span>
                                </div>
                                <div class="mb-auto d-flex flex-wrap" v-else>
                                    <span class="perfect-center bg-blue-lt-3 fs-7 lh-8 rounded-px-3 px-2 hpx-18 me-1 mb-2">N/A</span>
                                </div>
                            </div>

                            <div class="d-flex fs-18 lh-21 mb-2">
                                <span class="mb-auto gilroy-medium me-2 col-5">Colors:</span>
                                <div class="mb-auto d-flex flex-wrap">
                                    <ColorTag 
                                        v-for="(color, i) in projectDetails.colors" 
                                        :key="i" 
                                        :color="color" 
                                        tag-class="wpx-55 hpx-19 rounded-px-5 gilroy-regular fs-7 lh-8"
                                    />
                                </div>
                            </div>
                        </div>

                        <div class="d-flex flex-column pb-3 border-bottom border-2 mt-3">
                            <span class="gilroy-medium fs-20 lh-23">Actions</span>
                            <div class="d-flex mt-3">
                                <FormButton label="Mark as completed" class="perfect-center hpx-35 rounded-px-3 me-3 px-2" :disabled="!enableMarkAsComplete">
                                    <template #default>
                                        <span class="my-auto d-flex perfect-center fs-12 lh-14 text-white">
                                            <i class="material-icons me-1 fs-18">check</i>
                                            <span>Mark as complete</span>
                                        </span>
                                    </template>
                                </FormButton>
                                <span class="cursor-pointer my-auto d-flex perfect-center rounded-px-3 px-2 fs-12 lh-14 hpx-35 bg-blue-lt-3 text-blue-dk-1">
                                    <i class="material-icons me-1 fs-18">content_copy</i>
                                    <span>Duplicate board</span>
                                </span>
                            </div>
                        </div>

                        <div class="d-flex flex-column mt-3">
                            <div class="d-flex">
                                <span class="material-icons fs-22 fw-500 lh-23 me-3">attach_file</span>
                                <span class="gilroy-medium fs-20 lh-23">Recent Files</span>
                            </div>
                            <div class="d-flex flex-column my-3 hpx-270 overflow-auto">

                                <div class="d-flex mb-3" v-for="(upload, i) in projectUploadedFiles" :key="i">
                                    <img :src="require(`@/assets/img/file-formats/${upload?.file?.split('.')?.pop() || 'png'}.svg`)" class="me-3 my-auto wpx-40"/>
                                    <div class="my-auto d-flex flex-column">
                                        <span class="gilroy-medium fs-20 lh-23 mb-2">{{upload.title}} {{i+1}}</span>
                                        <div class="d-flex">
                                            <span class="time gilroy-regular fs-11 lh-15 text-blue-dk-1">{{upload.created_at}}</span>
                                            <!-- <a :href="upload.location" class="gilroy-bold fs-13 lh-15 text-blue ms-1 text-decoration-none" target="_blank" :download="upload.title">Download</a> -->
                                            <span class="gilroy-bold fs-13 lh-15 text-blue ms-1 cursor-pointer" @click="downloadWithProgress(upload.location, upload.file)">Download</span>
                                            <span class="gilroy-bold fs-13 lh-15 text-blue ms-1 cursor-pointer" @click="deleteUpload(upload)">Delete</span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <span class="cursor-pointer d-flex perfect-center rounded-px-10 fs-12 lh-14 hpx-35 bg-blue text-white pxpx-70 mx-auto mb-4 d-none">
                                View more attachments
                            </span>
                        </div>

                        </div>
                    </div>
                </div>
</template>


<script lang="ts" setup>
import {type Ref, ref, reactive, computed, onMounted} from 'vue'
import { dateFormatter } from '@/services/helper-service'
import useGlobals from "@/globals/composables"
import { deleteDeliverable, updateProjectUsers, getProjectChats } from '../../services'
import * as AlertService from '@/services/alert-service'

import { getBroadcastMessage } from '@/globals/pusher'

import ChatArea from './ChatArea.vue'

const {apiBaseUrl} = useGlobals()

interface ProjectDetailsProps {
    projectDetails:Record<string, any>;
    projectTeam:{id:number, avatar:string}[];
}
//eslint-disable-next-line
const props = withDefaults(defineProps<ProjectDetailsProps>(),{})
//eslint-disable-next-line
const emit = defineEmits(['close:project:details'])

const getFullName = (name: any) => {
    return name ? name.first_name + ' ' + name.last_name : null
}


const getCheckedValue = window.debounce((userIds) => {
    const {
        isLoading: updatingUsersIsLoading,
        isSuccessful: updatingUsersIsSuccessful,
        execute: executeUpdateUsers,
    } = updateProjectUsers(props.projectDetails?.id, userIds);

    executeUpdateUsers().then((res: any) => {
        if (updatingUsersIsSuccessful.value) {
            AlertService.toast('success', 'Success', res.message)
        }
    })
}, 3000)


const enableMarkAsComplete = computed(() => {
    return props.projectDetails.status == 'in_review'
})


const  downloadWithProgress = (url: any ,filename: any) => {
  const startTime = new Date().getTime();

  const request = new XMLHttpRequest();

  request.responseType = "blob";
  request.open("get", url, true);
  request.send();

  request.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const imageURL = window.URL.createObjectURL(this.response);

      const anchor = document.createElement("a");
      anchor.href = imageURL;
      anchor.download = filename;
      document.body.appendChild(anchor);
      anchor.click();
    }
  };

  request.onprogress = function (e) {
    const percent_complete = Math.floor((e.loaded / e.total) * 100);

    const duration = (new Date().getTime() - startTime) / 1000;
    const bps = e.loaded / duration;

    const kbps = Math.floor(bps / 1024);

    const time = (e.total - e.loaded) / bps;
    
    const seconds = Math.floor(time % 60);
    const minutes = Math.floor(time / 60);
  };
}




const projectDimensions = computed(() => {
    if (props.projectDetails.dimensions) {
        const dimensions = props.projectDetails.dimensions
        let dimensionString = ''
        dimensions.forEach((dimension: any, i: number) => {
            if (i > 0) {
                dimensionString += ', '
            }
            dimensionString += `${dimension.width} by ${dimension.height}`
        })
        return dimensionString
    }
    return 'N/A'
})
const projectReferences = computed(() => {
    return  props.projectDetails.references ? props.projectDetails.references?.join(', ') : 'N/A'
})

const projectUploadedFiles = computed(()=>{
    if(props.projectDetails.uploaded_files){
        const uploads = props.projectDetails.uploaded_files.map((upload: any)=>{
            return Object.assign({}, upload, {
                file: upload.location,
                location: `${apiBaseUrl.value}${upload.location}`,
                created_at: `${dateFormatter(upload?.created_at, 'do MMMM, yyyy')} at ${dateFormatter(upload?.created_at, 'h:mm aaaa')}`
            },)
        })
        return uploads
    }
    return []
})

const deleteUpload = (upload: any) =>{
    const {
        isLoading: deletingUploadIsLoading,
        isSuccessful: deletingUploadIsSuccessful,
        execute: executeDeleteUpload,
    } = deleteDeliverable(upload.id);

    executeDeleteUpload().then((res:any)=>{
        if (deletingUploadIsSuccessful.value) {
            AlertService.toast('success','Success',res.message)
        }
    })
}

    const chatArea:any = ref(null)
    let chats: Ref<any[]> = ref([])
    const {
        isLoading: getProjectChatsIsLoading,
        execute: executeGetProjectChats
    } = getProjectChats(props.projectDetails?.id)

    onMounted(()=>{
        executeGetProjectChats().then((res: any) => {
            chats.value = res.map((chat: any) => { // TODO: use this one
            //const chatDetails = res.map((chat: any) => {
                return filterChatDetails(chat)
            })
        })
    })

    getBroadcastMessage(`chat${props.projectDetails?.id}`, 'message-sent', async (chat: any) => {
        const chatDetails = filterChatDetails(chat.data)
        chats.value.push(chatDetails) // TODO: uncomment this when everything is right
        window.setTimeout(() => {
            chatArea.value?.triggerScroll()
        },100)
    })

    const filterChatDetails = (chat: any) =>{
        return {
            message: chat.message,
            files: chat.files,
            project_id: chat.project_id,
            user: chat.user,
            is_from_author: chat.author,
            is_from_client: chat.user.user_type == 'client' ? true : false,
            //is_from_client: chat.user.roles.find((role: any) => role.name != 'admin') ? true : false,
            created_at: chat.created_at ? `${dateFormatter(chat?.created_at, 'dd-MM-yyyy h:mm a')}` : '11-12-2022 9:20 PM'
        }
    }



    chats.value = [
        {
            message: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, Lorem Ipsum has been the industry's standard",
            files: ['path/to/file_to_download.pdf', 'path/to/file_to_download.pdf'] ,
            is_from_client: true,
            is_from_author: true,
            user: {
                id:1,
                first_name: 'Omiwale', 
                last_name: 'Rasheed',
                avatar: tempUserImages.user1
            },
            created_at: '11-12-2022 8:00 PM'
        },
        {
            message: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, Lorem Ipsum has been the industry's standard",
            files: [],
            is_from_client: false,
            is_from_author: false,
            user: {
                id:2,
                first_name: 'Mary', 
                last_name: 'Jane',
                avatar: tempUserImages.user2
            },
            created_at: '11-12-2022 9:00 PM'
        },
        {
            message: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, Lorem Ipsum has been the industry's standard",
            files: [],
            is_from_client: true,
            is_from_author: false,
            user: {
                id:4,
                first_name: 'Titus', 
                last_name: 'Thomas',
                avatar: tempUserImages.user4
            },
            created_at: '11-12-2022 9:20 PM'
        },
        {
            message: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, Lorem Ipsum has been the industry's standard",
            files: [],
            is_from_client: true,
            is_from_author: false,
            user: {
                id:3,
                first_name: 'Waltz', 
                last_name: 'Walemon',
                avatar: tempUserImages.user3
            },
            created_at: '11-12-2022 9:10 PM'
        },
        {
            message: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, Lorem Ipsum has been the industry's standard",
            files: [],
            is_from_client: false,
            is_from_author: false,
            user: {
                id:2,
                first_name: 'Mary', 
                last_name: 'Jane',
                avatar: tempUserImages.user2
            },
            created_at: '11-12-2022 9:00 PM'
        },
        {
            message: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, Lorem Ipsum has been the industry's standard",
            files: ['path/to/file_to_download.pdf'] ,
            is_from_client: true,
            is_from_author: true,
            user: {
                id:1,
                first_name: 'Omiwale', 
                last_name: 'Rasheed',
                avatar: tempUserImages.user1
            },
            created_at: '11-12-2022 8:00 PM'
        },
        {
            message: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, Lorem Ipsum has been the industry's standard",
            files: [],
            is_from_client: true,
            is_from_author: false,
            user: {
                id:4,
                first_name: 'Titus', 
                last_name: 'Thomas',
                avatar: tempUserImages.user4
            },
            created_at: '11-12-2022 9:20 PM'
        },
        {
            message: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, Lorem Ipsum has been the industry's standard",
            files: ['path/to/file_to_download.pdf'] ,
            is_from_client: false,
            is_from_author: false,
            user: {
                id:5,
                first_name: 'David', 
                last_name: 'Dane',
                avatar: tempUserImages.user5
            },
            created_at: '11-12-2022 9:30 PM'
        },
    ]
</script>


<!-- <style lang="scss" scoped>
.chat-area{
    flex: 1 1 auto;
    background: linear-gradient(265.21deg, rgba(255, 205, 5, 0.05) 55.25%, rgba(18, 39, 226, 0.05) 84.65%);
    .chat-messages{
        flex: 1 1 auto;
        .chat-message{
            background: rgba(255, 255, 255, 0.4);
            border: 1px solid rgba(55, 57, 63, 0.5);
        }
    }
    .chat-input{
        background: rgba(6, 25, 71, 0.1);
        ::v-deep(.auth-element){
            border: 0;
            background: transparent;
            &:focus, &:hover{
                border: 0!important;
                box-shadow: none!important;
            }
        }
    }
}

</style> -->