interface LStorage<TypeOfValue> {
  write(namespace: string, data: TypeOfValue): void;
  read(namespace: string): TypeOfValue | null;
}

class StringStorageV1 implements LStorage<string> {

  write(namespace: string, data: string) {
    localStorage.setItem(namespace, data);
  };

  read(namespace: string): string | null {
    return localStorage.getItem(namespace);
  };
}

class ObjectStorageV1 extends StringStorageV1 implements LStorage<object> {

  constructor() {
    super();
  }

  write(namespace: string, data: object) {
    super.write(namespace, JSON.stringify(data));
  };

  read(namespace: string): object | null {
    const value = super.read(namespace);
    if (!value) return null;
    return JSON.parse(value);
  };
}

class EncryptedStorageV1 implements LStorage<string> {

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

