import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Account, AccountProperties } from '../account';
import { ulid } from 'ulid';

@Injectable()
export class AccountFactory {
  constructor(private readonly eventPublisher: EventPublisher) {}

  /**
   * Create account
   *
   * @param props - Account properties
   * @returns Account
   */
  create(props: Omit<AccountProperties, 'id' | 'isLocked'>): Account {
    return this.eventPublisher.mergeObjectContext(
      new Account({ ...props, id: ulid(), isLocked: false }),
    );
  }

  /**
   * Reconstitute account
   *
   * @param props - Account properties
   * @returns Account
   */
  reconstitute(props: AccountProperties): Account {
    return this.eventPublisher.mergeObjectContext(new Account(props));
  }
}
