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
                            <th scope="col" class="gilroy-regular fw-500 text-red-dk-5 border-bottom pb-3 fs-14 lh-16 w-10 text-center">Price</th>
                            <th scope="col" class="gilroy-regular fw-500 text-red-dk-5 border-bottom pb-3 fs-14 lh-16 w-10 text-center">Show in catalogue</th>
                            <th scope="col" class="gilroy-regular fw-500 text-red-dk-5 border-bottom pb-3 fs-14 lh-16 w-10 text-center" v-if="currentTab != 'add-on'">Most popular</th>
                            <th scope="col" class="gilroy-regular fw-500 text-red-dk-5 border-bottom pb-3 fs-14 lh-16 w-10 text-center">Sales</th>
                            <th scope="col" class="gilroy-regular fw-500 text-red-dk-5 border-bottom pb-3 fs-14 lh-16 w-10 text-center">Created</th>
                            <th scope="col" class="gilroy-regular fw-500 text-red-dk-5 border-bottom pb-3 fs-14 lh-16 w-10 text-center">Action</th>
                        </tr>

                    </thead>

                    <tbody>
                        <tr v-for="(plan, i) in plans" :key="i">
                            <td class="gilroy-regular fs-16 lh-19 text-blue-dk-1">{{ plan.name }}</td>
                            <td class="gilroy-regular fs-16 lh-19 text-blue-dk-1 text-center">{{ plan.price }} {{ plan.type || 'N/A' }}</td>
                            <td class="gilroy-regular fs-16 lh-19 text-blue-dk-1 text-center">
                                <div class="form-check form-switch d-flex justify-content-center">
                                    <input class="form-check-input" type="checkbox" role="switch" :checked="plan.show">
                                </div>    
                            </td>
                            <td class="gilroy-regular fs-16 lh-19 text-blue-dk-1 text-center" v-if="currentTab != 'add-on'">
                                    <div class="form-check form-switch d-flex justify-content-center" v-if="!plan.is_addon">
                                        <input class="form-check-input" type="checkbox" role="switch" :checked="plan.most_popular">
                                    </div>     
                            </td>
                            <td class="gilroy-regular fs-16 lh-19 text-blue-dk-1 text-center">{{ plan.sales }}</td>
                            <td class="gilroy-regular fs-16 lh-19 text-blue-dk-1 text-center">{{ plan.created_at }}</td>
                            <td class='d-flex justify-content-center'>
                                <i class="material-icons-outlined cursor-pointer">edit</i>
                                <i class="material-icons-outlined cursor-pointer ms-3">delete</i>
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
                                label="Add-on Name" 
                                placeholder="Please enter add-on name" 
                                v-model="form.title"
                            />
                        </div>

                        <div class="col-md-6">
                            <AuthTextInput 
                                element-class="auth-element hpx-50 rounded-px-6" 
                                label="Description" 
                                placeholder="Please enter description" 
                                v-model="form.description"
                            />
                        </div>

                        <div class="col-md-6">
                            <AuthTextInput 
                                element-class="auth-element hpx-50 rounded-px-6" 
                                required 
                                label="Fee ₦" 
                                placeholder="Please enter fee in naira" 
                                v-model="form.price_naira_monthly"
                            />
                        </div>

                        <div class="col-md-6">
                            <AuthTextInput 
                                element-class="auth-element hpx-50 rounded-px-6" 
                                required 
                                label="Fee $" 
                                placeholder="Please enter fee in dollar" 
                                v-model="form.price_dollar_monthly"
                            />
                        </div>
                        <div class="col-md-6"><FormButton label="Cancel" class="perfect-center hpx-50 w-100" buttonType='outline'/></div>
                        <div class="col-md-6"><FormButton label="Save" class="perfect-center hpx-50 w-100"/></div>

                    </div>
                </div>
            </template>
            </ModalBox>
    </div>
</template>


<script setup lang="ts">
    import { ref, computed } from 'vue'
    import { validateAddonForm } from '../validator'
    import { useRouter } from 'vue-router'

    const router = useRouter()

    let {form, v$} = validateAddonForm()
    
    const currentTab = ref('all')

    const showCreateAddOnModal = ref(false)

    const allPlans = [
        {name: 'Basic', price:' 50000', type: 'monthly', show:true, sales:500, created_at: "23-07-2023", most_popular:false, is_addon:false},
        {name: 'Social media management', price:' 5000', type: null, show:true, sales:500, created_at: "23-07-2023", most_popular: false, is_addon:true},
        {name: 'Standard', price:' 500000', type: 'monthly', show:true, sales:500, created_at: "23-07-2023", most_popular:true, is_addon:false},
        {name: 'Webflow management', price:' 5000', type: null, show:true, sales:500, created_at: "23-07-2023", most_popular: false, is_addon:true},
        { name: 'Pro', price: ' 5000000', type: 'monthly', show: true, sales: 500, created_at: "23-07-2023", most_popular: false, is_addon: false },
    ]

    const plans = computed(()=>{
        if (currentTab.value == 'plan') {
        return allPlans.filter((plan) => !plan.is_addon)
        } else if (currentTab.value == 'add-on') {
            return allPlans.filter((plan)=>plan.is_addon)
        } else {
        return allPlans
        }
    })
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