import { Entity, Property } from '@mikro-orm/core';

@Entity({ abstract: true })
export abstract class Timestamp {
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

@Entity({ abstract: true })
export abstract class CreatedAt {
  @Property({
    type: 'timestamp with time zone',
    name: 'created_at',
    default: 'now',
  })
  createdAt: Date = new Date();
}
