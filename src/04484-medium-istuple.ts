// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<IsTuple<[]>, true>>,
  Expect<Equal<IsTuple<[number]>, true>>,
  Expect<Equal<IsTuple<readonly [1]>, true>>,
  Expect<Equal<IsTuple<{ length: 1 }>, false>>,
  Expect<Equal<IsTuple<number[]>, false>>,
  Expect<Equal<IsTuple<never>, false>>
]

// ============= Your Code Here =============
type isNever<T> = [T] extends [never] ? true : false
type IsTuple<T> = isNever<T> extends true
  ? false
  : T extends readonly any[]
  ? number extends T['length']
    ? false
    : true
  : false
