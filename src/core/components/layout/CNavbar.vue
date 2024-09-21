<template>
  <nav
    class="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700"
  >
    <div class="px-3 py-3 lg:px-5 lg:pl-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center justify-start rtl:justify-end">
          <button
            id="sidebar-toggle"
            data-drawer-target="logo-sidebar"
            data-drawer-toggle="logo-sidebar"
            aria-controls="logo-sidebar"
            type="button"
            class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <span class="sr-only">Open sidebar</span>
            <svg
              class="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clip-rule="evenodd"
                fill-rule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
              ></path>
            </svg>
          </button>
          <a href="/" class="flex ms-2 md:me-24">
            <img src="/logo.png" class="h-8 me-3" alt="ASchool" />
            <span
              class="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white"
              >ASchool</span
            >
          </a>
        </div>
        <div
          v-if="!isOnline"
          class="flex text-red-600 gap-2 items-center justify-center"
        >
          <p class="md:block hidden">
            Internetga bog'lanishda muammo yuzaga keldi!
          </p>
          <SvgSpinnersWifiFade class="size-6" />
        </div>
        <div class="flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div
                class="flex items-center size-9 justify-center rounded-full p-px border border-gray-200 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <AccountIcon class="size-7" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Account Sozlamalari</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <div
                  class="flex items-center justify-center gap-3"
                  @click.prevent="logout"
                >
                  <LogoutIcon class="h-5 w-5" />
                  <span>Chiqish</span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/core/components/ui/dropdown-menu'
import LogoutIcon from '@/core/components/icons/logout.vue'
import AccountIcon from '@/core/components/icons/account.vue'
import { useAuthStore } from '@/modules/login/store.ts'
import { useNetwork } from '@vueuse/core'
import SvgSpinnersWifiFade from '@/core/components/icons/wifi-fade.vue'

const { isOnline } = useNetwork()

const authStore = useAuthStore()

const logout = () => {
  authStore.logout()
}
</script>

<style scoped></style>
