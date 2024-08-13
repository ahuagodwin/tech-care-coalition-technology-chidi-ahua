<template>
    <div 
        class="d-flex justify-content-center me-1 mb-2" 
        :class="tagClass"
        :style="{backgroundColor:color, color:getColor(color)}"
    >
        <span class="my-auto">{{color}}</span>
        <i 
            class="material-icons cursor-pointer my-auto" 
            :class="iconClass" 
            v-if="showDelete"
             @click="emits('color:deleted', true)">
             close
        </i>
    </div>
</template>


<script lang="ts" setup>
    interface ColorTag{
        color:string, 
        showDelete?:boolean
        tagClass?:string
        iconClass?:string
    }
    // eslint-disable-next-line
    const props = withDefaults(defineProps<ColorTag>(), {
        tagClass: 'wpx-100 hpx-35 rounded-px-10 gilroy-medium fs-15 lh-18',
        iconClass: 'fs-12 ms-1',
        showDelete: false
    })
    // eslint-disable-next-line
    const emits = defineEmits(['color:deleted'])
    const getColor = (color:string) =>{
        return getBOrWFomStarkColor(color)
    }
</script>