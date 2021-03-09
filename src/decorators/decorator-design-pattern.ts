interface LStorage<TypeOfValue> {
  write(namespace: string, data: TypeOfValue): void;
  read(namespace: string): TypeOfValue | null;
}

class StringStorage implements LStorage<string> {

  write(namespace: string, data: string) {
    localStorage.setItem(namespace, data);
  };

  read(namespace: string): string | null {
    return localStorage.getItem(namespace);
  };
}

class ObjectStorage implements LStorage<object> {

  constructor(private wrapper: LStorage<string>) {
  }

  write(namespace: string, data: object) {
    this.wrapper.write(namespace, JSON.stringify(data));
  };

  read(namespace: string): object | null {
    const value = this.wrapper.read(namespace);
    if (!value) return null;
    return JSON.parse(value);
  };
}

class EncryptedStorage implements LStorage<string> {

  constructor(private wrapper: LStorage<string>) {
  }

  encrypt(value: string): string {
    return value;
  }

  encode(value: string): string {
    return value;
  }

  write(namespace: string, data: string) {
    this.wrapper.write(namespace, this.encrypt(data));
  };

  read(namespace: string): string | null {
    const value = this.wrapper.read(namespace);
    if (!value) return null;
    return this.encode(value);
  };
}

new ObjectStorage(new EncryptedStorage(new StringStorage())).write('dwa', {})

/**
 * 装饰器模式的特点
 * 动态添加新的功能，
 *
 问题：如何给一个对象增加额外的功能

 方法1：直接修改对象     不符合开闭原则
 方法2：创建子类继承自父类，子类实例化新对象  新的功能与父类功能紧耦合，不利于在未来的维护
 方法3：不改变原对象，在原对象基础上进行“装饰”，新增一些和核心功能无关的功能  使用组合代替继承，
 */
