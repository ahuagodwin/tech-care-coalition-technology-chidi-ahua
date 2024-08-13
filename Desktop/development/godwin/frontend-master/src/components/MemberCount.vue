<template>
    <div class="d-flex justify-content-between" :class="[componentWidth]">
        <div class="d-flex position-relative">
            <UserAvatar 
                v-for="(user,i) in overlayAvatars"
                :key="i"
                class="my-auto position-absolute"
                :class="`avatar-${i}`"
                :style="positionStyles(i)"
                :size="size" 
                fullName="" 
                :src="user.avatar"
            />
        </div>
        <span
            v-if="!addUser" 
            class="perfect-center bg-blue-lt-1 text-blue-dk-1 gilroy-medium rounded-circle" 
            :class="[{invisible:users?.length<=3},`wpx-${size} hpx-${size} fs-${Math.round(size/3)} lh-${Math.round(size/3)}`]"
        >
            {{users?.length-3}}
        </span>
        <div class="position-relative" v-if="addUser">
            <span
                class="perfect-center bg-blue-lt-1 gilroy-medium rounded-circle cursor-pointer" 
                :class="[{'text-blue': !openAddUserBox, 'text-danger': openAddUserBox},`wpx-${size} hpx-${size} fs-${Math.round(size/3)} lh-${Math.round(size/3)}`]"
                @click="openAddUserBox=!openAddUserBox"
            >
                {{openAddUserBox ? 'x': '+'}}
            </span>
            <div class="userBox position-absolute wpx-270 hpx-300 p-3 mt-2 bg-white" v-if="openAddUserBox">
                <AuthTextInput 
                    element-class="auth-element hpx-38 rounded-0 border-blue" 
                    placeholder="Search member" 
                    v-model="searchWord"
                />
                <div class="d-flex flex-column hpx-230 overflow-auto py-3">

                    <div class="d-flex mb-3" v-for="(user, i) in teamMembers" :key="i">
                        <UserAvatar :size="22" :src="user.avatar" class="my-auto" />
                        <div class="d-flex flex-column my-auto ms-3">
                            <span class="gilroy-regular fs-14 lh-16 my-auto">{{ user.name }}</span>
                            <span class="gilroy-regular fs-11 lh-12 my-auto mt-1 text-secondary-muted"><i>{{ user.role || 'Account Manager'}}</i></span>
                        </div>
                        <input :key="i" type="checkbox" class="my-auto ms-auto" :value="user.id" v-model="checkedUserIds" @change="getCheckedValues()" @click="getCheckedValue(user.id)"/>
                    </div>

                </div>
            </div>
        </div>
        <!-- <div class="userModal position-fixed top-0 start-0 w-100 h-100 overflow-auto" v-if="openAddUserBox">
            <div></div>
        </div> -->
    </div>
</template>


<script lang="ts" setup>
    import {computed, ref, Ref, onMounted } from 'vue'
    interface MemberCountProps {
        users:{id:number, avatar:string}[];
        size?:number;
        componentWidth?:string;
        addUser?: boolean;
        team?: {
            id: number,
            avatar: string,
            name?: string,
            first_name?: string,
            last_name?: string,
            role: any
        }[];
    }
    //eslint-disable-next-line
    const props = withDefaults(defineProps<MemberCountProps>(),{
        size:24,
        componentWidth:'wpx-80',
    })
    //eslint-disable-next-line
    const emits = defineEmits(['selected:user:id','selected:user:ids'])

    const overlayAvatars = computed(()=>{
        return props.users && props.users.slice(0,3)
    })
     const positionStyles = (index:number)=>{
        return [
            {zIndex:10},
            {zIndex:9, left:`${props.size/2}px`},
            {zIndex:8, left:`${props.size}px`},
        ][index]
    }
    const checkedUserIds: Ref<number[]> = ref([])
    const addCheckedUser = () => {
            props?.team?.map((user) => {
            const userInUsers = props.users.findIndex((u) => u.id == user.id)
            if (userInUsers > -1) {
                checkedUserIds.value.push(user.id)
            }
        })
    }
    onMounted(() => {
        addCheckedUser()
    })
    const openAddUserBox = ref(false)
    const searchWord = ref('')
    const teamMembers = computed(()=>{
        const users = props?.team?.map((user)=>{
            user.name = user.name || `${user.first_name} ${user.last_name}`
            return user
        })
        //return users;
        //return users?.sort((a) => checkedUserIds.value.includes(a?.id) ? -1 : 1)
        users?.sort((a) => checkedUserIds.value.includes(a?.id) ? -1 : 1)
        return users;
    })
    const getCheckedValue = (userId: number) => {
        emits('selected:user:id', userId)
    }
    const getCheckedValues = () => {
        //emits('selected:user:id', selectedUser.id)
        emits('selected:user:ids', checkedUserIds.value)
    }
    // const getCheckedValues = (selectedUser: any) => {
    //     emits('selected:user:id', selectedUser.id)
    //     emits('selected:user:ids', checkedUserIds.value)
    // }
</script>



<style lang="scss" scoped>
    .userBox{
        box-shadow: 0px 6px 30px rgba(0, 0, 0, 0.1);
        z-index:1;
    }
    .userModal{
        z-index: 1;
        /* background-color: rgb(0,0,0); 
        background-color: rgba(0,0,0,0.4);  */
    }
    /* .avatar{
        &-0{
            z-index: 10;
        }
        &-1{
            left:12px;
            z-index: 9;
        }
        &-2{
            left:24px;
            z-index: 8;
        }
    } */
</style>