<template>
    <div class="d-flex pypx-70 pxpx-150">
        <div class="what-we-do pypx-50 pxpx-70 bg-white rounded-px-30 mx-auto">
            <div class="fs-60 lh-70 gilroy-medium text-center text-blue-dk-1 mb-5">What We Do: </div>
            <div class="d-flex flex-wrap">
                <div class="col-md-4 mb-4 fs-20 lh-23 gilroy-regular" v-for="(evt, i) in whatWeDo" :key="i">{{evt.title}}</div>
            </div>
        </div>
    </div>
</template>




<script lang="ts" setup>
    const whatWeDo = [
        {title: "Background Removal"},
        {title: "Custom Illustrations"},
        {title: "Packaging & Labels"},

        {title: "Basic GIFs"},
        {title: "Display Ads"},
        {title: "Point Of Sale Materials"},

        {title: "Billboards"},
        {title: "Email Signatures"},
        {title: "Presentation Decks"},

        {title: "Blog Images"},
        {title: "Event Invitations"},
        {title: "Print Ads"},
        
        {title: "Book Covers"},
        {title: "Flyers & Posters"},
        {title: "Product Mock-ups"},
        
        {title: "Book Layouts"},
        {title: "Icons"},
        {title: "Promotional Materials"},
        
        {title: "Brochures"},
        {title: "Infographics"},
        {title: "Signage"},
        
        {title: "Business Cards"},
        {title: "Logos"},
        {title: "Social Media Posts & Ads"},
        
        {title: "Business Reports"},
        {title: "Magazine & Newspaper Ads"},
        {title: "Vehicle Wrap designs"},
        
        {title: "Company Profiles"},
        {title: "Motion Videos"},
        {title: "Web Ads"},

        {title: "Corporate Folders"},
        {title: "Can be designed in PS, AI"},
        {title: "Newsletters"},
        {title: "And just about anything that"},
    ]
</script>

<style lang="scss" scoped>
    .what-we-do{
        max-width: 900px;
    }
</style>