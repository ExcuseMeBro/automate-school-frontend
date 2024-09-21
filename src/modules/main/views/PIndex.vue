<template>
  <div>
    <div class="flex w-full items-center justify-end">
      <div class="my-3 flex items-center justify-center space-x-5">
        <Button
          v-if="!isGenerating"
          class="flex items-center whitespace-nowrap"
          @click="regenerate()"
        >
          Qayta generatsiya qilish
        </Button>
        <Button v-else disabled class="select-none">
          <SvgSpinnersGooeyBalls2 class="mr-2 h-4 w-4" />
          Qayta generatsiya qilinmoqda...
        </Button>
      </div>
    </div>
    <table
      v-if="!isLoading"
      class="w-full border text-sm dark:border-slate-600"
    >
      <thead>
        <tr
          class="border bg-gray-100 text-gray-500 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-400"
        >
          <th
            class="border bg-gray-500 p-2 text-white dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200"
          >
            Dars jadvali
          </th>
          <th
            v-for="(day, idx) in weekdays"
            :key="idx"
            class="border p-2 dark:border-slate-600"
          >
            {{ day }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, idx) in filteredGroups"
          :key="idx"
          :class="`border dark:border-slate-600 ${
            idx % 2 !== 1 ? 'bg-white' : 'bg-gray-100'
          }`"
        >
          <td
            class="border p-1 text-center font-medium text-gray-500 dark:border-slate-600 dark:text-slate-400"
          >
            {{ item }}
          </td>

          <td
            v-for="(day, i) in weekdays"
            :key="i"
            class="border p-1 align-top font-medium text-gray-500 dark:border-slate-600"
          >
            <ol class="space-y-1 dark:text-slate-300/80">
              <li
                v-for="(subject, ii) in timetable[item][translateWeekday(day)]"
                :key="ii"
                class="border p-1"
              >
                <p class="font-bold">
                  {{ subject?.moment }}. {{ subject?.subjectName }}
                </p>
                <p class="capitalize text-right">{{ subject?.teacherName }}</p>
              </li>
            </ol>
          </td>
        </tr>
      </tbody>
    </table>
    <CLoading v-else />
  </div>
</template>

<script setup lang="ts">
import { Button } from '@/core/components/ui/button'
import CLoading from '@/core/components/common/CLoading.vue'
import SvgSpinnersGooeyBalls2 from '@/core/components/icons/spinner.vue'
import { useTimeTableStore } from '@/modules/main/stores/timetable.ts'
import { computed, onMounted } from 'vue'
import { translateWeekday, weekdays } from '@/utils'

const timeTableStore = useTimeTableStore()

const isLoading = computed(() => timeTableStore.isGettingTimeTable)
const isGenerating = computed(() => timeTableStore.isGenerating)
const timetable = computed(() => timeTableStore.timetable)

onMounted(() => {
  timeTableStore.getTimeTable()
})

const regenerate = () => {
  timeTableStore.generateTimeTable()
}

const filteredGroups = computed(() => {
  return Object.keys(timetable.value ?? [])?.sort((a, b) => {
    const [aNumber, aLetter] = a.split('-')
    const [bNumber, bLetter] = b.split('-')

    if (aNumber !== bNumber) {
      return parseInt(aNumber) - parseInt(bNumber)
    } else {
      if (aLetter < bLetter) return -1
      if (aLetter > bLetter) return 1
      return 0
    }
  })
})
</script>

<style scoped></style>
