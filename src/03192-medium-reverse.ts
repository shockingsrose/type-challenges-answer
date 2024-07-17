// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Reverse<[]>, []>>,
  Expect<Equal<Reverse<['a', 'b']>, ['b', 'a']>>,
  Expect<Equal<Reverse<['a', 'b', 'c']>, ['c', 'b', 'a']>>
]

type errors = [
  // @ts-expect-error
  Reverse<'string'>,
  // @ts-expect-error
  Reverse<{ key: 'value' }>
]

// ============= Your Code Here =============
type Reverse<T extends Array<any>> = T extends [infer F, ...infer M, infer L]
  ? [L, ...Reverse<M>, F]
  : T extends [infer A]
  ? [A]
  : []

/** 高赞答案 */
type Reverse1<T extends any[]> = T extends [infer F, ...infer Rest]
  ? [...Reverse<Rest>, F]
  : T

type A = Reverse<['a', 'b', 'c', 'd']>
