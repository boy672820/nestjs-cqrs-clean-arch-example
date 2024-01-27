import { AggregateRoot } from '@nestjs/cqrs';
import {
  AccountAlreadyLockedException,
  AccountAlreadyOpenedException,
  CannotTransferToSameAccountException,
  InsufficientFundsException,
  NotFoundAccountException,
  ZeroAmountException,
} from '@common/errors';
import { AccountLockedEvent } from './events/account-locked.event';
import { AccountOpenedEvent } from './events/account-opened.event';
import BigNumber from 'bignumber.js';
import { AccountTransferredEvent } from './events/account-transferred.event';

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
   * Transfer tokens to another account
   *
   * @param destAccount Destination account
   * @param amount Amount to transfer
   */
  transferTo(destAccount: Account, amount: string): void {
    // Check if source is locked
    if (this.isLocked) {
      throw new AccountAlreadyLockedException();
    }

    // Check if destionation is locked
    if (destAccount.isLocked) {
      throw new NotFoundAccountException();
    }

    // Check if source and destination are the same
    if (this.id === destAccount.id) {
      throw new CannotTransferToSameAccountException();
    }

    // Check if amount is zero
    if (amount === '0') {
      throw new ZeroAmountException();
    }

    // Check if account has enough funds
    if (new BigNumber(this.balance).lt(amount)) {
      throw new InsufficientFundsException();
    }

    destAccount.balance = new BigNumber(destAccount.balance)
      .plus(amount)
      .toString();
    this.balance = new BigNumber(this.balance).minus(amount).toString();
    this.apply(new AccountTransferredEvent(this.id, destAccount.id, amount));
  }

  withdraw(amount: string): void {
    // Check if source is locked
    if (this.isLocked) {
      throw new AccountAlreadyLockedException();
    }

    // Check if amount is zero
    if (amount === '0') {
      throw new ZeroAmountException();
    }

    // Check if account has enough funds
    if (new BigNumber(this.balance).lt(amount)) {
      throw new InsufficientFundsException();
    }

    this.balance = new BigNumber(this.balance).minus(amount).toString();
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
