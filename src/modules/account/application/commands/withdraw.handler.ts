import { CommandHandler } from '@nestjs/cqrs';
import { CommandHandlerAbstract } from '@common/abstracts';
import { WithdrawCommand } from './withdraw.command';

@CommandHandler(WithdrawCommand)
export class WithdrawHandler extends CommandHandlerAbstract<WithdrawCommand> {
  constructor() {
    super();
  }

  async execute(command: WithdrawCommand) {
    const { userId, accountId, amount, destAddress } = command;
  }
}
