type Shoe = {
  purpose: string
}

class BalletFlat implements Shoe {
  purpose = 'dancing'
}

class Boot implements Shoe {
  purpose = 'woodcutting'
}

class Sneaker implements Shoe {
  purpose = 'walking'
}

type ShoeCreater = {
  create(type: 'sneaker'): BalletFlat
  create(type: 'boot'): Boot
  create(type: 'sneaker'): Sneaker
}

let Shoe: ShoeCreater = {
 create(type: 'balletFlat' | 'boot' | 'sneaker'): Shoe {
    switch(type) {
      case 'balletFlat': return new BalletFlat()
      case 'boot': return new Boot()
      case 'sneaker': return new Sneaker()
    }
  }
}

{
  let a1 = Shoe.create('boot')
  let a2 = Shoe.create('sneaker')
  let a3 = Shoe.create('other')
}

// ------------------------------------------------------------------------------------

{

  class RequestBuilder {
    private url: string | null = null
    private method: 'get' | 'post' | null = null
    private data: object | null = null

    setURL(url: string): this {
      this.url = url
      return this
    }

    setMethod(method: 'get' | 'post'): this {
      this.method = method
      return this
    }

    setData(data: object): this {
      this.data = data
      return this
    }

    send() {
      // ...
    }
  }

  new RequestBuilder()
    .setURL('ss')
    .setMethod('get')
    .setData({ firstName: 'Anna' })
    .send()

}

{
  class A {
    setUrl() {
      return new B()
    }
  }

  class B {
    setMethod() {
      return new C()
    }
  }

  class C {
    setData() {
      return new D()
    }
  }

  class D {
    send() {}
  }

  new A()
    .setUrl()
    .setMethod()
    .setData()
    .send()

 // TODO: context concept?
}

{
  interface BuildableRequest {
    data?: object
    method: 'get' | 'post'
    url: string
  }

class RequestBuilder2 {
  data?: object
  method?: 'get' | 'post'
  url?: string

  setData(data: object): this & Pick<BuildableRequest, 'data'> {
    return Object.assign(this, {data})
  }

  setMethod(method: 'get' | 'post'): this & Pick<BuildableRequest, 'method'> {
    return Object.assign(this, {method})
  }

  setURL(url: string): this & Pick<BuildableRequest, 'url'> {
    return Object.assign(this, {url})
  }

  build(this: BuildableRequest) {
    return this
  }
}

new RequestBuilder2()
  .setURL('bar') // Try removing me!
  .setMethod('post') // Try removing me!
  .setData({})
  .build()

}
