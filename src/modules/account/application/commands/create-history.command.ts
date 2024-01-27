import { ICommand } from '@nestjs/cqrs';

export class CreateHistoryCommand implements ICommand {
  constructor(
    public readonly fromAccountId: string,
    public readonly toAccountId: string,
    public readonly amount: string,
  ) {}
}
