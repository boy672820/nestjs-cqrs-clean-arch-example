import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Account, AccountProperties } from '../account';

@Injectable()
export class AccountFactory {
  constructor(private readonly eventPublisher: EventPublisher) {}

  create(props: AccountProperties): Account {
    return this.eventPublisher.mergeObjectContext(
      new Account({ ...props, createdAt: new Date() }),
    );
  }
}
