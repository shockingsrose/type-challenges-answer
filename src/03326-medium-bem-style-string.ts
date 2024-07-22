// ============= Test Cases =============
import type { Equal, Expect, NotAny } from './test-utils'

type cases = [
  Expect<Equal<BEM<'btn', ['price'], []>, 'btn__price'>>,
  Expect<
    Equal<
      BEM<'btn', ['price'], ['warning', 'success']>,
      'btn__price--warning' | 'btn__price--success'
    >
  >,
  Expect<
    Equal<
      BEM<'btn', [], ['small', 'medium', 'large']>,
      'btn--small' | 'btn--medium' | 'btn--large'
    >
  >
]

// ============= Your Code Here =============

type BE<B extends string, E extends any[]> = E['length'] extends 0
  ? B
  : `${B}__${E[number]}`

// type BEM<
//   B extends string,
//   E extends string[],
//   M extends string[]
// > = M['length'] extends 0 ? `${BE<B, E>}` : `${BE<B, E>}--${M[number]}`

type IsNever<T> = [T] extends [never] ? true : false
type IsUnion<U> = IsNever<U> extends true ? '' : U
type BEM<
  B extends string,
  E extends string[],
  M extends string[]
> = `${B}${IsUnion<`__${E[number]}`>}${IsUnion<`--${M[number]}`>}`

type E = []
type A = IsNever<`__${E[number]}`>
