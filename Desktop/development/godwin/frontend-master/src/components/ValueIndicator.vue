<template>
    <div class="d-flex wpx-36 hpx-21 rounded-px-5 perfect-center my-auto ms-2" :class="{'bg-green-lt-2': type=='up', 'bg-red-lt-8': type=='down'}">
        <i class="material-icons-outlined fs-12 lh-15" :class="{ 'text-green-dk-2': type == 'up', 'text-red-dk-3': type == 'down' }">{{ type == 'up' ? 'north' : 'south'}}</i>
        <span class="gilroy-regular fs-12 lh-15 fw-400" :class="{ 'text-green-dk-2': type == 'up', 'text-red-dk-3': type == 'down' }" >{{ percentage }}%</span>
    </div>
</template>

<script setup lang="ts">
// eslint-disable-next-line
const props = defineProps<{
    percentage: string | number;
    type: 'up' | 'down'        
}>()
</script>