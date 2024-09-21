<template>
  <router-view v-slot="{ Component }">
    <div :key="detectLayout">
      <component :is="detectLayout">
        <Component :is="Component" />
      </component>
    </div>
  </router-view>
</template>

<script setup lang="ts">
import LDefault from '@/layouts/LDefault.vue'
import LError from '@/layouts/LError.vue'
import LAuth from '@/layouts/LAuth.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const layouts = new Map<any, any>()

// *** You can set below another layout components
layouts.set('default', LDefault)
layouts.set('error', LError)
layouts.set('auth', LAuth)

const detectLayout = computed(() => {
  return layouts.get(route.meta.layout) || LDefault
})
</script>

<style scoped></style>
