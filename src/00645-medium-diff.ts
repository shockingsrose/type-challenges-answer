// ============= Test Cases =============
import type { Debug, Equal, Expect } from './test-utils'

type Foo = {
  name: string
  age: string
}
type Bar = {
  name: string
  age: string
  gender: number
}
type Coo = {
  name: string
  gender: number
}

type cases = [
  Expect<Equal<Diff<Foo, Bar>, { gender: number }>>,
  Expect<Equal<Diff<Bar, Foo>, { gender: number }>>,
  Expect<Equal<Diff<Foo, Coo>, { age: string; gender: number }>>,
  Expect<Equal<Diff<Coo, Foo>, { age: string; gender: number }>>
]

// ============= Your Code Here =============

// type Diff<O extends Record<string, any>, O1 extends Record<string, any>> = {
//     [K in keyof O | keyof O1 as K extends keyof O
//         ? K extends keyof O1
//             ? never
//             : K
//         : K]: K extends keyof O ? O[K] : K extends keyof O1 ? O1[K] : never
// }

type Diff<O, O1> = Omit<O & O1, keyof (O | O1)>

type A = Debug<Diff<Coo, Foo>>

type B = keyof (Foo | Bar)
