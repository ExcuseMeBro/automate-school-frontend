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
          {{ !isEdit ? "O`qituvchi qo'shish" : "O`qituvchini o'zgartirish" }}
        </DialogTitle>
      </DialogHeader>
      <DialogDescription> </DialogDescription>
      <div class="flex flex-col gap-2 max-h-96 overflow-y-auto px-1 pb-3">
        <label>F.I.O</label>
        <Input
          v-model="form.values.name"
          placeholder="O`qituvchi to`liq nomini kiriting..."
          type="text"
          :class="{ '!border-red-500': form.$v.value?.name?.$error }"
        />
        <label v-if="!isEdit">Fanlar</label>
        <multiselect
          v-if="!isEdit"
          v-model="form.values.subjectsIds"
          :options="subjects"
          multiple
          label="name"
          track-by="name"
          :no-options="['Fanlar yo`q']"
          select-label=""
          deselect-label="x"
          :show-no-options="false"
          placeholder="Fanlarni tanlang"
        ></multiselect>
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
import Multiselect from 'vue-multiselect'
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
import { useTeacherStore } from '@/modules/teachers/stores/teachers.ts'
import { useSubjectStore } from '@/modules/subjects/stores/subjects.ts'

const props = defineProps<{
  isEdit?: boolean
  teacher?: any
}>()

const teacherStore = useTeacherStore()
const subjectStore = useSubjectStore()
const loading = computed(() => teacherStore.isAddingTeacher)
const subjects = computed(() => subjectStore.subjects)

const form = useForm(
  {
    name: '',
    subjectsIds: [],
  },
  {
    name: {
      required,
    },
  },
)

const onSubmit = () => {
  form.$v.value.$touch()
  if (!form.$v.value.$invalid) {
    if (props.isEdit) {
      teacherStore.editTeacher({
        id: props.teacher?.id,
        subjects: form.values.subjectsIds?.map((sub) => sub?.id),
        gender: 'male',
        fullName: form.values.name,
        nationality: 'uzbek',
        citizenship: 'uzbekistan',
        phone: '+99890' + Math.floor(Math.random() * 10000000),
      })
    } else {
      const data = {
        subjects: form.values.subjectsIds?.map((sub) => sub?.id),
        gender: 'male',
        fullName: form.values.name,
        nationality: 'uzbek',
        citizenship: 'uzbekistan',
        phone: '+99890' + Math.floor(Math.random() * 10000000),
      }
      teacherStore.addTeacher(data)
    }
  }
}

// Clear form
watch(
  () => teacherStore.clearTeacherForm,
  (val) => {
    if (val) {
      form.$v.value.$reset()
      form.values.name = ''
      form.values.subjectsIds = []
    }
  },
)

// Edit a teacher
watch(
  () => props.teacher,
  (val) => {
    if (val) {
      form.values.name = val?.fullName
      form.values.subjectsIds = val?.subjects
    }
  },
  { immediate: true, deep: true },
)
</script>

<style scoped></style>
