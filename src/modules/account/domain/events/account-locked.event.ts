import { IEvent } from '@nestjs/cqrs';

export class AccountLockedEvent implements IEvent {
  constructor(
    public readonly userId: string,
    public readonly accountId: string,
  ) {}
}
