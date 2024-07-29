// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Without<[1, 2], 1>, [2]>>,
  Expect<Equal<Without<[1, 2, 4, 1, 5], [1, 2]>, [4, 5]>>,
  Expect<Equal<Without<[2, 3, 2, 3, 2, 3, 2, 3], [2, 3]>, []>>
]

// ============= Your Code Here =============

type ArrayToUnion<T extends number | number[]> = T extends number[]
  ? T[number]
  : T

/** 遇到`U`可能是数组或数字的情况下，把数组转成Union类型，然后使用extends作为条件就很方便处理 */
type Without<
  T,
  U extends number | number[],
  Result extends any[] = []
> = T extends [infer F, ...infer R]
  ? F extends ArrayToUnion<U>
    ? Without<R, U, Result>
    : Without<R, U, [...Result, F]>
  : Result
