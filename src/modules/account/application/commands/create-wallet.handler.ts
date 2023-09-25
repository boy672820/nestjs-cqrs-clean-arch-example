import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AlreadyExistsWalletException } from '@common/errors';
import { UniqueConstraintViolationException } from '@mikro-orm/core';
import { CreateWalletCommand } from './create-wallet.command';
import { WalletFactory } from '../../domain';
import { InjectionToken } from '../../account.constants';
import type { IWalletRepository } from '../../domain/repositories/wallet.repository.interface';

type CreateWalletResult = {
  phrase: string;
  accountAddress: string;
  privkey: string;
  balance: string;
};

@CommandHandler(CreateWalletCommand)
export class CreateWalletHandler
  implements ICommandHandler<CreateWalletCommand, CreateWalletResult>
{
  constructor(
    private readonly walletFactory: WalletFactory,
    @Inject(InjectionToken.ACCOUNT_REPOSITORY)
    private readonly walletRepository: IWalletRepository,
  ) {}

  async execute(command: CreateWalletCommand) {
    const { userId, password } = command;
    const wallet = this.walletFactory.create({ userId, password });
    const account = wallet.addAccount(0);

    try {
      await this.walletRepository.save(wallet);

      return {
        phrase: wallet.phrase,
        accountAddress: account.accountAddress,
        privkey: account.privkey,
        balance: account.balance,
      };
    } catch (e) {
      if (e instanceof UniqueConstraintViolationException) {
        throw new AlreadyExistsWalletException();
      }
      throw e;
    }
  }
}
