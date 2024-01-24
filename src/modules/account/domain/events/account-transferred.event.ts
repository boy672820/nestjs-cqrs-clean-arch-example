import { IEvent } from '@nestjs/cqrs';

export class AccountTransferredEvent implements IEvent {
  constructor(
    public readonly fromAccountId,
    public readonly toAccountId,
    public readonly amount,
  ) {}
}
