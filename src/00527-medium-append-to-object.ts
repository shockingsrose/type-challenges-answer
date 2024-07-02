// ============= Test Cases =============
import type { Debug, Equal, Expect } from './test-utils'

type test1 = {
  key: 'cat'
  value: 'green'
}

type testExpect1 = {
  key: 'cat'
  value: 'green'
  home: boolean
}

type test2 = {
  key: 'dog' | undefined
  value: 'white'
  sun: true
}

type testExpect2 = {
  key: 'dog' | undefined
  value: 'white'
  sun: true
  home: 1
}

type test3 = {
  key: 'cow'
  value: 'yellow'
  sun: false
}

type testExpect3 = {
  key: 'cow'
  value: 'yellow'
  sun: false
  moon: false | undefined
}

type cases = [
  Expect<Equal<AppendToObject<test1, 'home', boolean>, testExpect1>>,
  Expect<Equal<AppendToObject<test2, 'home', 1>, testExpect2>>,
  Expect<Equal<AppendToObject<test3, 'moon', false | undefined>, testExpect3>>,
]


// ============= Your Code Here =============
type AppendToObject<T extends Record<string, unknown>, U extends string, V> = {
  [K in keyof T | U]: K extends keyof T ? T[K] : V;
}


// ============= Test Another Resolution ==============
type AppendToObject1<T, U extends string | number | symbol, V> = {
  [P in keyof T]: T[P]
} & {
  [K in U]: V
}

type A = AppendToObject1<test1, 'home', boolean>

type Res1 = Equal<A, testExpect1>
// type Res1 = false

// export type Debug<T> = { [K in keyof T]: T[K] }
type Res3 = Equal<Debug<A>, testExpect1>;