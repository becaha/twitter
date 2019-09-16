export class User {
  handle: string;
  password: string;
  profile: string; // url image
  name: string;
  followers: Set<User>;
  following: Set<User>;
}
