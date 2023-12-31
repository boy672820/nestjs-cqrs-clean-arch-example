import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { Timestamp } from '@common/database/entities';

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

  @Property({ type: 'char', length: 16, nullable: true, name: 'otp_secret' })
  otpSecret!: string;
}
