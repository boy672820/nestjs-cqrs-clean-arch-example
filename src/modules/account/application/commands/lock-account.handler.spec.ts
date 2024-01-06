import { Test } from '@nestjs/testing';
import { LockAccountHandler } from './lock-account.handler';
import { IAccountRepository } from '../../domain/repositories/account.repository.interface';
import { NotFoundAccountException } from '@common/errors';
import { LockAccountCommand } from './lock-account.command';
import { InjectionToken } from '../../account.constants';
import { MockProxy, mock } from 'jest-mock-extended';

describe('LockAccountHandler', () => {
  let handler: LockAccountHandler;
  let accountRepository: MockProxy<IAccountRepository>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        LockAccountHandler,
        {
          provide: InjectionToken.ACCOUNT_REPOSITORY,
          useValue: mock<IAccountRepository>(),
        },
      ],
    }).compile();

    handler = moduleRef.get<LockAccountHandler>(LockAccountHandler);
    accountRepository = moduleRef.get<MockProxy<IAccountRepository>>(
      InjectionToken.ACCOUNT_REPOSITORY,
    );
  });

  describe('execute', () => {
    it('should throw NotFoundAccountException if account is not found', async () => {
      // Arrange
      const command = new LockAccountCommand('userId', 'accountId');
      jest.spyOn(accountRepository, 'findOne').mockResolvedValueOnce(undefined);

      // Act & Assert
      await expect(handler.execute(command)).rejects.toThrow(
        NotFoundAccountException,
      );
    });

    it('should lock the account and return LockAccountCommandResult', async () => {
      // Arrange
      const command = new LockAccountCommand('userId', 'accountId');
      const account = {
        id: 'accountId',
        accountAddress: 'accountAddress',
        balance: 100,
        lock: jest.fn(),
      } as any;
      jest.spyOn(accountRepository, 'findOne').mockResolvedValueOnce(account);

      // Act
      const result = await handler.execute(command);

      // Assert
      expect(account.lock).toHaveBeenCalled();
      expect(accountRepository.update).toHaveBeenCalledWith(account);
      expect(result.success).toBe(true);
      expect(result.message).toBe('Account locked');
      expect(result.data.account.id).toBe('accountId');
      expect(result.data.account.address).toBe('accountAddress');
      expect(result.data.account.balance).toBe(100);
      expect(result.data.lockedAt).toBeInstanceOf(Date);
    });
  });
});
