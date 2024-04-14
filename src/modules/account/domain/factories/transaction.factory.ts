import { Injectable } from '@nestjs/common';
import { Transaction, TransactionProperties } from '../transaction';

@Injectable()
export class TransactionFactory {
  create(
    props: Omit<TransactionProperties, 'createdAt' | 'updatedAt'>,
  ): Transaction {
    return new Transaction({
      ...props,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}
