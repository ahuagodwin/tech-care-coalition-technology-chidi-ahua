<template>
    <div>
    <div class="container-fluid">
        <div class="our-work-images mtpx-100 d-flex justify-content-center">
            <div class="row g-4">
                <div class="col-sm-12 col-md-4 mx-sm-auto">
                    <div class="tags d-flex flex-wrap">
                        <span 
                            class="tag cursor-pointer rounded-px-10 hpx-44 px-3 py-2 me-3 mb-2" v-for="(cat, i) in portfolio.categories" :key="i"
                            :class="category == cat.tag ? 'bg-blue text-white' : 'bg-blue-lt-1'"
                            @click="category = cat.tag"
                        >
                            <span class="fs-20 lh-23 gilroy-regular" @click="category = cat.tag">{{ cat.name }}</span> 
                            <i :class="category == cat.tag ? 'text-white' : 'text-blue-dk-2'" 
                                class="material-icons-outlined fs-14 lh-14 fw-bold ms-2" 
                                v-if="isAdmin && cat.tag != 'all'"
                                @click="emits('delete:category', cat.id)"
                            >close</i>
                        </span>
                    </div>
                </div>
                <div class="col-sm-12 col-md-8">
                    <div class="row g-4">
                        <div class="col-sm-4 col-md-4 position-relative"  v-for="(image, i) in images" :key="i">
                            <span class="bg-blue-lt-1 wpx-30 hpx-30 perfect-center rounded-circle my-auto position-absolute end-0 me-3 mt-2 cursor-pointer" 
                                @click="emits('delete:portfolio', image.id)" v-if="isAdmin">
                                <i class="material-icons-outlined fs-14 lh-14 text-blue-dk-2 fw-bold">close</i>
                            </span>
                            <img :src="image.file" alt="" class="w-100 h-100 img-fluid" :class="{ 'cursor-pointer': image.video }" @click="openVideo(image.video)"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <ModalBox 
                class="h-100" 
                v-model="showPortfolioModal"
                :staticBackDrop="true"
                :addHeader="false"
                modal-custom-class="workspace-new-member" modalSize="modal-lg" modalWidth="600px"
                modalContentClass="rounded-0 hpx-500"
                @modal:closed="showPortfolioModal = false" :modalId="`modal-view-${Date.now()}`"
              >
              <template #default>
                <div class="position-relative h-100">
                    <span class="bg-blue-lt-1 wpx-30 hpx-30 perfect-center rounded-circle my-auto position-absolute end-0 me-n2 mt-n2 cursor-pointer" 
                        @click="portfolioVideoLink = ''; showPortfolioModal = false">
                        <i class="material-icons-outlined fs-14 lh-14 text-blue-dk-2 fw-bold">close</i>
                    </span>
                    <div class="embed-responsive embed-responsive-16by9  h-100">
                        <iframe 
                            class="embed-responsive-item"
                            :src="portfolioVideoLink" 
                            allowfullscreen
                            style="overflow:hidden;height:100%;width:100%" height="100%" width="100%"
                        ></iframe>
                    </div>
                </div>
              </template>
              </ModalBox>

        </div>
</template>


<script lang="ts" setup>
    import { ref, computed } from 'vue'

    interface WorkImages {
        portfolio:{
            categories: {id:number, name:string, tag:string}[]
            images: { id: number, file:string, category:string, video?: string}[]
        }
        isAdmin?: boolean
    }
    // eslint-disable-next-line
    const props = defineProps<WorkImages>()

    // eslint-disable-next-line
    const emits = defineEmits(['delete:category', 'delete:portfolio'])

    const category = ref('all');

    const images = computed(()=>{
        if(category.value == 'all'){
            return props.portfolio.images
        }
        return props.portfolio.images.filter((image)=>image.category == category.value) || []
    })

    const showPortfolioModal = ref(false);
    const portfolioVideoLink = ref('')

    const openVideo = (videoLink?:string) =>{
        if(videoLink){
            portfolioVideoLink.value = convertToEmbedLink(videoLink)
            showPortfolioModal.value = true
        }
    }

    const convertToEmbedLink = (url: string) => {
          // Regular expressions for matching YouTube and Vimeo video URLs
            const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/|v\/|ytscreeningroom\?v=|youtu\.be\/|user\/\S+\/|playlist\?list=)([\w-]{11})/;
            const vimeoRegex = /(?:https?:\/\/)?(?:www\.)?vimeo.com\/(\d+)/;

            // Check if the URL is a YouTube video
            const youtubeMatch = url.match(youtubeRegex);
            if (youtubeMatch) {
                const videoId = youtubeMatch[1];
                return `https://www.youtube.com/embed/${videoId}`;
            }

            // Check if the URL is a Vimeo video
            const vimeoMatch = url.match(vimeoRegex);
            if (vimeoMatch) {
                const videoId = vimeoMatch[1];
                return `https://player.vimeo.com/video/${videoId}`;
            }

            // If the URL doesn't match YouTube or Vimeo, return null or handle it accordingly
            return '';
    }
</script>


<style lang="scss" scoped>




@media (max-width: 600px) {
    .our-work-images {
        .tags{
            justify-content: center;
        }
        .row:first{
            flex-direction: column;
        }
    }
}


@media (min-width: 1200px) {
    .our-work-images {
        padding-left: 150px;
        padding-right: 150px;
    }
}

@media (min-width: 1400px) {
    .our-work-images{
        .row{
            max-width: 1140px;
        }
    }
}
</style>