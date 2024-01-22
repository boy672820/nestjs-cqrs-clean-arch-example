import { AggregateRoot } from '@nestjs/cqrs';

export interface HistoryProperties {
  id: string;
  fromAccountId: string;
  toAccountId: string;
  amount: string;
  createdAt: Date;
}

export class History extends AggregateRoot implements HistoryProperties {
  public id: string;
  public fromAccountId: string;
  public toAccountId: string;
  public amount: string;
  public createdAt: Date;

  constructor(props: HistoryProperties) {
    super();
    Object.assign(this, props);
  }

  created() {
    this.apply(this);
  }
}
