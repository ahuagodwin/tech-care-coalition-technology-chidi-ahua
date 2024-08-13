<template>
  <section>
  <button ref="successModal" type="button" class="d-none" data-bs-toggle="modal" :data-bs-target="`#modalId-${modalId}`">&nbsp;</button>

  <div class="modal fade" :class="modalCustomClass" :id="`modalId-${modalId}`" tabindex="-1" role="dialog" aria-labelledby="modalLabel"
       aria-hidden="true" :data-bs-backdrop="staticBackDrop ? 'static': 'true'">
    <div class="modal-dialog" :class="modalCSSClasses" :style="modalWidth ? { width: modalWidth }: ''" role="document">
      <slot name="beforeContent"></slot>
      <div class="modal-content" :class="[modalContentClass]">
        <button ref="closeBtn" type="button" class="close d-none" data-bs-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>

        <div class="modal-header mx-3 px-0" v-if="addHeader">
          <slot name="header">
            <div class="text-secondary fw-500 fs-16">
              <slot name="title"></slot>
            </div>
            <span 
                @click.prevent="closeModal" 
                class="text-reset cursor-pointer close" 
                data-bs-dismiss="modal" 
                aria-label="Close" aria-hidden="true"><i class="material-icons fs-20 text-primary-lt-1">close</i>
            </span>
          </slot>
        </div>

        <div class="modal-body">

          <slot></slot>

        </div>
        <div class="modal-footer" v-if="addFooter">
          <slot name="footer">Modal Footer</slot>
        </div>
      </div>
    </div>
  </div>
</section>

</template>

<script lang="ts" setup>
import {ref, watch, type Ref, computed, onMounted} from 'vue'
interface modalPropsInterface {
  modalId:string | number
  modelValue:boolean
  addHeader?:boolean
  addFooter?:boolean
  staticBackDrop?:boolean
  scrollable?:boolean
  verticallyCentered?:boolean
  fullscreen?:boolean
  modalSize?:'' | 'modal-xl' | 'modal-lg' | 'modal-sm'
  modalWidth?:string
  modalCustomClass?:string|Record<string,any>
  modalContentClass?:string|Record<string,any>
}

// eslint-disable-next-line
const modalProps = withDefaults(defineProps<modalPropsInterface>(),{
  modelValue: false,
  addHeader: false,
  addFooter: false,
  staticBackDrop: true,
  verticallyCentered: true,
  scrollable: true,
  modalSize: '',
})

// eslint-disable-next-line
const emit = defineEmits(['update:modelValue','modal:closed'])

const closeModal = ()=>{
  emit('update:modelValue',false)
  emit('modal:closed',true)
}
let successModal = ref(null) as Ref<HTMLElement | null>;
let closeBtn = ref(null) as Ref<HTMLElement | null>;

const modalCSSClasses = computed(()=>{
  return {
    [modalProps.modalSize]:true,
    'modal-dialog-centered': modalProps.verticallyCentered,
    'modal-dialog-scrollable': modalProps.scrollable,
    'modal-fullscreen': modalProps.fullscreen,
  }
})

onMounted(()=>{
  const modalEL = document.getElementById(`modalId-${modalProps.modalId}`)
  modalEL?.addEventListener('hidden.bs.modal', ()=>{
    emit('modal:closed',true)
  })
})

watch(()=>modalProps.modelValue, async(newVal)=>{
  if(newVal){
    successModal.value?.click();
  }else{
    emit('update:modelValue',false)
    closeBtn.value?.click();
  }
})

</script>

<style scoped lang="scss">
  
  .modal{
    &-header{
      border-bottom: 1px solid var(--spa-color-primary-lt-2)
    }
  }
</style>
