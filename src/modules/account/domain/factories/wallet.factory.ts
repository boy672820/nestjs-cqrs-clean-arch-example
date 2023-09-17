import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Wallet, WalletProperties } from '../wallet';

@Injectable()
export class WalletFactory {
  constructor(private readonly eventPublisher: EventPublisher) {}

  create(props: WalletProperties): Wallet {
    return this.eventPublisher.mergeObjectContext(new Wallet(props));
  }
}
