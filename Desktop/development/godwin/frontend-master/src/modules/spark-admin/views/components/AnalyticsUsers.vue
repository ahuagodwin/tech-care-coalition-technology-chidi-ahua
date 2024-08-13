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
                            <th scope="col" class="gilroy-regular fw-500 text-red-dk-5 border-bottom pb-3 fs-14 lh-16 w-25">User</th>
                            <th scope="col" class="gilroy-regular fw-500 text-red-dk-5 border-bottom pb-3 fs-14 lh-16 w-25 text-center">Email Address</th>
                            <th scope="col" class="gilroy-regular fw-500 text-red-dk-5 border-bottom pb-3 fs-14 lh-16 w-15 text-center">Phone Number</th>
                            <th scope="col" class="gilroy-regular fw-500 text-red-dk-5 border-bottom pb-3 fs-14 lh-16 w-10 text-center">Roles</th>
                            <th scope="col" class="gilroy-regular fw-500 text-red-dk-5 border-bottom pb-3 fs-14 lh-16 w-25 text-center">Workspaces</th>
                        </tr>

                    </thead>

                    <tbody v-if="users?.length">
                        <tr v-for="(user, i) in users" :key="i">
                            <td>
                                <div class="d-flex">
                                    <UserAvatar 
                                        class="my-auto"
                                        size="43" 
                                        :src="user.avatar"
                                    />
                                    <div class="d-flex flex-column my-auto ms-2">
                                        <span class="gilroy-regular fs-15 lh-18 fw-500">{{ user.full_name }}</span>
                                    </div>
                                </div>
                            </td>
                            <td class="gilroy-regular fs-13 lh-15 text-red-lt-9 fw-400 text-center">{{ user.email }}</td>
                            <td class="gilroy-regular fs-13 lh-15 text-red-lt-9 fw-400 text-center">{{ user.phone }}</td>
                            <td class="gilroy-regular fs-13 lh-15 text-red-lt-9 fw-400 text-center">{{ user.roles.map((r:any)=>r.name).join(', ') }}</td>
                            <td class="gilroy-regular fs-13 lh-15 text-red-lt-9 fw-400 text-center">{{ user.workspace.map((w: any) => w.name).join(', ') }}</td>
                        </tr>
                    </tbody>

                </table>
                <span  class="gilroy-regular fs-12 lh-15 fw-400">{{ users?.length }} results showing</span>
            </div> 
            
        </div>

    </div>
</template>


<script setup lang="ts">
    // eslint-disable-next-line
const props = defineProps<{
    users?: Record<string, any>[],
    searchWord?: string
}>()

    // eslint-disable-next-line
    const emit = defineEmits(['search:word'])

    const emitSearchWork = window.debounce((searchKeyword: string) => {
        emit('search:word', searchKeyword)
    }, 3000)

    
</script>