<template>
    <div class="d-flex flex-column px-4">
        <span class="gilroy-regular fs-25 lh-28 fw-400 mt-3">Pricing Table</span>
        <div class="d-flex justify-content-between mt-4">
            <div class="d-flex my-auto">
                <span class="tabs hpx-45 px-3 cursor-pointer perfect-center fs-15 lh-19 rounded-start-px-5"
                :class="currentTab == 'all' ? 'bg-blue text-white' : 'bg-white text-red-lt-6'" @click="currentTab = 'all'">All</span>
                <span class="tabs hpx-45 px-3 cursor-pointer perfect-center fs-15 lh-19"
                :class="currentTab == 'plan' ? 'bg-blue text-white' : 'bg-white text-red-lt-6'" @click="currentTab = 'plan'">Plans</span>
                <span class="tabs hpx-45 px-3 cursor-pointer perfect-center fs-15 lh-19 rounded-end-px-5"
                :class="currentTab == 'add-on' ? 'bg-blue text-white' : 'bg-white text-red-lt-6'" @click="currentTab = 'add-on'">Add-on</span>
            </div>
            <div class="d-flex my-auto">
                <FormButton label="Create plan" class="my-auto hpx-40 px-4 rounded-px-10" @click="router.push({name:'Spark.Admin.CreatePlan'})"/>
                <FormButton 
                    label="Create add-on" 
                    class="add-on btn my-auto hpx-40 px-4 fs-15 lh-19 text-blue rounded-px-10 ms-4" 
                    variant="light" 
                    style="background: rgba(18, 39, 226, 0.10);" 
                    customized
                    @click="showCreateAddOnModal=true"
                />
            </div>
        </div>


        <div class="d-flex flex-column bg-white ppx-30 rounded-px-16 mt-4">
            
            <div class="table-responsive mt-3">
                <table class="table table-borderless">
                    <thead>

                        <tr>
                            <th scope="col" class="gilroy-regular fw-500 text-red-dk-5 border-bottom pb-3 fs-14 lh-16 w-20">Name</th>
                            <th scope="col" class="gilroy-regular fw-500 text-red-dk-5 border-bottom pb-3 fs-14 lh-16 w-20 text-center">Price</th>
                            <th scope="col" class="gilroy-regular fw-500 text-red-dk-5 border-bottom pb-3 fs-14 lh-16 w-10 text-center">Show in catalogue</th>
                            <th scope="col" class="gilroy-regular fw-500 text-red-dk-5 border-bottom pb-3 fs-14 lh-16 w-10 text-center" v-if="currentTab != 'add-on'">Most popular</th>
                            <th scope="col" class="gilroy-regular fw-500 text-red-dk-5 border-bottom pb-3 fs-14 lh-16 w-10 text-center">Sales</th>
                            <th scope="col" class="gilroy-regular fw-500 text-red-dk-5 border-bottom pb-3 fs-14 lh-16 w-20 text-center">Created</th>
                            <th scope="col" class="gilroy-regular fw-500 text-red-dk-5 border-bottom pb-3 fs-14 lh-16 w-10 text-center">Action</th>
                        </tr>

                    </thead>

                    <tbody>
                        <tr v-for="(plan, i) in filteredPlans" :key="i">
                            <td class="gilroy-regular fs-16 lh-19 text-blue-dk-1">{{ plan.name }}</td>
                            <td class="gilroy-regular fs-16 lh-19 text-blue-dk-1 text-center">{{ plan.price }}  {{ plan.currency || '' }} {{ plan.type || 'N/A' }}</td>
                            <td class="gilroy-regular fs-16 lh-19 text-blue-dk-1 text-center">
                                <div class="form-check form-switch d-flex justify-content-center">
                                    <input class="form-check-input" type="checkbox" role="switch" :checked="plan.show_in_catalogue == 'yes'" @change="setVisibility($event, plan.subscription_id)">
                                </div>    
                            </td>
                            <td class="gilroy-regular fs-16 lh-19 text-blue-dk-1 text-center" v-if="currentTab != 'add-on'">
                                    <div class="form-check form-switch d-flex justify-content-center" v-if="!plan.is_addon">
                                        <input class="form-check-input" type="checkbox" role="switch" :checked="plan.most_popular == 'yes'"  @change="setPopularity($event, plan.subscription_id)">
                                    </div>     
                            </td>
                            <td class="gilroy-regular fs-16 lh-19 text-blue-dk-1 text-center">{{ plan.sales }}</td>
                            <td class="gilroy-regular fs-16 lh-19 text-blue-dk-1 text-center">{{ plan.created_at }}</td>
                            <td class='d-flex justify-content-center'>
                                <i class="material-icons-outlined cursor-pointer" @click="editPlanOrAddon(plan)">edit</i>
                                <!-- <i class="material-icons-outlined cursor-pointer ms-3" @click="removePlan(plan)">delete</i> -->
                            </td>
                        </tr>
                    </tbody>

                </table>
            </div>  
        </div>




        <ModalBox 
                class="h-100" 
                v-model="showCreateAddOnModal" 
                :staticBackDrop="true"
                modalContentClass="rounded-0"
                modal-custom-class="category-class" modalSize="modal-lg" modalWidth="800px"
                @modal:closed="showCreateAddOnModal = false" :modalId="`modal-oti-${Date.now()}`"
            >
            <template #default>
                <div class="position-relative">
                    <span class="bg-blue-lt-1 wpx-30 hpx-30 perfect-center rounded-circle my-auto position-absolute end-0 me-3 mt-3 cursor-pointer" @click="showCreateAddOnModal = false">
                        <i class="material-icons-outlined fs-14 lh-14 text-blue-dk-2 fw-bold">close</i>
                    </span>

                    
                    <div class="row g-3 p-4">
                        <span class="gilroy-regular fw-400 fs-30 lh-35 text-blue my-3">Create Add-on</span>
                        <div class="col-md-6">
                            <AuthTextInput 
                                element-class="auth-element hpx-50 rounded-px-6" 
                                required 
                                label="Subscription Name" 
                                placeholder="Please update subscription name" 
                                v-model="form.title"
                                :error-msg="serverError.title?.[0] || v$.title.$errors[0]?.$message"
                            />
                        </div>

                        <div class="col-md-6">
                            <AuthTextInput 
                                element-class="auth-element hpx-50 rounded-px-6" 
                                label="Description" 
                                placeholder="Please enter description" 
                                v-model="form.description"
                                :error-msg="serverError.description?.[0]"
                            />
                        </div>

                        <div class="col-md-6">
                            <AuthTextInput 
                                element-class="auth-element hpx-50 rounded-px-6" 
                                required 
                                label="Fee ₦" 
                                placeholder="Please enter fee in naira" 
                                v-model="form.price_naira_monthly"
                                :error-msg="serverError.price_naira_monthly?.[0] || v$.price_naira_monthly.$errors[0]?.$message"
                            />
                        </div>

                        <div class="col-md-6">
                            <AuthTextInput 
                                element-class="auth-element hpx-50 rounded-px-6" 
                                required 
                                label="Fee $" 
                                placeholder="Please enter fee in dollar" 
                                v-model="form.price_dollar_monthly"
                                :error-msg="serverError.price_dollar_monthly?.[0] || v$.price_dollar_monthly.$errors[0]?.$message"
                            />
                        </div>
                        <div class="col-md-6"><FormButton label="Cancel" class="perfect-center hpx-50 w-100" buttonType='outline' @click="showCreateAddOnModal = false"/></div>
                        <div class="col-md-6"><FormButton label="Save" class="perfect-center hpx-50 w-100" @click="submitAddon"/></div>

                    </div>
                </div>
            </template>
            </ModalBox>



            <ModalBox 
                    class="h-100" 
                    v-model="showEditPlanOrAddonModal" 
                    :staticBackDrop="true"
                    modalContentClass="rounded-0"
                    modal-custom-class="category-class" modalSize="modal-xl" :modalWidth="selectedPlanOrAddon.default_type == 'plan' ? '1140px' : '800px'"
                    @modal:closed="showEditPlanOrAddonModal = false" :modalId="`modal-oti-${Date.now()}`"
                >
                <template #default>
                    <div class="position-relative">
                        <span class="bg-blue-lt-1 wpx-30 hpx-30 perfect-center rounded-circle my-auto position-absolute end-0 me-3 mt-3 cursor-pointer" @click="showEditPlanOrAddonModal = false">
                            <i class="material-icons-outlined fs-14 lh-14 text-blue-dk-2 fw-bold">close</i>
                        </span>

                    
                        <div class="row g-3 p-4">
                            <span class="gilroy-regular fw-400 fs-30 lh-35 text-blue my-3">Edit Subscription</span>
                            <div class="col-md-12">
                                <AuthTextInput 
                                    element-class="auth-element hpx-50 rounded-px-6" 
                                    required 
                                    label="Add-on Name" 
                                    placeholder="Please enter add-on name" 
                                    v-model="form.title"
                                    :error-msg="serverError.title?.[0] || v$.title.$errors[0]?.$message"
                                />
                            </div>

                            <div class="col-md-12">
                                <!-- <AuthTextInput 
                                    element-class="auth-element hpx-50 rounded-px-6" 
                                    label="Description" 
                                    placeholder="Please enter description" 
                                    v-model="form.description"
                                    :error-msg="serverError.description?.[0]"
                                /> -->

                                <AuthTextBox 
                                    element-class="auth-element rounded-px-6" 
                                    required 
                                    rows="3"
                                    label="Description" 
                                    placeholder="Please enter description" 
                                    v-model="form.description"
                                    :error-msg="serverError.description?.[0]"
                                />
                            </div>


                            <div class="col-md-12" v-if="selectedPlanOrAddon.default_type == 'plan'">
                                <div class="d-flex justify-content-between mb-2">
                                    <FormLabel
                                        label="Features"
                                        class="my-auto"
                                    />
                                </div>
                                <div class="d-flex mb-2" v-for="(feature, i) in form.features" :key="i">
                                    <AuthTextInput
                                        wrapper-class="w-37" 
                                        element-class="auth-element my-auto hpx-50 rounded-px-6"
                                        placeholder="Please enter plan feature title" 
                                        v-model="feature.title"
                                    />
                                    <div class="d-flex flex-column w-55 ms-3 my-auto rounded-px-6 bg-white">
                                        <QuillEditor 
                                            theme="snow" 
                                            :toolbar="[
                                                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                                                ['bold', 'italic', 'underline', { 'align': [] }, 'strike'],
                                                [{ 'color': [] }, { 'background': [] }, 'clean'],
                                            ]"
                                            placeholder="Please enter more info for the feature" 
                                            v-model:content="feature.info"
                                            contentType='html'
                                        />
                                    </div>
                                    <div class="flex-grow-1 my-auto ms-3 ps-1" v-if="i >= 1">
                                        <span class="perfect-center rounded-circle wpx-28 hpx-28 bg-blue text-white cursor-pointer" @click="removeFeature(i)">-</span>
                                    </div>
                                </div>
                                <FormButton label="Add new feature" class="perfect-center hpx-30 mt-2" @click="addFeature"/>

                            </div>


                            <div class="col-md-12">
                                <AuthTextInput 
                                    element-class="auth-element hpx-50 rounded-px-6" 
                                    required 
                                    :label="`Price ${selectedPlanOrAddon.currency == 'NGN' ? '₦' : '$'}`" 
                                    placeholder="Please enter price" 
                                    v-model="form.price"
                                    :error-msg="serverError.price?.[0] || v$.price.$errors[0]?.$message"
                                />
                            </div>

                            <div class="col-md-6" v-if="selectedPlanOrAddon.default_type == 'plan'">
                                <AuthTextInput 
                                    element-class="auth-element hpx-50 rounded-px-6" 
                                    required 
                                    :label="`Slash ${selectedPlanOrAddon.currency == 'NGN' ? '₦' : '$'}`" 
                                    placeholder="Please enter slash" 
                                    v-model="form.slash"
                                    :error-msg="serverError.slash?.[0]"
                                />
                            </div>

                            <div class="col-md-6" v-if="selectedPlanOrAddon.default_type == 'plan'">
                                <AuthTextInput 
                                    element-class="auth-element hpx-50 rounded-px-6" 
                                    required 
                                    :label="`Save ${selectedPlanOrAddon.currency == 'NGN' ? '₦' : '$'}`" 
                                    placeholder="Please enter discount" 
                                    v-model="form.discount"
                                    :error-msg="serverError.discount?.[0]"
                                />
                            </div>

                        </div>
                        <div class="d-flex g-3 p-4">
                            <FormButton label="Cancel" class="perfect-center hpx-50 w-100 me-2" buttonType='outline' @click="showEditPlanOrAddonModal = false"/>
                            <FormButton label="Save" class="perfect-center hpx-50 w-100 ms-2" @click="submitUpdateOnPlanOrAddon"/>
                        </div>
                    </div>
                </template>
                </ModalBox>
    </div>
</template>


<script setup lang="ts">
    import { ref, computed, onMounted } from 'vue'
    import { validateAddonForm } from '../validator'
    import { useRouter } from 'vue-router'
    import { addAddon, getPlans, setPlanPopularity, setPlanVisible, updatePlanOrAddon, deletePlan } from '../services'
    import {getObjectProperty, dateFormatter} from '@/services/helper-service'
    import * as AlertService from '@/services/alert-service'
    import { deleteData } from '@/globals/helpers'

    const router = useRouter()

    let {form, v$} = validateAddonForm()
    
    const currentTab = ref('all')
    const showCreateAddOnModal = ref(false)
    const showEditPlanOrAddonModal = ref(false)
    const selectedPlanOrAddon = ref({} as any);

    const plans = ref([] as any);

    const {
        isLoading: getPlansIsLoading,
        execute: executeGetPlans
    } = getPlans({type: 'plan'})
    const {
        isLoading: getAddonsIsLoading,
        execute: executeGetAddons
    } = getPlans({type: 'addon' })

    onMounted(()=>{
        Promise.all([executeGetPlans(), executeGetAddons()]).then((res: any) => {
            const planArr = res[0]?.map((plan: any) => {
                plan.created_at = `${dateFormatter(plan?.created, 'do MMMM, yyyy')} at ${dateFormatter(plan?.created, 'h:mm aaaa')}`
                plan.is_addon = false
                return plan
            })
            const addonArr = res[1]?.map((addon: any) => {
                addon.created_at = `${dateFormatter(addon?.created, 'do MMMM, yyyy')} at ${dateFormatter(addon?.created, 'h:mm aaaa')}`
                addon.is_addon = true
                return addon
            })
            plans.value = [...planArr, ...addonArr].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        })
    })



const filteredPlans = computed(() => {
    if (currentTab.value == 'plan') {
        return plans.value.filter((plan: any) => !plan.is_addon)
    } else if (currentTab.value == 'add-on') {
        return plans.value.filter((plan: any) => plan.is_addon)
    } else {
        return plans.value
    }
})

const {
    isLoading: addAddonIsLoading,
    hasError: addAddonHasError,
    isSuccessful: addAddonIsSuccessful,
    execute: executeAddAddon
} = addAddon()

const submitAddon = () => {
    v$.value.$validate();
    if(v$.value.$invalid) return;
    executeAddAddon({ data: form.value }).then((res: any) => {
        if (addAddonIsSuccessful.value) {
            AlertService.toast('success', 'Success', res.message)
            showCreateAddOnModal.value = false
        }
    })
}



    const editPlanOrAddon = (plan: any) => {
        selectedPlanOrAddon.value = plan
        form.value.title = plan.name
        form.value.description = plan.description
        form.value.price = plan.price
        form.value.group_identifier = plan.group_identifier
        if(plan.default_type == 'plan'){
            form.value.features = plan.features
            form.value.slash = plan.slash
            form.value.discount = plan.discount
        }else{
            form.value.features = []
            form.value.slash = ''
            form.value.discount = ''
        }
        showEditPlanOrAddonModal.value = true
    }


    const {
        isLoading: updatePlanOrAddonIsLoading,
        isSuccessful: updatePlanOrAddonIsSuccessful,
        hasError: updatePlanOrAddonHasError,
        execute: executeUpdatePlanOrAddon,
    } = updatePlanOrAddon()

    const submitUpdateOnPlanOrAddon = () => {
        if(form.value.features){
            form.value.features = form.value.features.map((feature: any) => {
                if (feature.info) {
                    feature.showIcon = true
                }else{
                    feature.showIcon = false
                }
                return feature
            })
        }
        executeUpdatePlanOrAddon({ url: `/api/subscription/${selectedPlanOrAddon.value.subscription_id}`, data: form.value }).then((res: any) => {
            if (updatePlanOrAddonIsSuccessful.value) {
                AlertService.toast('success', 'Success', res.message)
                showEditPlanOrAddonModal.value = false
            }
        })
    }


const serverError = computed(() => {
    return getObjectProperty(addAddonHasError || updatePlanOrAddonHasError, "value.errors", {});
});



const addFeature = () => {
    form.value.features?.push({ title: '', info: '' })
}
const removeFeature = (index: number) => {
    form.value.features?.splice(index, 1)
}



const setVisibility = (evt: Event, subscription_id: number) => {
    const  status = (evt.target as HTMLInputElement)?.checked ? 'yes' : 'no'
    const {
        isSuccessful: setVisibilityIsSuccessful,
        execute: executeSetVisibility
    } = setPlanVisible({ subscription_id, status })
    
    executeSetVisibility().then((res: any) => {
        if (setVisibilityIsSuccessful.value) {
            AlertService.toast('success', 'Success', res.message)
        }
    })
}

const setPopularity = (evt:Event, subscription_id: number) => {
    const status = (evt.target as HTMLInputElement)?.checked ? 'yes' : 'no'
    const {
        isSuccessful: setPopularityIsSuccessful,
        execute: executeSetPopularity
    } = setPlanPopularity({ subscription_id, status })

    executeSetPopularity().then((res: any) => {
        if (setPopularityIsSuccessful.value) {
            AlertService.toast('success', 'Success', res.message)
        }
    })
}

const removePlan = (plan: any) => {
    deleteData('Delete Subscription?', "Are you sure you want to delete this? You can't access this subscription once your delete it", () => {
        const {
            isLoading: deletingSubscriptionIsLoading,
            isSuccessful: deletingSubscriptionIsSuccessful,
            execute: executeDeletingSubscription
        } = deletePlan(plan.subscription_id)
        executeDeletingSubscription().then((res: any) => {
            if (deletingSubscriptionIsSuccessful.value) {
                let index = plans.value.findIndex((p: any) => p.subscription_id == plan.subscription_id)
                plans.value.splice(index, 1)
                AlertService.toast('success', 'Success', res.message)
            }
        })
    })
}

</script>



<style lang="scss" scoped>
    .tabs{
        &:hover{
            background-color: var(--spa-color-yellow) !important;
            color: #000000!important;
        }
    }
    .add-on.btn{
        &:hover{
            color: var(--spa-color-white)!important;
            background-color: var(--spa-color-blue)!important;
        }
    }
</style>