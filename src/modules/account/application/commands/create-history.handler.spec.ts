import { Test } from '@nestjs/testing';
import { CreateHistoryCommand } from './create-history.command';
import { InjectionToken } from '../../account.constants';
import { CreateHistoryHandler } from './create-history.handler';
import { MockProxy, mock } from 'jest-mock-extended';
import type { IAccountRepository } from '../../domain/repositories/account.repository.interface';

describe('TransferHandler', () => {
  let handler: CreateHistoryHandler;
  let accountRepository: MockProxy<IAccountRepository>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CreateHistoryHandler,
        {
          provide: InjectionToken.ACCOUNT_REPOSITORY,
          useValue: mock<IAccountRepository>(),
        },
      ],
    }).compile();

    handler = moduleRef.get<CreateHistoryHandler>(CreateHistoryHandler);
    accountRepository = moduleRef.get<MockProxy<IAccountRepository>>(
      InjectionToken.ACCOUNT_REPOSITORY,
    );
  });

  describe('execute', () => {
    it('Should create history', async () => {
      const fromAccountId = 'fromAccountId';
      const toAccountId = 'toAccountId';
      const amount = '10';

      accountRepository.findById.mockResolvedValueOnce({
        id: fromAccountId,
      } as any);
      accountRepository.findById.mockResolvedValueOnce({
        id: toAccountId,
      } as any);

      await handler.execute(
        new CreateHistoryCommand(fromAccountId, toAccountId, amount),
      );

      expect(accountRepository.createHistory).toBeCalledTimes(1);
      expect(accountRepository.createHistory).toBeCalledWith(
        expect.objectContaining({
          id: fromAccountId,
        }),
        expect.objectContaining({
          id: toAccountId,
        }),
        amount,
      );
    });
  });
});
