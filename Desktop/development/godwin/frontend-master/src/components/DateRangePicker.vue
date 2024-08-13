<template>
    <div class="position-relative" v-clickoutside="(evt: any) => closeRangeSelection(evt)">
        <div class="d-flex cursor-pointer mb-1" @click="showDateRanges = !showDateRanges; showDateRangePicker = false">
            <span class="my-auto gilroy-regular fs-15 lh-18 fw-400">{{ displayValue || 'Select Date Range' }}</span> 
            <i class="fs-18 fw-400 material-icons my-auto ms-2">expand_more</i>
        </div>
        <div class="position-absolute z-2 date-range-dropdown d-flex flex-column p-4 bg-white rounded-px-6" v-if="showDateRanges">
            <span id="custom-range-type" class="gilroy-regular text-blue-dk-2 fs-15 lh-18 fw-400 cursor-pointer mb-2 pb-2 border-bottom" @click="computeDateRange('custom')">Date</span>
            <span class="gilroy-regular text-blue-dk-2 fs-15 lh-18 fw-400 cursor-pointer mb-2 pb-2 border-bottom" @click="computeDateRange('month')">This month</span>
            <span class="gilroy-regular text-blue-dk-2 fs-15 lh-18 fw-400 cursor-pointer mb-2 pb-2 border-bottom" @click="computeDateRange('week')">This week</span>
            <span class="gilroy-regular text-blue-dk-2 fs-15 lh-18 fw-400 cursor-pointer" @click="computeDateRange('today')">Today</span>
        </div>

        <div class="position-absolute z-2" v-if="showDateRangePicker && !showDateRanges">
            <Datepicker
              v-model="date"
              :enable-time-picker="false"
              range
              inline
              auto-apply
              @update:model-value="showDateRangePicker = false"
            />
        </div>
    </div>
</template>


<script setup lang="ts">
import { ref, type Ref, computed } from 'vue'
import { startOfWeek, startOfMonth } from 'date-fns'
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/src/VueDatePicker/style/main.scss'
    
const showDateRanges = ref(false)
const showDateRangePicker = ref(false)
const selectedDateRange: Ref<Date[] | never[]> = ref([])

// eslint-disable-next-line
const prop = defineProps<{
    displayValue?: string
}>()

// eslint-disable-next-line
const emit = defineEmits(['update:modelValue'])

const computeDateRange = (option: any) => {
        showDateRanges.value = false
        if (option == 'custom') {
            showDateRangePicker.value = true
        } else {
            let today: Date = new Date()
            let range: Date[] | null = null

            switch (option) {
                case 'week': {
                    let firstDayOfThisWeek = startOfWeek(today)
                    range = [firstDayOfThisWeek, today]
                    break
                }
                case 'month': {
                    let firstDayOfThisMonth = startOfMonth(today)
                    range = [firstDayOfThisMonth, today]
                    break
                }
                default:
                    range = [today, today]
                    break
            }
            setSelectedDateRange(range)
        } 
}
const date = computed({
    get() {
        return selectedDateRange.value
    },
    set(value: any) {
        setSelectedDateRange(value)
    },
})

const setSelectedDateRange = (range: Date[]) => {
    selectedDateRange.value = range
    emit('update:modelValue', range)
}

const closeRangeSelection = (evt: MouseEvent) => {
    showDateRanges.value = false
    if ((evt.target as HTMLElement)?.id != 'custom-range-type') {
        showDateRangePicker.value = false
    }
}
</script>


<style lang="scss" scoped>
    .date-range-dropdown{
        box-shadow: 0px 4px 6px 0px rgba(0, 0, 0, 0.10);
    }
    .z-2 {
        z-index: 2!important;
    }
</style>
