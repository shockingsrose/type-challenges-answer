// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'
import { ExpectFalse, NotEqual } from './test-utils'

let x = 1
let y = 1 as const

type cases1 = [
  Expect<Equal<Integer<1>, 1>>,
  Expect<Equal<Integer<1.1>, never>>,
  Expect<Equal<Integer<1.0>, 1>>,
  Expect<Equal<Integer<1.0>, 1>>,
  Expect<Equal<Integer<0.5>, never>>,
  Expect<Equal<Integer<28.0>, 28>>,
  Expect<Equal<Integer<28.101>, never>>,
  Expect<Equal<Integer<typeof x>, never>>,
  Expect<Equal<Integer<typeof y>, 1>>
]

// ============= Your Code Here =============
// type Integer<T extends number> = `${T}` extends `${infer F}.${infer R}`
//   ? R[number] extends 0
//     ? F
//     : never
//   : Equal<T, number> extends true
//   ? never
//   : T

type Integer<T extends string | number> = number extends T
  ? never
  : `${T}` extends `${string}.${string}`
  ? never
  : T

type NumberToString<T extends number> = `${T}`

type A1 = NumberToString<1.1>
type A2 = NumberToString<1.0>
