import { Entity, OneToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Timestamp } from '@common/database/entities';
import { Wallet } from './wallet.entity';

@Entity({ tableName: 'users' })
export class User extends Timestamp {
  @PrimaryKey({
    type: 'uuid',
    defaultRaw: 'uuid_generate_v4()',
    name: 'user_id',
  })
  id!: string;

  @Property({ type: 'text', unique: true, name: 'username' })
  username!: string;

  @Property({ type: 'text', hidden: true, name: 'password' })
  password!: string;

  @OneToOne(() => Wallet)
  wallet!: Wallet;
}
