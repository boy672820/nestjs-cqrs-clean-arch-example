import { ICommand } from '@nestjs/cqrs';

export class AddAccountUnsafeCommand implements ICommand {
  constructor(
    public readonly userId: string,
    public readonly phrase: string,
    public readonly password: string,
  ) {}
}
