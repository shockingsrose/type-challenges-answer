// ============= Test Cases =============
import type { Debug, Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<LengthOfString<''>, 0>>,
  Expect<Equal<LengthOfString<'kumiko'>, 6>>,
  Expect<Equal<LengthOfString<'reina'>, 5>>,
  Expect<Equal<LengthOfString<'Sound! Euphonium'>, 16>>,
]


// ============= Your Code Here =============
type LengthOfString<S extends string, T extends string[] = []> = S extends `${infer Head}${infer Tail}` ? LengthOfString<Tail, [...T, Head]> : T['length']

type A = Debug<LengthOfString<'12'>>

type B = '' extends `${infer Head}${infer Tail}` ? 1 : 2
