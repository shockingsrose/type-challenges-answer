// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<FlattenDepth<[]>, []>>,
  Expect<Equal<FlattenDepth<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<FlattenDepth<[1, [2]]>, [1, 2]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2>, [1, 2, 3, 4, [5]]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, [[5]]]>>,
  Expect<Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 3>, [1, 2, 3, 4, [5]]>>,
  Expect<
    Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 19260817>, [1, 2, 3, 4, 5]>
  >
]

// ============= Your Code Here =============
type FlattenDepth<
  T,
  Depth = 1,
  U extends any[] = []
> = U['length'] extends Depth
  ? T
  : T extends [infer F, ...infer R]
  ? F extends any[]
    ? [...FlattenDepth<F, Depth, [...U, 1]>, ...FlattenDepth<R, Depth, U>]
    : [F, ...FlattenDepth<R, Depth, U>]
  : T

type A = FlattenDepth<[1, [2, [3, [4, [5]]]]], 3>

/* 递归步骤如下
步骤 1: 初始化
T = [1, [2, [3, [4, [5]]]]]
Depth = 3
U = [] (默认值)

步骤 2: 第一层展平
U['length'] = 0，不等于Depth (3)，继续展平。
T是一个数组，继续匹配。
第一个元素F = 1，剩余R = [[2, [3, [4, [5]]]]]。
F不是数组，直接添加到结果中。

步骤 3: 第二层展平
对R进行展平，此时R = [[2, [3, [4, [5]]]]]。
F = [2, [3, [4, [5]]]]，是数组，需要展平。
U更新为[1]。

步骤 4: 第三层展平
现在处理F = [2, [3, [4, [5]]]]。
F是数组，继续展平，U更新为[1, 1]。
F = 2，R = [[3, [4, [5]]]]。
F不是数组，直接添加到结果中。

步骤 5: 第四层展平
处理R = [[3, [4, [5]]]]。
F = [3, [4, [5]]]，是数组，需要展平，U更新为[1, 1, 1]。
由于U['length']现在等于Depth，F不再展平，直接添加到结果中。

结果: 
经过上述步骤，我们得到A = [1, 2, [3, [4, [5]]]]。 */
