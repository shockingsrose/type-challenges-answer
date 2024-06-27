// ============= Test Cases =============
import type { Debug, Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<ReplaceAll<'foobar', 'bar', 'foo'>, 'foofoo'>>,
  Expect<Equal<ReplaceAll<'foobar', 'bag', 'foo'>, 'foobar'>>,
  Expect<Equal<ReplaceAll<'foobarbar', 'bar', 'foo'>, 'foofoofoo'>>,
  Expect<Equal<ReplaceAll<'t y p e s', ' ', ''>, 'types'>>,
  Expect<Equal<ReplaceAll<'foobarbar', '', 'foo'>, 'foobarbar'>>,
  Expect<Equal<ReplaceAll<'barfoo', 'bar', 'foo'>, 'foofoo'>>,
  Expect<Equal<ReplaceAll<'foobarfoobar', 'ob', 'b'>, 'fobarfobar'>>,
  Expect<Equal<ReplaceAll<'foboorfoboar', 'bo', 'b'>, 'foborfobar'>>,
  Expect<Equal<ReplaceAll<'', '', ''>, ''>>,
]


// ============= Your Code Here =============
// type Replace<S extends string, From extends string, To extends string> = S extends `${infer Head}${From}${infer Tail}` ? From extends '' ? `${Head}${Tail}` : `${Head}${To}${Tail}` : S
type ReplaceAll<S extends string, From extends string, To extends string> = 
S extends `${infer Head}${From}${infer Tail}` 
  ? From extends '' 
    ? `${Head}${Tail}` 
    : `${Head}${To}${ReplaceAll<Tail, From, To>}`
  : S

type A = Debug<ReplaceAll<'foobarfoobar', 'ob', 'b'>>