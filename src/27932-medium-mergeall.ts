// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<MergeAll<[]>, {}>>,
  Expect<Equal<MergeAll<[{ a: 1 }]>, { a: 1 }>>,
  Expect<Equal<MergeAll<[{ a: string }, { a: string }]>, { a: string }>>,
  Expect<Equal<MergeAll<[{}, { a: string }]>, { a: string }>>,
  Expect<Equal<MergeAll<[{ a: 1 }, { c: 2 }]>, { a: 1; c: 2 }>>,
  Expect<
    Equal<
      MergeAll<[{ a: 1; b: 2 }, { a: 2 }, { c: 3 }]>,
      { a: 1 | 2; b: 2; c: 3 }
    >
  >,
  Expect<Equal<MergeAll<[{ a: 1 }, { a: number }]>, { a: number }>>,
  Expect<Equal<MergeAll<[{ a: number }, { a: 1 }]>, { a: number }>>,
  Expect<Equal<MergeAll<[{ a: 1 | 2 }, { a: 1 | 3 }]>, { a: 1 | 2 | 3 }>>
]

type Assign2Object<
  T extends Record<string, unknown>,
  U extends Record<string, unknown>
> = {
  [K in keyof U | keyof T]: K extends keyof U
    ? K extends keyof T
      ? U[K] | T[K]
      : U[K]
    : K extends keyof T
    ? T[K]
    : never
}

// ============= Your Code Here =============
// ============= Your Code Here =============
type MergeAll<
  U extends any[],
  T extends Record<string, unknown> = {}
> = U extends [infer R, ...infer F]
  ? R extends Record<string, unknown>
    ? MergeAll<F, Assign2Object<T, R>>
    : MergeAll<F, T>
  : T

type A = MergeAll<[{ a: 1 }, { a: number }]>
