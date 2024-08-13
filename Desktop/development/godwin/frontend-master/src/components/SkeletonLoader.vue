<script lang="ts" setup>
import { defineProps } from 'vue';

const props = defineProps<{
  lines: number;
}>();
</script>


<template>
  <div class="skeleton-wrapper">
    <div class="skeleton-header"></div>
    <div class="skeleton-content">
      <div v-for="n in props.lines" :key="n" class="skeleton-line"></div>
    </div>
  </div>
</template>




<style scoped>
.skeleton-wrapper {
  padding: 20px;
  background: #f0f0f0;
  border-radius: 8px;
  margin-top: 20px;
}

.skeleton-header {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 50%;
  height: 20px;
  background: #ccc;
  margin-bottom: 10px;
  border-radius: 4px;
  margin-left: auto;
  margin-right: auto;
}

.skeleton-content {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
}

.skeleton-line {
  width: 50%;
  height: 15px;
  background: #ccc;
  border-radius: 4px;
}
</style>
