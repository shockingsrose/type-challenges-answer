# 对象类型

## `keyof`

The keyof operator takes an object type and produces a string or numeric literal union of its keys

## 题目

### 对象转联合类型

```ts
type A = {
  name: string
  age: number
}

type ObjectToUnion<T> = T[keyof T]

type B = ObjectToUnion<A>
// type B = string | number
```

### `Generics` can't be the object key! but you can take the generics variable after the keyof

```ts
type AppendToObject<
  T extends Record<string, unknown>,
  KEY extends string,
  VALUE
> = {
  [K in keyof T | KEY]: K extends keyof T ? T[K] : VALUE
}
```

### `&`合并两个对象

和原始包含了这两个对象所有属性的对象是不一样的，解决方案之一是使用`export type Debug<T> = { [K in keyof T]: T[K] }`,或者不使用`&`操作符，而是在生成 key 的时候用`|`

参考[00527-medium-append-to-object](../src/00527-medium-append-to-object.ts)、[00599-medium-merge](../src/00599-medium-merge.ts)

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

### 获取两个对象中相同的 key

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

## 定义空对象 `{ [key: string]: never }`

```ts
type t3 = { name: 'test' } extends {} ? true : false
// type t3 = true

type t4 = { name: 'test' } extends { [key: string]: never } ? true : false
// type t4 = false

type t5 = {} extends { [key: string]: never } ? true : false
// type t5 = true
```

### 移除对象属性上的`?`

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

### 移除对象属性上的`readonly`

```ts
type Mutable<T extends object> = {
  -readonly [K in keyof T]: T[K]
}
```

### infer 出来的值作为对象的 key，需要 extends `string | number | symbol`

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

### 对象属性的操作 要多使用`Excludes` `|` `&` 等操作符

参考题目

- [extracttoobject](../src/29650-medium-extracttoobject.ts)
