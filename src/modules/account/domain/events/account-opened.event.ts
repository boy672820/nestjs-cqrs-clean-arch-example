import { IEvent } from '@nestjs/cqrs';

export class AccountOpenedEvent implements IEvent {
  constructor(
    public readonly userId: string,
    public readonly accountId: string,
  ) {}
}
