<template>
  <Card>
    <CardHeader>
      <CardTitle>
        <div class="flex md:items-center justify-between flex-col md:flex-row">
          <p>{{ title }}</p>
          <div class="hidden md:block">
            <slot name="actions" />
          </div>
        </div>
      </CardTitle>

      <CardDescription v-if="description">
        {{ description }}
      </CardDescription>
      <div class="block md:hidden">
        <slot name="actions" />
      </div>
    </CardHeader>
    <CardContent>
      <slot />
    </CardContent>
    <CardFooter>
      <slot name="footer" />
    </CardFooter>
  </Card>
</template>

<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/core/components/ui/card'

defineProps<{
  title?: string
  description?: string
}>()
</script>

<style scoped></style>
