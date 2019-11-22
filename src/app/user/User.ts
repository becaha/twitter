export class User {

  handle: string;
  name: string;

  constructor(handle: string, name: string) {
    this.handle = handle;
    this.name = name;
  }

  public getHandle() {
    return this.handle;
  }

  public getName() {
    return this.name;
  }
}
