<template>
    <div ref="colorPicker" class="position-relative">
        <slot name="trigger"></slot>
        <div v-if="show" class="color-picker-class position-absolute end-0">
            <ColorPicker
                :visible-formats="['hex']" 
                default-format="hex"
                @color-change="newColor"
            />
        </div>
    </div>
</template>




<script lang="ts" setup>

    import {type Ref,ref} from 'vue'
    import { ColorPicker } from 'vue-accessible-color-picker'
    import { debounce } from 'lodash-es';
    import useGlobals from '@/globals/composables'

    interface ColorPickerProps {
        show:boolean
    }
    //eslint-disable-next-line
    const props = defineProps<ColorPickerProps>()
     //eslint-disable-next-line
    const emits = defineEmits(['hide:picker','new:color']);

    const {clickOutside} = useGlobals()

    const colorPicker = ref() as Ref<any>

    clickOutside(colorPicker,()=>{
        emits('hide:picker',true)
    })

    const newColor = debounce((color:any) => {
        emits('new:color',color.cssColor)
    }, 500);

</script>


<style>
    .vacp-range-input-label.vacp-range-input-label--alpha, 
    .vacp-copy-button, 
    .vacp-color-input-label-text{
        display:none!important;
    }
    .vacp-color-picker{
        width:155px!important
    }
    .vacp-color-space{
        height:120px!important;
    }
    .color-picker-class{
        z-index: 100;
    }
</style>