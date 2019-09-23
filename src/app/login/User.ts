export class User {

  handle: string;
  password: string;
  profile: string; // url image
  name: string;
  followers: Set<User>;
  following: Set<User>;

  // constructor(handle: string, password: string) {
  //   this.handle = handle;
  //   this.password = password;
  // }

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
}
