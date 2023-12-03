import { CommandHandler } from '@nestjs/cqrs';
import { Inject, UnauthorizedException } from '@nestjs/common';
import { CommandHandlerAbstract } from '@common/abstracts';
import { TransferCommand } from './transfer.command';
import { InjectionToken } from '../../account.constants';
import type { IAccountRepository } from '../../domain/repositories/account.repository.interface';

@CommandHandler(TransferCommand)
export class TransferHandler extends CommandHandlerAbstract<TransferCommand> {
  constructor(
    @Inject(InjectionToken.ACCOUNT_REPOSITORY)
    private readonly accountRepository: IAccountRepository,
  ) {
    super();
  }

  async execute(command: TransferCommand) {
    const { userId, sourceAccountId, destAccountId, amount } = command;

    const sourceAccount = await this.accountRepository.findOne(
      userId,
      sourceAccountId,
    );

    if (!sourceAccount) {
      throw new UnauthorizedException();
    }
  }
}
