import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { PickType } from '@nestjs/swagger';
import { Timestamp } from '@common/database/entities';
import { Account } from './account.entity';

@Entity({ tableName: 'transactions' })
export class Transaction extends PickType(Timestamp, ['createdAt'] as const) {
  @PrimaryKey({
    type: 'uuid',
    defaultRaw: 'uuid_generate_v4()',
    name: 'transaction_id',
  })
  readonly id!: string;

  // @Property({ type: 'uuid', name: 'from_account_id' })
  // readonly fromAccountId!: string;

  // @Property({ type: 'uuid', name: 'to_account_id' })
  // readonly toAccountId!: string;

  @Property({ type: 'numeric', precision: 38, scale: 0, name: 'amount' })
  readonly amount!: string;

  @ManyToOne(() => Account, { fieldName: 'fromAccountId' })
  readonly sender!: Account;

  @ManyToOne(() => Account, { fieldName: 'toAccountId' })
  readonly recipient!: Account;
}
