import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateWalletCommand } from './create-wallet.command';
import { AccountFactory } from '../../domain';
import { InjectionToken } from '../../account.constants';
import { ulid } from 'ulid';
import type { IWalletService } from '../adapters/wallet.service.interface';
import type { IAccountRepository } from '../../domain/repositories/account.repository.interface';

type CreateWalletResult = {
  phrase: string;
  id: string;
  accountAddress: string;
  balance: string;
  createdAt: Date;
};

@CommandHandler(CreateWalletCommand)
export class CreateWalletHandler
  implements ICommandHandler<CreateWalletCommand, CreateWalletResult>
{
  constructor(
    private readonly accountFactory: AccountFactory,
    @Inject(InjectionToken.WALLET_SERVICE)
    private readonly walletService: IWalletService,
    @Inject(InjectionToken.ACCOUNT_REPOSITORY)
    private readonly accountRepository: IAccountRepository,
  ) {}

  async execute(command: CreateWalletCommand) {
    const { userId, password } = command;
    const id = ulid();
    const wallet = this.walletService.createWallet(password);
    const account = this.accountFactory.create({
      id,
      userId,
      index: 0,
      accountAddress: wallet.address,
      balance: '0',
    });

    await this.accountRepository.save(account);

    return {
      phrase: wallet.phrase,
      id: account.id,
      accountAddress: account.accountAddress,
      balance: account.balance,
      createdAt: account.createdAt,
    };
  }
}
