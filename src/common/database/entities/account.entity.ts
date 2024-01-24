import {
  Collection,
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
import { History } from './history.entity';

@Entity({ tableName: 'accounts', customRepository: () => AccountRepository })
export class Account extends Timestamp {
  [EntityRepositoryType]?: AccountRepository;

  [PrimaryKeyType]!: [string, string];

  @PrimaryKey({ type: 'text', unique: true, name: 'account_id' })
  id!: string;

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

  @Property({
    type: 'boolean',
    default: false,
    name: 'is_locked',
  })
  isLocked = false;

  @Property({
    type: 'timestamp with time zone',
    name: 'locked_at',
    nullable: true,
    default: null,
  })
  lockedAt?: Date | null = null;

  @ManyToOne(() => Wallet, { primary: true, fieldName: 'user_id' })
  wallet!: Wallet;

  @OneToMany(() => History, (history) => history.fromAccount)
  histories: Collection<History> = new Collection<History>(this);

  constructor(id: string, wallet: Wallet) {
    super();
    this.id = id;
    this.wallet = wallet;
  }
}
