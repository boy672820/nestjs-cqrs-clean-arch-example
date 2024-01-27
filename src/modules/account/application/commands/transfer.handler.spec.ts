import { Test } from '@nestjs/testing';
import { TransferHandler } from './transfer.handler';
import { InjectionToken } from '../../account.constants';
import { MockProxy, mock } from 'jest-mock-extended';
import { Account } from '../../domain/account';
import type { IAccountRepository } from '../../domain/repositories/account.repository.interface';

describe('TransferHandler', () => {
  let handler: TransferHandler;
  let accountRepository: MockProxy<IAccountRepository>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        TransferHandler,
        {
          provide: InjectionToken.ACCOUNT_REPOSITORY,
          useValue: mock<IAccountRepository>(),
        },
      ],
    }).compile();

    handler = moduleRef.get<TransferHandler>(TransferHandler);
    accountRepository = moduleRef.get<MockProxy<IAccountRepository>>(
      InjectionToken.ACCOUNT_REPOSITORY,
    );
  });

  describe('execute', () => {
    it('should throw UnauthorizedException if source account is not found', async () => {
      accountRepository.findOne.mockResolvedValueOnce(undefined);

      await expect(
        handler.execute({
          userId: 'userId',
          sourceAccountId: 'sourceAccountId',
          destAccountId: 'destAccountId',
          amount: '100',
        }),
      ).rejects.toThrow('Unauthorized');
    });

    it('should transfer money from source account to dest account', async () => {
      const mockSource = mock<Account>();
      const mockDest = mock<Account>();

      accountRepository.findOne.mockResolvedValueOnce(mockSource);
      accountRepository.findById.mockResolvedValueOnce(mockDest);

      await handler.execute({
        userId: 'userId',
        sourceAccountId: 'sourceAccountId',
        destAccountId: 'destAccountId',
        amount: '100',
      });

      expect(mockSource.transferTo).toHaveBeenCalledWith(mockDest, '100');
      expect(accountRepository.update).toHaveBeenCalledWith(mockSource);
      expect(accountRepository.update).toHaveBeenCalledWith(mockDest);
    });
  });
});
