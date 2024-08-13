<template>
    <div class="row">
                    <div class="col-8 col-md-8 col-sm-6 p-0">
                        <div class="d-flex flex-column h-100">
                            <div class="d-flex flex-column px-5 py-3">
                                <span class="gilroy-medium fs-30 lh-35 text-blue-dk-1 mb-3">{{projectDetails.title}}</span>
                                <span class="gilroy-regular fs-15 lh-18 text-blue-dk-1 mb-3">Submitted {{projectDetails.created_at}}  via App  by {{projectDetails.created_by}}</span>
                                <div class="d-flex">
                                    <MemberCount 
                                        class="my-auto" 
                                        :size="40" 
                                        :users="projectDetails.users" 
                                        componentWidth='wpx-130'
                                        addUser
                                        :team="workspaceMembers"
                                        @selected:user:ids="getCheckedValue"
                                    />
                                    <div class="gilroy-regular fs-18 lh-21 my-auto ms-5"><span class="gilroy-medium">Designer: </span> {{projectDetails.designer}} </div>
                                    <div class="d-flex gilroy-medium fs-18 lh-21 my-auto ms-5">
                                        <span class="my-auto me-3">Status:</span>
                                        <span class="my-auto text-white bg-blue rounded-px-4 hpx-25 px-3 perfect-center fs-12 lh-15">{{projectDetails.status}}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="chat-area d-flex flex-column mt-auto px-5 py-3">
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

                            </div>
                        </div>
                    </div>
                    <div class="col-4 col-md-4 col-sm-6">
                        <div class="d-flex flex-column ps-2 pe-4">

                        <div class="d-flex flex-column pb-3 border-bottom border-2 pt-3">
                            <div class="d-flex gilroy-medium fs-18 lh-21 mb-2">
                                <span class="mb-auto me-2 col-5">Brand:</span>
                                <span class="mb-auto text-blue">{{projectDetails.brand}}</span>
                                <span class="material-icons position-absolute cursor-pointer end-0 top-0 mt-3 me-3" @click="emit('close:project:details', true)">close</span>
                            </div>

                            <div class="d-flex mb-2">
                                <span class="mb-auto gilroy-medium me-2 col-5 fs-18 lh-21">Dimensions:</span>
                                <span class="mb-auto gilroy-regular text-wrap fs-16 lh-21">{{projectDetails.dimensions}}</span>
                            </div>

                            <div class="d-flex mb-2">
                                <span class="mb-auto gilroy-medium me-2 col-5 fs-18 lh-21">Reference Link:</span>
                                <span class="mb-auto gilroy-regular text-wrap fs-16 lh-21">{{projectDetails.references}}</span>
                            </div>

                            <div class="d-flex fs-18 lh-21 mb-2">
                                <span class="mb-auto gilroy-medium me-2 col-5">Deliverables:</span>
                                <div class="mb-auto d-flex flex-wrap">
                                    <span class="perfect-center bg-blue-lt-3 fs-7 lh-8 rounded-px-3 px-2 hpx-18 me-1 mb-2" v-for="(deliverable, i) in projectDetails.deliverables" :key="i">{{deliverable}}</span>
                                    <!-- <span class="perfect-center bg-blue-lt-3 fs-7 lh-8 rounded-px-3 px-2 hpx-18 me-1 mb-2">Png</span>
                                    <span class="perfect-center bg-blue-lt-3 fs-7 lh-8 rounded-px-3 px-2 hpx-18 me-1 mb-2">Adobe</span> -->
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
                                <span class="cursor-pointer my-auto d-flex perfect-center rounded-px-3 px-3 fs-12 lh-14 hpx-35 me-3 bg-blue text-white">
                                    <i class="material-icons me-2 fs-18">check</i>
                                    <span>Approved</span>
                                </span>
                                <span class="cursor-pointer my-auto d-flex perfect-center rounded-px-3 px-3 fs-12 lh-14 hpx-35 bg-blue-lt-3 text-blue-dk-1">
                                    <i class="material-icons me-2 fs-18">content_copy</i>
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

                                <div class="d-flex mb-3" v-for="(attachment, i) in projectDetails.attachments" :key="i">
                                    <img :src="require(`@/assets/img/file-formats/${attachment?.file?.split('.')?.pop() || 'png'}.svg`)" class="me-3 my-auto wpx-40"/>
                                    <div class="my-auto d-flex flex-column">
                                        <span class="gilroy-medium fs-20 lh-23 mb-2">{{attachment.title}} {{i+1}}</span>
                                        <div class="d-flex">
                                            <span class="time gilroy-regular fs-11 lh-15 text-blue-dk-1">{{attachment.created_at}}</span>
                                            <span class="gilroy-bold fs-13 lh-15 text-blue ms-1 cursor-pointer">Download</span>
                                            <span class="gilroy-bold fs-13 lh-15 text-blue ms-1 cursor-pointer">Delete</span>
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
import {ref} from 'vue'

interface ProjectDetailsProps {
    projectDetails:Record<string, any>;
    workspaceMembers:{id:number, avatar:string}[];
}
//eslint-disable-next-line
const props = withDefaults(defineProps<ProjectDetailsProps>(),{})
//eslint-disable-next-line
const emit = defineEmits(['close:project:details'])

const getCheckedValue = window.debounce((userIds) => {
    console.log(userIds)
}, 3000)



const chats = ref([
        {
            message: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, Lorem Ipsum has been the industry's standard",
            is_from_client: true,
            is_from_author: true,
            user: {
                id:1,
                first_name: 'Omiwale', 
                last_name: 'Rasheed',
                avatar: tempUserImages.user1
            },
            files: ['path/to/file_to_download.pdf', 'path/to/file_to_download.pdf'] ,
            created_at: '11-12-2022 8:00 PM'
        },
        {
            message: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, Lorem Ipsum has been the industry's standard",
            is_from_client: false,
            is_from_author: false,
            user: {
                id:2,
                first_name: 'Mary', 
                last_name: 'Jane',
                avatar: tempUserImages.user2
            },
            file: [],
            created_at: '11-12-2022 9:00 PM'
        },
        {
            message: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, Lorem Ipsum has been the industry's standard",
            is_from_client: true,
            is_from_author: false,
            user: {
                id:4,
                first_name: 'Titus', 
                last_name: 'Thomas',
                avatar: tempUserImages.user4
            },
            file: [],
            created_at: '11-12-2022 9:20 PM'
        },
        {
            message: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, Lorem Ipsum has been the industry's standard",
            is_from_client: true,
            is_from_author: false,
            user: {
                id:3,
                first_name: 'Waltz', 
                last_name: 'Walemon',
                avatar: tempUserImages.user3
            },
            file: [],
            created_at: '11-12-2022 9:10 PM'
        },
        {
            message: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, Lorem Ipsum has been the industry's standard",
            is_from_client: false,
            is_from_author: false,
            user: {
                id:2,
                first_name: 'Mary', 
                last_name: 'Jane',
                avatar: tempUserImages.user2
            },
            file: [],
            created_at: '11-12-2022 9:00 PM'
        },
        {
            message: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, Lorem Ipsum has been the industry's standard",
            is_from_client: true,
            is_from_author: true,
            user: {
                id:1,
                first_name: 'Omiwale', 
                last_name: 'Rasheed',
                avatar: tempUserImages.user1
            },
            files: ['path/to/file_to_download.pdf'] ,
            created_at: '11-12-2022 8:00 PM'
        },
        {
            message: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, Lorem Ipsum has been the industry's standard",
            is_from_client: true,
            is_from_author: false,
            user: {
                id:4,
                first_name: 'Titus', 
                last_name: 'Thomas',
                avatar: tempUserImages.user4
            },
            file: [],
            created_at: '11-12-2022 9:20 PM'
        },
        {
            message: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, Lorem Ipsum has been the industry's standard",
            is_from_client: false,
            is_from_author: false,
            user: {
                id:5,
                first_name: 'David', 
                last_name: 'Dane',
                avatar: tempUserImages.user5
            },
            files: ['path/to/file_to_download.pdf'] ,
            created_at: '11-12-2022 9:30 PM'
        },
    ])
</script>


<style lang="scss" scoped>
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

</style>