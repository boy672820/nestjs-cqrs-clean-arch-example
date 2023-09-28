import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AddAccountCommand } from './add-account.command';

@CommandHandler(AddAccountCommand)
export class AddAccountHandler
  implements ICommandHandler<AddAccountCommand, void>
{
  async execute(command: AddAccountCommand): Promise<void> {
    const { userId } = command;
  }
}
