<template>
  <div
    class="container relative h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0"
  >
    <div
      class="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex"
    >
      <div class="absolute inset-0 bg-zinc-900" />
      <div class="relative z-20 flex items-center text-lg font-medium">
        <img src="/logo.png" alt="ASchool" class="mr-2 h-6 w-6" />
        <span class="text-white">ASchool</span>
      </div>
      <div
        class="text-sm mt-10 rounded border w-fit p-3 z-20 text-muted-foreground"
      >
        <p>login: +998901234567</p>
        <p>password: Secret1!</p>
      </div>
      <div
        class="z-20 grid grid-cols-2 gap-20 mt-10 absolute bottom-5 left-1/2 -translate-x-1/2"
      >
        <a
          href="https://github.com/ScalaUz/automate-school-frontend"
          class="mt-10 flex items-center gap-2 whitespace-nowrap"
        >
          <img src="/github.png" alt="github" class="h-5 w-5 rounded-full" />
          FRONTEND REPO
        </a>
        <a
          href="https://github.com/ScalaUz/automate-school-backend"
          class="mt-10 flex items-center gap-2 whitespace-nowrap"
        >
          <img src="/github.png" alt="github" class="h-5 rounded-full" />
          BACKEND REPO
        </a>
      </div>
    </div>
    <div class="lg:p-8">
      <div
        class="mx-auto flex w-full flex-col text-center justify-center space-y-6 sm:w-[350px]"
      >
        <img
          src="/logo.png"
          alt="ASchool"
          class="w-24 md:hidden mx-auto mb-4"
        />
        <div class="flex flex-col space-y-2 text-center">
          <h1
            class="text-2xl font-semibold text-dark dark:text-white tracking-tight"
          >
            {{ $t('enter_system') }}
          </h1>
          <p class="text-sm text-muted-foreground">
            {{ $t('enter_system_description') }}
          </p>
        </div>
        <FLogin />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import FLogin from '@/modules/login/components/FLogin.vue'
</script>

<style scoped></style>
