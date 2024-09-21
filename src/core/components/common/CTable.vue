<template>
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead v-for="header in headers" :key="header" class="table-cell">
          <p class="font-bold text-gray-900">{{ header }}</p>
        </TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <slot name="body" />
    </TableBody>
  </Table>
</template>

<script setup lang="ts">
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/core/components/ui/table'

defineProps<{
  headers: string[]
}>()
</script>

<style scoped></style>
