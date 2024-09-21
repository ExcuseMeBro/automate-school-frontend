<template>
  <div :class="cn('grid gap-6', $attrs.class ?? '')">
    <form @submit.prevent="onSubmit">
      <div class="grid gap-2">
        <div class="grid gap-1">
          <Input
            id="email"
            v-model="form.values.login"
            placeholder="login"
            type="text"
            auto-correct="off"
            :error="form.$v.value.login.$error"
            :disabled="loading"
          />
        </div>
        <div class="grid gap-1">
          <div class="relative w-full max-w-sm items-center">
            <Input
              v-model="form.values.password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="******"
              class="pr-10"
              :error="form.$v.value.password.$error"
            />
            <span
              class="absolute cursor-pointer end-0 inset-y-0 flex items-center justify-center px-2"
              @click="showPassword = !showPassword"
            >
              <IconoirEyeClosed
                v-if="showPassword"
                class="size-6 text-muted-foreground"
              />
              <IconoirEye v-else class="size-6 text-muted-foreground" />
            </span>
          </div>
        </div>
        <Button :disabled="loading">
          <SvgSpinnersGooeyBalls2
            v-if="loading"
            class="mr-2 h-4 w-4 animate-spin bg-slate-600"
          />
          {{ $t('login') }}
        </Button>
      </div>
    </form>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
import { required } from '@vuelidate/validators'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import SvgSpinnersGooeyBalls2 from '@/core/components/icons/spinner.vue'
import IconoirEye from '@/core/components/icons/eyeOpen.vue'
import IconoirEyeClosed from '@/core/components/icons/eyeClose.vue'
import { useForm } from '@/core/composables/useForm.ts'
import { useAuthStore } from '@/modules/login/store.ts'

const showPassword = ref(false)
const form = useForm(
  {
    login: '',
    password: '',
  },
  {
    login: {
      required,
    },
    password: {
      required,
    },
  },
)

const authStore = useAuthStore()
const loading = computed(() => authStore.isLoading)

const onSubmit = async () => {
  if (!form.$v.value.$invalid) {
    authStore.login(form.values.login, form.values.password)
  }
}
</script>
