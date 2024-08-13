<template>
    <section>

        <button 
            class="d-none"
            ref="openBtn" 
            type="button"  
            data-bs-toggle="offcanvas" 
            :data-bs-target="`#modalId-${modalId}`" 
            :aria-controls="`modalId-${modalId}`"
        >&nbsp;</button>
        <div 
            class="offcanvas"
            :class="[canvasPosition,canvasClass]" 
            :data-bs-backdrop="staticBackDrop ? 'static': 'true'"
            data-bs-keyboard="true" 
            tabindex="-1" 
            :id="`modalId-${modalId}`" 
            aria-labelledby="offcanvasStartLabel"
        >
            <div class="offcanvas-header" :class="[canvasHeaderClass]">
                <slot name="header">
                    <span class="text-secondary fw-500 fs-16" id="offcanvasStartLabel">{{title}}</span>
                    <span 
                        ref="closeBtn" 
                        @click.prevent="closeModal" 
                        class="text-reset cursor-pointer" 
                        data-bs-dismiss="offcanvas" 
                        aria-label="Close" aria-hidden="true"><i class="material-icons fs-20 text-primary-lt-1">close</i>
                    </span>
                </slot>
            </div>
            <div class="offcanvas-body">
                <div class="offcanvasBody mb-4" :class="[canvasBodyClass]">
                    <slot></slot>
                </div>
                <slot name="footer"></slot>
            </div>
        </div>

    </section>
</template>


<script lang="ts" setup>
    import { ref,watch, computed } from 'vue'

    interface modalProps {
        modelValue:boolean;
        title: string;
        position?:string;
        modalId?: string | number;
        staticBackDrop?:boolean;
        canvasClass?:string|Record<string,any>;
        canvasHeaderClass?:string|Record<string,any>;
        canvasBodyClass?:string|Record<string,any>;
    }
    // eslint-disable-next-line
    const props = withDefaults(defineProps<modalProps>(),{
        position:'right',
        modalId:`modal-${Date.now()}`,
        staticBackDrop:true,
        canvasClass:'wpx-450'
    })
    // eslint-disable-next-line
    const emit = defineEmits(['update:modelValue','modal:closed'])

    const openBtn = ref<HTMLElement | null>(null)
    const closeBtn = ref<HTMLElement | null>(null)

    const canvasPosition = computed(()=>{
        return {
            'offcanvas-start': props.position =='left',
            'offcanvas-end': props.position =='right',
            'offcanvas-top': props.position =='top',
            'offcanvas-bottom': props.position =='bottom',
        }
    })

    watch(()=> props.modelValue, (value) => {
      if (value) {
        openBtn.value?.click()
      }else{
        emit('update:modelValue',false)
        closeBtn.value?.click()
      }
    })

    const closeModal = ()=>{
        emit('update:modelValue',false)
        emit('modal:closed',true)
    }
</script>



<style lang="scss" scoped>
    .offcanvas{
        .offcanvasBody{
            overflow-y: scroll;
        }
    }
</style>