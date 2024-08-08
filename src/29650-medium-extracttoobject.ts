// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type test1 = { id: '1'; myProp: { foo: '2' } }

type testExpect1 = {
  id: '1'
  foo: '2'
}

type test2 = {
  id: '1'
  prop1: { zoo: '2' }
  prop2: { foo: '4' }
}

type testExpect2 = {
  id: '1'
  prop1: { zoo: '2' }
  foo: '4'
}

type test3 = {
  prop1: { zoo: '2'; a: 2; b: 4; c: 7 }
  prop2: { foo: '4'; v: 2; d: 4; g: 7 }
  k: 289
}

type testExpect3 = {
  zoo: '2'
  a: 2
  b: 4
  c: 7
  prop2: { foo: '4'; v: 2; d: 4; g: 7 }
  k: 289
}

type test4 = { id: '1'; myProp: { foo: '2' } }

type testExpect4 = {
  id: '1'
  myProp: { foo: '2' }
}

type cases = [
  Expect<Equal<ExtractToObject<test1, 'myProp'>, testExpect1>>,
  Expect<Equal<ExtractToObject<test2, 'prop2'>, testExpect2>>,
  Expect<Equal<ExtractToObject<test3, 'prop1'>, testExpect3>>,
  // @ts-expect-error
  Expect<Equal<ExtractToObject<test4, 'prop4'>, testExpect4>>
]

// ============= Your Code Here =============
// type ExtractToObject<T extends Record<string, unknown>, U extends keyof T> = {
// TODO 为什么这里的K不一致
//   [K in keyof T as K extends U ? keyof T[U] : K]: K extends keyof T[U]
//     ? T[U][K]
//     : T[K]
// }

type ExtractToObject<T extends Record<string, unknown>, U extends keyof T> = {
  [K in Exclude<keyof T, U> | keyof T[U]]: K extends keyof T[U]
    ? T[U][K]
    : K extends keyof T
    ? T[K]
    : never
}

type A = ExtractToObject<test3, 'prop1'>
