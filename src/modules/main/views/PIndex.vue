<template>
  <div class="flex items-center flex-col justify-center h-screen w-full">
    <div>
      <a href="https://vuejs.org/" target="_blank">
        <img src="@/assets/svg/vue.svg" class="logo vue" alt="Vue logo" />
      </a>
    </div>
    <Button>Hello</Button>
  </div>
</template>

<script setup lang="ts">
import { Button } from '@/core/components/ui/button'
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
