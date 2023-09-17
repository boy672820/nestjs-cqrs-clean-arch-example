import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateWalletCommand } from './create-wallet.command';
import { AccountFactory, WalletFactory } from '../../domain';
import { InjectionToken } from '../../account.constants';
import { ulid } from 'ulid';
import type { IWalletService } from '../adapters/wallet.service.interface';
import type { IWalletRepository } from '../../domain/repositories/wallet.repository.interface';

type CreateWalletResult = {
  phrase: string;
  accountAddress: string;
  privkey: string;
  balance: 0;
};

@CommandHandler(CreateWalletCommand)
export class CreateWalletHandler
  implements ICommandHandler<CreateWalletCommand, CreateWalletResult>
{
  constructor(
    private readonly walletFactory: WalletFactory,
    private readonly accountFactory: AccountFactory,
    @Inject(InjectionToken.WALLET_SERVICE)
    private readonly walletService: IWalletService,
    @Inject(InjectionToken.ACCOUNT_REPOSITORY)
    private readonly walletRepository: IWalletRepository,
  ) {}

  async execute(command: CreateWalletCommand) {
    const { userId, password } = command;
    const hdnode = this.walletService.createHDNode(password);
    const wallet = this.walletFactory.create({
      userId,
      address: hdnode.address,
      publicKey: hdnode.publicKey,
    });

    await this.walletRepository.save(wallet);

    const id = ulid();
    const index = 0;
    const derivedChild = this.walletService.derive(hdnode.phrase, index);
    const account = this.accountFactory.create({
      id,
      index,
      accountAddress: derivedChild.address,
      balance: '0',
    });

    await this.walletRepository.addAccount(wallet, account);

    return {
      phrase: hdnode.phrase,
      accountAddress: derivedChild.address,
      privkey: derivedChild.privkey,
      balance: 0,
    };
  }
}
