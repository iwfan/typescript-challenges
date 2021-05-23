type Cat = { name: string; purrs: boolean }
type Dog = { name: string; barks: boolean; wags: boolean }
type CatOrDogOrBoth = Cat | Dog
type CatAndDog = Cat & Dog

// union type not means A or B, it means A or B or Both
let a: CatOrDogOrBoth = {
  name: 'Bonkers',
  purrs: true
}

a = {
  name: 'Domino',
  barks: true,
  wags: true,
  purrs: true
}

// FIXME: why is not only have name property
let b: CatAndDog = {
  name: 'Domino',
  barks: true,
  wags: true,
  purrs: true
}


let a1 = 1024
let b1 = 'apples and oranges'
const c = 'pineapples'
let d = [true, true, false]
let e = { type: 'ficus' }
let f = [1, false]
const g = [3]
let h = null

type AA = {
  a: number
  b: number
}

type BB = {
  a: string
  b: string
}

type CC = AA & BB
let cc:CC = {
  a: 2,
  b: null
}

type DD = AA | BB
let dd: DD = {
  a: '2',
  b: '22'
}
