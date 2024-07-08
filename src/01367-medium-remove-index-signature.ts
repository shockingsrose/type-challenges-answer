// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type Foo = {
  [key: string]: any
  foo(): void
}

type Bar = {
  [key: number]: any
  bar(): void
  0: string
}

const foobar = Symbol('foobar')
type FooBar = {
  [key: symbol]: any
  [foobar](): void
}

type Baz = {
  bar(): void
  baz: string
}

type cases = [
  Expect<Equal<RemoveIndexSignature<Foo>, { foo(): void }>>,
  Expect<Equal<RemoveIndexSignature<Bar>, { bar(): void; 0: string }>>,
  Expect<Equal<RemoveIndexSignature<FooBar>, { [foobar](): void }>>,
  Expect<Equal<RemoveIndexSignature<Baz>, { bar(): void; baz: string }>>
]

// ============= Your Code Here =============
/** 前提条件：
 * 1. `string extends 'bar'` => false
 * 2. `string extends string` => true
 * */

/** 思路：
 * 1. 如果PropertyKey extends K = true，需要排除
 * 2. 如果PropertyKey extends K = false, 则需要再判断一下，因为PropertyKey是联合类型，这里触发了分布式条件
 * 3. 判断如果K extends PropertyKey = true, 则说明K是需要保留的，否则可能是number extends 'bar',直接排除即可
 */
type RemoveIndexSignature<T, P = PropertyKey> = {
  [K in keyof T as P extends K ? never : K extends P ? K : never]: T[K]
}

// Explain Link: https://github.com/type-challenges/type-challenges/issues/14662#issuecomment-1837202015
