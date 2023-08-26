import { Entity, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { Timestamp } from '@common/database';
import { Account } from './account.entity';

@Entity({ tableName: 'users' })
export class User extends Timestamp {
  @PrimaryKey({
    type: 'uuid',
    defaultRaw: 'uuid_generate_v4()',
    name: 'user_id',
  })
  readonly id!: string;

  @Property({ type: 'text', unique: true, name: 'username' })
  readonly username!: string;

  @Property({ type: 'text', hidden: true, name: 'password' })
  readonly password!: string;

  @OneToMany(() => Account, (account) => account.user)
  readonly accounts!: Account[];
}
