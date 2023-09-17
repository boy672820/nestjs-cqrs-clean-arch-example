import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateWalletCommand } from './create-wallet.command';
import { WalletFactory } from '../../domain';
import { InjectionToken } from '../../account.constants';
import { ulid } from 'ulid';
import type { IWalletService } from '../adapters/wallet.service.interface';
import type { IWalletRepository } from '../../domain/repositories/wallet.repository.interface';

type CreateWalletResult = {
  phrase: string;
  walletId: string;
};

@CommandHandler(CreateWalletCommand)
export class CreateWalletHandler
  implements ICommandHandler<CreateWalletCommand, CreateWalletResult>
{
  constructor(
    private readonly walletFactory: WalletFactory,
    @Inject(InjectionToken.WALLET_SERVICE)
    private readonly walletService: IWalletService,
    @Inject(InjectionToken.ACCOUNT_REPOSITORY)
    private readonly walletRepository: IWalletRepository,
  ) {}

  async execute(command: CreateWalletCommand) {
    const { userId, password } = command;
    const id = ulid();
    const hdnode = this.walletService.createHDNode(password);
    const wallet = this.walletFactory.create({
      id,
      userId,
      address: hdnode.address,
      publicKey: hdnode.publicKey,
    });

    await this.walletRepository.save(wallet);

    return {
      phrase: hdnode.phrase,
      walletId: wallet.id,
    };
  }
}
