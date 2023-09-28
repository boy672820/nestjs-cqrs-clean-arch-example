import { ICommand } from '@nestjs/cqrs';

export class AddAccountCommand implements ICommand {
  constructor(public readonly userId: string) {}
}
