// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Join<['a', 'p', 'p', 'l', 'e'], '-'>, 'a-p-p-l-e'>>,
  Expect<Equal<Join<['Hello', 'World'], ' '>, 'Hello World'>>,
  Expect<Equal<Join<['2', '2', '2'], 1>, '21212'>>,
  Expect<Equal<Join<['o'], 'u'>, 'o'>>,
  Expect<Equal<Join<[], 'u'>, ''>>
]

// ============= Your Code Here =============
type Join<
  T extends any[],
  U extends string | number,
  Result extends string = ''
> = T extends [infer A, ...infer B]
  ? Join<
      B,
      U,
      Result extends '' ? `${A & string}` : `${Result}${U}${A & string}`
    >
  : Result
