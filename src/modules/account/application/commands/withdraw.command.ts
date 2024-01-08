import { ICommand } from '@nestjs/cqrs';

export class WithdrawCommand implements ICommand {
  constructor(
    public readonly userId: string,
    public readonly accountId: string,
    public readonly amount: string,
    public readonly destAddress: string,
  ) {}
}
