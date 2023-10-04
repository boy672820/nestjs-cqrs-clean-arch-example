import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { CommandHandlerAbstract } from '@common/abstracts';
import { NotFoundAccountException } from '@common/errors';
import { LockAccountCommand } from './lock-account.command';
import {
  LockAccountCommandResult,
  LockAccountResultDto,
} from './lock-account.result';
import { AccountFactory } from '../../domain';
import { InjectionToken } from '../../account.constants';
import type { IAccountRepository } from '../../domain/repositories/account.repository.interface';

@CommandHandler(LockAccountCommand)
export class LockAccountHandler extends CommandHandlerAbstract<
  LockAccountCommand,
  LockAccountCommandResult
> {
  constructor(
    private readonly accountFactory: AccountFactory,
    @Inject(InjectionToken.ACCOUNT_REPOSITORY)
    private readonly accountRepository: IAccountRepository,
  ) {
    super();
  }

  async execute(command: LockAccountCommand) {
    const { userId, accountId } = command;

    const account = await this.accountRepository.findOne(accountId, userId);

    if (!account) {
      throw new NotFoundAccountException();
    }

    account.lock();

    // await this.accountRepository.save(account);

    const dto = new LockAccountResultDto({
      account: {
        id: accountId,
        address: account.accountAddress,
        balance: account.balance,
      },
      lockedAt: new Date(),
    });

    return new LockAccountCommandResult(true, 'Account locked', dto);
  }
}
