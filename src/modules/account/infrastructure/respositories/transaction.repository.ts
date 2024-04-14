import { Injectable } from '@nestjs/common';
import { Transaction as TransactionEntity } from '@common/database/entities';
import { EntityManager } from '@mikro-orm/postgresql';
import { Transaction } from '../../domain/transaction';
import type { ITransactionRepository } from '../../domain/repositories/transaction.repository.interface';

@Injectable()
export class TransactionRepository implements ITransactionRepository {
  constructor(private readonly em: EntityManager) {}

  async create(transaction: Transaction): Promise<void> {
    const entity = this.em.create(TransactionEntity, transaction);
    await this.em.persistAndFlush(entity);
  }
}
