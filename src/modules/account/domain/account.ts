import { AggregateRoot } from '@nestjs/cqrs';

export interface AccountProperties {
  id: string;
  index: number;
  accountAddress: string;
  balance: string;
}

export class Account extends AggregateRoot implements AccountProperties {
  public id: string;
  public index: number;
  public accountAddress: string;
  public balance: string;

  constructor(props: AccountProperties) {
    super();
    Object.assign(this, props);
  }
}
