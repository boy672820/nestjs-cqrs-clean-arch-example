import { AggregateRoot } from '@nestjs/cqrs';
import {
  AccountAlreadyLockedException,
  AccountAlreadyOpenedException,
} from '@common/errors';
import { AccountLockedEvent } from './events/account-locked.event';
import { AccountOpenedEvent } from './events/account-opened.event';

export interface AccountProperties {
  id: string;
  userId: string;
  index: number;
  accountAddress: string;
  balance: string;
  isLocked: boolean;
  lockedAt?: Date;
}

export class Account extends AggregateRoot implements AccountProperties {
  public id: string;
  public userId: string;
  public index: number;
  public accountAddress: string;
  public balance: string;
  public isLocked: boolean;
  public lockedAt?: Date;

  constructor(props: AccountProperties) {
    super();
    Object.assign(this, props);
  }

  /**
   * Lock account
   *
   * @throws {AccountAlreadyLockedException} if account is already locked
   */
  lock(): void {
    if (this.isLocked) {
      throw new AccountAlreadyLockedException();
    }

    this.isLocked = true;
    this.lockedAt = new Date();
    this.apply(new AccountLockedEvent(this.userId, this.id));
  }

  /**
   * Open account
   *
   * @throws {AccountAlreadyOpenedException} if account is already opened
   */
  open(): void {
    if (!this.isLocked) {
      throw new AccountAlreadyOpenedException();
    }

    this.isLocked = false;
    this.lockedAt = undefined;
    this.apply(new AccountOpenedEvent(this.userId, this.id));
  }
}
