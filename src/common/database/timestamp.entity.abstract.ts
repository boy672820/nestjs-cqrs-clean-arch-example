import { Property } from '@mikro-orm/core';

export abstract class Timestamp {
  @Property({ type: 'timestamp with time zone', name: 'created_at' })
  createdAt: Date = new Date();

  @Property({ type: 'timestamp with time zone', name: 'updated_at' })
  updatedAt: Date = new Date();
}
