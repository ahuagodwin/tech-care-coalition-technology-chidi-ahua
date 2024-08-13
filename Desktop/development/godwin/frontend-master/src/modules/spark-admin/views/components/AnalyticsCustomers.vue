<template>
    <div class="d-flex flex-column mt-5">

        <div class="d-flex flex-column bg-white rounded-px-6">
            <AuthTextInput 
                element-class="search-input border-0 rounded-0 rounded-top-px-6 bg-blue-lt-15" 
                placeholder="Search Name, code, discount..." 
                :model-value="searchWord || ''"
                @update:model-value="emitSearchWork"
            />
            <div class="table-responsive ppx-30">
                <table class="table table-borderless">
                    <thead>

                        <tr>
                            <th scope="col" class="gilroy-regular fw-500 text-red-dk-5 border-bottom pb-3 fs-14 lh-16 w-25">Customer</th>
                            <th scope="col" class="gilroy-regular fw-500 text-red-dk-5 border-bottom pb-3 fs-14 lh-16 w-15 text-center">Phone Number</th>
                            <th scope="col" class="gilroy-regular fw-500 text-red-dk-5 border-bottom pb-3 fs-14 lh-16 w-20 text-center">Workspace</th>
                            <th scope="col" class="gilroy-regular fw-500 text-red-dk-5 border-bottom pb-3 fs-14 lh-16 w-10 text-center">Account Manager</th>
                            <th scope="col" class="gilroy-regular fw-500 text-red-dk-5 border-bottom pb-3 fs-14 lh-16 w-10 text-center">Hear about us</th>
                            <th scope="col" class="gilroy-regular fw-500 text-red-dk-5 border-bottom pb-3 fs-14 lh-16 w-10 text-center">Location</th>
                            <th scope="col" class="gilroy-regular fw-500 text-red-dk-5 border-bottom pb-3 fs-14 lh-16 w-10 text-center">Current Plan</th>
                        </tr>

                    </thead>

                    <tbody v-if="customers?.length">
                        <tr v-for="(customer, i) in customers" :key="i">
                            <td>
                                <div class="d-flex">
                                    <UserAvatar 
                                        class="my-auto"
                                        size="43" 
                                        :src="customer.user.avatar"
                                    />
                                    <div class="d-flex flex-column my-auto ms-2">
                                        <span class="gilroy-regular fs-15 lh-18 fw-500">{{ customer.user.first_name }} {{ customer.user.last_name }}</span>
                                        <span class="gilroy-regular fs-10 lh-12 fw-400">{{ customer.user.email }}</span>
                                    </div>
                                </div>
                            </td>
                            <td class="gilroy-regular fs-13 lh-15 text-red-lt-9 fw-400 text-center">{{ customer.user.phone_number }}</td>
                            <td class="gilroy-regular fs-13 lh-15 text-red-lt-9 fw-400 text-center">{{ customer.company.name }}</td>
                            <td class="gilroy-regular fs-13 lh-15 text-red-lt-9 fw-400 text-center">{{ customer.company.account_manager }}</td>
                            <td class="gilroy-regular fs-13 lh-15 text-red-lt-9 fw-400 text-center">{{ customer.company.hear_about_us }}</td>
                            <td class="gilroy-regular fs-13 lh-15 text-red-lt-9 fw-400 text-center">{{ customer.company.location }}</td>
                            <td class="gilroy-regular fs-13 lh-15 text-red-lt-9 fw-400 text-center">{{ customer.subscription.title}}</td>
                        </tr>
                    </tbody>

                </table>
                <span  class="gilroy-regular fs-12 lh-15 fw-400">{{ customers?.length }} results showing</span>
            </div>  
        </div>

    </div>
</template>


<script setup lang="ts">

    // eslint-disable-next-line
    const props = defineProps<{
        customers?: Record<string, any>[]
        searchWord?: string
    }>()

    // eslint-disable-next-line
    const emit = defineEmits(['search:word'])

    const emitSearchWork = window.debounce((searchKeyword: string) => {
        emit('search:word', searchKeyword)
    }, 3000)

    
</script>