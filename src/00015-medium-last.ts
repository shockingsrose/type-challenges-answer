// ============= Test Cases =============
import type { Debug, Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Last<[2]>, 2>>,
  Expect<Equal<Last<[3, 2, 1]>, 1>>,
  Expect<Equal<Last<[() => 123, { a: string }]>, { a: string }>>,
]


// ============= Your Code Here =============

/** Normal Resolution */
type Last<T extends any[]> = T extends [infer First, ...infer Rest] ? Rest extends [] ? First : Last<Rest> : T;

/** Cleaner Resolution  */
// type Last<T extends any[]> = [any, ...T][T['length']]

