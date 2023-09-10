import { AggregateRoot } from '@nestjs/cqrs';

export type DerivedAccount = {
  address: string;
  privkey: string;
};

export interface AccountProperties {
  id: string;
  userId: string;
  accountAddress: string;
  balance: string;
  createdAt: Date;
}

export class Account extends AggregateRoot implements AccountProperties {
  public id: string;
  public userId: string;
  public accountAddress: string;
  public balance: string;
  public createdAt: Date;

  constructor(props: AccountProperties) {
    super();
    Object.assign(this, props);
  }
}
