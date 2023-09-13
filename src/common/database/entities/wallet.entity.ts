import { PickType } from '@nestjs/swagger';
import {
  Entity,
  OneToMany,
  PrimaryKey,
  PrimaryKeyType,
  Property,
} from '@mikro-orm/core';
import { Account, Timestamp } from '@common/database/entities';

@Entity({ tableName: 'wallets' })
export class Wallet extends PickType(Timestamp, ['createdAt'] as const) {
  @PrimaryKey({ type: 'text', unique: true, name: 'wallet_id' })
  id!: string;

  @PrimaryKey({ type: 'text', unique: true, name: 'user_id' })
  userId!: string;

  [PrimaryKeyType]?: [string, string];

  @Property({ type: 'char', length: 42, name: 'address' })
  address!: string;

  @Property({ type: 'text', name: 'public_key' })
  publicKey!: string;

  @OneToMany(() => Account, (account) => account.wallet)
  accounts!: Account[];

  constructor(id: string, userId: string) {
    super();
    this.id = id;
    this.userId = userId;
  }
}
