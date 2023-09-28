import { ICommand } from '@nestjs/cqrs';
import { CommandResultAbstract } from './command.result.abstrac';

export abstract class CommandHandlerAbstract<
  TCommand extends ICommand,
  TResult extends CommandResultAbstract | void = void,
> {
  execute(command: TCommand): Promise<TResult>;

  async execute(command: TCommand): Promise<TResult> {
    const result = await this.execute(command);

    if (result instanceof CommandResultAbstract) {
      return result.plain() as TResult;
    }
  }
}
