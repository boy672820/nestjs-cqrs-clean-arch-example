import { ICommand } from '@nestjs/cqrs';

export class Verify2faTokenCommand implements ICommand {
  constructor(
    public readonly userId: string,
    public readonly accountId: string,
    public readonly token: string,
  ) {}
}
