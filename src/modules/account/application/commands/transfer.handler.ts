import { CommandHandler } from '@nestjs/cqrs';
import { CommandHandlerAbstract } from '@common/abstracts';
import { TransferCommand } from './transfer.command';

@CommandHandler(TransferCommand)
export class TransferHandler extends CommandHandlerAbstract<TransferCommand> {
  async execute(command: TransferCommand) {}
}
