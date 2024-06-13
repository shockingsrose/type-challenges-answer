# Type Challenges Answer
## WIP

## Guide Links


## `keyof`
操作 "对象类型" 生成`key`的联合类型，[Link](https://www.typescriptlang.org/docs/handbook/2/keyof-types.html)

```ts
type Arrayish = { [n: number]: unknown };
type A = keyof Arrayish; // number
    
 
type Mapish = { [k: string]: boolean };
type M = keyof Mapish; // number | string

interface Todo {
  title: string
  description: string
  completed: boolean
}

type TodoKeys = keyof Todo; // 'title' | 'description' | 'completed'
```

## `in`
取联合类型的值，主要用于数组和对象的构建，不可直接用于 "对象类型"
```ts
type name = 'firstname' | 'lastname'
type TName = {
  [key in name]: string
}
// TName = { firstname: string, lastname: string }
```

## `Generics` 泛型
注意点：
- 变量需要定义在`<>`内部，参考[00007-easy-readonly](./src/00007-easy-readonly.ts)
```ts
/** 这里定义了K变量，并且给了默认值，使用时不需要传 */
type MyReadonly<T, K = keyof T> = {
  readonly [K in keyof T]: T[K]
}
```

## Tuple
TypeScript没有内置`Tuple`类型，但是可以自定义为`type Tuple = readonly unknown[]`

### 使用`in`遍历`Tuple`的值，作为object的key，参考[00011-easy-tuple-to-object.ts](./src/00011-easy-tuple-to-object.ts)
```ts
type TupleToObject<T extends readonly any[]> = {
  [K in T[number]]: K
}
```

### 获取`Tuple`的长度, [00018-easy-tuple-length.ts](./src/00018-easy-tuple-length.ts)
```ts
type Length<T extends readonly any[]> = T['length']
```

### 合并两个`Tuple`类型
```ts
type Concat<T extends readonly any[], U extends readonly any[]> = [...T, ...U]
```

## `extends` 
<!-- TODO -->
[distributive](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types)

## `infer`
<!-- TODO -->

## 递归类型推断
参考[00189-easy-awaited](./src/00189-easy-awaited.ts)
```ts
type MyAwaited<T extends PromiseLike<any>> = T extends PromiseLike<infer R>
  ? R extends PromiseLike<any>
    ? MyAwaited<R>
    : R
  : T;
```

