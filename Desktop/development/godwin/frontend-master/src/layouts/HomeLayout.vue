<template>
    <MainContainer class="container-fluid overflow-hidden px-0 bg-secondary-lt-5">
        <HomeTopBar class="container-fluid"/>
        <div class="mtpx-71">
            <router-view class="routerView" v-slot="{ Component }">
                <component :is="Component" />
            </router-view>
        </div>
        <HomeFooter />
    </MainContainer>

</template>

<script lang="ts" setup>
    import MainContainer from './MainContainer.vue';
    import HomeTopBar from './components/HomeTopBar.vue'
    import HomeFooter from './components/HomeFooter.vue'
    import { onMounted, onUnmounted } from 'vue';


    onMounted(()=>{
        var url = 'https://wati-integration-prod-service.clare.ai/v2/watiWidget.js?2395';
        var s = document.createElement('script');
        s.type = 'text/javascript';
        s.async = true;
        s.src = url;
        s.id = 'chatWatiWidget';
        var options = {
            "enabled": true,
            "chatButtonSetting": {
                "backgroundColor": "#00e785",
                "ctaText": "Chat with us",
                "borderRadius": "25",
                "marginLeft": "0",
                "marginRight": "20",
                "marginBottom": "20",
                "ctaIconWATI": true,
                "position": "right"
            },
            "brandSetting": {
                "brandName": "SPARK",
                "brandSubTitle": "undefined",
                "brandImg": "https://www.wati.io/wp-content/uploads/2023/04/Wati-logo.svg",
                "welcomeText": "Hi there!\nHow can I help you?",
                "messageText": "You checked our website, and you have a few questions to ask.",
                "backgroundColor": "#00e785",
                "ctaText": "Chat with us",
                "borderRadius": "25",
                "autoShow": false,
                "phoneNumber": "2349050619545"
            }
        };
        s.onload = function () {
            CreateWhatsappChatWidget(options);
        };
        var x = document.getElementsByTagName('script')[0];
        x.parentNode?.insertBefore(s, x);
    })

    onUnmounted(()=>{
        var x = document.getElementById('chatWatiWidget');
        (x as HTMLElement).remove()
        var y = document.getElementById('whatsapp-chat-widget');
        (y as HTMLElement).remove()
    })



</script>

<style lang="scss" scoped>
    // .routerView{
    //     // min-height: calc(100vh - 520px);
    // }
</style>