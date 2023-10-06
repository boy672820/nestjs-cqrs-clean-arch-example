import { ICommand } from '@nestjs/cqrs';

export class OpenAccountCommand implements ICommand {
  constructor(
    public readonly userId: string,
    public readonly accountId: string,
  ) {}
}
