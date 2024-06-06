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