# Type Challenges Answer

## 数据类型

### Function Type

函数类型也属于对象类型

```ts
type Add = (a: number, b: number) => number
type IsFunctionEqualObject = Add extends Record<string, any> ? 1 : 2
// type IsFunctionEqualObject = 1
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

#### 将数字类型的 1.0 转换为字符串，会得到 "1"

```ts
type NumberToString<T extends number> = `${T}`

type A1 = NumberToString<1.1>;
// type A1 = "1.1"

type A2 = NumberToString<1.0>
// type A2 = "1"
```

### never

#### 如何判断`never`

```ts
type IsNever<T> = [T] extends [never] ? true : false

/** 这种情况下 A也是never */
type E = []
type A = IsNever<`__${E[number]}`>
// type A = true
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

- 参考[00189-easy-awaited](./src/00189-easy-awaited.ts)

```ts
type MyAwaited<T extends PromiseLike<any>> = T extends PromiseLike<infer R>
  ? R extends PromiseLike<any>
    ? MyAwaited<R>
    : R
  : T
```

- 通过递归把泛型作为变量
  - [00012-medium-chainable-options.ts](./src/00012-medium-chainable-options.ts)
  - [04499-medium-chunk.ts](./src/04499-medium-chunk.ts)

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
