<template>
  <div v-bind="$attrs">
      <slot></slot>
  </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name:"MainContainer",
  setup() {
    return {}
  }
})
</script>