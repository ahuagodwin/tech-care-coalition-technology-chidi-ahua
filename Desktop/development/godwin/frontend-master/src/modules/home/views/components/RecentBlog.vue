<template>

    <div class="recent-post d-flex flex-column animate__animated animate__fadeInUp twelve animate__slower">
        <div class="container">
            <div class="title mx-auto mb-3 text-center">Recent blog post</div>

            <div class="row justify-content-center mt-5">

                <div class="col-lg-4 col-md-6 col-sm-12 cardHover" v-for="(post, i) in recentPosts" :key="i">

                <div class="post-card d-flex flex-column bg-white rounded-px-20 mb-4 p-0 mx-auto">
                    <img :src="require(`@/assets/img/home/${post.image}`)" alt="" class="hpx-"/>
                    <div class="d-flex flex-column p-4 wpx-356">
                        <div class="fs-18 lh-20 gilroy-regular text-wrap">{{ post.text }}</div>
                        <div class="d-flex justify-content-between mt-3">
                            <span class="fs-15 lh-18 gilroy-regular">{{ post.created_at }}</span>
                            <span class="wpx-26 hpx-26 rounded-circle perfect-center bg-blue-lt-1 cursor-pointer iconScale">
                                <i class="material-icons">arrow_forward</i>    
                            </span>
                        </div>
                    </div>
                </div>

                </div>

            </div>

        </div>

        <!-- <div class="fs-60 lh-70 gilroy-medium text-center mb-3">Recent blog post</div>

        <div class="d-flex flex-wrap mx-auto mt-5">

            <div class="d-flex flex-column bg-white rounded-px-20 wpx-350 me-3 mb-4 p-0" v-for="(post, i) in recentPosts" :key="i">
                <img :src="require(`@/assets/img/home/${post.image}`)" alt="" class="hpx-"/>
                <div class="d-flex flex-column p-4">
                    <div class="fs-20 lh-23 gilroy-regular text-wrap">{{post.text}}</div>
                    <div class="d-flex justify-content-between mt-3">
                        <span class="fs-15 lh-18 gilroy-regular">{{post.created_at}}</span>
                        <span class="wpx-26 hpx-26 rounded-circle perfect-center bg-blue-lt-1 cursor-pointer">
                            <i class="material-icons">arrow_forward</i>    
                        </span>
                    </div>
                </div>
            </div>

        </div> -->
        
    </div>

</template>


<script lang="ts" setup>
    const recentPosts = [
        {
            image: "blog-post-1.svg",
            text: "Hybrid Banking Model Bridges 'Much Needed' Last-Mile Service Delivery Gap for Nigeria's SMEs",
            created_at: "June 12, 2020.",
        },
        {
            image: "blog-post-2.svg",
            text: "Hybrid Banking Model Bridges 'Much Needed' Last-Mile Service Delivery Gap for Nigeria's SMEs",
            created_at: "June 12, 2020.",
        },
        {
            image: "blog-post-3.svg",
            text: "Hybrid Banking Model Bridges 'Much Needed' Last-Mile Service Delivery Gap for Nigeria's SMEs",
            created_at: "June 12, 2020.",
        },
    ]
</script>


<style lang="scss" scoped>
.recent-post{
    background: linear-gradient(180deg, rgba(239, 240, 252, 0) -2.33%, #D7D9FB 50.71%);
    //opacity: 0.4;
    padding-top: 150px;
    padding-bottom: 150px;
}

.post-card {
    max-width: 434px;
}

.title{
    font-size: 60px;
    font-family: gilroy-medium;
}

@media (max-width: 500px) {
    .title{
        font-size: 40px;
        font-family: gilroy-bold;
    }
}


@media (min-width: 1024px) {

    .title {
        font-size: calc(3.75rem + .3vw);
    }
}
@media (min-width: 1200px) {
    .recent-post {
        padding-left: 150px;
        padding-right: 150px;
    }
}
</style>