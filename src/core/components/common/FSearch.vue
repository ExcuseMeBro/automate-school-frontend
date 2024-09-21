<template>
  <div class="relative w-full max-w-sm items-center">
    <Input
      id="search"
      v-model="search"
      type="text"
      :placeholder="placeholder || 'Izlash...'"
      class="pl-10"
      :class="inputClass"
    />
    <span
      class="absolute start-0 inset-y-0 flex items-center justify-center px-2"
    >
      <SearchIcon class="size-6 text-muted-foreground" />
    </span>
  </div>
</template>

<script setup lang="ts">
import { Input } from '@/core/components/ui/input'
import SearchIcon from '@/core/components/icons/search.vue'
import { ref, watch } from 'vue'

defineProps<{
  placeholder?: string
  inputClass?: string
}>()

const emit = defineEmits(['update:modelValue'])

const search = ref('')

watch(
  () => search.value,
  (val) => {
    emit('update:modelValue', val)
  },
)
</script>

<style scoped></style>
