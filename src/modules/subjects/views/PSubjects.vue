<template>
  <CPage title="Fanlar" :description="`Jami: ${tableRows.length || 0}`">
    <template #actions>
      <div class="flex items-center gap-5">
        <FSearch v-model="search" />
      </div>
    </template>
    <CLoading v-if="isGettingSubjects" />
    <CTable
      v-else-if="tableRows.length > 0 && !isGettingSubjects"
      :headers="headers"
    >
      <template #body>
        <TableRow v-for="(row, idx) in filteredSubjects" :key="row?.id">
          <TableCell>{{ idx + 1 }}.</TableCell>
          <TableCell>
            <WordHighlighter :query="search">
              {{ row?.name }}
            </WordHighlighter>
          </TableCell>
          <TableCell>
            <p>{{ row?.category }}</p>
          </TableCell>
          <TableCell>
            <p>{{ row?.hourForHigher }}</p>
          </TableCell>
        </TableRow>
      </template>
    </CTable>
    <CNoData v-else />
    <CNoSearch v-if="filteredSubjects.length === 0 && search" />
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
import { useSubjectStore } from '@/modules/subjects/stores/subjects.ts'
import CNoSearch from '@/core/components/common/CNoSearch.vue'

const subjectsStore = useSubjectStore()

const headers = ['№', 'Nomi', 'Kategoriya', 'Dars soati']
const isGettingSubjects = computed(() => subjectsStore.isGettingSubjects)
const tableRows = computed<any[]>(() =>
  subjectsStore.subjects?.filter((row) => row?.hourForHigher),
)

onMounted(() => {
  subjectsStore.getAllSubjects()
})

const search = ref('')

const filteredSubjects = computed(() => {
  return tableRows.value?.filter((row) => {
    return row?.name?.toLowerCase()?.includes(search.value?.toLowerCase())
  })
})
</script>

<style scoped></style>
