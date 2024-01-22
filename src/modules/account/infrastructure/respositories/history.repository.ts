import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import { History } from '../../domain/history';
import type { IHistoryRepository } from '../../domain/repositories/history.repository.interface';

@Injectable()
export class HistoryRepository implements IHistoryRepository {
  constructor(private readonly em: EntityManager) {}

  async create(history: History): Promise<void> {
    await this.em.persistAndFlush(history);
  }
}
