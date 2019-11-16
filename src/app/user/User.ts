export class User {

  handle: string;
  password: string;
  name: string;

  constructor(handle: string, password: string, name: string) {
    this.handle = handle;
    this.password = password;
    this.name = name;
  }

  public getHandle() {
    return this.handle;
  }

  public getName() {
    return this.name;
  }

  public getPassword() {
    return this.password;
  }
}
