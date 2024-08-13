<!-- MotionComponent.vue -->
<template>
  <div ref="animatedElement" class="animated-element">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useMotion } from '@vueuse/motion';

export default defineComponent({
  setup() {
    const animatedElement = ref<HTMLElement | null>(null);

    const options = {
      from: { opacity: 0, transform: 'translateY(50px)' },
      to: { opacity: 1, transform: 'translateY(0)' },
      duration: 1000,
      trigger: 'scroll'
    };

    onMounted(() => {
      if (animatedElement.value) {
        useMotion(animatedElement.value, options);
      }
    });

    return {
      animatedElement
    };
  }
});
</script>

<style scoped>
.animated-element {
  transition: opacity 1s ease, transform 1s ease;
}
</style>
