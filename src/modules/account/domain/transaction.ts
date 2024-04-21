import { TransactionStatus } from '@common/database/enum';

export interface TransactionProperties {
  hash: string;
  nonce: number;
  status: TransactionStatus;
  from: string;
  to: string;
  blockNumber: number | null;
  blockHash: string | null;
  index: number | null;
  gasPrice: bigint | null;
  gasLimit: bigint;
  gasUsed: number | null;
  fee: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export class Transaction implements TransactionProperties {
  hash: string;
  nonce: number;
  status: TransactionStatus;
  from: string;
  to: string;
  blockNumber: number;
  blockHash: string;
  index: number;
  gasPrice: bigint;
  gasLimit: bigint;
  gasUsed: number;
  fee: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(props: TransactionProperties) {
    Object.assign(this, props);
  }
}
