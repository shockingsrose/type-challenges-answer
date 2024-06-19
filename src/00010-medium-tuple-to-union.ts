// ============= Test Cases =============
import type { Debug, Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<TupleToUnion<[123, '456', true]>, 123 | '456' | true>>,
  Expect<Equal<TupleToUnion<[123]>, 123>>,
]


/** 1. Array to Object
 *  2. keyof Object
 */
// ============= Your Code Here =============
type TupleToUnion<T extends any[]> = T[number]

type A<T extends any[]> = Debug<T[number]>

type B = A<[1,2,3]>