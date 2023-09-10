import { ICommand } from '@nestjs/cqrs';

export class CreateWalletCommand implements ICommand {
  constructor(
    public readonly userId: string,
    public readonly password: string,
  ) {}
}
