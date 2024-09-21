<template>
  <Dialog>
    <DialogTrigger @click.prevent>
      <div
        v-if="isEdit"
        class="flex items-center text-blue-500 gap-2 transition-300 hover:scale-105"
      >
        <div class="flex-shrink-0">
          <PencilIcon class="size-5" />
        </div>
      </div>
      <Button v-else size="sm" class="gap-1 flex items-center">
        <PlusIcon class="size-5" />
        <span class="font-medium"> Qo'shish </span>
      </Button>
    </DialogTrigger>
    <DialogContent class="max-w-[400px]">
      <DialogHeader>
        <DialogTitle>
          {{ !isEdit ? "Guruh qo'shish" : "Guruhni o'zgartirish" }}
        </DialogTitle>
      </DialogHeader>
      <DialogDescription> </DialogDescription>
      <div class="flex flex-col gap-2 max-h-96 overflow-y-auto px-1 pb-3">
        <label>Group nomi</label>
        <Input
          v-model="form.values.name"
          placeholder="Guruh nomini kiriting..."
          type="text"
          :class="{ '!border-red-500': form.$v.value?.name?.$error }"
        />
        <label>Group darajasi</label>
        <Input
          v-model="form.values.level"
          placeholder="Guruh darajasini kiriting..."
          type="text"
          :class="{ '!border-red-500': form.$v.value?.level?.$error }"
        />
      </div>

      <DialogFooter>
        <Button class="w-full" :disabled="loading" @click="onSubmit">
          <SvgSpinnersGooeyBalls2
            v-if="loading"
            class="mr-2 h-4 w-4 animate-spin text-white"
          />
          <span>{{ !isEdit ? "Qo'shish" : "O'zgartirish" }}</span>
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { Button } from '@/core/components/ui/button'
import PlusIcon from '@/core/components/icons/plus.vue'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/core/components/ui/dialog'
import { useForm } from '@/core/composables/useForm.ts'
import { Input } from '@/core/components/ui/input'
import { required } from '@vuelidate/validators'
import { computed, watch } from 'vue'
import SvgSpinnersGooeyBalls2 from '@/core/components/icons/spinner.vue'
import PencilIcon from '@/core/components/icons/pencil.vue'
import { useGroupStore } from '@/modules/groups/stores/group.ts'

const props = defineProps<{
  isEdit?: boolean
  group?: any
}>()

const groupStore = useGroupStore()
const loading = computed(() => groupStore.isAddingGroup)

const form = useForm(
  {
    name: '',
    level: '',
  },
  {
    name: {
      required,
    },
    level: {
      required,
    },
  },
)

const onSubmit = () => {
  form.$v.value.$touch()
  if (!form.$v.value.$invalid) {
    groupStore.addGroup(form.values)
  }
}

// Clear form
watch(
  () => groupStore.clearGroupForm,
  (val) => {
    if (val) {
      form.$v.value.$reset()
      form.values.name = ''
      form.values.level = ''
    }
  },
)

// Edit a Group
watch(
  () => props.group,
  (val) => {
    if (val) {
      form.values.name = val?.name
      form.values.level = val?.level
    }
  },
  { immediate: true, deep: true },
)
</script>

<style scoped></style>
