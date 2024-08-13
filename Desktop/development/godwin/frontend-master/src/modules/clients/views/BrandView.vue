<template>
<div class="d-flex flex-column px-4">

    <div class="d-flex justify-content-between mt-5 pe-4 flex-wrap">
        <span class="gilroy-medium fs-25 lh-28 text-blue-dk-1 mb-2 my-auto">Brands</span>
        <FormButton label="Create new brand" class="hpx-39 mb-2 my-auto" @click="openModal"/>
    </div>

    <div class="d-flex flex-wrap my-3">

        <div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 mepx-22 wpx-335 ppx-30 hpx-160 mbpx-20 rounded-px-20 bg-white text-black" v-for="(brand, i) in brandsData" :key="i">
            <div class="d-flex gilroy-medium fs-20 lh-23">{{brand.name}}</div>
            <div class="d-flex justify-content-end mt-5">
                <FormButton label="Duplicate" class="hpx-33 me-2" @click="openModal(brand)"/>
                <FormButton label="Delete" class="hpx-33" variant='light' @click="deleteBrandData(brand)"/>
            </div>
            
        </div>

        <!-- <div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 mepx-22 wpx-335 ppx-30 hpx-160 mbpx-20 rounded-px-20 bg-white text-black" v-for="n in 5" :key="n">
            <div class="d-flex gilroy-medium fs-20 lh-23">Sparkle</div>
            <div class="d-flex justify-content-end mt-5">
                <FormButton label="Duplicate" class="hpx-33 me-2"/>
                <FormButton label="Delete" class="hpx-33" variant='light'/>
            </div>
            
        </div> -->

    </div>

     <!-- Add/Edit Brand -->
    <ModalBox 
        class="h-100" 
        v-model="showEditBrandForm" 
        :staticBackDrop="true"
        :addHeader="true"
        modal-custom-class="brands-page-class" modalSize="modal-lg" modalWidth="650px"
        modalContentClass="rounded-0"
        @modal:closed="showEditBrandForm = false" :modalId="`modal-${Date.now()}`"
      >
      <template #default>
        <div class="d-flex flex-column pxpx-35  pb-4">
            <div class="d-flex justify-content-between mb-4">
                <span class="gilroy-medium fs-25 lh-29 text-blue-dk-2">Create a Brand</span>
            </div>
            <div class="mb-4 d-flex w-100">
                <AuthTextInput 
                    wrapper-class="me-2 w-50" 
                    element-class="auth-element hpx-38 bg-blue-lt-1 rounded-0 border-blue-lt-1" 
                    label="" 
                    placeholder="Name"
                    v-model="form.name"
                    :error-msg="serverError.name?.[0] || v$.name.$errors[0]?.$message"
                />
                <AuthTextInput 
                    wrapper-class="ms-2 w-50" 
                    element-class="auth-element hpx-38 bg-blue-lt-1 rounded-0 border-blue-lt-1" 
                    label="" 
                    placeholder="Industry"
                    v-model="form.industry"
                    :error-msg="serverError.industry?.[0] || v$.industry.$errors[0]?.$message"
                />
            </div>
            <div class="mb-4 d-flex flex-column w-100">
                <textarea
                    :class="{'is-invalid':serverError.description?.[0] || v$.description.$errors[0]?.$message}" 
                    class="auth-element form-control bg-blue-lt-1 rounded-0 border-0" 
                    placeholder="Tell us about brand" 
                    v-model="form.description" 
                ></textarea>

                <div :id="`error-feedback`" class="invalid-feedback" v-if="serverError.description?.[0] || v$.description.$errors[0]?.$message">
                    {{serverError.description?.[0] || v$.description.$errors[0]?.$message}}.
                </div> 
            </div>

            <div class="mb-4 d-flex w-100">
                <AuthTextInput 
                    wrapper-class="me-2 w-50" 
                    element-class="auth-element hpx-38 bg-blue-lt-1 rounded-0 border-blue-lt-1" 
                    label="" 
                    placeholder="Website"
                    v-model="form.website"
                    :error-msg="serverError.website?.[0] || v$.website.$errors[0]?.$message"
                />
                <AuthTextInput 
                    wrapper-class="ms-2 w-50" 
                    element-class="auth-element hpx-38 bg-blue-lt-1 rounded-0 border-blue-lt-1" 
                    label="" 
                    placeholder="Audience"
                    v-model="form.audience"
                    :error-msg="serverError.audience?.[0] || v$.audience.$errors[0]?.$message"
                />
            </div>

            <div class="mb-4 d-flex w-100">
                <div class="d-flex flex-column mb-auto text-nowrap">

                    <ColorPicker @new:color="addColor" @hide:picker="showColorPicker=false" :show="showColorPicker">
                        <template #trigger>
                            <span 
                                class="me-3 cursor-pointer bg-blue-lt-1 px-3 py-2 rounded-px-5 text-blue-dk-1 gilroy-regular fs-15 lh-18" 
                                @click="()=>{showColorPicker=true;}">
                                Add brand colors
                            </span>
                        </template>
                    </ColorPicker>
                </div>
                <!-- <div class="d-flex flex-wrap mb-auto">
                    <div class="d-flex me-2 mb-2" v-for="(color,i) in form.colors" :key="i">
                        <span class="fs-12 lh-12 gilroy-regular my-auto" :style="{color:color}">{{color}}</span>
                        <i class="material-icons fs-12 ms-1 cursor-pointer my-auto text-danger" @click="removeColor(i)">close</i>
                    </div>
                </div> -->
                <div class="d-flex flex-wrap mb-auto" v-if="form.colors.length">
                    <div 
                        v-for="(color,i) in form.colors"
                        :key="i"
                        class="d-flex justify-content-center wpx-100 hpx-35 rounded-px-10 gilroy-medium fs-15 lh-18 me-1 mb-2" 
                        :style="{backgroundColor:color, color:getBOrWFomColor(color)}"
                    >
                        <span class="my-auto">{{color}}</span>
                        <i class="material-icons fs-12 ms-1 cursor-pointer my-auto" @click="removeColor(i)">close</i>
                    </div>
                </div>


            </div>

            <div class="mb-4 d-flex flex-column w-100">
                <span class="gilroy-bold fs-20 lh-23">
                    Uploadable Files
                </span>
                <div class="d-flex flex-wrap mt-3">
                    <div class="d-flex col-6 mb-2" v-for="(attachable, i ) in attachables" :key="i">
                        <i class="material-icons-outlined fs-14 text-blue my-auto">check_box</i>
                        <span class="my-auto gilroy-regular fs-14 lh-18 text-blue-dk-1 ms-2">{{attachable}}</span>
                    </div>
                </div>
                <div class="d-flex mt-3" @drop.prevent="handleDrop" @dragover.prevent="handleDragOver">
                    <input 
                        ref="fileUpload" 
                        type="file" 
                        id="file-upload" 
                        @change="handleFileUpload" 
                        multiple 
                        class="d-none"
                    />
                    <div 
                        class="d-flex me-3 cursor-pointer bg-secondary-lt-6 px-3 py-2 rounded-px-10 gilroy-medium fs-10 lh-12"
                        @click="(fileUpload! as HTMLInputElement).click()"
                    >
                        <i class="material-icons fs-14 me-2 my-auto">cloud_upload</i>
                        <span class="my-auto">Upload</span>
                    </div>
                    <span class="gilroy-regular fs-14 lh-15 text-blue-dk-1">Upload or drag and drop any image, file, document, or anything that may be helpful like your logo, patterns, fonts, etc</span>
                </div>
                <span class="gilroy-bold fs-20 lh-23 mt-3" v-if="form.attachments?.length">
                    Attachments
                </span>
                <div class="d-flex flex-column flex-wrap mt-2">
                    <div class="d-flex mb-2 me-1" v-for="(attachment, i ) in form.attachments" :key="i">
                        <i class="material-icons-outlined fs-14 text-blue my-auto">upload_file</i>
                        <span class="my-auto gilroy-regular fs-11 lh-12 text-blue-lt-2 mx-2">{{attachment.name}}</span>
                        <i class="material-icons fs-14 text-danger my-auto cursor-pointer" @click="removeFile(i)">close</i>
                    </div>
                </div>

            </div>

            <FormButton label="Save" class="w-100 h-min-50" @click="submit"/>

        </div>
      </template>
      </ModalBox>


    <!-- View Brand -->
    <ModalBox 
        class="h-100" 
        v-model="showViewBrandForm" 
        :staticBackDrop="true"
        :addHeader="true"
        modal-custom-class="brands-page-class" modalSize="modal-lg" modalWidth="650px"
        modalContentClass="rounded-0"
        @modal:closed="showViewBrandForm = false" :modalId="`modal-view-${Date.now()}`"
      >
      <template #default>
        <div class="d-flex flex-column pxpx-35  pb-4">
            <div class="d-flex justify-content-between mb-4">
                <span class="gilroy-medium fs-25 lh-29 text-blue-dk-2 my-auto">{{form.name}}</span>
                <div class="d-flex my-auto">
                    <span class="gilroy-regular fs-15 lh-18 text-blue cursor-pointer my-auto" @click="showViewBrandForm=false;showEditBrandForm=true;">Edit</span>
                    <span class="gilroy-regular fs-15 lh-18 text-blue cursor-pointer my-auto ms-2">Delete</span>
                </div>
            </div>
            <div class="mb-4 d-flex w-100">
                <AuthTextInput 
                    wrapper-class="me-2 w-50" 
                    element-class="auth-element hpx-38 bg-blue-lt-1 rounded-0 border-blue-lt-1" 
                    label="" 
                    placeholder="Industry"
                    v-model="form.industry"
                    disabled
                />
                <AuthTextInput 
                    wrapper-class="ms-2 w-50" 
                    element-class="auth-element hpx-38 bg-blue-lt-1 rounded-0 border-blue-lt-1" 
                    label="" 
                    placeholder="Website"
                    v-model="form.website"
                    disabled
                />
            </div>
            <div class="mb-4 d-flex w-100">
                <textarea 
                    class="form-control bg-blue-lt-1 rounded-0 border-0" 
                    placeholder="Tell us about yourself" 
                    v-model="form.description" 
                    disabled
                ></textarea>
            </div>
            <div class="mb-4 d-flex w-100">
                <textarea 
                    class="form-control bg-blue-lt-1 rounded-0 border-0" 
                    placeholder="Audience" 
                    v-model="form.audience" 
                    disabled
                ></textarea>
            </div>

            <div class="mb-4 d-flex flex-column w-100">
                <span class="gilroy-bold fs-20 lh-23 mt-3" v-if="form.colors.length">
                    Brand colors
                </span>
                <div class="d-flex flex-wrap mt-2">
                    <div class="d-flex me-2 mb-2" v-for="(color,i) in form.colors" :key="i">
                        <span class="fs-12 lh-12 gilroy-regular my-auto" :style="{color:color}">{{color}}</span>
                    </div>
                </div>
            </div>

            <div class="mb-4 d-flex flex-column w-100">
                <span class="gilroy-bold fs-20 lh-23 mt-3" v-if="form.attachments.length">
                    Attachments
                </span>
                <div class="d-flex flex-column flex-wrap mt-2">
                    <div class="d-flex mb-2 me-1" v-for="(attachment, i ) in form.attachments" :key="i">
                        <i class="material-icons-outlined fs-14 text-blue my-auto">upload_file</i>
                        <span class="my-auto gilroy-regular fs-11 lh-12 text-blue-lt-2 mx-2">{{attachment.name}}</span>
                    </div>
                </div>

            </div>

        </div>
      </template>
      </ModalBox>

      
</div>
</template>


<script lang="ts" setup>
    import {getBrands,saveBrand, editBrand,deleteBrand} from '../services'
    import {ref,reactive, onMounted,computed} from 'vue'
    import {validateBrandForm} from '../validator'
    import * as HelperService from '@/services/helper-service'
    import * as AlertService from '@/services/alert-service'
    import {getBOrWFomColor} from '@/globals/helpers'


    const brandsData = ref({} as any)
    const showEditBrandForm = ref(false)
    const showViewBrandForm = ref(false)

    const showColorPicker = ref(false)
    const fileUpload = ref(null)

    let { form, v$ } = validateBrandForm();


    const attachables = reactive([
        'Your logo',
        'Fonts',
        'An existing design',
        'Brand manual/Guideline',
        'Icons',
        'Patterns',
        'Product image',
    ])

    const handleDrop = (evt:DragEvent) =>{
        let files = evt.dataTransfer?.files
        if (!files) return;
        Array.from(files).forEach((file:File)=>{
            (form.value?.attachments as File[])?.push(file)
        })
        console.log(form.value)
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


    const addColor = (color:any) => {
        (form.value?.colors as string[])?.push(color)
    }

    const removeColor = (colorIndex:number)=>{
        (form.value?.colors as string[])?.splice(colorIndex,1)
    }


    const openModal = (brand?:any) =>{
        if(brand.brand_documents){
            brand.attachments = brand.brand_documents.map((document:any)=>{
                document.name = document.upload.substr(document.upload.lastIndexOf('/') + 1)
                //document.name = document.upload
                return document
            })
        }
        console.log('brand',brand)
        let brandObj = {
            name: brand.name || '',
            industry: brand.industry || '',
            description: brand.description || '',
            website: brand.website || '',
            audience: brand.audience || '',
            colors: brand.colors || [],
            attachments: brand.attachments || [],
        }
        form.value = Object.assign({}, form.value,brandObj)
        if(brand.name){
            showEditBrandForm.value=false
            showViewBrandForm.value=true
        }else{
            showViewBrandForm.value=false
            showEditBrandForm.value=true
        }
    }

    const {
        isLoading: brandDataIsLoading,
        execute: executeGetBrandData,
    } = getBrands();

    const deleteBrandData = (brand:any)=>{
        AlertService.fire({
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
        customClass: {
          confirmButton: 'btn hpx-40 wpx-140 rounded-0 d-flex justify-content-center align-items-center bg-blue border border-0',
          cancelButton: 'btn hpx-40 wpx-140 rounded-0 d-flex justify-content-center align-items-center bg-white border-blue text-blue border',
          popup:'wpx-350 rounded-0',
          htmlContainer:'mx-1 text-start',
        },
        showCancelButton:true,
        reverseButtons:true,
        allowOutsideClick:false,
        html:`<div class="d-flex flex-column">
            <div class='px-4 gilroy-bold text-secondary-dk-1 fs-18 lh-23 fw-700'>Delete brand?</div>
            <div class="message fs-14 lh-18 fw-400 mx-auto mt-3 px-4 gilroy-regular" style="color:#757575;">
              Are you sure you want to delete this? You can't access this brand once your delete it
            </div>
          </div>`
      }).then((res)=>{
        if(res.isConfirmed){
            const {
                isLoading: deletingBrandDataIsLoading,
                isSuccessful: deletingBrandDataIsSuccessful,
                execute: executeDeleteBrandData,
            } = deleteBrand(brand.id);

            executeDeleteBrandData().then((res:any)=>{
                console.log('brand',res)
                if (deletingBrandDataIsSuccessful.value) {
                    AlertService.toast('success','Success',res.message)
                }
            })
        }
      })
    }

    const {
        isLoading: savingBrandDataIsLoading,
        error: savingBrandDataError,
        isSuccessful: savingBrandDataIsSuccessful,
        execute: executeSaveBrandData,
    } = saveBrand(form.value);

    onMounted(()=>{
        executeGetBrandData().then((res:any)=>{
            console.log(res.data)
            brandsData.value = res.data
        })
    })


    const submit = () =>{
        v$.value.$validate();
        if(v$.value.$invalid) return;

        let formData = new FormData();
        formData.append('name',form.value.name as string)
        formData.append('industry',form.value.industry as string)
        formData.append('description',form.value.description as string)
        formData.append('website',form.value.website as string)
        formData.append('audience',form.value.audience as string)
        for (let i = 0; i < form.value.colors.length; i++) {
            formData.append('colors[]', form.value.colors[i] as string);
        }
        for (let i = 0; i < form.value.attachments.length; i++) {
            formData.append('attachments[]', form.value.attachments[i] as File);
        }
        executeSaveBrandData({data:formData}).then((res: any) => {
            if (savingBrandDataIsSuccessful.value) {
                AlertService.toast('success','Success',res.message)
            }
        })
    }


    const serverError = computed(() => {
        return HelperService.getObjectProperty(savingBrandDataError, "value.errors", {});
    });
</script>
