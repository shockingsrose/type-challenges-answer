// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'
type Result1 = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
type Result2 = 0 | 1 | 2
type Result3 =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25
  | 26
  | 27
  | 28
  | 29
  | 30
  | 31
  | 32
  | 33
  | 34
  | 35
  | 36
  | 37
  | 38
  | 39
  | 40
  | 41
  | 42
  | 43
  | 44
  | 45
  | 46
  | 47
  | 48
  | 49
  | 50
  | 51
  | 52
  | 53
  | 54
  | 55
  | 56
  | 57
  | 58
  | 59
  | 60
  | 61
  | 62
  | 63
  | 64
  | 65
  | 66
  | 67
  | 68
  | 69
  | 70
  | 71
  | 72
  | 73
  | 74
  | 75
  | 76
  | 77
  | 78
  | 79
  | 80
  | 81
  | 82
  | 83
  | 84
  | 85
  | 86
  | 87
  | 88
  | 89
  | 90
  | 91
  | 92
  | 93
  | 94
  | 95
  | 96
  | 97
  | 98
  | 99
  | 100
  | 101
  | 102
  | 103
  | 104
  | 105
  | 106
  | 107
  | 108
  | 109
  | 110
  | 111
  | 112
  | 113
  | 114
  | 115
  | 116
  | 117
  | 118
  | 119
  | 120
  | 121
  | 122
  | 123
  | 124
  | 125
  | 126
  | 127
  | 128
  | 129
  | 130
  | 131
  | 132
  | 133
  | 134
  | 135
  | 136
  | 137
  | 138
  | 139
  | 140
type cases = [
  Expect<Equal<NumberRange<2, 9>, Result1>>,
  Expect<Equal<NumberRange<0, 2>, Result2>>,
  Expect<Equal<NumberRange<0, 140>, Result3>>
]

// ============= Your Code Here =============
type Plus<T extends any[]> = [...T, 1]['length']

type Fill<T extends number, R extends any[] = []> = R['length'] extends T
  ? R
  : Fill<T, [...R, 1]>

type NumberRange1<
  L extends number,
  H extends number,
  I extends number = L,
  Result extends any[] = []
> = I extends Plus<Fill<H>>
  ? Result[number]
  : NumberRange1<L, H, Plus<Fill<I>> & number, [...Result, I]>

type Utils<L, C extends any[] = [], R = L> = C['length'] extends L
  ? R
  : Utils<L, [...C, 0], C['length'] | R>

type NumberRange<L, H> = L | Exclude<Utils<H>, Utils<L>>

type A = NumberRange<2, 9>

type A1 = Utils<90>

// I: 2 H:9 [2]
// I: 3 H:9 [2, 3]
// I: 4 H:9
// I: 5 H:9
// I: 6 H:9
// I: 7 H:9
// I: 8 H:9
// I: 9 H:9
