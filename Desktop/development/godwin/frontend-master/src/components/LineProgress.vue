<template>
    <div class="d-flex flex-column">
        <div class="d-flex justify-content-between" v-if="label || (showPercentage && !isMultipleBars)">
            <span v-if="label" class="my-auto text-secondary-muted fw-400 fs-14 lh-23">{{label}}</span>
            <span class="my-auto text-secondary-muted fw-400 fs-14 lh-23 ms-auto" v-if="showPercentage && !isMultipleBars">{{percentage}}%</span>
        </div>
        <div class="progress bg-blue-lt-1" :class="`hpx-${height}`">
            <div 
                v-for="(bar, i) in bars" 
                :key="i"
                class="progress-bar" 
                :class="[barClasses,`${bar.bgColor} w-${bar.percentage}`]" 
                role="progressbar" 
                :aria-valuenow="bar.percentage" 
                aria-valuemin="0" 
                aria-valuemax="100"
            >
            <span class="fs-12">{{showPercentageOnBar || isMultipleBars ? `${bar.percentage}%` : ''}}</span>
            </div>
        </div>
    </div>
</template>


<script lang="ts">
import {computed, defineComponent,PropType} from 'vue'

type ProgressOption = {
    percentage:number;
    bgColor?:string;
}
export default defineComponent({
    name:'ShrLineProgress',
    props:{
        label:String,
        isMultipleBars:Boolean,
        options:Array as PropType<Array<ProgressOption>>,
        useStripe:Boolean,
        animateStripe:Boolean,
        showPercentageOnBar:Boolean,
        percentage:{
            type:Number,
            validator:(percentage:number)=>percentage >= 0 || percentage <= 100,
            default:0
        },
        bgColor:{
            type:String,
            default:'bg-blue'
        },
        showPercentage:{
            type:Boolean,
            default:true
        },
        height:{
            type:Number,
            validator:(height:number)=>height > 0 || height <= 20,
            default:10
        },
    },
    setup(props:any) {
        const bars = computed(()=>props.isMultipleBars ? props.options : [{percentage:props.percentage,bgColor:props.bgColor}])

        const barClasses = computed(()=>({
            'progress-bar-striped':props.useStripe,
            'progress-bar-animated':props.animateStripe,
        }))
        return {
            bars,
            barClasses
        }
    }
})

</script>


<style lang="scss" scoped>
    .progress-bar{
        border-top-right-radius: 0.25rem;
        border-bottom-right-radius: 0.25rem;
    }
</style>