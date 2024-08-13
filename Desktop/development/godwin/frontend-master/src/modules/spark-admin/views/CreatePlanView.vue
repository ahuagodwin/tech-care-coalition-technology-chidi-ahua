<template>
    <div class="d-flex flex-column px-4">
        <div class="row g-3 p-4 col-md-9 col-sm-12">
            <span class="gilroy-regular fw-400 fs-30 lh-35 text-blue my-3">Create Plan</span>
            <div class="col-md-12">
                <AuthTextInput 
                    element-class="auth-element hpx-50 rounded-px-6" 
                    required 
                    label="Plan Name" 
                    placeholder="Please enter plan name" 
                    v-model="form.title"
                />
            </div>
            <div class="col-md-12">
                <AuthTextBox 
                    element-class="auth-element rounded-px-6" 
                    required 
                    rows="5"
                    label="Description" 
                    placeholder="Please enter description" 
                    v-model="form.description"
                />
            </div>
            <div class="col-md-12">
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
        </div>


        <div class="d-flex flex-column mt-4 col-md-9 col-sm-12 p-4">
            <span class="gilroy-regular fw-400 fs-30 lh-35 text-blue my-3">Billing type & fee</span>

            <div class="table-responsive">
                <table class="table table-borderless">

                    <!-- Monthly -->
                    <PlanBillingTypeTableRows title="Monthly" @billing:details="form.billing.monthly=$event"/>
                    
                    <!-- Quarterly -->
                    <PlanBillingTypeTableRows title="Quarterly" @billing:details="form.billing.quarterly =$event"/>
                    
                    <!-- Bi-Annually -->
                    <PlanBillingTypeTableRows title="Bi-annually" @billing:details="form.billing.bi_annually =$event"/>
                    
                    <!-- Annually -->
                    <PlanBillingTypeTableRows title="Annually" @billing:details="form.billing.annually =$event"/>
                    
                </table>
            </div>
            <div class="d-flex mt-4 justify-content-end pe-2">
                <FormButton label="Cancel" class="w-40 hpx-40 rounded-0" button-type="outline"  @click="router.push({ name: 'Spark.Admin.PlanAndPricing' })"/>
                <FormButton label="Save" class="w-40 hpx-40 rounded-0 ms-3" @click="submitPlan"/>
            </div>
        </div>

    </div>
</template>


<script setup lang="ts">
    import { ref } from 'vue'
    import { useRouter } from 'vue-router'
    import { validatePlanForm } from '../validator'
    import * as AlertService from '@/services/alert-service'
    import PlanBillingTypeTableRows from './components/PlanBillingTypeTableRows.vue'
    import { addPlan} from '../services'

    const router = useRouter()

    let {form, v$} = validatePlanForm()

    const addFeature = () => {
        form.value.features?.push({ title: '', info: '' })
    }
    const removeFeature = (index: number) => {
        form.value.features?.splice(index, 1)
    }

    const {
        isLoading: addPlanIsLoading,
        hasError: addPlanHasError,
        isSuccessful: addPlanIsSuccessful,
        execute: executeAddPlan
    } = addPlan()

    const submitPlan = () => {
        v$.value.$validate();
        if(v$.value.$invalid) return;
        formatFormPropertiesForBackend()

        form.value.features = form.value.features.map((feature: any) => {
            if (feature.info) {
                feature.showIcon = true
            }
            return feature
        })
        executeAddPlan({ data: form.value }).then((res: any) => {
            if (addPlanIsSuccessful.value) {
                AlertService.toast('success', 'Success', res.message)
            }
        })
    }


    const formatFormPropertiesForBackend = () =>{
        (form.value as any).price_naira_monthly = form.value.billing.monthly.naira.price
        ;(form.value as any).slash_price_naira_monthly = form.value.billing.monthly.naira.slash_price
        ;(form.value as any).discount_naira_monthly = form.value.billing.monthly.naira.save
        ;(form.value as any).price_dollar_monthly = form.value.billing.monthly.dollar.price
        ;(form.value as any).slash_price_dollar_monthly = form.value.billing.monthly.dollar.slash_price
        ;(form.value as any).discount_dollar_monthly = form.value.billing.monthly.dollar.save

        
        ;(form.value as any).price_naira_quarterly = form.value.billing.quarterly.naira.price
        ;(form.value as any).slash_price_naira_quarterly = form.value.billing.quarterly.naira.slash_price
        ;(form.value as any).discount_naira_quarterly = form.value.billing.quarterly.naira.save
        ;(form.value as any).price_dollar_quarterly = form.value.billing.quarterly.dollar.price
        ;(form.value as any).slash_price_dollar_quarterly = form.value.billing.quarterly.dollar.slash_price
        ;(form.value as any).discount_dollar_quarterly = form.value.billing.quarterly.dollar.save
        
        ;(form.value as any).price_naira_bi_annually = form.value.billing.bi_annually.naira.price
        ;(form.value as any).slash_price_naira_bi_annually = form.value.billing.bi_annually.naira.slash_price
        ;(form.value as any).discount_naira_bi_annually = form.value.billing.bi_annually.naira.save
        ;(form.value as any).price_dollar_bi_annually = form.value.billing.bi_annually.dollar.price
        ;(form.value as any).slash_price_dollar_bi_annually = form.value.billing.bi_annually.dollar.slash_price
        ;(form.value as any).discount_dollar_bi_annually = form.value.billing.bi_annually.dollar.save

        ;(form.value as any).price_naira_yearly = form.value.billing.annually.naira.price
        ;(form.value as any).slash_price_naira_yearly = form.value.billing.annually.naira.slash_price
        ;(form.value as any).discount_naira_yearly = form.value.billing.annually.naira.save
        ;(form.value as any).price_dollar_yearly = form.value.billing.annually.dollar.price
        ;(form.value as any).slash_price_dollar_yearly = form.value.billing.annually.dollar.slash_price
        ;(form.value as any).discount_dollar_yearly = form.value.billing.annually.dollar.save
    }
</script>