import type { Ref } from 'vue'

export type StringObject = Record<string, any>

export type MaybeRef<T> = T | Ref<T>
