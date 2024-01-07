import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { CommandHandlerAbstract } from '@common/abstracts';
import { NotFoundAccountException } from '@common/errors';
import { Transactional } from '@common/database/decorators';
import { OpenAccountCommand } from './open-account.command';
import { InjectionToken } from '../../account.constants';
import type { IAccountRepository } from '../../domain/repositories/account.repository.interface';

@CommandHandler(OpenAccountCommand)
export class OpenAccountHandler extends CommandHandlerAbstract<OpenAccountCommand> {
  constructor(
    @Inject(InjectionToken.ACCOUNT_REPOSITORY)
    private readonly accountRepository: IAccountRepository,
  ) {
    super();
  }

  @Transactional()
  async execute(command: OpenAccountCommand) {
    const { userId, accountId } = command;

    const account = await this.accountRepository.findOne(accountId, userId);

    if (!account) {
      throw new NotFoundAccountException();
    }

    account.open();

    await this.accountRepository.update(account);
  }
}
