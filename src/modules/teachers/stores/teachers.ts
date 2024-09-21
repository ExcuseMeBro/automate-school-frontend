import { defineStore } from 'pinia'
import { TeacherService } from '@/modules/teachers/services/teachers.ts'
import { toast } from 'vue-sonner'
import { ref } from 'vue'
export const useTeacherStore = defineStore('Teacher', () => {
  const teachers = ref([])
  const isGettingTeachers = ref(false)

  const clearTeacherForm = ref(false)

  const getAllTeachers = async () => {
    isGettingTeachers.value = true
    await TeacherService.getAll()
      .then((res: any) => {
        if (res?.data) {
          teachers.value = res?.data
        }
      })
      .catch(() => {
        toast.error('Xatolik yuz berdi')
      })
      .finally(() => {
        isGettingTeachers.value = false
      })
  }

  const isAddingTeacher = ref(false)

  const addTeacher = async (form: any) => {
    isAddingTeacher.value = true
    await TeacherService.add(form)
      .then(() => {
        getAllTeachers()
        clearTeacherForm.value = true
      })
      .catch(() => {
        toast.error('Xatolik yuz berdi')
      })
      .finally(() => {
        isAddingTeacher.value = false
      })
  }

  const isEditingTeacher = ref(false)
  const editTeacher = async (form: any) => {
    isEditingTeacher.value = true
    await TeacherService.edit(form)
      .then(() => {
        getAllTeachers()
        clearTeacherForm.value = true
      })
      .catch(() => {
        toast.error('Xatolik yuz berdi')
      })
      .finally(() => {
        isEditingTeacher.value = false
      })
  }

  const deleteTeacher = async (id: any) => {
    await TeacherService.delete(id)
      .then(() => {
        getAllTeachers()
      })
      .catch(() => {
        toast.error('Xatolik yuz berdi')
      })
  }

  return {
    getAllTeachers,
    teachers,
    isGettingTeachers,
    addTeacher,
    isAddingTeacher,
    clearTeacherForm,
    deleteTeacher,
    isEditingTeacher,
    editTeacher,
  }
})
