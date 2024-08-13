<template>
<div class="d-flex flex-column">
    <div class="d-flex flex-wrap justify-content-center">
        <div class="d-flex flex-column w-75 mb-5">
            <span class="gilroy-medium fs-40 lh-47">Create new project</span>
            <span class="gilroy-regular fs-18 lh-20">Tell us what you need designed, how you want it and attach anything your designer will need to get it done right.</span>
        </div>
    </div>
    <div class="d-flex flex-wrap justify-content-center">

      <div class="cart-left d-flex flex-column rounded-px-20 wpx-510 bg-white ppx-40 mb-4">

        <div class="d-flex flex-column mt-4">

            <div class="mb-4">
                <AuthTextInput 
                    labelClass="gilroy-medium fs-20 lh-23 text-black"
                    required
                    element-class="auth-element hpx-41 bg-blue-lt-1 rounded-0 border-blue-lt-1" 
                    label="Project title" 
                    v-model=form.title
                    :error-msg="serverError.title?.[0] || v$.title.$errors[0]?.$message"
                />
            </div>
            
            <div class="mb-4">
                <AuthTextBox
                    labelClass="gilroy-medium fs-20 lh-23 text-black"
                    rows="5"
                    required
                    element-class="auth-element bg-blue-lt-1 rounded-0 border-0" 
                    label="Description / Copy" 
                    v-model=form.description
                    :error-msg="serverError.description?.[0] || v$.description.$errors[0]?.$message"
                />
            </div>
            
            <div class="mb-4">
                <FormLabel label="Dimensions" labelClass="gilroy-medium fs-20 lh-23 text-black"/>
                <div class="gilroy-regular fs-16 lh-18 mt-1">Custom dimension</div>
                
                <div class="d-flex mb-1" v-for="(size,i) in form.dimensions" :key="i">
                    <div class="col-5 my-auto">
                        <AuthTextInput
                            acceptNumberOnly
                            element-class="auth-element hpx-41 bg-blue-lt-1 rounded-0 border-blue-lt-1" 
                            placeholder="Width"
                            v-model="size.width"
                        />
                    </div>
                    <div class="col-1 my-auto gilroy-regular fs-20 ls-23 text-center">X</div>
                    <div class="col-5 my-auto">
                        <AuthTextInput
                            acceptNumberOnly
                            element-class="auth-element hpx-41 bg-blue-lt-1 rounded-0 border-blue-lt-1" 
                            placeholder="Height"
                            v-model="size.height"
                        />
                    </div>
                    <div class="col-1 my-auto ps-1" v-if="i >= 1">
                        <span class="perfect-center rounded-circle wpx-28 hpx-28 bg-blue text-white cursor-pointer" @click="removeDimension(1)">-</span>
                    </div>
                </div>
                <ErrorMessage :msg="serverError.dimension?.[0]"  v-if="serverError.dimension?.[0]"/>

                <div class="perfect-center bg-blue text-white hpx-41 just rounded-px-3 mt-3 position-relative cursor-pointer" @click="showDimensionList=true">
                    <span class="gilroy-regular fs-15 ls-18">Choose from already made presets</span>
                    <i class="material-icons ml-auto position-absolute end-0 me-2">expand_more</i>
                </div>

            </div>


            
            <div class="mb-4">
                <FormLabel label="Examples or Reference references (Optional)" labelClass="gilroy-medium fs-20 lh-23 text-black mb-1"/>
                <div class="d-flex mb-1" v-for="(link,i) in form.references" :key="i">
                    <div class="col-11 my-auto">
                        <AuthTextInput
                            element-class="auth-element hpx-41 bg-blue-lt-1 rounded-0 border-blue-lt-1"
                            v-model="link.name"
                        />
                    </div>
                    <div class="col-1 my-auto ps-1" v-if="i >= 1">
                        <span class="perfect-center rounded-circle wpx-28 hpx-28 bg-blue text-white cursor-pointer" @click="removeLink(i)">-</span>
                    </div>
                </div>
                <div class="d-flex mt-2 cursor-pointer" @click="addLink">
                    <span class="perfect-center rounded-circle wpx-28 hpx-28 bg-blue text-white me-1 my-auto">+</span>
                    <span class="gilroy-regular fs-15 ls-18 my-auto">Add another link</span>
                </div>
            </div>


        </div>

      </div>

      <div class="cart-right d-flex flex-column rounded-px-20 wpx-510 bg-white ppx-40 mb-4">

        <div class="d-flex flex-column mt-4">

            
            <div class="mb-4">
                <FormLabel label="Attachments" labelClass="gilroy-medium fs-20 lh-23 text-black"/>
                <div class="bg-red-lt-1 rounded-px-10 ppx-15" @drop.prevent="handleDrop" @dragover.prevent="handleDragOver">
                    <input 
                        ref="fileUpload" 
                        type="file" 
                        id="file-upload" 
                        @change="handleFileUpload" 
                        multiple 
                        class="d-none"
                    />
                    <div class="gilroy-regular fs-15 ls-18 my-auto text-yellow-dk-1">Upload any file or media that your designer will need to complete the project here.</div>
                    <FormButton label="Choose a file" class="perfect-center hpx-28 w-100 mt-2"  @click="(fileUpload! as HTMLInputElement).click()"/>
                </div>

                <div class="d-flex flex-column flex-wrap mt-2" v-if="form.attachments?.length">
                    <div class="d-flex mb-2 me-1" v-for="(attachment, i ) in form.attachments" :key="i">
                        <i class="material-icons-outlined fs-14 text-blue my-auto">upload_file</i>
                        <span class="my-auto gilroy-regular fs-11 lh-12 text-blue-lt-2 mx-2">{{attachment.name}}</span>
                        <i class="material-icons fs-14 text-danger my-auto cursor-pointer" @click="removeFile(i)">close</i>
                    </div>
                </div>
            </div>

            
            <div class="mb-4">
                <FormLabel label="Select brand" labelClass="gilroy-medium fs-20 lh-23 text-black" required/>
                <div class="d-flex flex-column">
                    <div class="d-flex align-items-center ps-4 bg-blue text-white hpx-41 just rounded-px-3 mt-1 position-relative cursor-pointer" @click="showBrands = !showBrands">
                        <span class="gilroy-regular fs-15 ls-18">{{ selectedBrand.name || 'Select your preferred brand' }}</span>
                        <i class="material-icons ml-auto position-absolute end-0 me-2">expand_more</i>
                    </div>
                    <div class="brand-list" v-if="showBrands">
                        <div class="d-flex flex-column shadow rounded-bottom p-3" v-if="brands.length">
                            <span 
                                class="text-blue-lt-5 mb-1 cursor-pointer" 
                                v-for="(brand, i) in brands" :key="i"
                                @click="selectBrand(brand)"
                            >{{brand.name}}
                            </span>
                            <span class="text-blue-lt-5 mb-1 cursor-pointer" @click="selectBrand(null)"
                            >No Brand
                            </span>
                        </div>
                        <div class="d-flex flex-column shadow rounded-bottom p-3" v-else>
                            <span class="text-blue-lt-5 mb-1 cursor-pointer" @click="selectBrand(null)">No available brand</span>
                        </div>
                    </div>
                </div>
            </div>

            
            <div class="mb-4 mt-4">
                <div class="d-flex justify-content-between">
                    <FormLabel label="Colors to incorporate" labelClass="gilroy-medium fs-20 lh-23 text-black"/>
                    <ColorPicker @new:color="addColor" @hide:picker="showColorPicker=false" :show="showColorPicker">
                        <template #trigger>
                            <span 
                                class="cursor-pointer bg-blue-lt-1 px-5 py-2 rounded-px-5 text-blue-dk-1 gilroy-regular fs-15 lh-18" 
                                @click="()=>{showColorPicker=true;}">
                                Select colors
                            </span>
                        </template>
                    </ColorPicker>
                </div>
                <div class="d-flex flex-wrap mt-2" v-if="form.colors.length">
                    <ColorTag 
                        v-for="(color, i) in form.colors" 
                        :key="i" 
                        :color="color"
                        :show-delete="true"
                        @color:deleted="removeColor(i)"
                    />
                </div>
                <ErrorMessage :msg="serverError.colors?.[0]"  v-if="serverError.colors?.[0]"/>
            </div>





            
            <div class="mb-4 mt-4">
                <FormLabel label="Deliverables" labelClass="gilroy-medium fs-20 lh-23 text-black" required/>
                <div class="mb-2 d-flex">
                    <span 
                            @click="letDesignerChoose = !letDesignerChoose"
                        class="perfect-center rounded-circle cursor-pointer wpx-18 hpx-18 text-white me-1 my-auto"
                        :class="{ 'bg-blue':letDesignerChoose, 'bg-blue-lt-3':!letDesignerChoose}"
                    >
                        <i class='material-icons fs-15'>check</i>
                    </span> 
                    <span class="ms-2 agreement my-auto">Let designer choose for me</span>
                </div>
                <!-- <div class="mb-2 d-flex">
                    <input type="checkbox" :true-value="true" :false-value="false" class='my-auto'/> 
                    <span class="ms-3 agreement my-auto">Let designer choose for me</span>
                </div> -->
                <div class="d-flex">
                    <span 
                        v-for="(deliverable, i) in deliverables"
                        :key="i"
                        class="perfect-center rounded-circle wpx-40 hpx-40 me-2 my-auto gilroy-regular" 
                        :class="[
                            letDesignerChoose ? 'bg-blue-lt-3 text-red-dk-2' : (deliverable.selected ? 'bg-blue text-white cursor-pointer':'bg-blue-lt-3 text-black cursor-pointer'), 
                            deliverable.reduceSize ? 'fs-10 ls-12':'fs-15 ls-18'
                        ]"
                        @click="deliverable.selected=!deliverable.selected"
                    >
                        {{deliverable.name}}
                    </span> 
                    
                </div>
                <ErrorMessage :msg="serverError.deliverables?.[0]"  v-if="serverError.deliverables?.[0]"/>


                <div class="mb-4 mt-5">
                    <FormButton label="Submit" class="perfect-center hpx-41 w-100 mt-2" :disabled="disableFormSubmission" @click="submit"/>
                    <FormButton label="Cancel" class="perfect-center hpx-41 w-100 mt-2" variant='dark' @click="router.go(-1)"/>
                </div>
                
                
            </div>



        </div>
        
      </div>


    </div>

    
     <ModalBox 
        class="h-100" 
        v-model="showDimensionList" 
        :addBackDrop="true"
        :addHeader="false"
        modal-custom-class="dimension-list-class" modalSize="modal-lg" modalWidth="1000px"
        modalContentClass="rounded-0"
        @modal:closed="showDimensionList = false" :modalId="`modal-view-${Date.now()}`"
      >
        <template #default>
            <div class='container p-0 dimensions'>
                <div class="d-flex flex-column">
                    <div class="header d-flex justify-content-center align-items-center hpx-40 bg-blue-lt-3">
                        <span 
                            v-for="(tab,i) in dimensionTabs"
                            :key="i"
                            class="cursor-pointer fs-15 ls-18 me-4 py-2 border-blue text-blue"
                            :class="[{'active border-bottom border-2':tab.tag==currentTab}]"
                            @click="currentTab=tab.tag"
                        >{{tab.title}}</span>

                        <span 
                            @click.prevent="showDimensionList = false" 
                            class="text-reset cursor-pointer position-absolute end-0 me-2 my-auto">
                            <i class="material-icons fs-20 text-dark-lt-2">close</i>
                        </span>
                    </div>
                    <div class="d-flex pypx-20 pxpx-40 bg-secondary-lt-5">

                        <div class="d-flex flex-wrap mx-auto">

                            <div 
                                class="d-flex flex-column bg-blue-lt-3 align-items-center wpx-135 hpx-135 me-2 mb-2 cursor-pointer" 
                                v-for="(size,i) in projectDimensions" :key="i"
                                @click="addDimension(size);showDimensionList = false"
                            >
                                <div class="d-flex justify-content-center align-items-center hpx-92">
                                    <img :src="require(`@/assets/img/social-icons/${size.image}`)" />
                                </div>
                                <div class="d-flex flex-column justify-content-center align-items-center wpx-135 hpx-43 bg-blue-lt-5 mt-auto text-white fs-12 lh-14 gilroy-regular">
                                    <span class="text-center">{{size.title}}</span>
                                    <span class="text-center">{{size.width}} x {{size.height}} px</span>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </template>
      </ModalBox>
  </div>
</template>


<script lang="ts" setup>
    import {getBrands,createProject} from '../services'
    import {ref,reactive, onMounted,computed} from 'vue'
    import {getSessionStorageItem, getObjectProperty} from '@/services/helper-service'
    import * as AlertService from '@/services/alert-service'

    import {validateNewProject} from '../validator'
    import {PROJECT_DIMENSIONS} from '@/globals/const'
    import { useRoute, useRouter } from 'vue-router'

    const route = useRoute()
    const router = useRouter()


    let { form, v$ } = validateNewProject();
    const showColorPicker = ref(false)
    
    const showBrands = ref(false)
    const selectedBrand = ref({} as any)
    const brands = ref({} as any)



    const letDesignerChoose = ref(false)
    let deliverables = reactive([
        { name: 'JPG', selected: false },
        { name: 'PNG', selected: false },
        { name: 'PDF', selected: false },
        { name: 'EPS', selected: false },
        { name: 'SVG', selected: false },
        { name: 'GIF', selected: false },
        { name: 'Adobe', selected: false, reduceSize: true },
    ])

    const showDimensionList = ref(false)
    const currentTab = ref('social_media')
    const dimensionTabs = reactive([
        {title:'Recent',tag:'recent'},
        {title:'Social Media',tag:'social_media'},
        {title:'Documents',tag:'documents'},
        {title:'Film & Video',tag:'film_video'},
    ])

    const projectDimensions = computed(()=>{
        return PROJECT_DIMENSIONS[currentTab.value as keyof ( typeof PROJECT_DIMENSIONS)]
    })


    const addDimension = (dimension:any)=>{
        let firstDimension = form.value.dimensions[0]
        if(!firstDimension.width || !firstDimension.height){
            firstDimension = {
                width:dimension.width,
                height:dimension.height
            }
            form.value.dimensions[0] = firstDimension
        }else{
            form.value.dimensions.push({
                width:dimension.width,
                height:dimension.height
            })
        }
    }
    const removeDimension = (index:number)=>{
        form.value.dimensions.splice(index,1) 
    }

    const {
    isLoading: brandDataIsLoading,
    execute: executeGetBrandData,
    } = getBrands();
    onMounted(() => {
        executeGetBrandData().then((res: any) => {
            brands.value = res.data
            setValueToDuplicate()
        })
    })
    const selectBrand = (brand:any)=>{
        form.value.brand = brand ? brand.id : null
        selectedBrand.value = brand || {name: 'No Brand'}
        showBrands.value = false
    }

    // const collateDeliverables = () => {
    //     if (letDesignerChoose.value) {
    //         form.value.deliverables = null
    //     } else {
    //         deliverables.forEach((deliverable) => {
    //             if (deliverable.selected && !((form.value.deliverables as string[]).includes(deliverable.name))) {
    //                 (form.value.deliverables as string[]).push(deliverable.name)
    //             }
    //         })
    //     }
        
    // }


    const addColor = (color:any) => {
        (form.value?.colors as string[])?.push(color)
    }

    const removeColor = (colorIndex:number)=>{
        (form.value?.colors as string[])?.splice(colorIndex,1)
    }


    const addLink = ()=>{
        form.value.references.push({name:''})
    }
    const removeLink = (index:number)=>{
        form.value.references.splice(index,1) 
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
    
    const handleFileUpload = (evt:Event) =>{
        let files = (evt.target as HTMLInputElement)?.files
        if (!files) return;
        Array.from(files).forEach((file:File)=>{
            (form.value?.attachments as File[])?.push(file)
        })
    }

    const removeFile = (fileIndex:number)=>{
        (form.value?.attachments as File[])?.splice(fileIndex,1)
    }


    const disableFormSubmission = computed(()=>{
        return !form.value.title
        //|| !form.value.description
        || form.value.brand === undefined
        || !(letDesignerChoose.value || deliverables.some((deliverable)=>deliverable.selected))
    })



    const {
        isLoading: createProjectIsLoading,
        error: createProjectError,
        isSuccessful: createProjectIsSuccessful,
        execute: executeCreateProject,
    } = createProject(form.value);

    const submit = () => {
        v$.value.$validate();
        if (v$.value.$invalid) return;

        let formData = new FormData();
        formData.append('title', form.value.title as string)
        formData.append('description', form.value.description as string)

        // for (let i = 0; i < form.value.dimensions.length; i++) {
        //     if (form.value.dimensions[i].width && form.value.dimensions[i].height) {
        //         formData.append('dimension[]', JSON.stringify(form.value.dimensions[i]));
        //     }
        // }

        formData.append('dimension', JSON.stringify(form.value.dimensions));

        for (let i = 0; i < form.value.references.length; i++) {
            formData.append('example_links[]', form.value.references[i].name as string);
        }

        for (let i = 0; i < form.value.attachments.length; i++) {
            if(form.value.attachments[i] instanceof File){
                formData.append('attachments[]', form.value.attachments[i] as File);
            }else{
                formData.append('example_uploads[]', (form.value.attachments[i] as {file: string}).file as string);
            }
        }

        if (form.value.brand) {
            formData.append('brand_id', form.value.brand as any)
        } else {
            formData.append('brand_id', '')
        }

        for (let i = 0; i < form.value.colors.length; i++) {
            formData.append('colors[]', form.value.colors[i] as string);
        }

        if (letDesignerChoose.value) {
            formData.append('deliverables', '')
        } else {
            deliverables.forEach((deliverable) => {
                if (deliverable.selected) {
                    formData.append('deliverables[]', deliverable.name as string)
                }
            })
        }
        executeCreateProject({ data: formData }).then((res: any) => {
            if (createProjectIsSuccessful.value) {
                AlertService.toast('success', 'Success', res.message)
                router.push({name:'Clients.Request'})
            }
        })
    }

    const serverError = computed(() => {
        return getObjectProperty(createProjectError, "value.errors", {});
    });

    const duplicateProject = computed(()=>{
        return getSessionStorageItem('@projectToDuplicate') || null
    })

    const isDuplicatingProject = computed(()=>{
        return duplicateProject.value && route.name == 'Clients.Duplicate.Project'
    })
    const setValueToDuplicate = () => {
        if(isDuplicatingProject.value){
            
            form.value.title = duplicateProject.value.title
            form.value.description = duplicateProject.value.description
            form.value.dimensions = duplicateProject.value.dimensions
            if(duplicateProject.value.references){
                form.value.references = duplicateProject.value.references.map((link: string)=>{
                    return {name:link}
                })
            }
            if(duplicateProject.value.attachments){
                form.value.attachments = duplicateProject.value.attachments.map((file: string)=>{
                    return {name:file.split('/').pop(), file:file}
                })
            }

            if(duplicateProject.value.brand){
                form.value.brand = duplicateProject.value.brand.id
                selectedBrand.value = duplicateProject.value.brand
            }else{
                form.value.brand = null
                selectedBrand.value = {name: 'No Brand'}
            }

            form.value.colors = duplicateProject.value.colors

            const projectDeliverables = duplicateProject.value.deliverables
            if(!projectDeliverables){
                letDesignerChoose.value = true
            }else{
                deliverables = deliverables.map((deliverable)=>{
                    if(projectDeliverables.includes(deliverable.name)){
                        deliverable.selected = true
                    }
                    return deliverable
                })
            }
        }
    }
</script>


<style lang="scss" scoped>
@import '../style.scss';

.h-min-150{
  min-height: 150px;
}
.cart-left, .cart-right{
  min-height: 700px;
}
@media (min-width: 1000px) {
  .cart-left {
    margin-right: 70px;
  }
}

input[type=checkbox] {
    accent-color: var(--spa-color-blue);
}


::v-deep(.dimension-list-class){
    .modal-body{
        padding:0!important;
    }
}
.dimensions{
    .header{
        span{
            font-family:Gilroy-Regular;
            &.active{
                font-family:Gilroy-Bold;
            }
        }
    }
}
</style>