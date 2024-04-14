import { Transaction } from '../transaction';

export interface ITransactionRepository {
  create: (transaction: Transaction) => Promise<void>;
}
