import { Injectable } from '@nestjs/common';
import { Transaction, TransactionProperties } from '../transaction';

@Injectable()
export class TransactionFactory {
  create(
    props: Omit<
      TransactionProperties,
      | 'createdAt'
      | 'updatedAt'
      | 'index'
      | 'blockNumber'
      | 'blockHash'
      | 'gasPrice'
      | 'gasUsed'
      | 'fee'
    >,
  ): Transaction {
    return new Transaction({
      ...props,
      index: null,
      blockNumber: null,
      blockHash: null,
      gasPrice: null,
      gasUsed: null,
      fee: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}
