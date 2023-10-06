import {
  AccountAlreadyLockedException,
  AccountAlreadyOpenedException,
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

  it('should lock account', () => {
    const account = new Account(accountProps);

    account.lock();

    expect(account.isLocked).toBe(true);
    expect(account.lockedAt).toBeDefined();
    expect(account.getUncommittedEvents()).toContainEqual(
      new AccountLockedEvent(account.userId, account.id),
    );
  });

  it('should throw AccountAlreadyLockedException when locking an already locked account', () => {
    const account = new Account({ ...accountProps, isLocked: true });
    expect(() => account.lock()).toThrow(AccountAlreadyLockedException);
  });

  it('should open account', () => {
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

  it('should throw AccountAlreadyOpenedException when opening an already opened account', () => {
    const account = new Account(accountProps);
    expect(() => account.open()).toThrow(AccountAlreadyOpenedException);
  });
});
