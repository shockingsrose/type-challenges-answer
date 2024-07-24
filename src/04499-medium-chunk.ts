// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Chunk<[], 1>, []>>,
  Expect<Equal<Chunk<[1, 2, 3], 1>, [[1], [2], [3]]>>,
  Expect<Equal<Chunk<[1, 2, 3], 2>, [[1, 2], [3]]>>,
  Expect<Equal<Chunk<[1, 2, 3, 4], 2>, [[1, 2], [3, 4]]>>,
  Expect<Equal<Chunk<[1, 2, 3, 4], 5>, [[1, 2, 3, 4]]>>,
  Expect<Equal<Chunk<[1, true, 2, false], 2>, [[1, true], [2, false]]>>
]

// ============= Your Code Here =============

// type ChunkArray<T extends any[], U extends number, Result = []> = T extends [infer F, ...infer R] ? [...Result, F, ...ChunkArray<R, U]

type Chunk<
  T extends any[],
  U extends number,
  Result extends any[] = []
> = T extends [infer F, ...infer R]
  ? Result['length'] extends U
    ? [Result, ...Chunk<T, U, []>]
    : Chunk<R, U, [...Result, F]>
  : Result extends []
  ? []
  : [Result]

type A = Chunk<[1, 2, 3, 4], 1>
