// 重载函数定义
type Reserve = {
  (from: Date, to: Date, destination: string): void
  (from: Date, destination: string): void
}

let reserve: Reserve = (from: Date, to: Date | string, destination?: string) => {

}
