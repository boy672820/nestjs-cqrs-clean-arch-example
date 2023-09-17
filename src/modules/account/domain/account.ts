import { AggregateRoot } from '@nestjs/cqrs';

export interface AccountProperties {
  id: string;
  userId: string;
  index: number;
  accountAddress: string;
  balance: string;
  createdAt: Date;
}

export class Account extends AggregateRoot implements AccountProperties {
  public id: string;
  public userId: string;
  public index: number;
  public accountAddress: string;
  public balance: string;
  public createdAt: Date;

  constructor(props: AccountProperties) {
    super();
    Object.assign(this, props);
  }
}
