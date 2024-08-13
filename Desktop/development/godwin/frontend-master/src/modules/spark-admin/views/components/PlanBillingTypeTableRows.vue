<template>
     <tr>
        <td rowspan="2" class="align-top">
            <div class="gilroy-regular fw-400 fs-20 lh-23 mt-2 ">{{ title }}</div>
        </td>
        <td>
            <AuthTextInput 
                element-class="auth-element my-auto hpx-50 rounded-px-6" 
                placeholder="₦" 
                v-model="billing.naira.price"
                acceptNumberOnly
            />
        </td>
        <td>
            <AuthTextInput 
                element-class="auth-element my-auto hpx-50 rounded-px-6" 
                placeholder="Slash price" 
                v-model="billing.naira.slash_price"
                acceptNumberOnly
            />
        </td>
        <td>
            <AuthTextInput 
                element-class="auth-element my-auto hpx-50 rounded-px-6" 
                placeholder="Save" 
                v-model="billing.naira.save"
                acceptNumberOnly
            />
        </td>
    </tr>
    <tr>
        <td>
            <AuthTextInput 
                element-class="auth-element my-auto hpx-50 rounded-px-6" 
                placeholder="$" 
                v-model="billing.dollar.price"
                acceptNumberOnly
            />
        </td>
        <td>
            <AuthTextInput 
                element-class="auth-element my-auto hpx-50 rounded-px-6" 
                placeholder="Slash price" 
                v-model="billing.dollar.slash_price"
                acceptNumberOnly
            />
        </td>
        <td>
            <AuthTextInput 
                element-class="auth-element my-auto hpx-50 rounded-px-6" 
                placeholder="Save" 
                v-model="billing.dollar.save"
                acceptNumberOnly
            />
        </td>
    </tr>
</template> 


<script setup lang="ts">
    import { ref, toRaw, watch } from 'vue'
    // eslint-disable-next-line
    const props = withDefaults(defineProps<{ title: 'Monthly' | 'Quarterly' | 'Bi-annually' | 'Annually' }>(), {
        title: 'Monthly'
    })

    // eslint-disable-next-line
    const emit = defineEmits(['billing:details'])

    const planFee = {
        price: '',
        slash_price: '',
        save: '',
    }
    const billing = ref({
        naira: { ...planFee },
        dollar: { ...planFee },
    })
    watch(
        () => billing.value,
        billing => emit('billing:details', toRaw(billing)),
        { deep: true },
    )
</script>