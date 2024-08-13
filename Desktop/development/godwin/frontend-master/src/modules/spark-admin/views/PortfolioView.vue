<template>
    <div class="d-flex flex-column px-4">
        <div class="d-flex justify-content-end me-5">
            <FormButton label="Add Category" class="hpx-40 rounded-px-10" @click="openAddCategoryModal=true"/>
            <FormButton label="Add Work" class="hpx-40 rounded-px-10 ms-2" @click="openAddWorkModal=true"/>
        </div>
        <OurWorkImages is-admin class="pypx-30" 
            :portfolio="portfolio"
            @delete:category="removePortfolioCategory"
            @delete:portfolio="removePortfolio"
        />

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

                            <FormButton label="Cancel" class="w-50 hpx-40 rounded-0" buttonType="outline" @click="openAddCategoryModal = false"/>
                            <FormButton label="Add Category" class="w-50 hpx-40 rounded-0 ms-4" @click="submitCategoryName"/>
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
                <AddWork :categories="selectableCategories"  @modal:closed="openAddWorkModal = false"/>
            </div>
        </template>
        </ModalBox>

    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import OurWorkImages from '@/modules/home/views/components/OurWorkImages.vue'
import OurWorkImagesMock from '@/modules/home/views/components/OurWorkImagesMock.vue'
import AddWork from './components/AddWork.vue';
import useGlobals from "@/globals/composables"
import * as AlertService from '@/services/alert-service'
import { deleteData } from '@/globals/helpers'

const { apiBaseUrl } = useGlobals()

import { addPortfolioCategory, deletePortfolioCategory, getPortfolios, deletePortfolio } from '../services'

const openAddCategoryModal = ref(false)
const newCategoryName = ref('')

const openAddWorkModal = ref(false)
const portfolio = ref({} as any)
const selectableCategories = ref([] as any)

const {
    isLoading: gettingPortfolioIsLoading,
    execute:executeGetPortfolio
} = getPortfolios()

onMounted(() => {
    executeGetPortfolio().then((res: any) => {
        let categories = res.map((res: any) => {
            const tag = res.name.toLowerCase().replaceAll(' ', '-')
            return { id: res.id, name: res.name, tag: tag }
        })
        let images: any[] = []
        res.forEach((res: any) => {
            const tag = res.name.toLowerCase().replaceAll(' ', '-')
            res.portfolio.forEach((res2: any) => {
                images.push({ 
                    id: res2.id, 
                    file: apiBaseUrl.value + `${res2.type == 'video' ? res2.thumbnail : res2.location}`, 
                    video: res2.type == 'video' ? res2.location : null, 
                    category: tag 
                })
            })
        })
        selectableCategories.value = categories
        portfolio.value = { categories: [{ name: 'All', tag: 'all' }, ...categories], images }
    })
})


const {
    isLoading: createCategoryIsLoading,
    error: createCategoryError,
    isSuccessful: createCategoryIsSuccessful,
    execute: executeCreateCategory,
} = addPortfolioCategory();

const submitCategoryName = () => {
    executeCreateCategory({ data: { name: newCategoryName.value } }).then((res: any) => {
        const category = { name: newCategoryName.value, tag: newCategoryName.value.toLowerCase().replaceAll(' ', '-') }
        selectableCategories.value.push(category)
        portfolio.value.categories.push(category)
        AlertService.toast('success', 'Success', res.message)
    })
}

const removePortfolioCategory = (category: any) => {
    deleteData('Delete Portfolio Category?', "Are you sure you want to delete this? You can't access this category once your delete it", () => {

        const {
            isLoading: deletingPortfolioCategoryIsLoading,
            isSuccessful: deletingPortfolioCategoryIsSuccessful,
            execute: executeDeletingPortfolioCategory
        } = deletePortfolioCategory(category.id)

        executeDeletingPortfolioCategory().then((res: any) => {
            if (deletingPortfolioCategoryIsSuccessful.value) {
                let index = portfolio.value.categories.findIndex((c: any) => c.id == category.id)
                portfolio.value.categories.splice(index, 1)
                AlertService.toast('success', 'Success', res.message)
            }
        })
    })
}



const removePortfolio = (portfolio: any) => {
    deleteData('Delete Portfolio?', "Are you sure you want to delete this? You can't access this portfolio once your delete it", () => {
        const {
            isLoading: deletingPortfolioIsLoading,
            isSuccessful: deletingPortfolioIsSuccessful,
            execute: executeDeletingPortfolio
        } = deletePortfolio(portfolio.id)
        executeDeletingPortfolio().then((res: any) => {
            if (deletingPortfolioIsSuccessful.value) {
                let index = portfolio.value.images.findIndex((p: any) => p.id == portfolio.id)
                portfolio.value.images.splice(index, 1)
                AlertService.toast('success', 'Success', res.message)
            }
        })
    })
}

</script>