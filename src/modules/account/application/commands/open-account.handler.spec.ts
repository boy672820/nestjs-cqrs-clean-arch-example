import { Test } from '@nestjs/testing';
import { OpenAccountHandler } from './open-account.handler';
import { IAccountRepository } from '../../domain/repositories/account.repository.interface';
import { NotFoundAccountException } from '@common/errors';
import { OpenAccountCommand } from './open-account.command';
import { InjectionToken } from '../../account.constants';

const mockAccountRepository: IAccountRepository = {
  findOne: jest.fn(),
  findOneById: jest.fn(),
  update: jest.fn(),
};

describe('OpenAccountHandler', () => {
  let handler: OpenAccountHandler;
  let accountRepository: IAccountRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        OpenAccountHandler,
        {
          provide: InjectionToken.ACCOUNT_REPOSITORY,
          useValue: mockAccountRepository,
        },
      ],
    }).compile();

    handler = moduleRef.get<OpenAccountHandler>(OpenAccountHandler);
    accountRepository = moduleRef.get<IAccountRepository>(
      InjectionToken.ACCOUNT_REPOSITORY,
    );
  });

  describe('execute', () => {
    it('should throw NotFoundAccountException if account is not found', async () => {
      // Arrange
      const command = new OpenAccountCommand('userId', 'accountId');
      jest.spyOn(accountRepository, 'findOne').mockResolvedValueOnce(undefined);

      // Act & Assert
      await expect(handler.execute(command)).rejects.toThrow(
        NotFoundAccountException,
      );
    });

    it('should open the account', async () => {
      // Arrange
      const command = new OpenAccountCommand('userId', 'accountId');
      const account = {
        id: 'accountId',
        accountAddress: 'accountAddress',
        balance: 100,
        open: jest.fn(),
      } as any;
      jest.spyOn(accountRepository, 'findOne').mockResolvedValueOnce(account);

      // Act
      await handler.execute(command);

      // Assert
      expect(account.open).toHaveBeenCalled();
      expect(accountRepository.update).toHaveBeenCalledWith(account);
    });
  });
});
