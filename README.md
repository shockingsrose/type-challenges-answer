# Type Challenges Answer

## 数据类型

### Function Type

函数类型也属于对象类型

```ts
type Add = (a: number, b: number) => number
type IsFunctionEqualObject = Add extends Record<string, any> ? 1 : 2
// type IsFunctionEqualObject = 1
```

### 对象类型

#### The keyof operator takes an object type and produces a string or numeric literal union of its keys.

#### 对象转联合类型

```ts
type A = {
  name: string
  age: number
}

type ObjectToUnion<T> = T[keyof T]

type B = ObjectToUnion<A>
// type B = string | number
```

#### `Generics` can't be the object key! but you can take the generics variable after the keyof.

```ts
type AppendToObject<
  T extends Record<string, unknown>,
  KEY extends string,
  VALUE
> = {
  [K in keyof T | KEY]: K extends keyof T ? T[K] : VALUE
}
```

#### `&`合并的两个对象，和原始包含了这两个对象所有属性的对象是不一样的，解决方案之一是使用`export type Debug<T> = { [K in keyof T]: T[K] }`,或者不使用`&`操作符，而是在生成 key 的时候用`|`,

参考[00527-medium-append-to-object](./src/00527-medium-append-to-object.ts)、[00599-medium-merge](./src/00599-medium-merge.ts)

```ts
type A = {
  key: 'cat'
  value: 'green'
} & {
  home: boolean
}

type B = {
  key: 'cat'
  value: 'green'
  home: boolean
}

type Res1 = Equal<A, B>
// type Res1 = false

type Res2 = A extends B ? 1 : 2
// type Res2 = 1

/* --------解决方案----------- */
export type Debug<T> = { [K in keyof T]: T[K] }
type Res3 = Equal<Debug<A>, B>
// type Res3 = true
```

#### 获取两个对象中相同的 key

```ts
type Foo = {
  name: string
  age: string
}
type Bar = {
  name: string
  age: string
  gender: number
}

type result = keyof (Foo | Bar) // "name" | "age"
```

#### 定义空对象 `{ [key: string]: never }`

```ts
type t3 = { name: 'test' } extends {} ? true : false
// type t3 = true

type t4 = { name: 'test' } extends { [key: string]: never } ? true : false
// type t4 = false

type t5 = {} extends { [key: string]: never } ? true : false
// type t5 = true
```

#### 移除对象属性上的`?`

```ts
interface User {
  name?: string
  age?: number
  address?: string
}

type Required<T> = {¡
  [K in keyof T]-?: T[K]
}

type A = Required<User>
// type A = { name: string; age: number; address: string }
```

#### 移除对象属性上的`readonly`

```ts
type Mutable<T extends object> = {
  -readonly [K in keyof T]: T[K]
}
```

#### infer 出来的值作为对象的 key，需要 extends `string | number | symbol`

```ts
type Model = ['name', 'storm']

// `{ [K in F]: R }` 这种写法会报错，因为无法确定K的类型
type TupleToObject1<T> = T extends [infer F, infer R] ? { [K in F]: R } : never
// Type 'F' is not assignable to type 'string | number | symbol'.

// `{ [K in F & string]: R }` 改为这种写法就能确定 `K` 一定是string类型
type TupleToObject<T> = T extends [infer F, infer R]
  ? { [K in F & string]: R }
  : never
```

### `Generics` 泛型

注意点：

#### 变量需要定义在`<>`内部，参考[00007-easy-readonly](./src/00007-easy-readonly.ts)

```ts
/** 这里定义了K变量，并且给了默认值，使用时不需要传 */
type MyReadonly<T, K = keyof T> = {
  readonly [K in keyof T]: T[K]
}
```

#### 可作为变量，通过递归实现

参考[00012-medium-chainable-options.ts](./src/00012-medium-chainable-options.ts)

#### Distributive Conditional Types 分布式条件

When conditional types act on a generic type, they become distributive when given a union type(the union type should be on the left of extends key)

```ts
type ToArray<Type> = Type extends any ? Type[] : never

type StrArrOrNumArr = ToArray<string | number>
// Output: type StrArrOrNumArr = string[] | number[]
```

### `Tuple` 元组/数组

TypeScript 没有内置`Tuple`类型，但是可以自定义为`type Tuple = readonly unknown[]`

#### 使用`in`遍历`Tuple`的值，作为 object 的 key，参考[00011-easy-tuple-to-object.ts](./src/00011-easy-tuple-to-object.ts)

```ts
type TupleToObject<T extends readonly any[]> = {
  [K in T[number]]: K
}
```

#### 获取`Tuple`的长度, [00018-easy-tuple-length.ts](./src/00018-easy-tuple-length.ts)

```ts
type Length<T extends readonly any[]> = T['length']
```

#### 合并两个`Tuple`类型

```ts
type Concat<T extends readonly any[], U extends readonly any[]> = [...T, ...U]
```

#### 用`keyof`遍历数组, 参考[00020-medium-promise-all](./src/00020-medium-promise-all.ts)

#### 递归遍历数组，并返回数组类型，参考[00459-medium-flatten](./src/00459-medium-flatten.ts)

#### 数组转联合类型

```ts
type A = ['1', '2']
type ArrayToUnion<T extends any[]> = T[number]

type B = ArrayToUnion<A>
// type B = '1' | '2'
```

### `String` 字符串类型

[模版字符串相关类型文档](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html)

#### 在模版字符串中使用`infer`，处理字符串类型

```ts
type Space = ' ' | '\n' | '\t'
type Trim<S extends string> = S extends
  | `${Space}${infer R}`
  | `${infer R}${Space}`
  ? Trim<R>
  : S
```

#### 用模版字符串拼接`String`类型

```ts
type MyCapitalize<S extends string> = S extends `${infer F}${infer R}`
  ? `${Uppercase<F>}${R}`
  : S
```

#### 空字符串不等于`${infer Head}${infer Tail}`, 在这个模版字符串 `Head`会匹配第一个字符，`Tail`会匹配剩余所有字符

```ts
type B = '' extends `${infer Head}${infer Tail}` ? 1 : 2
// type B = 2
```

#### `Uncapitalize`会将给定字符串的第一个字符小写

### never

#### 如何判断`never`

```ts
type IsNever<T> = [T] extends [never] ? true : false
```

## 关键字

### `keyof`

操作 "对象类型" 生成`key`的联合类型，[Link](https://www.typescriptlang.org/docs/handbook/2/keyof-types.html)

```ts
type Arrayish = { [n: number]: unknown }
type A = keyof Arrayish // number

type Mapish = { [k: string]: boolean }
type M = keyof Mapish // number | string

interface Todo {
  title: string
  description: string
  completed: boolean
}

type TodoKeys = keyof Todo // 'title' | 'description' | 'completed'
```

### `in`

#### 取联合类型的值，主要用于数组和对象的构建，不可直接用于 "对象类型"

```ts
type name = 'firstname' | 'lastname'
type TName = {
  [key in name]: string
}
// TName = { firstname: string, lastname: string }
```

### `extends`

#### distributive

[distributive](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types)

#### 当 U 为对象时候，会在 Mapping Type 外部分布，当 U 为类似 string 或者 number 时候，会在 Mapping Type 内部分布），就能触发 Distributive Conditional Types

```ts
type A = {
  name: string
}

type B = {
  age: number
}

type Dis<T> = {
  [K in keyof T]: K
}

type res1 = Dis<A> | Dis<B>
type res2 = Dis<A | B>

type result = Equal<res1, res2>
```

### `infer`

需跟在`extends`关键字后面

用于函数参数的例子

```ts
type MyParameters<T extends (...args: any[]) => any> = T extends (
  ...args: infer R
) => any
  ? R
  : []
```

用于数组的例子

```ts
type Push<T extends any[], U> = [...T, U]
```

用于字符串的例子

```ts
type TrimLeft<S extends string> = S extends `${Space}${infer R}`
  ? TrimLeft<R>
  : S
```

### `as`

#### 跟随在`[K in keyof T]`后面，例如`[K in keyof T as K]`, 高级用法参考下面示例

```ts
// src/02852-medium-omitbytype.ts
type OmitByType<T, U> = NonNullable<{
  [K in keyof T as T[K] extends U ? never : K]: T[K]
}>
```

## 用法

### 递归类型推断

参考[00189-easy-awaited](./src/00189-easy-awaited.ts)

```ts
type MyAwaited<T extends PromiseLike<any>> = T extends PromiseLike<infer R>
  ? R extends PromiseLike<any>
    ? MyAwaited<R>
    : R
  : T
```

通过递归把泛型作为变量，参考[00012-medium-chainable-options.ts](./src/00012-medium-chainable-options.ts)

### 数字运算

在 typescript 中，无法使用`+`, `-`, `*`, `/`等运算符，但是可以通过控制数组的长度来计算

```ts
type PlusOne<T extends any[]> = [0, ...T]['length']
type MinusOne<T extends any[]> = T extends [0, ...infer R] ? R['length'] : never
type MultiplyByTwo<T extends any[]> = [...T, ...T]['length']

type PlusOneResult = PlusOne<[1, 1, 1]>
// type PlusOneResult = 4

type MinusOneResult = MinusOne<[1, 1, 1]>
// type MinusOneResult = 2

type MultiplyByTwoResult = MultiplyByTwo<[1, 1, 1]>
// type MultiplyByTwoResult = 6
```

## 内置工具函数 [Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html)

### Exclude

用法：`Exclude<UnionType, ExcludedMembers>`
用于排除联合类型里的部分成员

```ts
type T1 = Exclude<'a' | 'b' | 'c', 'a' | 'b'>
// type T1 = "c"

type T2 = Exclude<string | number | (() => void), Function>
// type T2 = string | number

type Shape =
  | { kind: 'circle'; radius: number }
  | { kind: 'square'; x: number }
  | { kind: 'triangle'; x: number; y: number }

type T3 = Exclude<Shape, { kind: 'circle' }>
type T3Result =
  | {
      kind: 'square'
      x: number
    }
  | {
      kind: 'triangle'
      x: number
      y: number
    }
```
