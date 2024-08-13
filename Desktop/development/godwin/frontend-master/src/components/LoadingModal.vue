<template>
  <div v-if="isLoading" class="modal-backdrop">
    <div class="spinner">
      <img src="@/assets/img/home/spark.svg" alt="" class="spinner-image"/>
    </div>
  </div>
</template>
  
  <script lang="ts" setup>
  import { defineProps } from 'vue';
  
  // Define props
  defineProps<{
  isLoading: boolean;
}>();

  </script>
  

  <style lang="scss" scoped>
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--spa-color-white);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1050;
  }
  
  .spinner {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 150px;
    position: relative;
    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: 5px solid var(--spa-color-yellow);
      border-top: 5px solid var(--spa-color-blue);
      border-radius: 50%;
      animation: spin 2s linear infinite;
    }
  }
  
  .spinner-image {
    position: absolute;
    width: 50%;
    height: 50%;
    animation: zoom 2s infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  @keyframes zoom {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.2); }
  }
  </style>
  