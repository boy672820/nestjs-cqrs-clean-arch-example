import { Entity, Enum, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { CreatedAt } from '@common/database/entities';
import { Account } from './account.entity';

@Entity({ tableName: 'histories' })
export class History extends CreatedAt {
  @PrimaryKey({ type: 'text', name: 'from_account_id' })
  fromAccountId!: string;

  @Property({ type: 'text', name: 'history_id' })
  id!: string;

  @Property({ type: 'text', name: 'to_account_id' })
  toAccountId!: string;

  @Property({ type: 'numeric', precision: 38, scale: 0, name: 'amount' })
  amount!: string;

  @Property({ type: 'char', length: 42, name: 'from_account_address' })
  fromAccountAddress!: string;

  @Property({ type: 'char', length: 42, name: 'to_account_address' })
  toAccountAddress!: string;

  @Property({ name: 'history_type' })
  @Enum({ items: () => ['withdrawal', 'deposit'] })
  type!: 'withdrawal' | 'deposit';

  @Property({ type: 'timestamp with time zone', name: 'created_at' })
  createdAt!: Date;

  @ManyToOne(() => Account, { fieldName: 'from_account_id' })
  fromAccount!: Account;
}
