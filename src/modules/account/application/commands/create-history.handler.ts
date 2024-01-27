import { CommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CommandHandlerAbstract } from '@common/abstracts';
import { CreateHistoryCommand } from './create-history.command';
import { IAccountRepository } from '../../domain/repositories/account.repository.interface';
import { InjectionToken } from '../../account.constants';

@CommandHandler(CreateHistoryCommand)
export class CreateHistoryHandler extends CommandHandlerAbstract<CreateHistoryCommand> {
  constructor(
    @Inject(InjectionToken.ACCOUNT_REPOSITORY)
    private readonly accountRepository: IAccountRepository,
  ) {
    super();
  }

  async execute(command: CreateHistoryCommand): Promise<void> {
    const { fromAccountId, toAccountId, amount } = command;

    const [fromAccount, toAccount] = await Promise.all([
      this.accountRepository.findById(fromAccountId),
      this.accountRepository.findById(toAccountId),
    ]);

    if (!fromAccount || !toAccount) {
      throw new Error('Account not found');
    }

    await this.accountRepository.createHistory(fromAccount, toAccount, amount);
  }
}
