<template>
  <aside
    id="logo-sidebar"
    class="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
    aria-label="Sidebar"
  >
    <div
      class="h-full px-3 overflow-y-auto pb-40 bg-white dark:bg-gray-800 relative"
    >
      <ul class="space-y-2 font-medium">
        <li v-for="item in menuItems" :key="item.name">
          <router-link
            :to="item.path"
            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
          >
            <component :is="item.icon" class="size-5" />
            <span class="ms-3">{{ item.name }}</span>
          </router-link>
        </li>
      </ul>
      <div
        class="w-[255px] shadow sm:w-full h-fit bg-white px-3 fixed bottom-0 left-0 right-0 py-2 overflow-y-auto dark:bg-gray-800"
      >
        <router-link
          to="/login"
          class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
          @click.prevent="logout"
        >
          <LogoutIcon class="size-5" />
          <span class="ms-3">Chiqish</span>
        </router-link>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import LogoutIcon from '@/core/components/icons/logout.vue'
import { useAuthStore } from '@/modules/login/store.ts'

const authStore = useAuthStore()

const logout = () => {
  authStore.logout()
}

interface Item {
  name: string
  path: string
  icon: any
  children?: Item[]
}

const menuItems: Item[] = [
  {
    name: 'Dars jadvali',
    path: '/',
    icon: defineAsyncComponent(
      () => import('@/core/components/icons/dashboard.vue'),
    ),
    children: [],
  },
  {
    name: 'Guruhlar',
    path: '/groups',
    icon: defineAsyncComponent(
      () => import('@/core/components/icons/group.vue'),
    ),
    children: [],
  },
  {
    name: 'Fanlar',
    path: '/subjects',
    icon: defineAsyncComponent(
      () => import('@/core/components/icons/category.vue'),
    ),
    children: [],
  },
  {
    name: 'O`qituvchilar',
    path: '/teachers',
    icon: defineAsyncComponent(
      () => import('@/core/components/icons/category.vue'),
    ),
    children: [],
  },
  {
    name: 'Dars soatlari',
    path: '/hours',
    icon: defineAsyncComponent(
      () => import('@/core/components/icons/clock.vue'),
    ),
    children: [],
  },
]
</script>

<style scoped>
.router-link-exact-active {
  @apply bg-blue-500 text-white;
}
</style>
