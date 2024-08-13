<template>
    <div class="d-flex flex-column px-4">
        <div class="d-flex justify-content-end me-5">
            <FormButton label="Add Category" class="hpx-40 rounded-px-10" @click="openAddCategoryModal=true"/>
            <FormButton label="Add Work" class="hpx-40 rounded-px-10 ms-2" @click="openAddWorkModal=true"/>
        </div>
        <OurWorkImagesMock is-admin class="pypx-30"/>

        <ModalBox 
            class="h-100" 
            v-model="openAddCategoryModal" 
            :staticBackDrop="true"
            modalContentClass="rounded-0"
            modal-custom-class="category-class" modalSize="modal-lg" modalWidth="390px"
            @modal:closed="openAddCategoryModal = false" :modalId="`modal-oti-${Date.now()}`"
        >
            <template #default>
                <div class="position-relative">
                    <i class="material-icons-outlined fs-20 lh-20 text-blue-dk-2 fw-bold position-absolute end-0 cursor-pointer" @click="openAddCategoryModal = false">close</i>

                    <span class="gilroy-regular fs-25 lh-28 fw-500">Add new category</span>
                    <div class="d-flex flex-column py-3">
                        <AuthTextInput 
                            element-class="auth-element hpx-50 rounded-0"
                            placeholder="Category Name" 
                            v-model="newCategoryName"
                        />
                        <div class="d-flex mt-3">
                            <!-- <FormButton label="Cancel" class="hpx-40 rounded-px-10" buttonType="outline"/>
                            <FormButton label="Add Category" class="hpx-40 rounded-px-10 ms-4"/> -->

                            <FormButton label="Cancel" class="w-50 hpx-40 rounded-0" buttonType="outline"/>
                            <FormButton label="Add Category" class="w-50 hpx-40 rounded-0 ms-4"/>
                        </div>
                    </div>
                </div>
            </template>
        </ModalBox>

        <ModalBox 
            class="h-100" 
            v-model="openAddWorkModal" 
            :staticBackDrop="true"
            modalContentClass="rounded-0"
            modal-custom-class="category-class" modalSize="modal-lg" modalWidth="600px"
            @modal:closed="openAddWorkModal = false" :modalId="`modal-oti-${Date.now()}`"
        >
        <template #default>
            <div class="position-relative">
                <i class="material-icons-outlined fs-20 lh-20 text-blue-dk-2 fw-bold position-absolute end-0 cursor-pointer" @click="openAddWorkModal = false">close</i>
                <AddWork :categories="fakeCat"/>
            </div>
        </template>
        </ModalBox>

    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import OurWorkImages from '@/modules/home/views/components/OurWorkImages.vue'
import OurWorkImagesMock from '@/modules/home/views/components/OurWorkImagesMock.vue'
import AddWork from './components/AddWork.vue';

const openAddCategoryModal = ref(false)
const newCategoryName = ref('')

const openAddWorkModal = ref(false)
const workForm = ref({})

const fakeCat = [
    {id:1, name:'Fake Cat 1'},
    {id:2, name:'Fake Cat 2'},
    {id:3, name:'Fake Cat 3'},
    {id:4, name:'Fake Cat 4'},
    {id:5, name:'Fake Cat 5'},
    {id:6, name:'Fake Cat 6'},
    {id:7, name:'Fake Cat 7'},
]
</script>