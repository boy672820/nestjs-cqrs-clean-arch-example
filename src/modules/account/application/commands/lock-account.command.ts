import { ICommand } from '@nestjs/cqrs';

export class LockAccountCommand implements ICommand {
  constructor(
    public readonly userId: string,
    public readonly accountId: string,
  ) {}
}
