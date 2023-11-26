import { ICommand } from '@nestjs/cqrs';

export class TransferCommand implements ICommand {
  constructor(
    public readonly userId: string,
    public readonly sourceAccountId: string,
    public readonly destAccountId: string,
    public readonly amount: string,
  ) {}
}
