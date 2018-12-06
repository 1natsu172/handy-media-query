export type Breakpoints<T = {}> = { [P in keyof T]: number | string }

export type MediaType = 'all' | 'screen' | 'print' | 'speech'

export type Unit = 'em' | 'rem' | 'px'
