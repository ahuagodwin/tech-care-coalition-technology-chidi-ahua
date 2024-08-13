<template>
    <div class="chat-area d-flex flex-column mt-auto px-5 py-3">
        <input 
            ref="fileUpload" 
            type="file" 
            id="file-upload" 
            @change="handleFileUpload" 
            multiple 
            class="d-none"
        />
        <div class="chat-messages hpx-450 overflow-auto mb-2">
        
            <div class="d-flex mb-4" v-for="(chat, i) in chats" :key="i">
                <UserAvatar 
                    class="mb-auto"
                    :class="{ 'order-2': !chat.is_from_client }"
                    size="30" 
                    :src="chat.user.avatar"
                />
                <div class="my-auto d-flex flex-column" :class="!chat.is_from_client ? ' order-1 ms-auto me-3 align-items-end' : 'me-auto ms-3'">
                    <div class="d-flex mb-2">
                        <span class="my-auto gilroy-medium fs-15 lh-18 me-2">{{ chat.user.first_name }} {{ chat.user.last_name }}</span>
                        <span class="my-auto text-white bg-blue rounded-px-4 hpx-17 px-3 perfect-center gilroy-regular fs-10 lh-12" v-if="chat.is_from_author">Author</span>
                    </div>
                    <div class="chat-message d-flex flex-column rounded-px-10 w-60 p-2 mb-1">
                        <span class="gilroy-regular fs-12 lh-20">
                            {{ chat.message }}
                        </span> 
                        <div class="d-flex mt-2 cursor-pointer" v-for="(file, i) in chat.files" :key="i">
                            <img :src="require(`@/assets/img/file-formats/${file?.split('.')?.pop() || 'png'}.svg`)" class="me-1 my-auto wpx-13"/>
                            <span class="text-blue gilroy-medium fs-10 lh-12 my-auto">{{ file.replace(/^.*[\\/]/, '') }}</span>
                        </div>
                    </div>
                    <span class="time gilroy-regular fs-10 lh-12 text-blue-dk-1">{{ chat.created_at }}</span>
                </div>
            </div>

        </div>

        <div class="chat-input d-flex align-items-center mt-auto rounded-px-10 px-3 hpx-55">
            <UserAvatar 
                class="my-auto"
                size="30" 
                :src="currentUser.avatar"
            />
            <div class="my-auto d-flex flex-column wpx-470">
                <div class="overflow-scroll hpx-54 w-100 d-flex flex-column justify-content-center">
                    <div class="ms-3 w-100" ref="chatMessageElement" contenteditable spellcheck="false" placeholder="Type your message here" @keydown.enter="submitChat"></div>
                </div>
                <div class="uploaded-files my-2 w-100" v-if="chatFiles.length && showFiles">
                    <div class="d-flex mb-1" v-for="(file, i) in chatFiles" :key="i">
                        <span class="fs-12 lh-12 text-red-dk-3 my-auto cursor-pointer">x</span>
                        <span class="file fs-10 lh-12 text-blue ms-2 my-auto">{{ file.name }}</span>
                    </div>
                </div>
            </div>
            <div class="my-auto d-flex ms-auto">
                <span class="material-icons cursor-pointer text-blue fs-30 my-auto me-2" @click="submitChat">send</span>
                <div class="d-flex my-auto me-2">
                    <span class="material-icons cursor-pointer text-blue fs-25 fw-700 my-auto" @click="(fileUpload! as HTMLInputElement).click()">attach_file</span>
                    <span class="my-auto ms-1 cursor-pointer" v-if="chatFiles.length" @click="showFiles = !showFiles">{{ chatFiles.length }}</span>
                </div>
                <span class="material-icons cursor-pointer text-blue fs-30 my-auto d-none">mic</span>
            </div>
        </div>

    </div>
</template>


<script setup lang="ts">
    import { type Ref, ref, onMounted } from 'vue'
    import { createProjectChats } from '../../services'
    import AuthService from '@/services/auth-service'
    
    // const chatMessage = ref('')
    const chatMessageElement: Ref<HTMLInputElement | null> = ref(null)
    const chatFiles: Ref<File[]> = ref([])
    const fileUpload = ref(null)
    const showFiles = ref(false)
    const currentUser = AuthService.getLoggedInUser()

    interface ChatAreaProps {
        chats: Record<string, any>[];
        projectId: number|string
    }
    //eslint-disable-next-line
    const props = withDefaults(defineProps<ChatAreaProps>(), {})
    
    let chatMessageBox: any = null
    
    onMounted(() => {
        chatMessageBox = document.querySelector('.chat-messages')
    })

    const triggerScroll = () => {
        (chatMessageBox as Element).scrollTop = chatMessageBox?.scrollHeight as number;
    }

    //eslint-disable-next-line
    defineExpose({
        triggerScroll
    })
    
    const handleFileUpload = (evt:Event) =>{
        let files = (evt.target as HTMLInputElement)?.files
        if (!files) return;
        Array.from(files).forEach((file:File)=>{
            chatFiles.value?.push(file)
        })
    }

    const {
        execute: executeCreateProjectChats
    } = createProjectChats()


    const submitChat = (event: Event) => {
        (event.target as HTMLInputElement).blur()
        const chatMessage = (chatMessageElement.value as HTMLInputElement)?.innerText?.trim() || ''
        ; (chatMessageElement.value as HTMLInputElement).innerText = ''
        let formData = new FormData()
        formData.append('project_id', props.projectId as string)
        formData.append('message', chatMessage)
        if (chatFiles.value.length) {
            for (let i = 0; i < chatFiles.value.length; i++) {
                if (chatFiles.value[i] instanceof File) {
                    formData.append('attachments[]', chatFiles.value[i] as File);
                }
            }
        }
        
        if (chatMessage || chatFiles.value.length) {
            chatFiles.value = []
            // Send the message
            executeCreateProjectChats({ data: formData })
        }
    }
</script>






<style lang="scss" scoped>
.chat-area {
    flex: 1 1 auto;
    background: linear-gradient(265.21deg, rgba(255, 205, 5, 0.05) 55.25%, rgba(18, 39, 226, 0.05) 84.65%);

    .chat-messages {
        flex: 1 1 auto;

        .chat-message {
            min-width: 350px;
            background: rgba(255, 255, 255, 0.4);
            border: 1px solid rgba(55, 57, 63, 0.5);
        }
    }

    .chat-input {
        background: rgba(6, 25, 71, 0.1);

        ::v-deep(.auth-element) {
            border: 0;
            background: transparent;

            &:focus,
            &:hover {
                border: 0 !important;
                box-shadow: none !important;
            }
        }
        [contenteditable] {
            outline: 0px solid transparent;
            &:empty:before {
                content: attr(placeholder)
            }
        }
    }
}</style>