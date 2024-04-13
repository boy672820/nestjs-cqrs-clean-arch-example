import { Entity, Enum, PrimaryKey, Property } from '@mikro-orm/core';
import { Timestamp } from './timestamp.entity';
import { TransactionStatus } from '../enum';

@Entity({ tableName: 'transactions' })
export class Transaction extends Timestamp {
  @PrimaryKey({ type: 'char', length: 66, name: 'hash' })
  hash!: string;

  @Property({ type: 'int', name: 'nonce', nullable: false })
  nonce!: number;

  @Property({ type: 'enum' })
  @Enum({ items: () => TransactionStatus })
  status!: TransactionStatus;

  @Property({ type: 'char', length: 42, name: 'from', nullable: false })
  from!: string;

  @Property({ type: 'char', length: 42, name: 'to', nullable: true })
  to!: string | null;

  @Property({ type: 'int', name: 'block_number', nullable: true })
  blockNumber!: number | null;

  @Property({ type: 'char', length: 66, name: 'block_hash', nullable: true })
  blockHash!: string | null;

  @Property({ type: 'int', name: 'index', nullable: false })
  index!: number;

  @Property({ type: 'bigint', name: 'gas_price', nullable: false })
  gasPrice!: bigint;

  @Property({ type: 'int', name: 'gas_limit', nullable: false })
  gasLimit!: number;

  @Property({ type: 'int', name: 'gas_used', nullable: true })
  gasUsed!: number | null;

  @Property({
    type: 'numeric',
    precision: 38,
    scale: 0,
    name: 'fee',
    nullable: true,
  })
  fee!: string | null;
}
