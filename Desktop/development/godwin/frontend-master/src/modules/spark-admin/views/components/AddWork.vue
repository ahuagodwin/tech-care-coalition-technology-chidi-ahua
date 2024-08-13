<template>
    <div class="d-flex flex-column py-3 pxpx-30">

        <div class="d-flex">
            <span class="tabs hpx-45 px-3 cursor-pointer perfect-center fs-15 lh-19 rounded-start-px-5"
            :class="currentTab == 'images' ? 'bg-blue text-white' : 'bg-blue-lt-7 text-black'" @click="currentTab = 'images'">Images</span>
            <span class="tabs hpx-45 px-3 cursor-pointer perfect-center fs-15 lh-19 rounded-end-px-5"
            :class="currentTab == 'videos' ? 'bg-blue text-white' : 'bg-blue-lt-7 text-black'" @click="currentTab = 'videos'">Videos</span>
        </div>

        <div class="mt-3" v-if="currentTab == 'images'">
            <input 
                ref="fileUpload" 
                type="file" 
                id="file-upload" 
                @change="handleFileUpload" 
                multiple 
                accept="image/*"
                class="d-none"
            />
            <div class="d-flex rounded-px-20 ppx-26 border-blue-lt-3 border"  @drop.prevent="handleDrop" @dragover.prevent="handleDragOver">
                <span 
                    class="my-auto perfect-center bg-blue-lt-12 text-blue pypx-18 pxpx-6 rounded-px-15 gilroy-regular fs-15 lh-18 fw-400 text-nowrap cursor-pointer"
                    @click="(fileUpload! as HTMLInputElement).click()"
                >
                    Upload File
                </span>
                <span class="my-auto gilroy-regular fs-14 lh-16 fw-400 text-red-lt-6 ms-3">Or drag and drop any files that you want to upload</span>
            </div>

            <div class="d-flex flex-wrap mt-3" v-if="form.attachments.length">
                <span class="position-relative me-2 mb-2 wpx-75" v-for="(file, i) in form.attachments" :key="i">
                    <span class="bg-blue-lt-1 wpx-7 hpx-7 perfect-center rounded-circle my-auto position-absolute end-0 me-2 mt-2 cursor-pointer">
                        <i class="material-icons-outlined fs-7 lh-7 text-blue-dk-2 fw-bold" @click="removeFile(i)">close</i>
                    </span>
                    <img :src="fileUrl(file)" alt="" class="mw-100 h-auto rounded-px-9"/>
                </span>
            </div>

        </div>

        <div class="mt-3" v-if="currentTab == 'videos'">
            <FormLabel label="Videos" labelClass="gilroy-regular fs-16 lh-20 fw-400 text-black mb-1"/>
            <div class="d-flex mb-1" v-for="(video, i) in form.videos" :key="i">
                <div class="col-5 my-auto">
                    <AuthTextInput
                        element-class="auth-element hpx-41 bg-blue-lt-1 rounded-0 border-blue-lt-1"
                        v-model="video.link"
                    />
                </div>
                <div class="col-6 my-auto">
                    <input 
                        class="form-control ms-2"
                        type="file" 
                        :id="`file-upload-${i}`"
                        @change="handleFileUpload($event,i)" 
                        accept="image/*"
                    />
                </div>
                <div class="col-1 my-auto ps-3" v-if="i >= 1">
                    <span class="perfect-center rounded-circle wpx-28 hpx-28 bg-blue text-white cursor-pointer" @click="removeVideoLink(i)">-</span>
                </div>
            </div>
            <div class="d-flex mt-2 cursor-pointer" @click="addVideoLink">
                <span class="perfect-center rounded-circle wpx-28 hpx-28 bg-blue text-white me-1 my-auto">+</span>
                <span class="gilroy-regular fs-15 ls-18 my-auto">Add another link</span>
            </div>
        </div>

        <div class="mt-3">
                <FormLabel label="Category" labelClass="gilroy-regular fs-16 lh-18 fw-400 text-black" required/>
                <div class="d-flex flex-column">
                    <div class="d-flex align-items-center ps-4 bg-blue text-white hpx-41 just rounded-px-3 mt-1 position-relative cursor-pointer" @click="showCategoryDropdown = !showCategoryDropdown">
                        <span class="gilroy-regular fs-15 ls-18">{{ selectedCategory.name || 'Select Category' }}</span>
                        <i class="material-icons ml-auto position-absolute end-0 me-2">expand_more</i>
                    </div>
                    <div class="brand-list" v-if="showCategoryDropdown">
                        <div class="d-flex flex-column shadow rounded-bottom p-3" v-if="categories.length">
                            <span 
                                class="text-blue-lt-5 mb-1 cursor-pointer" 
                                v-for="(category, i) in categories" :key="i"
                                @click="selectCategory(category)"
                            >{{ category.name }}
                            </span>
                            <span class="text-blue-lt-5 mb-1 cursor-pointer" @click="selectCategory(null)"
                            >No Category
                            </span>
                        </div>
                        <div class="d-flex flex-column shadow rounded-bottom p-3" v-else>
                            <span class="text-blue-lt-5 mb-1 cursor-pointer" @click="selectCategory(null)">No available category</span>
                        </div>
                    </div>
                </div>
            </div>

        <div class="d-flex mt-3">
            <FormButton label="Cancel" class="w-50 hpx-40 rounded-0" buttonType="outline" @click="emit('modal:closed', true)"/>
            <FormButton label="Upload" class="w-50 hpx-40 rounded-0 ms-4" @click="savePortfolio"/>
        </div>
    </div>
</template>


<script setup lang="ts">
    import { ref } from 'vue'
    import { validateWorkForm } from '../../validator'
    import * as AlertService from '@/services/alert-service'
    import { addPortfolioImages, addPortfolioVideos,} from '../../services'


    let { form, v$ } = validateWorkForm();

    const currentTab = ref('images')
    const showCategoryDropdown = ref(false)
    const selectedCategory = ref({} as any)

    type CategoryProps = {
        categories: {id:number, name: string}[]
    }

    //eslint-disable-next-line
    const props = withDefaults(defineProps<CategoryProps>(), {})
    //eslint-disable-next-line
    const emit = defineEmits(['workspace:clicked', 'modal:closed'])


    const selectCategory = (category:any)=>{
        form.value.category = category ? category.id : null
        selectedCategory.value = category || {name: 'No Category'}
        showCategoryDropdown.value = false
    }



    const addVideoLink = ()=>{
        form.value.videos.push({link:'', thumbnail:null})
    }
    const removeVideoLink = (index:number)=>{
        form.value.videos.splice(index,1) 
    }

    const fileUpload = ref(null)
    const handleDrop = (evt:DragEvent) =>{
        let files = evt.dataTransfer?.files
        if (!files) return;
        Array.from(files).forEach((file:File)=>{
            (form.value?.attachments as File[])?.push(file)
        })
    }
    const handleDragOver = (evt:Event) =>{
        //console.log(evt)
    }
    
    const handleFileUpload = (evt:Event, vidIndex?:number) =>{
        let files = (evt.target as HTMLInputElement)?.files
        if (!files) return;
        if (vidIndex === undefined) {
            Array.from(files).forEach((file: File) => {
                (form.value?.attachments as File[])?.push(file)
            })
        } else {
            form.value.videos[vidIndex].thumbnail = files[0]
        }
        //previewCompanyImageURL.value = URL.createObjectURL(files[0])
    }
    
    // const handleFileUpload = (evt:Event) =>{
    //     let files = (evt.target as HTMLInputElement)?.files
    //     if (!files) return;
    //     Array.from(files).forEach((file:File)=>{
    //         (form.value?.attachments as File[])?.push(file)
    //     })
    //     //previewCompanyImageURL.value = URL.createObjectURL(files[0])
    // }

    const removeFile = (fileIndex:number)=>{
        (form.value?.attachments as File[])?.splice(fileIndex,1)
    }
    const fileUrl = (file: File) =>{
        return URL.createObjectURL(file)
    }

    const {
        isLoading: addPortfolioImagesIsLoading,
        hasError: addPortfolioImagesHasError,
        isSuccessful: addPortfolioImagesIsSuccessful,
        execute: executeAddPortfolioImages
    } = addPortfolioImages()

    const {
        isLoading: addPortfolioVideosIsLoading,
        hasError: addPortfolioVideosHasError,
        isSuccessful: addPortfolioVideosIsSuccessful,
        execute: executeAddPortfolioVideos
    } = addPortfolioVideos()

    const savePortfolio = () => {
        if(currentTab.value == 'images'){
            let formData = new FormData();
            formData.append('portfolio_category_id', selectedCategory.value.id as string)
            for (let i = 0; i < form.value.attachments.length; i++) {
                if (form.value.attachments[i] instanceof File) {
                    formData.append('attachments[]', form.value.attachments[i] as File);
                }
            }
            executeAddPortfolioImages({ data: formData }).then((res: any) => {
                if (addPortfolioImagesIsSuccessful.value) {
                    AlertService.toast('success','Success', res.message)
                }
            })
        } else {
            let formData = new FormData();
            formData.append('portfolio_category_id', selectedCategory.value.id as string)
            formData.append('type', 'video')
            
            form.value.videos.forEach((video, i)=>{
                if (video.thumbnail instanceof File) {
                    formData.append(`videos[${i}][link]`, video.link as string);
                    formData.append(`videos[${i}][thumbnail]`, video.thumbnail);
                    
                    //formData.append(`videos[${video.link}]`, video.thumbnail);
                }
            })
            executeAddPortfolioVideos({ data: formData }).then((res: any) => {
                if (addPortfolioVideosIsSuccessful.value) {
                    AlertService.toast('success','Success', res.message)
                }
            })
        }
    }
    
</script>

<style lang="scss" scoped>
    .tabs{
        &:hover{
            background-color: var(--spa-color-yellow) !important;
            color: #000000!important;
        }
    }
</style>