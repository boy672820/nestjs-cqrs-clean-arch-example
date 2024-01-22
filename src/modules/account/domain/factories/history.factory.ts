import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { History, HistoryProperties } from '../history';
import { ulid } from 'ulid';

@Injectable()
export class HistoryFactory {
  constructor(private readonly eventPublisher: EventPublisher) {}

  /**
   * Create history
   *
   * @param props - History properties
   * @returns History
   */
  create(props: Omit<HistoryProperties, 'id' | 'createdAt'>): History {
    return this.eventPublisher.mergeObjectContext(
      new History({ ...props, id: ulid(), createdAt: new Date() }),
    );
  }
}
