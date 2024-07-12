// ============= Test Cases =============
import type { Debug, Equal, Expect } from './test-utils'

interface User {
  name?: string
  age?: number
  address?: string
}

interface UserRequiredName {
  name: string
  age?: number
  address?: string
}

interface UserRequiredNameAndAge {
  name: string
  age: number
  address?: string
}

type cases = [
  Expect<Equal<RequiredByKeys<User, 'name'>, UserRequiredName>>,
  Expect<Equal<RequiredByKeys<User, 'name' | 'age'>, UserRequiredNameAndAge>>,
  Expect<Equal<RequiredByKeys<User>, Required<User>>>,
  // @ts-expect-error
  Expect<Equal<RequiredByKeys<User, 'name' | 'unknown'>, UserRequiredName>>
]

// ============= Your Code Here =============
type RequiredByKeys<T, K extends keyof T = keyof T> = Debug<
  Pick<T, Exclude<keyof T, K>> & {
    [P in K]-?: T[P]
  }
>

type Required<T> = {
  [K in keyof T]-?: T[K]
}

type A = Required<User>
