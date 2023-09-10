import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateAccountCommand } from './create-account.command';
import { AccountFactory } from '../../domain';
import { ulid } from 'ulid';

@CommandHandler(CreateAccountCommand)
export class CreateAccountHandler
  implements ICommandHandler<CreateAccountCommand>
{
  constructor(private readonly accountFactory: AccountFactory) {}

  async execute(command: CreateAccountCommand) {
    const { userId } = command;
    const id = ulid();
    // const account = this.accountFactory.create({ id, userId });
  }
}
