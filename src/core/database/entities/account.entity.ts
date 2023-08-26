import {
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Timestamp } from '@common/database';
import { User } from './user.entity';
import { Transaction } from './transaction.entity';

@Entity({ tableName: 'accounts' })
export class Account extends Timestamp {
  @PrimaryKey({
    type: 'uuid',
    defaultRaw: 'uuid_generate_v4()',
    name: 'account_id',
  })
  readonly id!: string;

  // @Property({ type: 'uuid', name: 'user_id', hidden: true })
  // readonly userId!: string;

  @Property({ type: 'text', unique: true, name: 'account_address' })
  readonly address!: string;

  @Property({
    type: 'numeric',
    default: '0',
    precision: 38,
    scale: 0,
    name: 'balance',
  })
  readonly balance!: string;

  @ManyToOne(() => User, { fieldName: 'user_id' })
  readonly user!: User;

  @OneToMany(() => Transaction, (transaction) => transaction.sender)
  readonly senderTxs!: Transaction[];

  @OneToMany(() => Transaction, (transaction) => transaction.recipient)
  readonly recipientTxs!: Transaction[];
}
