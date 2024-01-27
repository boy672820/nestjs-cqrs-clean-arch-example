import {
  Entity,
  Enum,
  ManyToOne,
  PrimaryKey,
  PrimaryKeyType,
  Property,
} from '@mikro-orm/core';
import { CreatedAt } from '@common/database/entities';
import { Account } from './account.entity';
import { HistoryType } from '../enum';

@Entity({ tableName: 'histories' })
export class History extends CreatedAt {
  [PrimaryKeyType]!: [string, string, string];

  @PrimaryKey({ type: 'text', name: 'history_id' })
  id!: string;

  @Property({ type: 'text', name: 'recipient_user_id' })
  recipientUserId!: string;

  @Property({ type: 'text', name: 'recipient_account_id' })
  recipientAccountId!: string;

  @Property({ type: 'numeric', precision: 38, scale: 0, name: 'amount' })
  amount!: string;

  @Property({ name: 'history_type' })
  @Enum({ items: () => HistoryType })
  type!: HistoryType;

  @ManyToOne(() => Account, { fieldNames: ['account_id', 'user_id'] })
  account!: Account;

  constructor(account: Account, id: string) {
    super();
    this.account = account;
    this.id = id;
  }
}
