import { WalletRepository } from '../../infrastructure';
import { AddAccountUnsafeCommand } from './add-account-unsafe.command';
import { AddAccountUnsafeHandler } from './add-account-unsafe.handler';

const userId = 'id';
const phrase = 'phrase';
const password = 'password';

const wallet = {
  initialize: jest.fn(),
  addAccount: jest.fn().mockImplementation(() => ({
    id: 'account_id',
    index: 0,
    accountAddress: 'address',
    balance: '0',
    privkey: 'privkey',
  })),
};

describe('AddAccountUnsafeHandler', () => {
  let addAccountUnsafeHandler: AddAccountUnsafeHandler;
  let walletRepository: WalletRepository;

  beforeEach(() => {
    walletRepository = {
      findByUserId: jest.fn().mockImplementation(() => wallet),
      save: jest.fn(),
    } as any;
    addAccountUnsafeHandler = new AddAccountUnsafeHandler(walletRepository);
  });

  it('should create a new account and save it to the repository', async () => {
    const command = new AddAccountUnsafeCommand(userId, phrase, password);

    await addAccountUnsafeHandler.execute(command);

    expect(walletRepository.findByUserId).toHaveBeenCalled();
    expect(walletRepository.findByUserId).toHaveBeenCalledWith(userId);

    expect(wallet.initialize).toHaveBeenCalled();
    expect(wallet.initialize).toHaveBeenCalledWith(phrase, password);
    expect(wallet.addAccount).toHaveBeenCalled();

    expect(walletRepository.save).toHaveBeenCalled();
    expect(walletRepository.save).toHaveBeenCalledWith(wallet);
  });

  it('should throw an error if wallet not found', async () => {
    const command = new AddAccountUnsafeCommand(userId, phrase, password);

    (walletRepository.findByUserId as jest.Mock).mockImplementationOnce(
      () => null,
    );

    await expect(addAccountUnsafeHandler.execute(command)).rejects.toThrowError(
      'Wallet not found',
    );
  });
});
