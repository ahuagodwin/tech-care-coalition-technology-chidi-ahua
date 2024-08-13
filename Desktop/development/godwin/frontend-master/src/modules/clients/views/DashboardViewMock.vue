<template>
    <div class="d-flex flex-column px-4">
        <span class="gilroy-medium fs-25 lh-28 text-blue-dk-1">Overview</span>

        <div class="d-flex flex-wrap my-4">

            <div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 mepx-22 wpx-335 ppx-30 hpx-150 mbpx-20 rounded-px-20 bg-white text-black cardShadow">

                <div class="d-flex">
                    <div class="d-flex flex-column my-auto me-3">
                        <span class="gilroy-medium fs-20 lh-23 text-blue">Amusat Olawale</span>
                        <span class="gilroy-medium fs-10 lh-12 text-secondary-lt-4">Your project manager</span>
                        <div class="d-flex pm-contact-icons mt-4">
                            <span class="d-flex justify-content-center align-items-center wpx-26 hpx-26 bg-blue-lt-1 rounded-circle me-3">
                                <i class="material-icons-outlined fs-15 lh-15">call</i>
                            </span>
                            <span class="d-flex justify-content-center align-items-center wpx-26 hpx-26 bg-blue-lt-1 rounded-circle me-3">
                                <i class="material-icons-outlined fs-15 lh-15">mail</i>
                            </span>
                            <span class="d-flex justify-content-center align-items-center wpx-26 hpx-26 bg-blue-lt-1 rounded-circle me-3">
                                <img src="@/assets/img/affiliates/whatsapp.svg" alt=""/>
                            </span>
                        </div>
                    </div>
                    <UserAvatar 
                        class="my-auto"
                        size="73" 
                        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80"
                    />
                </div>

            </div>

            <div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 mepx-22 wpx-335 ppx-40 hpx-150 mbpx-20 rounded-px-20 bg-white text-black cardShadow">

                <div class="d-flex justify-content-between">
                    <div class="d-flex flex-column">
                        <span class="gilroy-medium fs-12 lh-14 text-secondary-lt-4">To do</span>
                        <span class="gilroy-medium fs-25 lh-29 text-blue mt-4 text-center">2</span>
                    </div>
                    <div class="d-flex flex-column">
                        <span class="gilroy-medium fs-12 lh-14 text-secondary-lt-4">Ongoing</span>
                        <span class="gilroy-medium fs-25 lh-29 text-blue mt-4 text-center">200</span>
                    </div>
                    <div class="d-flex flex-column">
                        <span class="gilroy-medium fs-12 lh-14 text-secondary-lt-4">Completed</span>
                        <span class="gilroy-medium fs-25 lh-29 text-blue mt-4 text-center">211</span>
                    </div>
                </div>

            </div>

            <div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 mepx-22 wpx-335 ppx-30 hpx-150 mbpx-20 rounded-px-20 bg-white text-black cardShadow">

                <div class="d-flex flex-column my-auto me-3">
                        <span class="gilroy-medium fs-20 lh-23 text-blue">Spark Creative Workspace</span>
                        <span class="gilroy-medium fs-10 lh-12 text-secondary-lt-4">View all your team members</span>
                        
                        <div class="d-flex justify-content-between mt-4">
                            <MemberCount class="my-auto" :users="users"/>
                            <FormButton label="View all" class="hpx-30 my-auto"/>
                        </div>

                    </div>

            </div>

        </div>

        <div class="d-flex justify-content-between mt-5 pe-4 flex-wrap">
            <span class="gilroy-medium fs-25 lh-28 text-blue-dk-1 mb-2 my-auto">Recent projects</span>
            <FormButton label="Create new project" class="hpx-39 mb-2 my-auto" @click="router.push({name:'Clients.Create.Project'})"/>
        </div>

        <div class="d-flex flex-wrap my-3">

            <div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 mepx-22 wpx-335 ppx-30 hpx-178 mbpx-20 rounded-px-20 bg-white text-black" v-for="n in 5" :key="n">
                <div class="d-flex justify-content-between">
                    <div class="d-flex flex-column mb-auto">
                        <span class="gilroy-medium fs-15 lh-18 text-blue-dk-1">Ebook design</span>
                        <span class="gilroy-regular fs-10 lh-12 text-blue-dk-1">Created  20th july, 2020 at 1:33pm</span>
                    </div>
                    <span class="col-1 mb-auto bg-blue-lt-1 text-blue wpx-60 hpx-16 fs-8 lh-9 rounded-px-3 text-center pt-1">To do</span>
                </div>
                <div class="d-flex bg-blue-lt-1 text-blue-dk-1 w-fit-content hpx-17 fs-11 lh-13 rounded-px-3 text-center px-1 align-items-center mt-4">
                    <i class="material-icons me-1 fs-11 lh-13">attach_file</i>
                    <span>11</span>
                </div>
                <div class="d-flex mt-4">
                    <div class="my-auto me-3">26%</div>
                    <div class="my-auto flex-grow-1">
                        <LineProgress :percentage='26' :showPercentage="false" />
                    </div>
                    <div class="my-auto ms-3">
                        <MemberCount class="my-auto" :users="users"/>
                    </div>
                </div>
            </div>

            <div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 mepx-22 wpx-335 ppx-30 hpx-178 mbpx-20 rounded-px-20 bg-blue-lt-1 text-blue d-flex justify-content-center align-items-center cursor-pointer">
                <span class="fs-18 lh-21 gilroy-regular">View all requests</span>
            </div>


        </div>

    </div>
</template>



<script lang="ts" setup>
    import {ref,nextTick, inject, onMounted, computed} from 'vue'
    import {useRouter} from 'vue-router'

    const router = useRouter()

    const users = [
        {id:1, avatar:'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80'},
        {id:2, avatar:'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60'},
        {id:3, avatar:'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60'},
        {id:4, avatar:'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80'},
        {id:5, avatar:'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80'},
        {id:6, avatar:'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80'},
        {id:7, avatar:'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80'},
    ]
    
    
</script>


<style lang="scss" scoped>
    .cardShadow{
        box-shadow: 0px 5px 26px var(--spa-color-blue-lt-1);
    }
</style>