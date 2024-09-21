<template>
  <main>
    <CNavbar />
    <div class="px-1 py-4 md:p-4 sm:ml-64">
      <div class="p-1 md:p-4 mt-14">
        <slot />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import CNavbar from '@/core/components/layout/CNavbar.vue'
import { onMounted } from 'vue'
import { initFlowbite } from 'flowbite'

onMounted(() => {
  initFlowbite()
})
</script>

<style scoped></style>
