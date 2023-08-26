import { Property } from '@mikro-orm/core';

export class Timestamp {
  @Property({
    type: 'timestamp with time zone',
    name: 'created_at',
    default: 'NOW()',
  })
  createdAt: Date = new Date();

  @Property({
    type: 'timestamp with time zone',
    name: 'updated_at',
    default: 'NOW()',
  })
  updatedAt: Date = new Date();
}
