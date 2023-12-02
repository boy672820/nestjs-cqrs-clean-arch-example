export interface UserProperties {
  id: string;
  otpSecret: string | null;
}

export class User implements UserProperties {
  public id: string;
  public otpSecret: string | null;

  constructor(props: UserProperties) {
    Object.assign(this, props);
  }
}
