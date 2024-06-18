// ============= Test Cases =============
import type { Debug, Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<DeepReadonly<X1>, Expected1>>,
  Expect<Equal<DeepReadonly<X2>, Expected2>>,
]

type X1 = {
  a: () => 22
  b: string
  c: {
    d: boolean
    e: {
      g: {
        h: {
          i: true
          j: 'string'
        }
        k: 'hello'
      }
      l: [
        'hi',
        {
          m: ['hey']
        },
      ]
    }
  }
}



// ============= Your Code Here =============
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends (...args: any) => any ? T[K] : T[K] extends Record<string, any> ? DeepReadonly<T[K]> : T[K]
}

// type A = Debug<DeepReadonly<X1>>
type A = X1['a'] extends Record<string, any> ? 1 : 2;

type X2 = { a: string } | { b: number }

type Expected1 = {
  readonly a: () => 22
  readonly b: string
  readonly c: {
    readonly d: boolean
    readonly e: {
      readonly g: {
        readonly h: {
          readonly i: true
          readonly j: 'string'
        }
        readonly k: 'hello'
      }
      readonly l: readonly [
        'hi',
        {
          readonly m: readonly ['hey']
        },
      ]
    }
  }
}

type Expected2 = { readonly a: string } | { readonly b: number }



type Add = (a: number, b: number) => number;
type IsFunctionEqualObject = Add extends Record<string, any> ? 1 : 2;