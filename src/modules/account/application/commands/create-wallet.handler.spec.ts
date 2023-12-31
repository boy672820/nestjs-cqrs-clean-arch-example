import { Test } from '@nestjs/testing';
import { WalletFactory } from '../../domain';
import { IWalletRepository } from '../../domain/repositories/wallet.repository.interface';
import { CreateWalletCommand } from './create-wallet.command';
import { CreateWalletHandler } from './create-wallet.handler';
import { InjectionToken } from '../../account.constants';
import { MockProxy, mock } from 'jest-mock-extended';

const userId = 'id';
const wallet = {
  createHDNode: jest.fn().mockImplementation(() => 'phrase'),
  addAccount: jest.fn().mockImplementation(() => ({
    id: 'account_id',
    index: 0,
    accountAddress: 'address',
    balance: '0',
    privkey: 'privkey',
  })),
};

describe('CreateWalletHandler', () => {
  let createWalletHandler: CreateWalletHandler;
  let walletFactory: WalletFactory;
  let walletRepository: MockProxy<IWalletRepository>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CreateWalletHandler,
        {
          provide: InjectionToken.WALLET_REPOSITORY,
          useValue: mock<IWalletRepository>(),
        },
        {
          provide: WalletFactory,
          useValue: {
            create: jest.fn(() => wallet),
          },
        },
      ],
    }).compile();

    createWalletHandler =
      moduleRef.get<CreateWalletHandler>(CreateWalletHandler);
    walletRepository = moduleRef.get<MockProxy<IWalletRepository>>(
      InjectionToken.WALLET_REPOSITORY,
    );
    walletFactory = moduleRef.get<WalletFactory>(WalletFactory);
  });

  it('should create a new wallet and save it to the repository', async () => {
    const password = 'password';
    const command = new CreateWalletCommand(userId, password);

    await createWalletHandler.execute(command);

    expect(walletFactory.create).toHaveBeenCalledWith({ userId });

    expect(wallet.createHDNode).toHaveBeenCalled();
    expect(wallet.createHDNode).toHaveBeenCalledWith(password);
    expect(wallet.addAccount).toHaveBeenCalled();

    expect(walletRepository.create).toHaveBeenCalled();
    expect(walletRepository.create).toHaveBeenCalledWith(wallet);
  });
});
