<template>
    <paystack
        :id="buttonId"
        :buttonClass="`spark-paystack ${buttonClass}`"
        :buttonText="buttonText"
        :amount="amount * 100"
        :email="clientEmail"
        :publicKey="publicKey"
        :currency="currency"
        :reference="payRef"
        :onSuccess="onSuccess"
        :onCancel="onCancel"
        v-bind="$attrs"
        ref="paystackClick"
    />
</template>

<script lang="ts" setup>
    import { computed} from 'vue'
    import paystack from 'vue3-paystack';
    import AuthService from '@/services/auth-service'
    //import TokenService from "@/services/token-service";


    interface PaymentProp {
        buttonId?: number|string;
        buttonClass: string;
        buttonText?: string;
        amount: number;
        transRef: string;
        email?: string;
        first_name?: string;
        last_name?: string;
        onSuccess: (...arg:any[])=>any;
        onCancel?:  (...arg:any[])=>any;
    }

    // eslint-disable-next-line
    const props = defineProps<PaymentProp>()

    //const paystackClick:Ref<any> = ref(null)
    // const paystackClick = ref<InstanceType<typeof paystack> | null>(null)
    // const click = () => {
    //     paystackClick.value?.click()
    // }

    // // eslint-disable-next-line
    // defineExpose({
    //     click,
    // })

const publicKey = computed(() => {
    return process.env.NODE_ENV == "production" 
    ? process.env.VUE_APP_PAYSTACK_PUB_KEY
    : 'pk_test_c917c955c18450db76764756c99dceab137ba080'
})

// const secretKey = computed(()=>{
//     return process.env.NODE_ENV == "production" 
//     ? process.env.VUE_APP_PAYSTACK_SEC_KEY
//     : 'sk_test_06414462294de7f87345656c9db2cb3c1098f3c8'
// })

const clientEmail = computed(()=>{
    if(props.email){
        return props.email
    }
    let client = AuthService.getLoggedInUser()
    return client.email
})

// const whenCanceled = () => {
//     if (props.onCancel) {
//         props.onCancel()
//     }
//     if (TokenService.get('@tranxRef')) {
//         // There transaction was probably unsuccessful but lets check
//     }
// }

const currency = computed(()=>{
    return window.userCurrency() === '$' ? 'usd' : 'ngn'
})

const payRef = computed(()=>{
  return props.transRef
  // if(process.env.NODE_ENV == "production" ){
  //   return props.transRef
  // }
  // let text = "";
  // let possible =
  //   "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  // for (let i = 0; i < 10; i++)
  //   text += possible.charAt(Math.floor(Math.random() * possible.length));
  // return text;
})

</script>
