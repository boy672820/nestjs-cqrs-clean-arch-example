export type DerivedChild = {
  address: string;
  privkey: string;
};

export interface AccountProperties {
  id: string;
  index: number;
  accountAddress: string;
  balance: string;
}

export class Account implements AccountProperties {
  public id: string;
  public index: number;
  public accountAddress: string;
  public balance: string;

  constructor(props: AccountProperties) {
    Object.assign(this, props);
  }
}
