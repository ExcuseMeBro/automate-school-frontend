<template>
  <CPage title="Guruhlar" :description="`Jami: ${tableRows.length || 0}`">
    <template #actions>
      <div class="flex items-center gap-5">
        <FSearch v-model="search" />
        <AddAndEdit />
      </div>
    </template>
    <CLoading v-if="isGettingGroups" />
    <CTable
      v-else-if="tableRows.length > 0 && !isGettingGroups"
      :headers="headers"
    >
      <template #body>
        <TableRow v-for="(row, idx) in filteredGroups" :key="row?.id">
          <TableCell>{{ idx + 1 }}.</TableCell>
          <TableCell>
            <WordHighlighter :query="search">
              {{ row?.level }} - {{ row?.name }}
            </WordHighlighter>
          </TableCell>
          <TableCell>
            <p>{{ row?.studentCount }}</p>
          </TableCell>
        </TableRow>
      </template>
    </CTable>
    <CNoData v-else />
    <CNoSearch v-if="filteredGroups.length === 0 && search" />
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
import { useGroupStore } from '@/modules/groups/stores/group.ts'
import CNoSearch from '@/core/components/common/CNoSearch.vue'
import AddAndEdit from '@/modules/groups/components/addAndEdit.vue'

const groupsStore = useGroupStore()

const headers = ['№', 'Nomi', 'O`quvchilar soni']
const isGettingGroups = computed(() => groupsStore.isGettingGroups)
const tableRows = computed<any[]>(() => groupsStore.groups)

onMounted(() => {
  groupsStore.getAllGroups()
})

const search = ref('')

const filteredGroups = computed(() => {
  return tableRows.value?.filter((row) => {
    return row?.name?.toLowerCase()?.includes(search.value?.toLowerCase())
  })
})
</script>

<style scoped></style>
