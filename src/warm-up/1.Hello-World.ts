import { Equal, Expect, NotAny } from '../../utils'

// expected to be string
type HelloWorld = string

// you should make this work
type test = Expect<Equal<HelloWorld, string>>

type cases = [
  Expect<NotAny<HelloWorld>>,
  Expect<Equal<HelloWorld, string>>
]

