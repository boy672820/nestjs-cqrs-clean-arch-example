import { Property } from '@mikro-orm/core';

export class Timestamp {
  @Property({
    type: 'timestamp with time zone',
    name: 'created_at',
    defaultRaw: 'now',
  })
  createdAt: Date = new Date();

  @Property({
    type: 'timestamp with time zone',
    name: 'updated_at',
    defaultRaw: 'now',
  })
  updatedAt: Date = new Date();
}

export class CreatedAt {
  @Property({
    type: 'timestamp with time zone',
    name: 'created_at',
    default: 'now',
  })
  createdAt: Date = new Date();
}
