<template>

    <div class="container-fluid py-5">
        <div class="container faq d-flex flex-column">
            <div class="fs-60 lh-70 gilroy-medium text-center mb-5">FAQ</div>

            <div class="bg-card bg-white shadow-sm mb-4 cursor-pointer" @click="toggleCurrent(1)">
                <div class="title gilroy-medium">
                    <span> What exactly do we mean when we say "unlimited graphic design"?</span>
                    <span class="space-left2">
                        <span v-if="currentFaq !== 1" class="material-icons fs-20 mt-1"> keyboard_arrow_down</span>
                        <span v-if="currentFaq === 1"  class="material-icons fs-20 mt-1"> keyboard_arrow_up</span>
                    </span>
                </div>
                <div class="description gilroy-regular text-wrap text-purple-dk-1 mt-3" v-if="currentFaq == 1">As long as you have a Spark subscription, you have access to an unlimited number of graphic design tasks, with no additional cost attached.</div>
            </div>

            <div class="bg-card bg-white shadow-sm mb-4 cursor-pointer" @click="toggleCurrent(2)">
                <div class="title gilroy-medium">
                    <span>What kind of designs are excluded from Spark plans?</span>
                    <span class="space-left2">
                        <span v-if="currentFaq !== 2" class="material-icons fs-20 mt-1"> keyboard_arrow_down</span>
                        <span v-if="currentFaq === 2"  class="material-icons fs-20 mt-1"> keyboard_arrow_up</span>
                    </span>
                </div>
                <div class="description gilroy-regular text-wrap text-purple-dk-1 mt-3" v-if="currentFaq == 2">
                    
                    <div class="list-description mb-3 gilroy-regular">Spark’s unlimited services are ultra-powerful, but Our plans do NOT support the following types of requests:</div>

                    <ul class="list ps-0">
                        <li class="gilroy-regular mb-2">-Extremely complex or fine art illustrations</li>
                        <li class="gilroy-regular mb-2">-Fillable or interactive PDF documents</li>
                        <li class="gilroy-regular mb-2">-Complex photo manipulation</li>
                        <li class="gilroy-regular mb-2">-3D/CAD projects</li>
                        <li class="gilroy-regular mb-2">-HTML, CSS, UI/UX design</li>
                        <li class="gilroy-regular mb-2">-Programming, coding, or development</li>
                        <li class="gilroy-regular mb-2">-File formats outside of our supported file types</li>
                        <li class="gilroy-regular mb-2">-Using trademarked names, brands, or quotes</li>
                        <li class="gilroy-regular mb-2">-Content writing or manual typing (typing text from images, coming up with titles for ads, doing research for copy, etc.)</li>
                        <li class="gilroy-regular mb-2">-Inappropriate requests that are sexually explicit, defamatory, ethnically or racially offensive, or anything that is against Spark’s core values.</li>
                    </ul>
                </div>
            </div>


            <div class="bg-card bg-white shadow-sm mb-4 cursor-pointer" @click="toggleCurrent(3)">
                <div class="title gilroy-medium">
                    <span>What is the turnaround time for a design request?</span>
                    <span class="space-left2">
                        <span v-if="currentFaq !== 3" class="material-icons fs-20 mt-1"> keyboard_arrow_down</span>
                        <span v-if="currentFaq === 3"  class="material-icons fs-20 mt-1"> keyboard_arrow_up</span>
                    </span>
                </div>
                <div class="description gilroy-regular text-wrap text-purple-dk-1 mt-3" v-if="currentFaq == 3">The typical turnaround time for basic design requests is 12 to 48 hours.<br/>
    On the other hand, custom illustrations, motion videos, infographics, multi-page booklets, and pitch decks are considered more complex tasks and may take up to 72 hours or longer</div>
            </div>

            <div class="bg-card bg-white shadow-sm mb-4 cursor-pointer" @click="toggleCurrent(4)">
                <div class="title gilroy-medium">
                    <span>How many hours will my designer put in each month?</span>
                    <span class="space-left2">
                        <span v-if="currentFaq !== 4" class="material-icons fs-20 mt-1"> keyboard_arrow_down</span>
                        <span v-if="currentFaq === 4"  class="material-icons fs-20 mt-1"> keyboard_arrow_up</span>
                    </span>
                </div>
                <div class="description gilroy-regular text-wrap text-purple-dk-1 mt-3" v-if="currentFaq == 4">Spark does not bill on an hourly basis. Our fixed-rate billing provides you with access to an unlimited number of graphic design tasks, and once you place a design request, you will be immediately paired with a designer to work on your task. </div>
            </div>

            <div class="bg-card bg-white shadow-sm mb-4 cursor-pointer" @click="toggleCurrent(5)">
                <div class="title gilroy-medium">
                    <span>How many designs should I expect to receive each month?</span>
                    <span class="space-left2">
                        <span v-if="currentFaq !== 5" class="material-icons fs-20 mt-1"> keyboard_arrow_down</span>
                        <span v-if="currentFaq === 5"  class="material-icons fs-20 mt-1"> keyboard_arrow_up</span>
                    </span>
                </div>
                <div class="description gilroy-regular text-wrap text-purple-dk-1 mt-3" v-if="currentFaq == 5">Spark offers Industry-leading speed without compromising quality. The complexity of your design requests, as well as your responsiveness to enquiries and design reviews, will determine how many designs we can create for you each month.</div>
            </div>

            <div class="bg-card bg-white shadow-sm mb-4 cursor-pointer" @click="toggleCurrent(6)">
                <div class="title gilroy-medium">
                    <span>What happens if I am not satisfied with my design?</span>
                    <span class="space-left2">
                        <span v-if="currentFaq !== 6" class="material-icons fs-20 mt-1"> keyboard_arrow_down</span>
                        <span v-if="currentFaq === 6"  class="material-icons fs-20 mt-1"> keyboard_arrow_up</span>
                    </span>
                </div>
                <div class="description gilroy-regular text-wrap text-purple-dk-1 mt-3" v-if="currentFaq == 6">You have unlimited revisions for each design task, so if your design isn't ideal for you,  you can communicate your concerns using our chat box, and your project manager & designer will be informed to make modifications until it's perfect.</div>
            </div>

            <div class="bg-card bg-white shadow-sm mb-4 cursor-pointer" @click="toggleCurrent(7)">
                <div class="title gilroy-medium">
                    <span>What design software do your designers use?</span>
                    <span class="space-left2">
                        <span v-if="currentFaq !== 7" class="material-icons fs-20 mt-1"> keyboard_arrow_down</span>
                        <span v-if="currentFaq === 7"  class="material-icons fs-20 mt-1"> keyboard_arrow_up</span>
                    </span>
                </div>
                <div class="description gilroy-regular text-wrap text-purple-dk-1 mt-3" v-if="currentFaq == 7">We primarily use Adobe products.</div>
            </div>

            <div class="bg-card bg-white shadow-sm mb-4 cursor-pointer" @click="toggleCurrent(8)">
                <div class="title gilroy-medium">
                    <span>How does Spark's 7-day money back guarantee work?</span>
                    <span class="space-left2">
                        <span v-if="currentFaq !== 8" class="material-icons fs-20 mt-1"> keyboard_arrow_down</span>
                        <span v-if="currentFaq === 8"  class="material-icons fs-20 mt-1"> keyboard_arrow_up</span>
                    </span>
                </div>
                <div class="mt-3" v-if="currentFaq == 8">
                    <div class="description gilroy-regular text-wrap text-purple-dk-1 mb-5">Given that we are confident in the caliber of the work we do, all monthly Spark plans are eligible for a full refund within 7 days. You can cancel your subscription within the app or by submitting a request through our customer support channel if Spark is not your ideal design team to get your money back.</div>

                    <div class="description gilroy-bold text-wrap text-purple-dk-1 mb-3">The rules for the Spark 7-day money-back guarantee, as well as some advice to help you decide if we are perfect for you, are provided below.</div>
                    <div class="description gilroy-regular text-wrap text-purple-dk-1 mb-3">If you sign up for a subscription that covers Graphic and motion design, you will be able to make 1 motion design request and 3 graphic design requests as per the guidelines below:</div>
                
                    <div class="description gilroy-bold text-wrap text-purple-dk-1 mb-1">Spark Motion Design Trial Overview:</div>
                    <div class="description gilroy-regular text-wrap text-purple-dk-1 mb-3">Within the 7-day trial period, you can make 1 motion design request of up to 15 seconds in duration + unlimited revisions, and the motion design will be watermarked.</div>
                
                    <div class="description gilroy-bold text-wrap text-purple-dk-1 mb-1">Spark Graphics Trial Overview</div>
                    <div class="description gilroy-regular text-wrap text-purple-dk-1 mb-3">During your trial, you can make three graphic design requests, and each design counts as one request (i.e. a single print or digital creative, or up to 2-3 pages of a multi-page design, depending on the amount of content).</div>
                    <div class="description gilroy-regular text-wrap text-purple-dk-1 mb-3">During your trial period, you will only receive designs with a watermark.</div>


                    <div class="description gilroy-bold text-wrap text-purple-dk-1 mb-1">The following requests are not fulfilled during trials:</div>
                    <ul class="list ps-0 mb-3">
                        <li class="gilroy-regular mb-2">a. Resizing of trial designs</li>
                        <li class="gilroy-regular mb-2">b. Logo designs </li>
                        <li class="gilroy-regular mb-2">c. Brand Mascot or Brand Character designs</li>
                        <li class="gilroy-regular mb-2">d. Explainer Videos</li>
                        <li class="gilroy-regular mb-2">e. Logos</li>
                        <li class="gilroy-regular mb-2">f. Complex illustrations</li>
                    </ul>


                    <div class="description gilroy-regular text-wrap text-purple-dk-1 mb-3">Multi-page design requests are limited during trials: During your trial, if you wish to request a multi-page design such as an ebook, we will complete 2-3 pages, depending on the amount of content, as one design request.</div>

                    <div class="description gilroy-bold text-wrap text-purple-dk-1 mb-3">Why we don’t fulfill certain design requests during trials:</div>

                    <div class="description gilroy-regular text-wrap text-purple-dk-1 mb-3">We do not fulfill presentation, logo, brand mascot, explainer video, or brand character requests during trials for the following reasons:</div>
                    <ul class="list ps-0 mb-3">
                        <li class="gilroy-regular mb-2">1. They often include vague creative briefs as brand guidelines are not available. This in turn doesn’t provide enough direction to complete designs and/or revisions.</li>
                        <li class="gilroy-regular mb-2">2. They often require input and feedback from several team members or other stakeholders, which delays the design process and affects design completion</li>
                        <li class="gilroy-regular mb-2">3. More often than not, many clients who request logos, mascots, and characters during the trial are simply seeking branding work on a complimentary basis, and don’t have recurring design needs.</li>
                    </ul>


                    <div class="description gilroy-bold text-wrap text-purple-dk-1 mb-3">Tips to simplify your Spark experience</div>
                    <ul class="list ps-0 mb-3">
                        <li class="gilroy-regular mb-2">1. Make your request(s) once you are subscribed to Spark so that you can be immediately paired with a designer to work on your request(s).</li>
                        <li class="gilroy-regular mb-2">2. Ensure that you review your designs as soon as possible and also respond to feedback given to you by your designer on time to speed up the turnaround time</li>
                    </ul>


                    <div class="description gilroy-regular text-wrap text-purple-dk-1 mb-3">Do you have any questions about the trial terms? Reach out to us on the live chat at www.tryspark.com.</div>

                </div>
            </div>





        </div>
    </div>

</template>

<script lang="ts" setup>
    import { ref, type Ref } from 'vue'

    const currentFaq: Ref<null|number> = ref(null);
    const toggleCurrent = (curr:number) => {
        currentFaq.value = currentFaq.value == curr ? null : curr
    }

</script>



<style lang="scss" scoped>
    .list{
        list-style-type:none;
    }

@media (max-width: 500px) {
    .bg-card{
        padding: 15px;
    }
    .title{
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: calc(13px + .3vw);
        line-height: calc(15px + .3vw);
    }
    .description, .list li{
        font-size: calc(11px + .3vw);
        line-height: calc(14px + .3vw);
    }
}

@media (min-width: 600px) {
    .bg-card{
        padding: 20px 30px;
    }
    .title{
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: calc(15px + .3vw);
        line-height: calc(18px + .3vw);
    }
    .description, .list li{
        font-size: calc(13px + .3vw);
        line-height: calc(15px + .3vw);
    }
}

@media (min-width: 1024px) {
    .bg-card{
        padding: 30px 40px;
    }
    .title{
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: calc(20px + .3vw);
        line-height: calc(23px + .3vw);
    }
    .description, .list li{
        font-size: calc(16px + .3vw);
        line-height: calc(18px + .3vw);
    }
}
@media (min-width: 1200px) {
    .faq {
        padding-left: 100px;
        padding-right: 100px;
    }
    .bg-card{
        padding: 45px 55px;
    }
    .title{
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: calc(22px + .3vw);
        line-height: calc(23px + .3vw);
    }
    .description, .list li{
        font-size: calc(18px + .3vw);
        line-height: calc(20px + .3vw);
    }
}
@media (min-width: 1400px) {
    .title{
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: calc(26px + .3vw);
        line-height: calc(28px + .3vw);
    }
}
</style>