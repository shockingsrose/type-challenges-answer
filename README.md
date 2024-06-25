# Type Challenges Answer

## 数据类型

### Function Type

函数类型也属于对象类型

```ts
type Add = (a: number, b: number) => number;
type IsFunctionEqualObject = Add extends Record<string, any> ? 1 : 2;
// type IsFunctionEqualObject = 1
```

### 对象类型

- The keyof operator takes an object type and produces a string or numeric literal union of its keys.

- `Generics` can't be the object key! but you can take the generics variable after the keyof.

  ```ts
  type AppendToObject<T extends Record<string, unknown>, KEY extends string, VALUE> = {
    [K in keyof T | KEY]: K extends keyof T ? T[K] : VALUE;
  }
  ```

- `&`合并的两个对象，和原始包含了这两个对象所有属性的对象是不一样的

  ```ts
  type A = {
      key: 'cat';
      value: 'green';
  } & {
      home: boolean;
  }

  type B = {
      key: 'cat';
      value: 'green';
      home: boolean;
  }

  type Res1 = Equal<A, B>;
  // type Res = false

  type Res2 = A extends B ? 1 : 2;
  // type Res2 = 1
  ```

### `Generics` 泛型

注意点：

- 变量需要定义在`<>`内部，参考[00007-easy-readonly](./src/00007-easy-readonly.ts)

  ```ts
  /** 这里定义了K变量，并且给了默认值，使用时不需要传 */
  type MyReadonly<T, K = keyof T> = {
    readonly [K in keyof T]: T[K]
  }
  ```

- 可作为变量，通过递归实现
参考[00012-medium-chainable-options.ts](./src/00012-medium-chainable-options.ts)

#### Distributive Conditional Types 分布式条件

When conditional types act on a generic type, they become distributive when given a union type. 

```ts
type ToArray<Type> = Type extends any ? Type[] : never;
 
type StrArrOrNumArr = ToArray<string | number>;
// Output: type StrArrOrNumArr = string[] | number[]
```

### `Tuple` 元组/数组

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

### 用`keyof`遍历数组, 参考[00020-medium-promise-all](./src/00020-medium-promise-all.ts)


## 关键字

### `keyof`

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

### `in`

取联合类型的值，主要用于数组和对象的构建，不可直接用于 "对象类型"

```ts
type name = 'firstname' | 'lastname'
type TName = {
  [key in name]: string
}
// TName = { firstname: string, lastname: string }
```

### `extends`

[distributive](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types)

### `infer`

需跟在`extends`关键字后面

用于函数参数的例子

```ts
type MyParameters<T extends (...args: any[]) => any> = T extends (...args: infer R) => any ? R : []
```

用于数组的例子

```ts
type Push<T extends any[], U> = [...T, U]
```

## 用法

### 递归类型推断

参考[00189-easy-awaited](./src/00189-easy-awaited.ts)

```ts
type MyAwaited<T extends PromiseLike<any>> = T extends PromiseLike<infer R>
  ? R extends PromiseLike<any>
    ? MyAwaited<R>
    : R
  : T;
```

通过递归把泛型作为变量，参考[00012-medium-chainable-options.ts](./src/00012-medium-chainable-options.ts)
