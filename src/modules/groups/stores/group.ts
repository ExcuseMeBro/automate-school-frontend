import { defineStore } from 'pinia'
import { GroupService } from '@/modules/groups/services/group.ts'
import { toast } from 'vue-sonner'
import { ref } from 'vue'
export const useGroupStore = defineStore('group', () => {
  const groups = ref([])
  const isGettingGroups = ref(false)

  const clearGroupForm = ref(false)

  const getAllGroups = async () => {
    isGettingGroups.value = true
    await GroupService.getAll()
      .then((res: any) => {
        if (res?.data) {
          groups.value = res?.data
        }
      })
      .catch(() => {
        toast.error('Xatolik yuz berdi')
      })
      .finally(() => {
        isGettingGroups.value = false
      })
  }

  const isAddingGroup = ref(false)

  const addGroup = async (form: any) => {
    isAddingGroup.value = true
    await GroupService.add(form)
      .then(() => {
        getAllGroups()
        clearGroupForm.value = true
      })
      .catch(() => {
        toast.error('Xatolik yuz berdi')
      })
      .finally(() => {
        isAddingGroup.value = false
      })
  }

  return {
    getAllGroups,
    groups,
    isGettingGroups,
    addGroup,
    isAddingGroup,
    clearGroupForm,
  }
})
