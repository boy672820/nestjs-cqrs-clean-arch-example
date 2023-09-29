import { CommandHandler } from '@nestjs/cqrs';
import { CreateAccountCommand } from './create-account.command';
import { CommandHandlerAbstract } from '@common/abstracts';
import { CreateAccountCommandResult } from './create-account.command-result';

@CommandHandler(CreateAccountCommand)
export class CreateAccountHandler extends CommandHandlerAbstract<
  CreateAccountCommand,
  CreateAccountCommandResult
> {
  async execute(
    command: CreateAccountCommand,
  ): Promise<CreateAccountCommandResult> {
    const { userId } = command;

    return new CreateAccountCommandResult(true, 'Account created', {
      accountAddress: '',
      balance: '0',
      privkey: '',
    });
  }
}
