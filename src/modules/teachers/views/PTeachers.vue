<template>
  <CPage title="O`qituvchilar" :description="`Jami: ${tableRows.length || 0}`">
    <template #actions>
      <div class="flex items-center gap-5">
        <FSearch v-model="search" />
        <AddAndEdit />
      </div>
    </template>
    <CLoading v-if="isGettingTeachers" />
    <CTable
      v-else-if="tableRows.length > 0 && !isGettingTeachers"
      :headers="headers"
    >
      <template #body>
        <TableRow v-for="(row, idx) in filteredTeachers" :key="row?.id">
          <TableCell>{{ idx + 1 }}.</TableCell>
          <TableCell>
            <WordHighlighter :query="search">
              {{ row?.fullName }}
            </WordHighlighter>
          </TableCell>
          <TableCell>
            <p>{{ row?.subjects?.map((sub) => sub?.name)?.join(', ') }}</p>
          </TableCell>
          <TableCell>
            <p>{{ row?.workload }}</p>
          </TableCell>
          <TableCell>
            <div class="flex items-center gap-2">
              <AddAndEdit is-edit :teacher="row" />
              <div
                class="flex cursor-pointer items-center text-red-500 gap-2 transition-300 hover:scale-105"
                @click="deleteData(row?.id)"
              >
                <div class="flex-shrink-0">
                  <TrashIcon class="size-5" />
                </div>
              </div>
            </div>
          </TableCell>
        </TableRow>
      </template>
    </CTable>
    <CNoData v-else />
    <CNoSearch v-if="filteredTeachers.length === 0 && search" />
  </CPage>
</template>

<script setup lang="ts">
import { TableRow, TableCell } from '@/core/components/ui/table'
import WordHighlighter from 'vue-word-highlighter'

import CPage from '@/core/components/common/CPage.vue'
import CTable from '@/core/components/common/CTable.vue'
import { computed, onMounted, ref } from 'vue'
import CLoading from '@/core/components/common/CLoading.vue'
import CNoData from '@/core/components/common/CNoData.vue'
import FSearch from '@/core/components/common/FSearch.vue'
import { useTeacherStore } from '@/modules/teachers/stores/teachers.ts'
import CNoSearch from '@/core/components/common/CNoSearch.vue'
import AddAndEdit from '@/modules/teachers/components/addAndEdit.vue'
import TrashIcon from '@/core/components/icons/trash.vue'
import { useSubjectStore } from '@/modules/subjects/stores/subjects.ts'

const teachersStore = useTeacherStore()
const subjectStore = useSubjectStore()

const headers = ['№', 'F.I.O', 'Fanlar', 'Dars soati', 'Amallar']
const isGettingTeachers = computed(() => teachersStore.isGettingTeachers)
const tableRows = computed<any[]>(() =>
  teachersStore.teachers?.filter((row) => row?.subjects?.length),
)

onMounted(() => {
  subjectStore.getAllSubjects()
  teachersStore.getAllTeachers()
})

const search = ref('')

const filteredTeachers = computed(() => {
  return tableRows.value?.filter((row) => {
    return row?.fullName?.toLowerCase()?.includes(search.value?.toLowerCase())
  })
})

const deleteData = (id: any) => {
  teachersStore.deleteTeacher(id)
}
</script>

<style scoped></style>
