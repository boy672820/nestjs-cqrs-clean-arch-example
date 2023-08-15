import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { Timestamp } from '@common/database';

@Entity({ collection: 'accounts' })
export class Account extends Timestamp {
  @PrimaryKey({
    type: 'uuid',
    defaultRaw: 'uuid_generate_v4()',
    name: 'account_id',
  })
  id!: string;

  @Property({ type: 'uuid', name: 'user_id' })
  userId!: string;

  @Property({ type: 'text', unique: true, name: 'account_address' })
  address!: string;

  @Property({
    type: 'numeric',
    default: '0',
    precision: 38,
    scale: 0,
    name: 'balance',
  })
  balance!: string;
}
