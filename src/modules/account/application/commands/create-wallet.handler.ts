import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { AlreadyExistsWalletException } from '@common/errors';
import { UniqueConstraintViolationException } from '@mikro-orm/core';
import { CommandHandlerAbstract } from '@common/abstracts';
import { CreateWalletCommand } from './create-wallet.command';
import {
  CreateWalletCommandResult,
  CreateWalletResultDto,
} from './create-wallet.result';
import { WalletFactory } from '../../domain';
import { InjectionToken } from '../../account.constants';
import type { IWalletRepository } from '../../domain/repositories/wallet.repository.interface';

@CommandHandler(CreateWalletCommand)
export class CreateWalletHandler extends CommandHandlerAbstract<
  CreateWalletCommand,
  CreateWalletCommandResult
> {
  constructor(
    private readonly walletFactory: WalletFactory,
    @Inject(InjectionToken.WALLET_REPOSITORY)
    private readonly walletRepository: IWalletRepository,
  ) {
    super();
  }

  async execute(command: CreateWalletCommand) {
    const { userId, password } = command;
    const wallet = this.walletFactory.create({ userId });
    const phrase = wallet.createHDNode(password);
    const account = wallet.addAccount();

    try {
      await this.walletRepository.create(wallet);

      const dto = new CreateWalletResultDto({
        phrase,
        account: {
          id: account.id,
          address: account.accountAddress,
          privkey: account.privkey,
          balance: account.balance,
        },
      });

      return new CreateWalletCommandResult(true, 'Wallet created', dto);
    } catch (e) {
      if (e instanceof UniqueConstraintViolationException) {
        throw new AlreadyExistsWalletException();
      }
      throw e;
    }
  }
}
