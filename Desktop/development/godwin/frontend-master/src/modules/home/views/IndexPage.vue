<template>
    <div class="position-relative">
        <img src="@/assets/img/home/home-side-shadow.svg" alt="" class="home-side-shadow position-absolute start-0"/>
        <div ref="brandRef" :class="{'slide': isInView, 'hidden-before-view': !isInView}">
            <IntroComponent/>
        </div>
        <BrandComponent/>
        <ClientsStatement :slides="slides"/>
        <PricingMini/>
        <OurWorks/>
        <OfferComponent/>
        <HowItWorks/>
        <ChatNDemo />
        <RecentBlog />
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import IntroComponent from './components/IntroComponent.vue';
import BrandComponent from './components/BrandComponent.vue';
import ClientsStatement from './components/ClientsStatement.vue';
import PricingMini from './components/PricingMini.vue';
import OurWorks from './components/OurWorks.vue';
import OfferComponent from './components/OfferComponent.vue';
import HowItWorks from './components/HowItWorks.vue';
import ChatNDemo from './components/ChatNDemo.vue';
import RecentBlog from './components/RecentBlog.vue';
import { getComments } from '../services';
import inViewTransition from '@/hook/inViewTransition.vue';
import 'animate.css';

const slides = ref([] as any);
const brandRef = ref<HTMLElement | null>(null);
const isInView = ref(false);

const { execute: executeGetCommentData } = getComments();

onMounted(() => {
    executeGetCommentData().then((res: any) => {
        slides.value = res?.data.map((comment: any) => {
            comment.name = comment.user?.first_name + ' ' + comment.user?.last_name;
            comment.position = comment?.role || 'No Position Yet';
            return comment;
        });
    });

    if (brandRef.value) {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    isInView.value = true;
                    observer.disconnect(); 
                }
            },
            { threshold: 0.5 } 
        );

        observer.observe(brandRef.value);
    }
});
</script>

<style lang="css" scoped>
.hidden-before-view {
    opacity: 0;
}

.slide {
    animation: slideUp 3s ease-out forwards;
    opacity: 1;
}

@keyframes slideUp {
    from {
        transform: translateY(50vh); 
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}



.viewScroll  {
    animation: fade linear both;
    animation-timeline: view();
    animation-range: entry 50% cover 50%;
}

@keyframes fade {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
    0% {
        opacity: 0;
    }
}


#square {
    background-color: deeppink;
    width: 100px;
    height: 100px;
    animation-name: rotateAnimation;
    animation-duration: 1ms; /* Firefox requires this to apply the animation */
    animation-timeline: --squareTimeline;
    position: absolute;
    bottom: 0;
  }
  
  #stretcher {
    height: 600px;
    background: #dedede;
  }
  
  @keyframes rotateAnimation {
    from {
      transform: rotate(0deg);
    }
  
    to {
      transform: rotate(360deg);
    }
  }
</style>
