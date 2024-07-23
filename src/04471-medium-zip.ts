// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Zip<[], []>, []>>,
  Expect<Equal<Zip<[1, 2], [true, false]>, [[1, true], [2, false]]>>,
  Expect<Equal<Zip<[1, 2, 3], ['1', '2']>, [[1, '1'], [2, '2']]>>,
  Expect<Equal<Zip<[], [1, 2, 3]>, []>>,
  Expect<Equal<Zip<[[1, 2]], [3]>, [[[1, 2], 3]]>>
]

// ============= Your Code Here =============
type Zip<T extends any[], U extends any[], Result = []> = T extends [
  infer A1,
  ...infer A2
]
  ? U extends [infer B1, ...infer B2]
    ? [[A1, B1], ...Zip<A2, B2>]
    : Result
  : Result
