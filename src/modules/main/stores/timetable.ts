import { defineStore } from 'pinia'
import { ref } from 'vue'
import { toast } from 'vue-sonner'
import { TimeTableService } from '@/modules/main/services/timetable.ts'

export const useTimeTableStore = defineStore('timetable', () => {
  const timetable = ref()
  const isGettingTimeTable = ref(false)

  const getTimeTable = async () => {
    isGettingTimeTable.value = true
    await TimeTableService.get()
      .then((res: any) => {
        if (res?.data) {
          timetable.value = res?.data
        }
      })
      .catch(() => {
        toast.error('Xatolik yuz berdi')
      })
      .finally(() => {
        isGettingTimeTable.value = false
      })
  }

  const isGenerating = ref(false)
  const generateTimeTable = async () => {
    isGenerating.value = true
    await TimeTableService.generate()
      .then((res: any) => {
        if (res?.data) {
          timetable.value = res?.data
          getTimeTable()
        }
      })
      .catch(() => {
        toast.error('Xatolik yuz berdi')
      })
      .finally(() => {
        isGenerating.value = false
      })
  }

  return {
    timetable,
    isGettingTimeTable,
    getTimeTable,
    generateTimeTable,
    isGenerating,
  }
})
