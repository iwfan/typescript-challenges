// 重载函数定义
type Reserve = {
  (from: Date, to: Date, destination: string): void
  (from: Date, destination: string): void
  (destination: string): void
}

let reserve: Reserve = (from: Date | string, to?: Date | string, destination?: string) => {

}

reserve(new Date(), new Date(), 'hawa')
reserve(new Date(), 'hawa')
reserve('hawa')

let promise = new Promise<number>(resolve => resolve(45))
promise.then(result => result * 4)


// ---------------------------------------------------------------
{
type TreeNode = {
  value: string
}

type LeafNode = TreeNode & {
  isLeaf: true
}

type InnerNode = TreeNode & {
  children: [TreeNode] | [TreeNode, TreeNode]
}

let a: TreeNode = { value: 'a' }
let b: LeafNode = { value: 'a', isLeaf: true }
let c: InnerNode = { value: 'c', children: [b] }

let a1 = mapNode(a, _ => _.toUpperCase())
let b1 = mapNode(b, _ => _.toUpperCase())
let c1 = mapNode(c, _ => _.toUpperCase())

function mapNode<T extends TreeNode>(node: T, f: (value: string) => string): T {
  return {
    ...node,
    value: f(node.value)
  }
}
}

// ----------------------------------------------------------------

type HasSides = { numberOfSides: number }
type SidesHaveLength = { sideLength: number }

function logPerimeter<Shape extends HasSides & SidesHaveLength>(s: Shape): Shape {
  console.log(s.numberOfSides * s.sideLength)
  return s;
}

type Square = HasSides & SidesHaveLength
let square: Square = { numberOfSides: 4, sideLength: 3 }
logPerimeter(square)

// ---------------------------------------------------------------

function fill(length: number, value: string): string[] {
  return Array.from({ length }, () => value)
}

let r1 = call(fill, 10, 'a')
let r2 = call(fill, 10, 12) // this is not working

function call<T extends unknown[], R>(f: (...args: T) => R, ...args: T): R {
  return f(...args)
}

let r3 = call1(fill, 10, 'a')
let r4 = call1(fill, 10, 12)
function call1<T, R>(f: (...args: T[]) => R, ...args: T[]): R {
  return f(...args)
}

function call2<T extends [unknown, string, ...unknown[]], R>(f: (...args: T) => R, ...args: T): R {
  return f(...args)
}

call2(fill, 10, 4)

function map(list: unknown[], num: string) {
  return list.map(() => str)
}

call2(map, [], 2)

// ------------------------------------------------------------

function is<T>(a: T, b: T) {
  return a === b
}

is('string', 'otherstring')
is(true, false)
is(42, 42)
is(10, 'foo')
