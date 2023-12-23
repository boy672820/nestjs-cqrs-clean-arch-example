import { CommandHandler } from '@nestjs/cqrs';
import { Inject, UnauthorizedException } from '@nestjs/common';
import { CommandHandlerAbstract } from '@common/abstracts';
import { NotFoundAccountException } from '@common/errors';
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
      sourceAccountId,
      userId,
    );

    if (!sourceAccount) {
      throw new UnauthorizedException();
    }

    const destAaccount = await this.accountRepository.findOneById(
      destAccountId,
    );

    // Check if account exists
    if (!destAaccount) {
      throw new NotFoundAccountException();
    }

    sourceAccount.transferTo(destAaccount, amount);
  }
}
