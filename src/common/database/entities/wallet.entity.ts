import {
  Collection,
  Entity,
  OneToMany,
  PrimaryKey,
  PrimaryKeyType,
  Property,
} from '@mikro-orm/core';
import { Account, CreatedAt } from '@common/database/entities';

@Entity({ tableName: 'wallets' })
export class Wallet extends CreatedAt {
  [PrimaryKeyType]!: string;

  @PrimaryKey({ type: 'text', unique: true, name: 'user_id' })
  userId!: string;

  @Property({ type: 'char', length: 42, name: 'address' })
  address!: string;

  @Property({ type: 'text', name: 'public_key' })
  publicKey!: string;

  @OneToMany(() => Account, (account) => account.wallet)
  accounts: Collection<Account> = new Collection<Account>(this);

  constructor(userId: string) {
    super();
    this.userId = userId;
  }
}
