import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { Timestamp } from '@common/database';

/**
 * User entity.
 *
 * @description Collection name: users
 * @description Primary key: user_id
 * @description Fields: id(user_id): text, username: text unique, password: text, createdAt(created_at), updatedAt(updated_at)
 * @description All fields are required.
 */
@Entity({ collection: 'users' })
export class User extends Timestamp {
  // psql 에서는 user_id 로 생성되지만, mikro-orm 에서는 id 로 생성된다.
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
}
