import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import { History as HistoryEntity } from '@common/database/entities';
import { History } from '../../domain/history';
import type { IHistoryRepository } from '../../domain/repositories/history.repository.interface';

@Injectable()
export class HistoryRepository implements IHistoryRepository {
  constructor(private readonly em: EntityManager) {}

  async create(history: History): Promise<void> {
    const entity = this.em.create(HistoryEntity, {
      ...history,
      sender: { id: history.fromAccountId },
      recipient: { id: history.toAccountId },
    });
    await this.em.persistAndFlush(entity);
  }
}
