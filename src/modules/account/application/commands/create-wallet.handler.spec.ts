import { WalletFactory } from '../../domain';
import { WalletRepository } from '../../infrastructure';
import { CreateWalletCommand } from './create-wallet.command';
import { CreateWalletHandler } from './create-wallet.handler';

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
  let walletRepository: WalletRepository;

  beforeEach(() => {
    walletRepository = {
      save: jest.fn(),
    } as any;
    walletFactory = {
      create: jest.fn(() => wallet),
    } as any;
    createWalletHandler = new CreateWalletHandler(
      walletFactory,
      walletRepository,
    );
  });

  it('should create a new wallet and save it to the repository', async () => {
    const password = 'password';
    const command = new CreateWalletCommand(userId, password);

    await createWalletHandler.execute(command);

    expect(walletFactory.create).toHaveBeenCalledWith({ userId });

    expect(wallet.createHDNode).toHaveBeenCalled();
    expect(wallet.createHDNode).toHaveBeenCalledWith(password);
    expect(wallet.addAccount).toHaveBeenCalled();

    expect(walletRepository.save).toHaveBeenCalled();
    expect(walletRepository.save).toHaveBeenCalledWith(wallet);
  });
});
