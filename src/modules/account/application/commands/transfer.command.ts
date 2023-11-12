import { ICommand } from '@nestjs/cqrs';

export class TransferCommand implements ICommand {
  constructor(
    public readonly sourceAccountId: string,
    public readonly destinationAccountId: string,
    public readonly amount: string,
  ) {}
}
