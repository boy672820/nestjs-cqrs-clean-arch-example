import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { CommandHandlerAbstract } from '@common/abstracts';
import { NotFoundWalletException } from '@common/errors';
import { AddAccountUnsafeCommand } from './add-account-unsafe.command';
import { AddAccountUnsafeCommandResult } from './add-account-unsafe.result';
import { InjectionToken } from '../../account.constants';
import type { IWalletRepository } from '../../domain/repositories/wallet.repository.interface';

@CommandHandler(AddAccountUnsafeCommand)
export class AddAccountUnsafeHandler extends CommandHandlerAbstract<
  AddAccountUnsafeCommand,
  AddAccountUnsafeCommandResult
> {
  constructor(
    @Inject(InjectionToken.WALLET_REPOSITORY)
    private readonly walletRepository: IWalletRepository,
  ) {
    super();
  }

  async execute(
    command: AddAccountUnsafeCommand,
  ): Promise<AddAccountUnsafeCommandResult> {
    const { userId, phrase, password } = command;

    const wallet = await this.walletRepository.findByUserId(userId);

    if (!wallet) {
      throw new NotFoundWalletException();
    }

    wallet.initialize(phrase, password);

    const account = wallet.addAccount();

    await this.walletRepository.save(wallet);

    return new AddAccountUnsafeCommandResult(true, 'Account added', {
      account: {
        address: account.accountAddress,
        privkey: account.privkey,
        balance: '0',
      },
    });
  }
}
