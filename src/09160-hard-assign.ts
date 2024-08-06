// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

// case1
type Case1Target = {}

type Case1Origin1 = {
  a: 'a'
}

type Case1Origin2 = {
  b: 'b'
}

type Case1Origin3 = {
  c: 'c'
}

type Case1Answer = {
  a: 'a'
  b: 'b'
  c: 'c'
}

// case2
type Case2Target = {
  a: [1, 2, 3]
}

type Case2Origin1 = {
  a: {
    a1: 'a1'
  }
}

type Case2Origin2 = {
  b: [2, 3, 3]
}

type Case2Answer = {
  a: {
    a1: 'a1'
  }
  b: [2, 3, 3]
}

// case3

type Case3Target = {
  a: 1
  b: ['b']
}

type Case3Origin1 = {
  a: 2
  b: {
    b: 'b'
  }
  c: 'c1'
}

type Case3Origin2 = {
  a: 3
  c: 'c2'
  d: true
}

type Case3Answer = {
  a: 3
  b: {
    b: 'b'
  }
  c: 'c2'
  d: true
}

// case 4
type Case4Target = {
  a: 1
  b: ['b']
}

type Case4Answer = {
  a: 1
  b: ['b']
}

type cases = [
  Expect<
    Equal<
      Assign<Case1Target, [Case1Origin1, Case1Origin2, Case1Origin3]>,
      Case1Answer
    >
  >,
  Expect<Equal<Assign<Case2Target, [Case2Origin1, Case2Origin2]>, Case2Answer>>,
  Expect<Equal<Assign<Case3Target, [Case3Origin1, Case3Origin2]>, Case3Answer>>,
  Expect<Equal<Assign<Case4Target, ['', 0]>, Case4Answer>>
]

type Assign2Object<
  T extends Record<string, unknown>,
  U extends Record<string, unknown>
> = {
  [K in keyof U | keyof T]: K extends keyof U
    ? U[K]
    : K extends keyof T
    ? T[K]
    : never
}

// ============= Your Code Here =============
type Assign<T extends Record<string, unknown>, U extends any[]> = U extends [
  infer R,
  ...infer F
]
  ? R extends Record<string, unknown>
    ? Assign<Assign2Object<T, R>, F>
    : Assign<T, F>
  : T

type A = Assign<Case3Target, [Case3Origin1, Case3Origin2]>
