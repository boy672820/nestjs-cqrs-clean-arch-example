import {
  Entity,
  EntityRepositoryType,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  PrimaryKeyType,
  Property,
} from '@mikro-orm/core';
import { Timestamp } from '@common/database/entities';
import { AccountRepository } from '../repositories';
import { Wallet } from './wallet.entity';
import { Transaction } from './transaction.entity';

@Entity({ tableName: 'accounts', customRepository: () => AccountRepository })
export class Account extends Timestamp {
  [EntityRepositoryType]?: AccountRepository;

  @PrimaryKey({ type: 'text', unique: true, name: 'account_id' })
  id!: string;

  @PrimaryKey({ type: 'text', name: 'wallet_id' })
  walletId!: string;

  [PrimaryKeyType]?: [string, string];

  @Property({ type: 'integer', name: 'index' })
  index!: number;

  @Property({ type: 'char', length: 42, unique: true, name: 'account_address' })
  accountAddress!: string;

  @Property({
    type: 'numeric',
    default: '0',
    precision: 38,
    scale: 0,
    name: 'balance',
  })
  balance!: string;

  @ManyToOne(() => Wallet, { primary: true })
  wallet!: Wallet;

  @OneToMany(() => Transaction, (transaction) => transaction.sender)
  senderTxs!: Transaction[];

  @OneToMany(() => Transaction, (transaction) => transaction.recipient)
  recipientTxs!: Transaction[];

  constructor(id: string, walletId: string) {
    super();
    this.id = id;
    this.walletId = walletId;
  }
}
