import { defineStore } from 'pinia'
import { SubjectService } from '@/modules/subjects/services/subjects.ts'
import { toast } from 'vue-sonner'
import { ref } from 'vue'
export const useSubjectStore = defineStore('subject', () => {
  const subjects = ref([])
  const isGettingSubjects = ref(false)

  const getAllSubjects = async () => {
    isGettingSubjects.value = true
    await SubjectService.getAll()
      .then((res: any) => {
        if (res?.data) {
          subjects.value = res?.data
        }
      })
      .catch(() => {
        toast.error('Xatolik yuz berdi')
      })
      .finally(() => {
        isGettingSubjects.value = false
      })
  }

  return {
    getAllSubjects,
    subjects,
    isGettingSubjects,
  }
})
