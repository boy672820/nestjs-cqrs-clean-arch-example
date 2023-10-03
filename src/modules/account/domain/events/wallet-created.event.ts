import { IEvent } from '@nestjs/cqrs';

export class WalletCreatedEvent implements IEvent {
  constructor(public readonly userId: string) {}
}
