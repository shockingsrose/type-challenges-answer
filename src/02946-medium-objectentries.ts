// ============= Test Cases =============
import type { Debug, Equal, Expect } from './test-utils'

interface Model {
  name: string
  age: number
  locations: string[] | null
}

type ModelEntries =
  | ['name', string]
  | ['age', number]
  | ['locations', string[] | null]

type cases = [
  Expect<Equal<ObjectEntries<Model>, ModelEntries>>,
  Expect<Equal<ObjectEntries<Partial<Model>>, ModelEntries>>,
  Expect<Equal<ObjectEntries<{ key?: undefined }>, ['key', undefined]>>,
  Expect<Equal<ObjectEntries<{ key: undefined }>, ['key', undefined]>>,
  Expect<
    Equal<
      ObjectEntries<{ key: string | undefined }>,
      ['key', string | undefined]
    >
  >
]

// ============= Your Code Here =============

type RemoveUndefind<T, K extends keyof T> = [T[K]] extends [undefined]
  ? undefined
  : Required<T>[K]

type ObjectEntries<T> = {
  [K in keyof Required<T>]: [K, RemoveUndefind<T, K>]
}[keyof T]

type A = Partial<Model>
