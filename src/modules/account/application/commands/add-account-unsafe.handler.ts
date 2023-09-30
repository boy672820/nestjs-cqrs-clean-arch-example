import { CommandHandler } from '@nestjs/cqrs';
import { AddAccountUnsafeCommand } from './add-account-unsafe.command';
import { CommandHandlerAbstract } from '@common/abstracts';
import { AddAccountUnsafeCommandResult } from './add-account-unsafe.result';

@CommandHandler(AddAccountUnsafeCommand)
export class AddAccountUnsafeHandler extends CommandHandlerAbstract<
  AddAccountUnsafeCommand,
  AddAccountUnsafeCommandResult
> {
  async execute(
    command: AddAccountUnsafeCommand,
  ): Promise<AddAccountUnsafeCommandResult> {
    const { userId, phrase, password } = command;

    return new AddAccountUnsafeCommandResult(true, 'Account added', {
      accountAddress: '',
      balance: '0',
      privkey: '',
    });
  }
}
