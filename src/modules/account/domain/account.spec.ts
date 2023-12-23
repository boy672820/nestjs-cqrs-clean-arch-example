import {
  AccountAlreadyLockedException,
  AccountAlreadyOpenedException,
  CannotTransferToSameAccountException,
  InsufficientFundsException,
  NotFoundAccountException,
  ZeroAmountException,
} from '@common/errors';
import { Account } from './account';
import { AccountLockedEvent } from './events/account-locked.event';
import { AccountOpenedEvent } from './events/account-opened.event';

describe('Account', () => {
  const accountProps = {
    id: '1',
    userId: '1',
    index: 0,
    accountAddress: '0x123',
    balance: '100',
    isLocked: false,
  };

  const destAccountProps = {
    id: '2',
    userId: '2',
    index: 0,
    accountAddress: '0x456',
    balance: '0',
    isLocked: false,
  };

  it('transferTo: should throw error when source is locked', () => {
    const account = new Account({ ...accountProps, isLocked: true });
    const destAccount = new Account(destAccountProps);

    expect(() => account.transferTo(destAccount, '10')).toThrow(
      AccountAlreadyLockedException,
    );
  });

  it('transferTo: should throw error when destination is locked', () => {
    const account = new Account(accountProps);
    const destAccount = new Account({ ...destAccountProps, isLocked: true });

    expect(() => account.transferTo(destAccount, '10')).toThrow(
      NotFoundAccountException,
    );
  });

  it('transferTo: should throw error when source and destination are the same', () => {
    const account = new Account(accountProps);
    const destAccount = new Account(accountProps);

    expect(() => account.transferTo(destAccount, '10')).toThrow(
      CannotTransferToSameAccountException,
    );
  });

  it('transferTo: should throw error when amount is zero', () => {
    const account = new Account(accountProps);
    const destAccount = new Account(destAccountProps);
    const zeroAmount = '0';

    expect(() => account.transferTo(destAccount, zeroAmount)).toThrow(
      ZeroAmountException,
    );
  });

  it('transferTo: should throw error when account has insufficient funds', () => {
    const account = new Account(accountProps);
    const destAccount = new Account(destAccountProps);
    const amount = '1000';

    expect(() => account.transferTo(destAccount, amount)).toThrow(
      InsufficientFundsException,
    );
  });

  it('transferTo: should transfer to destination', () => {
    const account = new Account(accountProps);
    const destAccount = new Account(destAccountProps);
    const amount = '10';

    account.transferTo(destAccount, amount);

    expect(account.balance).toBe('90');
    expect(destAccount.balance).toBe('10');
  });

  it('lock: should throw error when locking an already locked account', () => {
    const account = new Account({ ...accountProps, isLocked: true });
    expect(() => account.lock()).toThrow(AccountAlreadyLockedException);
  });

  it('lock: should lock account', () => {
    const account = new Account(accountProps);

    account.lock();

    expect(account.isLocked).toBe(true);
    expect(account.lockedAt).toBeDefined();
    expect(account.getUncommittedEvents()).toContainEqual(
      new AccountLockedEvent(account.userId, account.id),
    );
  });

  it('open: should throw error when opening an already opened account', () => {
    const account = new Account(accountProps);
    expect(() => account.open()).toThrow(AccountAlreadyOpenedException);
  });

  it('open: should open account', () => {
    const account = new Account({
      ...accountProps,
      isLocked: true,
      lockedAt: new Date(),
    });
    account.open();
    expect(account.isLocked).toBe(false);
    expect(account.lockedAt).toBeUndefined();
    expect(account.getUncommittedEvents()).toContainEqual(
      new AccountOpenedEvent(account.userId, account.id),
    );
  });
});
