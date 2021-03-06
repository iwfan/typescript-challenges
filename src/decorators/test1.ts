interface LStorage<TypeOfValue> {
  write(namespace: string, data: TypeOfValue): void;
  read(namespace: string): TypeOfValue | null;
}

interface LStorageConstructor<T> {
  new (): LStorage<T>;
}


function Objectify<T extends { new (...args: any[]): {} }>(
  constructor: T
) {

  return class extends constructor implements LStorage<object> {

    write(namespace: string, data: object) {
      constructor.prototype.write(namespace, JSON.stringify(data));
    }

    read(namespace: string): object | null {
      const value = constructor.prototype.read(namespace);
      if (!value) return null;
      return JSON.parse(value);
    };
  };
}


function Encrypted<T extends { new (...args: any[]): {} }>(
  constructor: T
) {

  constructor.prototype.write = () => {}

  // return class extends constructor implements LStorage<string> {
  //
  //   encrypt(value: string): string {
  //     return value;
  //   }
  //
  //   encode(value: string): string {
  //     return value;
  //   }
  //
  //   write(namespace: string, data: string) {
  //     constructor.prototype.write(namespace, this.encrypt(data));
  //   };
  //
  //   read(namespace: string): string | null {
  //     const value = constructor.prototype.read(namespace);
  //     if (!value) return null;
  //     return this.encode(value);
  //   };
  // };
}

@Objectify
@Encrypted
class RawStorage implements LStorage<string> {

  write(namespace: string, data: string) {
    localStorage.setItem(namespace, data)
  }

  read(namespace: string): string | null {
    return localStorage.getItem(namespace)
  }
}
