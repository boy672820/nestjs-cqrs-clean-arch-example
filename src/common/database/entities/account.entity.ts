import {
  Entity,
  EntityRepositoryType,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
  Unique,
} from '@mikro-orm/core';
import { Timestamp } from '@common/database/entities';
import { AccountRepository } from '../repositories';
import { User } from './user.entity';
import { Transaction } from './transaction.entity';

@Entity({ tableName: 'accounts', customRepository: () => AccountRepository })
export class Account extends Timestamp {
  [EntityRepositoryType]?: AccountRepository;

  @PrimaryKey({
    type: 'uuid',
    defaultRaw: 'uuid_generate_v4()',
    name: 'account_id',
  })
  id!: string;

  @Unique({ name: 'accounts_user_id_index', properties: ['index', 'user'] })
  @Property({ type: 'integer', name: 'index' })
  index!: number;

  @Property({ type: 'text', unique: true, name: 'account_address' })
  accountAddress!: string;

  @Property({
    type: 'numeric',
    default: '0',
    precision: 38,
    scale: 0,
    name: 'balance',
  })
  balance!: string;

  @ManyToOne(() => User, { fieldName: 'user_id' })
  user!: User;

  @OneToMany(() => Transaction, (transaction) => transaction.sender)
  senderTxs!: Transaction[];

  @OneToMany(() => Transaction, (transaction) => transaction.recipient)
  recipientTxs!: Transaction[];
}
