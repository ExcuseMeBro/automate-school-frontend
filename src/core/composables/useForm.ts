import useVuelidate, {
  type GlobalConfig,
  type Validation,
  type ValidationArgs,
} from '@vuelidate/core'
import { reactive, type Ref, type UnwrapNestedRefs } from 'vue'

export type TFormArguments<T> = [
  initialValues: T,
  validations: ValidationArgs,
  vuelidateConfig?: GlobalConfig,
]

export interface TForm<T> {
  values: UnwrapNestedRefs<T>
  $v: Ref<Validation>
}

export function useForm<T extends object>(
  ...args: TFormArguments<T>
): TForm<T> {
  const [initialValues, validations, vuelidateConfig] = args

  const values = reactive<T>(initialValues)
  const $v = useVuelidate(validations, values, vuelidateConfig)

  return { values, $v }
}
