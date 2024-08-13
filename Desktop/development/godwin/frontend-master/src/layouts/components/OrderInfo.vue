<template>
    <div class="order d-flex flex-column align-items-center wpx-211 hpx-305 mt-5 px-3"
        v-if="route.meta.menuItemsToShow != 'spark-admin'">
        <img src="@/assets/img/clients/sidebarImg2.svg" class="wpx-82 hpx-85 mt-5" />
        <div class="gilroy-regular fs-14 lh-16 text-white text-center mt-4" v-if="route.meta.menuItemsToShow == 'client'">
            Refer Spark to Friends & Family and get paid <span class="gilroy-medium">N5,000</span> every time they use
            <span class="gilroy-medium">Spark</span>
        </div>
        <div class="gilroy-regular fs-14 lh-16 text-white text-center mt-4"
            v-if="route.meta.menuItemsToShow == 'affiliate'">
            Unlimited graphic design made easy with <span class="gilroy-medium">Spark</span>
        </div>

        <FormButton label="REFER NOW" class="hpx-40 border-0 rounded-px-5 mt-5" variant="yellow"
            v-if="route.meta.menuItemsToShow == 'client'" />
        <FormButton label="USE SPARK" class="hpx-40 border-0 rounded-px-5 mt-5" variant="yellow"
            v-if="route.meta.menuItemsToShow == 'affiliate'" />
    </div>
</template>

<script lang="ts" setup>
    import { useRoute } from 'vue-router';
    const route = useRoute();
</script>

<style lang="scss" scoped>
    .order {
        background-image: url(@/assets/img/clients/sidebarImg.svg);
        border-radius: 24px;
    }
</style>