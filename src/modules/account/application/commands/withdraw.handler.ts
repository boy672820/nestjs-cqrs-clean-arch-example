import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { CommandHandlerAbstract } from '@common/abstracts';
import { WithdrawCommand } from './withdraw.command';
import { InjectionToken } from '../../account.constants';
import type { IAccountRepository } from '../../domain/repositories/account.repository.interface';

@CommandHandler(WithdrawCommand)
export class WithdrawHandler extends CommandHandlerAbstract<WithdrawCommand> {
  constructor(
    @Inject(InjectionToken.ACCOUNT_REPOSITORY)
    private readonly accountRepository: IAccountRepository,
  ) {
    super();
  }

  async execute(command: WithdrawCommand) {
    const { userId, accountId, amount, destAddress } = command;

    const account = await this.accountRepository.findOne(accountId, userId);

    account.withdraw(amount);
  }
}
